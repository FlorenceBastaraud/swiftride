# SwiftRide - E-commerce Website

Welcome to **SwiftRide**, your one-stop shop for rollers, skateboards, bikes, and all the equipment you need to ride in style and safety!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User-friendly interface for seamless navigation
- Product listings with detailed descriptions, images, and prices
- Shop page with product filters to sort and refine products by categories, price range, and other attributes, along with pagination for easy browsing
- Shopping cart functionality for adding and reviewing items before checkout
- Admin panel for managing products, orders, client emails, messages, and updating static content (powered by Strapi)
- Responsive design ensuring a seamless experience on both mobile and desktop devices
- Stripe Checkout integration for secure and efficient payment processing

## Technologies Used

- **Next.js**: A React framework for server-rendered applications
- **Tailwind CSS**: A utility-first CSS framework for styling
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, offering static typing and enhanced code reliability
- **Strapi**: A headless CMS for managing content and APIs
- **Stripe**: A powerful payment processing platform for online transactions

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/FlorenceBastaraud/swiftride.git
   cd swiftride
   ```

2. Set up Strapi:

   Navigate to the Strapi folder:

   ```bash
   cd strapi
   npm install
   npm run develop
   ```

3. Navigate to the Next.js project:

   ```bash
   cd ..
   cd frontend
   ```

4. Install the dependencies:

   ```bash
   npm i
   ```

5. Start the Next.js development server:

   ```bash
   npm run dev
   ```

6. Visit [http://localhost:3000](http://localhost:3000) in your browser to view the website.

7. Go to [http://localhost:1337](http://localhost:1337) to update content from Strapi.

   **Note:** The Strapi instance will not include pre-populated content. You need to manually add or import your own content through the Strapi admin panel.

## Usage

This project is intended for personal use and testing only. It is a demonstration project.

**Important:** The content in the Strapi instance will not match the demo website unless you manually add it. Refer to the Strapi admin panel at [http://localhost:1337](http://localhost:1337) to add or manage content.

The products are not real, and the payments are simulated. Commercial use is not permitted. If you wish to use this project for commercial purposes, please contact me for further information at [fbastaraud@yahoo.fr](mailto:fbastaraud@yahoo.fr).
