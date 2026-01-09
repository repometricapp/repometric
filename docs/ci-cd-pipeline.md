# CI/CD Release Pipeline

This document explains the automated release pipeline set up for the Repometric project.

## Overview

We have two GitHub Actions workflows that work together to create automatic releases when pull requests are merged into the `main` branch:

1. **auto-release.yml** - Creates GitHub releases automatically
2. **bump-version.yml** - Bumps the version in package.json files

## How It Works

### 1. Auto Release Workflow (`auto-release.yml`)

**Trigger:** When a PR is merged into `main`

**What it does:**
- Extracts the current version from `apps/web/package.json`
- Creates a GitHub Release with tag `v{version}`
- Includes PR details and changelog in the release notes
- Attaches LICENSE and README.md files to the release

**Example:**
- PR #5 is merged with version `0.1.0`
- Release `v0.1.0` is automatically created on GitHub

### 2. Version Bump Workflow (`bump-version.yml`)

**Trigger:** When a PR is merged into `main`

**What it does:**
- Analyzes the PR title to determine version bump type:
  - `MAJOR` in title → bumps major version (0.1.0 → 1.0.0)
  - `MINOR` or `feat` in title → bumps minor version (0.1.0 → 0.2.0)
  - Default → bumps patch version (0.1.0 → 0.1.1)
- Updates `apps/web/package.json` with new version
- Commits and pushes the version bump back to `main`

## Version Bump Conventions

To control which version number gets bumped, include keywords in your PR title:

| PR Title | Result |
|----------|--------|
| `feat: add new feature` | Minor bump (0.1.0 → 0.2.0) |
| `feat!: breaking change` or `MAJOR: ...` | Major bump (0.1.0 → 1.0.0) |
| `fix: bug fix` or `docs: update` | Patch bump (0.1.0 → 0.1.1) |

## Setup Requirements

### GitHub Permissions

The workflows use `secrets.GITHUB_TOKEN` which is automatically provided by GitHub Actions. Ensure your repository has:

- ✅ Actions enabled
- ✅ Read and write permissions for workflows (Settings → Actions → General)

### Manual Configuration (Optional)

If you need custom release behavior, edit the `.github/workflows/auto-release.yml` file:

```yaml
- name: Create Release
  uses: softprops/action-gh-release@v1
  with:
    files: |
      LICENSE
      README.md
    # Add more files to include in releases if needed
```

## Workflow Files

- `.github/workflows/auto-release.yml` - Creates releases
- `.github/workflows/bump-version.yml` - Updates version numbers

## Testing the Pipeline

1. Create a feature branch: `git checkout -b feat/test-release`
2. Make a change to the code
3. Commit: `git commit -m "feat: test release pipeline"`
4. Create a PR and merge it into `main`
5. Check the "Actions" tab on GitHub to see the workflows running
6. Check the "Releases" tab to see the new release

## Troubleshooting

### Workflow not triggering?
- Ensure the PR is merged (not just closed)
- Check that it's merged into `main` branch
- Verify GitHub Actions are enabled in repository settings

### Version bump not working?
- Check that git user is configured in the workflow
- Ensure `GITHUB_TOKEN` has write access
- Review workflow logs in Actions tab

### Release not created?
- Check that `softprops/action-gh-release@v1` has access
- Verify the version in `package.json` is valid semver format
- Review workflow logs for detailed error messages

## Future Enhancements

Possible improvements to the pipeline:

- [ ] Automatic changelog generation from commit messages
- [ ] Integration with conventional commits
- [ ] Publishing to npm registry
- [ ] Automated testing before release
- [ ] Slack/Discord notifications for releases
- [ ] Multi-package version management (monorepo)
- [ ] Docker image building and pushing

## Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [Semantic Versioning](https://semver.org/)
