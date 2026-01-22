Backend setup for a video sharing platform.

## Description

This project is a Node.js and Express-based backend for a video-sharing application. It includes user authentication, video management, and other features. The project is structured with a clear separation of concerns, including routes, controllers, models, and middleware. It uses MongoDB as the database with Mongoose for object data modeling.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm
- MongoDB

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/Akshansh-Chugh/Backend_practice.git
    ```
2.  Navigate to the project directory:

3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URL=<your-mongodb-connection-string>
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=<your-access-token-secret>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ```

### Running the Application

To run the application in development mode with live reloading, use the following command:

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## Scripts

-   `test`:  `echo "Error: no test specified" && exit 1`
-   `dev`:  `nodemon src/index.js`
-   `git`:  `git add . && git commit -m \ `

## Dependencies

-   `bcrypt`: For hashing passwords.
-   `cloudinary`: For managing and serving media files.
-   `cookie-parser`: For parsing cookies.
-   `cors`: For enabling Cross-Origin Resource Sharing.
-   `dotenv`: For managing environment variables.
-   `express`: Web framework for Node.js.
-   `jsonwebtoken`: For generating JSON Web Tokens (JWT).
-   `mongoose`: MongoDB object modeling tool.
-   `mongoose-aggregate-paginate-v2`: For pagination with Mongoose aggregation.
-   `multer`: Middleware for handling `multipart/form-data`.

## Dev Dependencies

-   `nodemon`: For automatically restarting the server on file changes.
-   `prettier`: For code formatting.

## Project Structure

```
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package-lock.json
├── package.json
└── src/
    ├── app.js
    ├── constants.js
    ├── index.js
    ├── controllers/
    │   ├── user.controller.js
    │   └── video.controller.js
    ├── db/
    │   └── index.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── multer.js
    ├── models/
    │   ├── comment.models.js
    │   ├── dislike.models.js
    │   ├── like.models.js
    │   ├── playlist.models.js
    │   ├── subscription.models.js
    │   ├── tweet.models.js
    │   ├── user.models.js
    │   └── video.models.js
    ├── public/
    │   └── temp/
    ├── routes/
    │   ├── user.routes.js
    │   └── video.routes.js
    └── utils/
        ├── apiErrors.js
        ├── apiResponse.js
        ├── asyncHandler.js
        └── cloudinary.js
```

## API Endpoints

### User Routes (`/api/v1/user`)

-   **POST** `/register`: Register a new user.
-   **POST** `/login`: Login an existing user.
-   **POST** `/logout`: Logout a user.
-   **POST** `/refreshToken`: Refresh the access token.
-   **POST** `/changePassword`: Change the user's password.
-   **POST** `/getCurrentUser`: Get the current user's details.
-   **POST** `/update`: Update the user's account details.
-   **POST** `/avatar`: Update the user's avatar.
-   **POST** `/updateprofilePic`: Update the user's cover image..
-   **POST** `/getWatchHistory`: Get the user's watch history.

### Video Routes (`/api/v1/video`)

-   **POST** `/upload`: Upload a new video.
-   **POST** `/publish`: Get a video by its ID.
-   **POST** `/update:`: Update a video's details.
-   **POST** `/delete`: Delete a video.
-   **POST** `/getDetails`: Toggle the publish status of a video.

## Models

The application uses the following Mongoose models:

-   `User`: Stores user information.
-   `Video`: Stores video information.
-   `Subscription`: Stores subscription information.
-   `Like`: Stores like information for videos, comments, and tweets.
-   `Dislike`: Stores dislike information.
- of videos, comments, and tweets.
-   `Comment`: Stores comments on videos.
-   `Tweet`: Stores tweets.
-   `Playlist`: Stores user-created playlists.

---