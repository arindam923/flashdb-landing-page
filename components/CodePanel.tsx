"use client";

import React from "react";
import { Copy } from "lucide-react";

interface CodePanelProps {
  code: string;
}

const highlightCode = (code: string) => {
  const keywords = ["import", "from", "const", "new", "async", "await"];
  const functions = [
    "set",
    "get",
    "delete",
    "subscribe",
    "query",
    "where",
    "limit",
    "benchmark",
    "transaction",
    "cluster",
    "log",
  ];

  // A very basic syntax highlighter for the exact demo code
  const tokens = code.split(/([ \n\t(){},.=;\[\]]+)/); // split by whitespace/punctuation keeping them
  
  return tokens.map((token, i) => {
    if (keywords.includes(token)) {
      return <span key={i} style={{ color: "#FF79C6" }}>{token}</span>;
    }
    if (functions.includes(token)) {
      return <span key={i} style={{ color: "#8BE9FD" }}>{token}</span>;
    }
    if (token.startsWith('"') && token.endsWith('"')) {
      return <span key={i} style={{ color: "#50FA7B" }}>{token}</span>;
    }
    if (/^\d+(_\d+)*$/.test(token)) {
      return <span key={i} style={{ color: "#BD93F9" }}>{token}</span>; // Purple for numbers
    }
    return token;
  });
};

export const CodePanel: React.FC<CodePanelProps> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 text-[#8A8A8A] text-xs font-mono">
        <span>example.ts</span>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <Copy size={14} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="flex-1 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", lineHeight: 1.6, color: "#F8F8F2" }}>
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
};
