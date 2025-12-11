# londongov-playwright-framework (JavaScript) — README

This repository contains a JavaScript-based automation testing framework using Playwright. The setup is lightweight, scalable, easy to extend, and includes instructions for installation, execution, framework structure, and reporting.

📌 1. Prerequisites

            Make sure the following are installed on your machine:

            Node.js (v16+) → https://nodejs.org/

            npm (bundled with Node)

        Verify installation:
            node -v
            npm -v

    2. Project Setup (Download Playwright & Install Dependencies)

        When running the project for the first time, install all dependencies:

            npm install

        Then install the required browsers for Playwright:

            npx playwright install

        or install all dependencies + browser dependencies:

            npx playwright install --with-deps

            This will download:
                Chromium
                WebKit
                Firefox

    3. Folder Structure

        project-root/
        ├─ tests/
        │ └─ logv.search.spec.js
        ├─ src/
        │ └─ pages/ 
            └─ SearchResultsPagejs
        │   └─ TalkLondonPagejs
        ├─ utils/
        │ └─ cookies.js
        ├─ playwright-report/
        ├─ package.json
        ├─ playwright.config.js
        └─ README.md