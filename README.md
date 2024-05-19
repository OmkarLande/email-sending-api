# User List Management and Email Sending API

## Objective

This project aims to develop a RESTful API for managing user lists with customizable properties and sending personalized emails to users.

## Postman Documentation
 [Documenion](https://documenter.getpostman.com/view/26807468/2sA3QmCuEY)

## Requirements

1. **List Creation**: Admin can create lists with titles and custom properties.
2. **User Addition**: Admin can add users to lists via CSV upload.
3. **CSV Format**: The CSV's first row contains header values. 'name' and 'email' are required fields for a user, and custom properties can be defined.
4. **Unique Emails**: Users with the same email cannot be added to a list.
5. **Error Handling**: Detailed error messages are provided for failed user additions.
6. **Get Users by List ID**: Admin can retrieve all users belonging to a specific list.
7. **Send Email to List**: Admin can send personalized emails to all users in a list.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer (for email sending)
- Multer (for file upload handling)
- CSV Parser (for parsing CSV files)

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set environment variables:

    ```bash
    MAIL_HOST=smtp.gmail.com
    MAIL_USER=your-email@gmail.com
    MAIL_PASS=your-email-password
    DB_URL= mongodb-url
    ```

4. Start the server: `npm start`
5. Use the API endpoints to manage user lists and send emails.

## API Endpoints

- `POST /lists`: Create a new list with custom properties.
- `POST /users/upload/:listId`: Upload users to a list via CSV file.
- `GET /users/:listId`: Get all users belonging to a specific list.
- `POST /lists/:listId/send-email`: Send personalized emails to all users in a list.

## Folder Structure

Sure, here's a template for your README.md file:

markdown
Copy code
# User List Management and Email Sending API

## Objective

This project aims to develop a RESTful API for managing user lists with customizable properties and sending personalized emails to users.

## Requirements

1. **List Creation**: Admin can create lists with titles and custom properties.
2. **User Addition**: Admin can add users to lists via CSV upload.
3. **CSV Format**: The CSV's first row contains header values. 'name' and 'email' are required fields for a user, and custom properties can be defined.
4. **Unique Emails**: Users with the same email cannot be added to a list.
5. **Error Handling**: Detailed error messages are provided for failed user additions.
6. **Get Users by List ID**: Admin can retrieve all users belonging to a specific list.
7. **Send Email to List**: Admin can send personalized emails to all users in a list.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer (for email sending)
- Multer (for file upload handling)
- CSV Parser (for parsing CSV files)

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set environment variables:

    ```bash
    MAIL_HOST=smtp.gmail.com
    MAIL_USER=your-email@gmail.com
    MAIL_PASS=your-email-password
    ```

4. Start the server: `npm start`
5. Use the API endpoints to manage user lists and send emails.

## API Endpoints

- `POST /lists`: Create a new list with custom properties.
- `POST /lists/:listId/users/upload`: Upload users to a list via CSV file.
- `GET /lists/:listId/users`: Get all users belonging to a specific list.
- `POST /lists/:listId/send-email`: Send personalized emails to all users in a list.

## Folder Structure
```
    ├── controllers # Controllers for route handling
    ├── models # MongoDB models
    ├── routes # Route definitions
    ├── services # Services (e.g., email sending)
    ├── uploads # Uploaded CSV files
    └── README.md # Project documentation
```
