/**
 * Types for the interactive terminal.
 * Handles commands, outputs, and command history.
 */

/** Result of a terminal command execution */
export interface CommandOutput {
  /** Command entered by the user */
  input: string;
  /** Output displayed in the terminal */
  output: string;
  /** Execution timestamp */
  timestamp: number;
}

/** Definition of an available terminal command */
export interface CommandDefinition {
  name: string;
  description: string;
  /** Alternative aliases (e.g. "whoami" for "about") */
  aliases?: string[];
  /** Function executed when the command is typed */
  execute: (args: string[]) => string;
}
