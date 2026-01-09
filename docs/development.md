# Development Notes

## Admin UI scope
The admin dashboard surfaces the roadmap metrics in a single view:
- Repository health status and recent activity.
- CI/CD pipeline runtime and success rate.
- Issue and pull request backlog counts.
- Alerts for failures, stale repos, and cost signals.

## Layout checklist
- Header with organization context and time window.
- Summary metric cards for health, pipelines, and activity.
- Repository health table with per-repo signals.
- Pipeline runtime chart and live alerts panel.

## Mock data policy
Until the GitHub APIs are wired, the dashboard uses static sample data so UI
structure can be validated and iterated quickly.
