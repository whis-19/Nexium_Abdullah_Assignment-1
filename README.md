# Quote Generator Web Application

This is a simple Quote Generator web application built with Next.js and ShadCN UI. The application allows users to enter a topic and displays three quotes related to that topic from a local data source.

## Features

- Enter a topic to generate quotes.
- Displays three quotes related to the entered topic.
- Built with Next.js for server-side rendering and static site generation.
- Styled using ShadCN UI components.

## Project Structure

```
quote-generator-app
├── src
│   ├── app
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components
│   │   ├── QuoteForm.tsx
│   │   └── QuoteList.tsx
│   ├── data
│   │   └── quotes.ts
│   └── styles
│       └── globals.css
├── public
│   └── favicon.ico
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/whis-19/nexium_abdullah_assignment-1.git
   cd nexium_abdullah_assignment-1.git
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

This application can be deployed to Vercel. Simply connect your GitHub repository to Vercel, and it will automatically deploy your application.

## Usage

1. Enter a topic in the input field.
2. Click the submit button to generate quotes.
3. View the displayed quotes related to the entered topic.
