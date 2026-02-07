# Repository Guidelines

## Project Structure & Module Organization
- `index.html` contains the user-facing form.
- `assistent.js` handles form validation and character counting.
- `assistent.php` generates the `artikel.docx` file using PHPWord.
- `composer.json`/`composer.lock` declare PHP dependencies (PHPWord).
- Generated files: `artikel.docx` is created in the repo root when the form is submitted.

## Build, Test, and Development Commands
- `composer update`: install/update PHP dependencies (requires Composer and PHP).
- `php -S localhost:8000`: run a local PHP server from the repo root, then open `http://localhost:8000/index.html`.

## Coding Style & Naming Conventions
- Indentation: keep existing tab-based indentation in `assistent.php`, `assistent.js`, and `index.html`.
- JavaScript: prefer simple DOM APIs and short, imperative function names (e.g., `SetCat2Options`).
- PHP: keep input handling via `htmlspecialchars` and avoid introducing new global side effects.
- No formatter or linter is configured; keep changes minimal and consistent with surrounding code.

## Testing Guidelines
- No automated tests are configured.
- Manual checks before PR:
  1. Open the form and submit a valid article.
  2. Verify `artikel.docx` downloads and contains the expected sections.
  3. Confirm validation alerts for missing required fields.

## Commit & Pull Request Guidelines
- Commit messages are short and descriptive, typically in imperative or summary form (e.g., "Update README.md", "code cleanup").
- PRs should include:
  1. A brief summary of changes and why they were made.
  2. Manual test steps and results (or note if not applicable).
  3. Screenshots only when UI/UX changes are involved.

## Security & Configuration Tips
- This tool expects a PHP-enabled web server; do not expose it publicly without authentication.
- `artikel.docx` is written to the repo root. Clean up generated files if they contain sensitive content.
