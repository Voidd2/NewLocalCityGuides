import type { ReactNode } from "react";

function renderInlineBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index} className="font-bold text-navy-800">{part.slice(2, -2)}</strong>
      : part,
  );
}

export function RichDescription({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  return (
    <div className="space-y-4 text-sm leading-7 text-gray-700">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        const headingMatch = lines[0]?.match(/^\*\*(.+)\*\*$/);

        if (headingMatch) {
          return (
            <section key={index}>
              <h2 className="mb-1.5 text-base font-extrabold text-navy-800">{headingMatch[1]}</h2>
              {lines.slice(1).map((line, lineIndex) => (
                <p key={lineIndex}>{renderInlineBold(line)}</p>
              ))}
            </section>
          );
        }

        return <p key={index}>{renderInlineBold(lines.join(" "))}</p>;
      })}
    </div>
  );
}
