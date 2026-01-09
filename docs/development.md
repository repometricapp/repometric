# Development Notes

## Project Structure

The project is a monorepo with a Next.js web application in the `apps/web` directory. The `src` directory contains the main application code, which is organized as follows:

-   `app`: Contains the pages of the application, following the Next.js App Router structure.
-   `components`: Contains the React components used in the application.
-   `hooks`: Contains the custom React hooks used in the application.
-   `lib`: Contains the utility functions, authentication logic, and configuration of the application.
-   `providers`: Contains the providers used in the application.

## Getting Started

To get started with the project, you need to have Node.js and npm installed on your machine. Then, you can follow these steps:

1.  Clone the repository and navigate to the `apps/web` directory.
2.  Install the dependencies by running `npm install`.
3.  Create a `.env.local` file in the `apps/web` directory and add the following environment variables:

    ```
    GITHUB_CLIENT_ID=<your_github_client_id>
    GITHUB_CLIENT_SECRET=<your_github_client_secret>
    ```

4.  Start the development server by running `npm run dev`.

## Logging and Error Handling

The application uses a centralized logger to log messages to the console. The logger is located in the `lib/logger.ts` file and provides three log levels: `info`, `warn`, and `error`.

Error handling is done using a combination of `try...catch` blocks and the `error.tsx` file in the `app/dashboard` directory. The `error.tsx` file is a special Next.js file that is rendered whenever an error occurs in the `Dashboard` page.
