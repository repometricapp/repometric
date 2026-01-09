# Roadmap

## 🧩 Implementation Roadmap

### Task 1 – Project Initialization
- [x] Create GitHub repository
- [x] Define project structure (frontend/backend)
- [x] Initialize package managers
- [x] Setup environment variables
- [x] Create `.env.example`
- [x] Write initial README

---

### Task 2 – GitHub Authentication
- [x] Register GitHub OAuth application
- [x] Implement OAuth authorization flow
- [x] Securely store access tokens
- [x] Implement login UI
- [ ] Implement logout flow
- [x] Verify API access using `/user`

---

### Task 3 – Organization & Repository Discovery
- [x] Fetch organizations for authenticated user
- [ ] Organization selector UI
- [x] Fetch repositories for selected org
- [ ] Fetch for Privet repositories
- [x] Normalize repository data
- [x] Display repository list

---

### Task 4 – CI/CD Pipeline Monitoring
- [x] Fetch workflows per repository
- [x] Fetch workflow runs
- [x] Extract latest run status
- [x] Calculate execution duration
- [x] Calculate average runtime
- [x] Display pipeline status per repo

---

### Task 5 – Issues & Pull Requests Monitoring
- [x] Fetch open issues count
- [x] Exclude pull requests from issue count
- [x] Fetch open pull requests count
- [x] Display counts per repository
- [ ] Optional: highlight critical issues

---

### Task 6 – Dashboard Development
- [x] Create dashboard layout
- [x] Implement summary metric cards
- [x] Implement repository table
- [x] Add basic pipeline runtime chart
- [ ] Implement refresh / polling logic

---

### Task 7 – Error Handling & Stability
- [x] Handle GitHub API rate limits
- [ ] Implement retry and backoff
- [ ] Add caching layer (in-memory or Redis)
- [x] Improve loading states and error UI

---

### Task 8 – Data Persistence
- [ ] Design database schema
- [ ] Store repository metadata
- [ ] Store workflow run history
- [ ] Store computed metrics

---

### Task 9 – Performance Optimization
- [ ] Reduce redundant API calls
- [ ] Batch GitHub API requests
- [ ] Add background sync job
- [ ] Optimize dashboard load time

---

### Task 10 – Alerts (Basic)
- [x] Define critical conditions
- [x] Detect failed pipelines
- [x] Detect long-running pipelines
- [x] Display alerts in UI
- [ ] Optional: email or webhook alerts

---

### Task 11 – Repository Health Score
- [x] Define health score formula
- [x] Compute health score per repo
- [x] Display score indicator (green/yellow/red)
- [ ] Sort repositories by health score

---

### Task 12 – GitHub Webhooks (Optional)
- [ ] Register webhook events
- [ ] Handle workflow_run events
- [ ] Handle issue events
- [ ] Update metrics in near real-time

---

### Task 13 – Deployment
- [ ] Deploy backend service
- [ ] Deploy frontend application
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Verify production setup

---

### Task 14 – Final Polish & Documentation
- [x] UI cleanup and consistency
- [x] Codebase Refactoring
- [ ] Add screenshots to README
- [ ] Add architecture diagram
- [x] Add setup and usage documentation
- [ ] Prepare demo or sample data

---

##  Definition of Done
- [x] GitHub OAuth authentication works
- [x] Organization and repository selection works
- [x] CI/CD pipeline status and runtime visible
- [x] Issues and PR counts visible
- [x] Dashboard loads reliably
- [x] Errors and rate limits handled gracefully
- [x] App runs locally or is deployed with documentation

---

##  Post-MVP Ideas
- [ ] DORA metrics
- [ ] GitHub Actions cost estimation
- [ ] Slack / Discord alerts
- [ ] Team-based dashboards
- [ ] Role-based access control

##  Monitoring Data ideas
- [ ] GitHub Actions minutes consumed (total per org)
- [ ] GitHub Actions minutes consumed per repository
- [ ] GitHub Actions minutes consumed per workflow
- [ ] Daily / monthly Actions usage trend
- [ ] Cost estimation per repo
- [ ] Highest cost workflows
- [ ] Runner utilization (self-hosted)
