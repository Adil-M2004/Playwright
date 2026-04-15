# TODO: Fix ts-node smoke tests runner

## Steps to complete:

1. ✅ [DONE] Create this TODO.md to track progress.

2. ✅ [DONE] Update src/index.ts:
   - Import child_process.execSync.
   - Fix typo 'regresssion' → 'regression'.
   - Validate profile argument.
   - Replace console.log(command) with execSync(command, { stdio: 'inherit' }).

3. ✅ [DONE] Update package.json:
   - Add npm scripts: \"smoke\": \"npx ts-node src/index.ts smoke\", similarly for regression, login, admin, deletion.
   - Adjust cucumberWithTS to point to smoke.

4. ✅ [DONE] Test setup complete.

To verify:
- Run `npm run precucumber && npm run smoke`
- Now `npx ts-node src/index.ts smoke` or `npm run smoke` will execute cucumber smoke tests (no more just printing).

Task complete.
