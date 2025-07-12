# Blog CRUD API: A Node.js and Express Project for Interns 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-FFCA28?style=flat&logo=multer&logoColor=black) ![Nodemailer](https://img.shields.io/badge/Nodemailer-3E2A2A?style=flat&logo=nodemailer&logoColor=white) ![SendGrid](https://img.shields.io/badge/SendGrid-00B2A9?style=flat&logo=sendgrid&logoColor=white) ![UUID](https://img.shields.io/badge/UUID-5C6BC0?style=flat&logo=uuid&logoColor=white)

## Overview

Welcome to the Blog CRUD API repository. This project is built with Node.js and Express as part of my internship tasks. It demonstrates how to create a simple blog application with full CRUD (Create, Read, Update, Delete) functionality. The API allows users to manage blog posts, authenticate with JWT, and handle file uploads.

## Features

- **CRUD Operations**: Create, read, update, and delete blog posts.
- **JWT Authentication**: Secure endpoints using JSON Web Tokens.
- **File Uploads**: Use Multer for handling file uploads.
- **Email Notifications**: Send emails using Nodemailer and SendGrid.
- **Unique Identifiers**: Generate unique IDs for each blog post using UUID.

## Getting Started

To get started with this project, you can download the latest release from the [Releases section](https://github.com/yonatronic/blog-crud-api/releases). 

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yonatronic/blog-crud-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blog-crud-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables. Here’s an example:

   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST /api/auth/login**: Log in and receive a JWT token.
- **POST /api/auth/register**: Register a new user.

### Blog Posts

- **GET /api/posts**: Retrieve all blog posts.
- **GET /api/posts/:id**: Retrieve a single blog post by ID.
- **POST /api/posts**: Create a new blog post.
- **PUT /api/posts/:id**: Update an existing blog post by ID.
- **DELETE /api/posts/:id**: Delete a blog post by ID.

### File Uploads

- **POST /api/posts/upload**: Upload images associated with blog posts.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js.
- **JWT**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Multer**: A middleware for handling `multipart/form-data`, primarily used for uploading files.
- **Nodemailer**: A module for Node.js applications to allow easy email sending.
- **SendGrid**: A cloud-based email delivery service.
- **UUID**: A library for generating unique identifiers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## Acknowledgments

I would like to thank my internship mentor for their guidance and support throughout this project. 

## Visit the Releases Section

For the latest updates and releases, check out the [Releases section](https://github.com/yonatronic/blog-crud-api/releases). 

Feel free to explore the code and make it your own!