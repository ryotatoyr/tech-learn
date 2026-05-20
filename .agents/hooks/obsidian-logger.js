#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

/**
 * Gemini CLI Hook: Log shell commands and git commits to Obsidian.
 */

function log(msg) {
  process.stderr.write(`[obsidian-logger] ${msg}\n`);
}

try {
  // Read hook input from stdin
  const inputData = fs.readFileSync(0, 'utf-8');
  if (!inputData) {
    process.exit(0);
  }
  
  const input = JSON.parse(inputData);
  
  // Only handle run_shell_command
  if (input.tool_name === 'run_shell_command') {
    const command = input.tool_input.command;
    const exitCode = input.tool_output ? input.tool_output.exit_code : 0;
    const cwd = input.cwd || process.env.GEMINI_PROJECT_DIR || process.cwd();
    const workspace = path.basename(cwd);
    
    // Log only successful commands (optional)
    if (exitCode !== 0) {
      console.log(JSON.stringify({ decision: "allow" }));
      process.exit(0);
    }

    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('ja-JP', { hour12: false });
    
    let type = 'Command';
    if (command.trim().startsWith('git commit')) {
      type = 'Git Commit';
    }

    const logEntry = `- [${time}] **${type}**: \`${command.replace(/`/g, '\\`')}\``;
    
    const vault = "obsidian_diary";
    const filePath = `AgentLogs/${workspace}/${date}.md`;
    
    // Construct Obsidian CLI command
    // Use PowerShell style escaping for content
    const escapedContent = logEntry.replace(/"/g, '""');
    const obsidianCmd = `obsidian vault="${vault}" append path="${filePath}" content="${escapedContent}"`;
    
    log(`Logging to ${filePath}`);
    try {
      execSync(obsidianCmd, { stdio: 'ignore' });
    } catch (e) {
      log(`Failed to execute obsidian command: ${e.message}`);
    }
  }
} catch (err) {
  log(`Error: ${err.message}`);
}

// Always allow the tool to proceed
console.log(JSON.stringify({ decision: "allow" }));
process.exit(0);
