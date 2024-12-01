import React from "react";
import styles from "./styles/JsonSyntaxHighlighter.module.css";

interface JsonSyntaxHighlighterProps {
  json: string | null;
}

const JsonSyntaxHighlighter: React.FC<JsonSyntaxHighlighterProps> = ({ json }) => {
  const syntaxHighlight = (json: string): string => {
    if (!json) return ""; // no JSON from response

    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = styles.number; // Map styles from the imported CSS module
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? styles.key : styles.string;
        } else if (/true|false/.test(match)) {
          cls = styles.boolean;
        } else if (/null/.test(match)) {
          cls = styles.null;
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  return (
    <pre
    className={styles.container}
      dangerouslySetInnerHTML={{
        __html: syntaxHighlight(json || ""),
      }}
    />
  );
};

export default JsonSyntaxHighlighter;
