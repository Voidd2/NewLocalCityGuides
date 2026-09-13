import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { afterEach, describe, expect, it } from 'vitest';
import type { ContentBundle } from '../src/domain/content.js';
import {
  contentFormatForPath, parseContentText, readContentFile, readContentInput,
  serializeContentYaml, writeDraftContentFile,
} from '../src/content/io.js';

const run = promisify(execFile);
const temporaryDirectories: string[] = [];

async function temporaryDirectory() {
  const directory = await mkdtemp(join(tmpdir(), 'ylcg-content-test-'));
  temporaryDirectories.push(directory);
  return directory;
}

function emptyBundle(): ContentBundle {
  return { schemaVersion: 1, cities: [], locations: [], routes: [], sources: [], claims: [] };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe('content input formats', () => {
  it('preserves nulls, empty arrays, booleans, quoted numbers and date-like strings in YAML 1.2 core', () => {
    expect(parseContentText('empty: null\nitems: []\nallowed: false\ncount: "1"\nword: No\ndate: 2000-01-01\n', 'yaml')).toEqual({
      empty: null, items: [], allowed: false, count: '1', word: 'No', date: '2000-01-01',
    });
  });

  it.each([
    ['duplicate root keys', 'same: 1\nsame: 2'],
    ['duplicate nested keys', 'nested:\n  same: 1\n  same: 2'],
    ['aliases', 'base: &item { test: 1 }\ncopy: *item'],
    ['recursive aliases', 'base: &item [*item]'],
    ['merge keys', 'base:\n  <<: { inherited: true }'],
    ['custom tags', 'value: !untrusted SYNTHETIC'],
    ['non-core built-in tags', 'value: !!timestamp 2000-01-01'],
    ['YAML 1.1', '%YAML 1.1\n---\nvalue: No'],
    ['multiple documents', 'one: 1\n---\ntwo: 2'],
    ['object keys', '? [one, two]\n: value'],
    ['nonstring keys', '1: value'],
  ])('rejects %s', (_label, source) => {
    expect(() => parseContentText(source, 'yaml')).toThrow();
  });

  it('parses JSON without converting string or boolean values', () => {
    expect(parseContentText('{"number":"1","flag":false,"value":null,"items":[]}', 'json')).toEqual({
      number: '1', flag: false, value: null, items: [],
    });
    expect(() => parseContentText('{broken', 'json')).toThrow();
  });

  it('chooses supported file formats explicitly', () => {
    expect(contentFormatForPath('test.JSON')).toBe('json');
    expect(contentFormatForPath('test.yml')).toBe('yaml');
    expect(contentFormatForPath('test.yaml')).toBe('yaml');
    expect(() => contentFormatForPath('test.txt')).toThrow('Unsupported');
  });

  it('roundtrips canonical JSON and YAML and validates values without coercion', async () => {
    const directory = await temporaryDirectory();
    const yamlPath = join(directory, 'synthetic.yaml');
    const jsonPath = join(directory, 'synthetic.json');
    const bundle = emptyBundle();
    await writeFile(yamlPath, serializeContentYaml(bundle));
    await writeFile(jsonPath, JSON.stringify(bundle));
    expect(await readContentFile(yamlPath)).toEqual(bundle);
    expect(await readContentFile(jsonPath)).toEqual(bundle);
    await writeFile(yamlPath, serializeContentYaml(bundle).replace('schemaVersion: 1', 'schemaVersion: "1"'));
    await expect(readContentFile(yamlPath)).rejects.toThrow('schemaVersion');
  });

  it('lets the importer read raw seed data without assuming a canonical bundle', async () => {
    const directory = await temporaryDirectory();
    const filePath = join(directory, 'synthetic.json');
    const rawSeed = { city: 'SYNTHETIC RAW INPUT' };
    await writeFile(filePath, JSON.stringify(rawSeed));
    expect(await readContentInput(filePath)).toEqual(rawSeed);
    await expect(readContentFile(filePath)).rejects.toThrow();
  });
});

describe('draft file output', () => {
  it('creates an explicitly named YAML draft and refuses to overwrite it', async () => {
    const directory = await temporaryDirectory();
    const filePath = join(directory, 'drafts', 'synthetic.yaml');
    await writeDraftContentFile(filePath, emptyBundle());
    expect(await readContentFile(filePath)).toEqual(emptyBundle());
    const original = await readFile(filePath, 'utf8');
    await expect(writeDraftContentFile(filePath, emptyBundle())).rejects.toThrow('Refusing to overwrite');
    expect(await readFile(filePath, 'utf8')).toBe(original);
  });

  it('rejects JSON output and protected research paths', async () => {
    const directory = await temporaryDirectory();
    await expect(writeDraftContentFile(join(directory, 'draft.json'), emptyBundle())).rejects.toThrow('.yaml');
    await expect(writeDraftContentFile(join(directory, 'content', 'leiden', 'draft.yaml'), emptyBundle())).rejects.toThrow('content/leiden');
    await expect(writeDraftContentFile(join(directory, 'content', 'LEIDEN', 'draft.yaml'), emptyBundle())).rejects.toThrow('content/leiden');
  });

  it('rejects output entering protected research through a symlink or junction', async () => {
    const directory = await temporaryDirectory();
    const protectedDirectory = join(directory, 'content', 'leiden');
    await mkdir(protectedDirectory, { recursive: true });
    const link = join(directory, 'apparently-safe-output');
    await symlink(protectedDirectory, link, process.platform === 'win32' ? 'junction' : 'dir');
    await expect(writeDraftContentFile(join(link, 'new', 'draft.yaml'), emptyBundle())).rejects.toThrow('content/leiden');
  });

  it('runs the validation CLI with a nonzero exit status for invalid content or usage', async () => {
    const directory = await temporaryDirectory();
    const filePath = join(directory, 'synthetic.json');
    await writeFile(filePath, JSON.stringify(emptyBundle()));
    const cliPath = resolve('scripts/content.ts');
    const result = await run(process.execPath, ['--import', 'tsx', cliPath, 'validate', filePath]);
    expect(result.stdout).toContain('Valid content:');
    await writeFile(filePath, '{"schemaVersion":"1"}');
    await expect(run(process.execPath, ['--import', 'tsx', cliPath, 'validate', filePath])).rejects.toMatchObject({ code: 1 });
    await expect(run(process.execPath, ['--import', 'tsx', cliPath, 'import'])).rejects.toMatchObject({ code: 1 });
  });
});
