# Roadmap


## 🧩 Implementation Roadmap

### Task 1 – Project Initialization
- [x] Create GitHub repository
- [ ] Define project structure (frontend/backend)
- [ ] Initialize package managers
- [ ] Setup environment variables
- [ ] Create `.env.example`
- [ ] Write initial README

---

### Task 2 – GitHub Authentication
- [ ] Register GitHub OAuth application
- [ ] Implement OAuth authorization flow
- [ ] Securely store access tokens
- [ ] Implement login UI
- [ ] Implement logout flow
- [ ] Verify API access using `/user`

---

### Task 3 – Organization & Repository Discovery
- [ ] Fetch organizations for authenticated user
- [ ] Organization selector UI
- [ ] Fetch repositories for selected org
- [ ] Fetch for Privet repositories 
- [ ] Normalize repository data
- [ ] Display repository list

---

### Task 4 – CI/CD Pipeline Monitoring
- [ ] Fetch workflows per repository
- [ ] Fetch workflow runs
- [ ] Extract latest run status
- [ ] Calculate execution duration
- [ ] Calculate average runtime
- [ ] Display pipeline status per repo

---

### Task 5 – Issues & Pull Requests Monitoring
- [ ] Fetch open issues count
- [ ] Exclude pull requests from issue count
- [ ] Fetch open pull requests count
- [ ] Display counts per repository
- [ ] Optional: highlight critical issues

---

### Task 6 – Dashboard Development
- [ ] Create dashboard layout
- [ ] Implement summary metric cards
- [ ] Implement repository table
- [ ] Add basic pipeline runtime chart
- [ ] Implement refresh / polling logic

---

### Task 7 – Error Handling & Stability
- [ ] Handle GitHub API rate limits
- [ ] Implement retry and backoff
- [ ] Add caching layer (in-memory or Redis)
- [ ] Improve loading states and error UI

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
- [ ] Define critical conditions
- [ ] Detect failed pipelines
- [ ] Detect long-running pipelines
- [ ] Display alerts in UI
- [ ] Optional: email or webhook alerts

---

### Task 11 – Repository Health Score
- [ ] Define health score formula
- [ ] Compute health score per repo
- [ ] Display score indicator (green/yellow/red)
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
- [ ] UI cleanup and consistency
- [ ] Add screenshots to README
- [ ] Add architecture diagram
- [ ] Add setup and usage documentation
- [ ] Prepare demo or sample data

---

##  Definition of Done
- [ ] GitHub OAuth authentication works
- [ ] Organization and repository selection works
- [ ] CI/CD pipeline status and runtime visible
- [ ] Issues and PR counts visible
- [ ] Dashboard loads reliably
- [ ] Errors and rate limits handled gracefully
- [ ] App runs locally or is deployed with documentation

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