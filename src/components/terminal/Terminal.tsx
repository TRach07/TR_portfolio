/**
 * Terminal UI component — interactive command-line interface.
 * Features: command input, output history, arrow-key history navigation,
 * basic tab auto-completion, and a blinking cursor.
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { CommandOutput } from "@/types/terminal";
import { parseCommand } from "./CommandParser";
import { t } from "@/lib/i18n";

/** Known command names for tab auto-completion */
const KNOWN_COMMANDS = [
  "help", "about", "whoami", "projects", "skills", "contact",
  "neofetch", "theme", "lang", "clear", "cat", "sudo",
];

export function Terminal() {
  const language = useSettingsStore((s) => s.language);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const prompt = t(language, "terminal.prompt");

  /** Auto-scroll to the bottom when new output is added */
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  /** Focus the input when the terminal is mounted or clicked */
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  /** Handle command submission */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      const result = parseCommand(input);

      // Add to command history for arrow-key navigation
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);

      switch (result.type) {
        case "clear":
          setHistory([]);
          break;

        case "theme":
          setTheme(result.value);
          setHistory((prev) => [
            ...prev,
            {
              input,
              output: `Theme switched to ${result.value}.`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "lang":
          setLanguage(result.value);
          setHistory((prev) => [
            ...prev,
            {
              input,
              output: `Language switched to ${result.value === "en" ? "English" : "Français"}.`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "output":
          setHistory((prev) => [
            ...prev,
            { input, output: result.output, timestamp: Date.now() },
          ]);
          break;
      }

      setInput("");
    },
    [input, setTheme, setLanguage]
  );

  /** Handle keyboard shortcuts (arrow keys for history, Tab for completion) */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Arrow Up: previous command
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }

      // Arrow Down: next command
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }

      // Tab: auto-complete
      if (e.key === "Tab") {
        e.preventDefault();
        if (input.trim()) {
          const match = KNOWN_COMMANDS.find((cmd) =>
            cmd.startsWith(input.trim().toLowerCase())
          );
          if (match) setInput(match);
        }
      }
    },
    [commandHistory, historyIndex, input]
  );

  return (
    <div
      className="h-full flex flex-col bg-[#1a1a1a] rounded-lg font-mono text-sm -m-4"
      onClick={focusInput}
    >
      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-auto p-4 space-y-2 os-scrollbar"
      >
        {/* Welcome message */}
        <p className="text-green-400">{t(language, "terminal.welcome")}</p>

        {/* Command history */}
        {history.map((entry, i) => (
          <div key={i}>
            {/* Input line */}
            <p>
              <span className="text-green-400">{prompt}</span>
              <span className="text-purple-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-gray-300">{entry.input}</span>
            </p>
            {/* Output */}
            {entry.output && (
              <pre className="text-gray-400 whitespace-pre-wrap text-xs leading-relaxed mt-0.5">
                {entry.output}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Input line */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center px-4 pb-3 pt-1 border-t border-white/5"
      >
        <span className="text-green-400 shrink-0">{prompt}</span>
        <span className="text-purple-400 shrink-0">:</span>
        <span className="text-blue-400 shrink-0">~</span>
        <span className="text-white shrink-0">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-gray-200 outline-none caret-green-400 ml-1"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
