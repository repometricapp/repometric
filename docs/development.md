# RepoMetric Development Guide

Welcome to the RepoMetric development guide. This document provides instructions for setting up your development environment, an overview of the codebase, and guidance on contributing to the project.

## Project Overview

RepoMetric is a web application that turns GitHub signals into actionable decisions. It tracks pipeline performance, repository health, and engineering momentum through a unified dashboard.

### Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: GitHub OAuth

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Environment Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/repometric.git
    cd repometric
    ```

2.  **Install dependencies:**

    Navigate to the `apps/web` directory and install the required packages.

    ```bash
    cd apps/web
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the `apps/web` directory by copying the example file.

    ```bash
    cp .env.example .env.local
    ```

    Update `.env.local` with your GitHub OAuth application credentials. You can create a new OAuth app in your GitHub developer settings.

    - `GITHUB_CLIENT_ID`: Your GitHub App's Client ID.
    - `GITHUB_CLIENT_SECRET`: Your GitHub App's Client Secret.

    For the authorization callback URL, use `http://localhost:3000/api/auth/callback`.

### Running the Application

Once your environment is set up, you can start the development server.

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Codebase Structure

The codebase is organized into the following directories:

-   `apps/web`: The main Next.js application.
    -   `src/app`: The application's pages and API routes.
        -   `pages`: The main pages of the application.
        -   `api`: The API routes, including authentication.
    -   `src/components`: Reusable components used throughout the application.
    -   `src/lib`: Core logic, including authentication and utilities.
-   `docs`: Project documentation.

## Authentication Flow

Authentication is handled via GitHub OAuth. The flow is as follows:

1.  The user clicks the "Continue with GitHub" button, which navigates to `/api/auth/login`.
2.  The `login` route constructs the GitHub authorization URL and redirects the user.
3.  After authorizing the application, the user is redirected to `/api/auth/callback`.
4.  The `callback` route exchanges the authorization code for an access token and sets it as an `httpOnly` cookie.
5.  The user is then redirected to the `/demo` page.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes and push them to your fork.
4.  Open a pull request with a detailed description of your changes.
