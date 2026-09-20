import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

describe('CSS Bundle Isolation & Side Effects', () => {
  test('dist/index.css contains no un-scoped global selectors or Tailwind preflight resets', () => {
    const cssPath = path.resolve(__dirname, '../../dist/index.css');
    expect(fs.existsSync(cssPath)).toBe(true);

    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Extract selector lines outside @keyframes blocks
    const selectors = cssContent
      .split('{')
      .map((block, idx, arr) => {
        if (idx === 0) return block.trim();
        const prevBlock = arr[idx - 1];
        const lastBrace = prevBlock.lastIndexOf('}');
        return (lastBrace !== -1 ? prevBlock.slice(lastBrace + 1) : prevBlock).trim();
      })
      .filter(s => {
        if (!s) return false;
        if (s.startsWith('@') || s === 'from' || s === 'to' || s.endsWith('%')) return false;
        return true;
      });

    for (const selector of selectors) {
      // Every selector must be scoped under .rmdp or contain .rmdp
      expect(selector).toContain('.rmdp');
    }

    // Ensures no global Tailwind preflight resets or tailwind utilities are emitted
    expect(cssContent).not.toContain('@property');
    expect(cssContent).not.toContain('.container {');
    expect(cssContent).not.toContain('.flex {');
    expect(cssContent).not.toContain('.grid {');
  });
});
