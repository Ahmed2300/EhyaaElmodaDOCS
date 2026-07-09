import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="code-block">
      {language && (
        <div style={{ color: '#808080', fontSize: 11, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
          // {language}
        </div>
      )}
      <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
    </div>
  );
};

export default CodeBlock;
