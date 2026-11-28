"use client";

import { useEffect, useRef, useState } from "react";

// Copies the address and confirms in place; falls back to mailto when the
// clipboard is unavailable.
export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className="copy" onClick={copy} data-copied={copied}>
      <span className="copy__email">{email}</span>
      <span className="copy__state" aria-hidden="true">
        <span className="copy__label">Copy</span>
        <span className="copy__label">Copied</span>
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Email copied" : ""}</span>
    </button>
  );
}
