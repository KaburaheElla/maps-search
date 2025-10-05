# Google Maps Search Bar Automation Test

## Description

This project automates testing of the **Google Maps search bar** feature using **Playwright** and **Cucumber** with **TypeScript**.  

The main goal is to verify that:
- Users can search for locations and see results.
- Headline or suggestion panels correctly display the search term.
- Directions and destination fields work as expected.
- Edge cases and invalid searches are handled gracefully.

The project uses a **Page Object Model (POM)** structure for maintainability and easier test scalability.  

---

## Features Tested

### Happy Path
- Search for a valid location (e.g., "Paris", "London") and verify headline text.
- Click the **Directions** button and verify the destination field is populated.

### Unhappy Path
- Search for an invalid string (e.g., "asdfghjkl") and verify that no results are shown.

---

## Project Structure

```
project/
├── test/ 
|     └── features/             # Cucumber feature files
│       └── search.feature
|     └── steps/                # Step definitions
│       └── search.steps.ts
├── pages/                      # Page Object Models
│   └── GoogleMapsPage.ts
├── hooks/                 
│   └── pageFixture.ts          # Playwright fixture 
│   └── hooks.ts                # Playwright fixture 
├── package.json
├── tsconfig.json
└── README.md
```

---

## Requirements

- **Node.js >= 18** (tested with Node v22.14)
- **npm** (tested with Node v10.9.2)
- **Playwright** (installed via devDependencies)
- **Cucumber.js** (`@cucumber/cucumber`)
- **TypeScript** (`ts-node` for running TypeScript tests)

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:
   
```bash
npm install
```

---

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests by tag

```bash
npm test -- --tags @invalidSearch
npm run test:invalidSearch
```

---

## Optional Enhancements

- Generate HTML reports for test results.
- Capture screenshots of failed tests automatically.

## TODO

- Add accessibility and performance testing.
