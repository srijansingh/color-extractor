# Color Extractor App

The Color Extractor App is a web application that allows users to search for images related to a keyword and extracts the dominant colors from those images. It utilizes the Bing Image Search API to fetch images and the node-vibrant library to extract colors.

## Technology Used
- **Webpack** to setup development and build prod ready code.
- **Scss** and **Bootstrap** for styling
- **Javascript**
- **Bing Image Search API** to fetch images
- **Node-vibrant** library to extract colors.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Development Environment](#development-environment)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [How it Works](#how-it-works)
- [Deployed App](#deployed-app)

## Getting Started

### Prerequisites

1. Nvm and npm installed on your machine.
2. Bing Image Search API key.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/srijansingh/color-extractor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd color-extractor
   ```

3. Create a `.env` file by copying `.env.example` and fill in the appropriate values:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and replace `AZURE_API_KEY` with your actual Bing Image Search API key.

## Development Environment

1. Setup the node environment:

   ```bash
   nvm use
   ```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

4. Open your browser and visit `http://localhost:3000` to view the app.

## Production Build

1. Run the build command:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your production server.

## Project Structure

```
color-extractor/
│
├── src/
│   │ 
│   ├── styles/
│   │   └── styles.scss
│   │ 
│   ├── js/
│   │   ├── imageColorExtractor.js
│   │   ├── main.js
│   │   └── vibrant.min.js
│   │ 
│   ├── index.html
│   └── index.js
│
├── .env.example
├── .gitignore
├── .nvmrc
├── package.json
├── package.lock.json
├── README.md
└── webpack.config.js
```

## How it Works

1. Enter a search term in the input field and click the search button.
2. The app fetches images related to the search term using the Bing Image Search API.
3. For each image, it extracts the dominant colors using the node-vibrant library.
4. The extracted colors are displayed as color blocks in the app interface.

## Deployed App

The Color Extractor App is deployed at [Color Extract App](https://color-extract.netlify.app/).
