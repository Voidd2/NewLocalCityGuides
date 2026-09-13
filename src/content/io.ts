import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, parse, resolve, sep } from 'node:path';
import { isAlias, isNode, isPair, isScalar, parseDocument, stringify, visit } from 'yaml';
import type { ContentBundle } from '../domain/content.js';
import { validateContent } from './validate.js';

export type ContentFormat = 'json' | 'yaml';

const coreTags = new Set([
  'tag:yaml.org,2002:str', 'tag:yaml.org,2002:null',
  'tag:yaml.org,2002:bool', 'tag:yaml.org,2002:int',
  'tag:yaml.org,2002:float', 'tag:yaml.org,2002:map',
  'tag:yaml.org,2002:seq',
]);

/** Parse one JSON or YAML 1.2 core document without resolving aliases or tags. */
export function parseContentText(text: string, format: ContentFormat): unknown {
  if (format === 'json') return JSON.parse(text) as unknown;
  const document = parseDocument(text, {
    version: '1.2',
    schema: 'core',
    strict: true,
    uniqueKeys: true,
    customTags: [],
    resolveKnownTags: false,
    merge: false,
  });
  const problems = [...document.errors, ...document.warnings];
  if (problems.length > 0) {
    throw new Error(`Invalid YAML:\n${problems.map((problem) => problem.message).join('\n')}`);
  }
  if (document.directives?.yaml.version !== '1.2') {
    throw new Error('Only YAML 1.2 is supported.');
  }
  visit(document, (_key, node) => {
    if (isAlias(node)) throw new Error('YAML aliases are not supported.');
    if (isNode(node) && node.tag && !coreTags.has(node.tag)) {
      throw new Error(`YAML custom tags are not supported: ${node.tag}`);
    }
    if (isPair(node)) {
      if (!isScalar(node.key) || typeof node.key.value !== 'string') {
        throw new Error('YAML mapping keys must be strings.');
      }
      if (node.key.value === '<<') throw new Error('YAML merge keys are not supported.');
    }
  });
  return document.toJS({ maxAliasCount: 0 }) as unknown;
}

export function contentFormatForPath(filePath: string): ContentFormat {
  const extension = extname(filePath).toLowerCase();
  if (extension === '.json') return 'json';
  if (extension === '.yaml' || extension === '.yml') return 'yaml';
  throw new Error(`Unsupported content file extension: ${extension || '(none)'}`);
}

/** Read source input without applying the canonical schema (e.g. a seed). */
export async function readContentInput(filePath: string): Promise<unknown> {
  const format = contentFormatForPath(filePath);
  return parseContentText(await readFile(filePath, 'utf8'), format);
}

export async function readContentFile(filePath: string): Promise<ContentBundle> {
  return validateContent(await readContentInput(filePath));
}

export function serializeContentYaml(bundle: ContentBundle): string {
  return stringify(validateContent(bundle), {
    version: '1.2', schema: 'core', aliasDuplicateObjects: false, lineWidth: 0,
  });
}

function assertOutsideResearch(filePath: string): void {
  const segments = resolve(filePath).split(sep).map((segment) => segment.toLowerCase());
  if (segments.some((segment, index) => segment === 'content' && segments[index + 1] === 'leiden')) {
    throw new Error('Draft import output must be outside content/leiden/**.');
  }
}

// Resolve the nearest existing ancestor before creating directories, so a
// symlink/junction cannot direct an apparently safe output into research files.
async function resolveExistingAncestor(filePath: string): Promise<string> {
  try {
    return await realpath(filePath);
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error;
    const parent = dirname(filePath);
    if (parent === filePath || filePath === parse(filePath).root) throw error;
    return join(await resolveExistingAncestor(parent), basename(filePath));
  }
}

/** Write only a new, explicitly named YAML draft outside Claude's content tree. */
export async function writeDraftContentFile(filePath: string, bundle: ContentBundle): Promise<void> {
  if (contentFormatForPath(filePath) !== 'yaml') {
    throw new Error('Draft import output must use a .yaml or .yml extension.');
  }
  const checked = validateContent(bundle);
  if (checked.locations.some((location) => location.publication.status !== 'draft') ||
      checked.routes.some((route) => route.publication.status !== 'draft')) {
    throw new Error('Draft import output cannot contain published or review-ready locations or routes.');
  }
  const outputPath = resolve(filePath);
  assertOutsideResearch(outputPath);
  assertOutsideResearch(await resolveExistingAncestor(outputPath));
  await mkdir(dirname(outputPath), { recursive: true });
  assertOutsideResearch(join(await realpath(dirname(outputPath)), basename(outputPath)));
  const text = '# Draft content bundle; selection is not publication approval.\n' + serializeContentYaml(checked);
  try {
    await writeFile(outputPath, text, { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
      throw new Error(`Refusing to overwrite existing output: ${outputPath}`, { cause: error });
    }
    throw error;
  }
}
