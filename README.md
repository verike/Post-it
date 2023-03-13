# Post-it

PostIt is a simple social media app build with NodeJs. PostIt allows you to post anything from text, images, video, and/or audio on a single post-it page.

PostIt is live on [Render](https://post-it-ybxq.onrender.com)

## PostIt API

This is a RESTful API built with [Node.js](https://nodejs.org/en/), and MongoDB for managing posts and comment on the social space. The API allows users to perform various actions, such as creating, updating, deleting posts, and viewing all posts by a particular user, including the comments by a particular user.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Entity Relationship Diagram (ERD)

Check out the database model designed with 👉 [DBDesigner](https://dbdesigner.page.link/xrK5L6r4A8dNhWv6A)

Getting Started Locally
To use this API, you will need to have Node.js and MongoDB installed on your computer. Then, follow these steps:

1. Run `git clone https://github.com/verike/Post-it.git` to clone the repository to your local machine.

2. Run `cd Post-It` to navigate to the cloned repository directory.
3. Install the required dependencies:

4. Run `npm ci` to install the required dependencies.
   npm start

5. Run `npm start` to start the server.
   The server will start running at http://localhost:3500. You can now use this API to perform various actions.

## Hosted Link:
  https://post-it-ybxq.onrender.com
  
## API Endpoints Documantation

This API endpoints can be found on the postman documentation :

https://post-it-ybxq.onrender.com/api/v1/docs    


  Note that the email and password fields are required for the login using POST link just as provided https://post-it-ybxq.onrender.com/api/v1/users/signin . You'll be provided with a token when you input the correct email and password.

  Also note that the token provided on login will be used carry out other functionalities like creation of posts, comments, deleting, editing etc... if you are a logged in user.