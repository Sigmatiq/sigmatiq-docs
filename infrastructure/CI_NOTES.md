# CI Notes — Sigmatiq Infrastructure

This repository includes a minimal CI workflow to validate infrastructure changes and optionally run Azure What-If with OIDC.

## Workflow

Path: `.github/workflows/ci.yml`

Jobs:
- `lint-changed` (PR only): builds only changed `.bicep` files for faster feedback.
- `lint`: builds all `.bicep` files and runs `shellcheck` on scripts.
- `whatif` (optional): runs `az deployment group what-if` against a specified resource group using OIDC.

## OIDC Setup for What-If (optional)

Required repo secrets:
- `AZURE_CLIENT_ID` — App registration client ID
- `AZURE_TENANT_ID` — Entra ID tenant ID
- `AZURE_SUBSCRIPTION_ID` — Subscription ID
- `WHATIF_RESOURCE_GROUP` — RG to target for what-if

The workflow uses a local composite action for OIDC login:
- `.github/actions/azure-oidc-login/action.yml`

Minimal permissions in the workflow:
- `id-token: write` and `contents: read`

## Branch Protection Recommendations

- Require the `lint` job to pass before merging to `main`.
- Optionally require `whatif` for directories affecting prod (e.g., under `bicep/main/06*` and `07*`).
- Enforce PR reviews and disallow direct pushes to `main` (pre-push hook already blocks local pushes).

## Local Validation

Before pushing:
```bash
# Build Bicep
find bicep -type f -name '*.bicep' -print0 | xargs -0 -n1 az bicep build --file

# Shellcheck
shellcheck -S style scripts/*.sh
```

