# Pristine [MERN Stack]

Pristine is a modern and intuitive real estate web application designed to make property listings and management easier. It allows users to browse, search, and manage real estate properties, whether for property selling or rental services. The platform features interactive maps, advanced filters, and user authentication, making it accessible for both property sellers/renters and buyers.

## Features

- 🔒 **User Authentication**: Secure login and registration for users, including property owners and prospective buyers.
- 🏠 **Property Listings**: Browse through a list of available properties with images, pricing, and descriptions.
- 🔍 **Advanced Search**: Search and filter properties by location, price, type, and other criteria.
- 🗺️ **Interactive Maps**: View property locations on an interactive map with Leaflet integration.
- 📋 **Property Management**: Admins can add, edit, and delete property listings with an easy-to-use dashboard.
- ❤️ **Favorites**: Save properties to a list of favorites for quick reference later.
- 📱 **Responsive Design**: The website is fully responsive and works seamlessly across desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript, SASS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **ORM**: Prisma
- **Image Upload**: Cloudinary
- **Maps Integration**: Leaflet

## Installation

- To set up this project locally, follow the steps below:

### Step 1: Clone the Repository

```bash
    git clone https://github.com/SupratitDatta/Pristine.git
    cd pristine
```

### Step 2: Install Dependencies
```bash
    cd client
    npm install
```
```bash
    cd ../server
    npm install
```

### Step 3: Set Up the Database and Environment Variables

- Create a .env file with proper database url and database name

### Step 4: Prisma Setup

```bash
    npx prisma migrate dev
    npx prisma generate --schema ./src/prisma/schema.prisma
```

### Step 6: Start the Application

- Start the client and server by
```bash
npm run dev
npm start
```
- Visit http://localhost:5173 to view the Site

## License & Contact

- This project is created by Supratit Datta in, 2024 All rights reserved.
- Email ID - supratitdatta@gmail.com