# MarktPaper

### Description
A small marketplace application with NodeJS, Express, GraphQL, Apollo and React, where you can advert and sell books.

### How it works
On the backend side we have a NodeJS server with Express and MongoDB instance, on the frontend we have an ReactJS application. Everything is connected with GraphQL query language powered by Apollo. By defining schemas, we can manage the data which is operating between the server side with Mongo database and frontend with ReactJS.

### Technologies used in project
* NodeJS
* Express
* MongoDB
* Mongoose
* Nodemon
* ReactJS
* GraphQL
* Apollo (`react-apollo` and `apollo-boost`)

### How to set up the project
First of all, open the `server` folder and go to the `index.js` file, where you have `mongoURI` variable and type your MongoDB path. You can create a MongoDB locally or create it with [mLab](https://mlab.com/). 

When you create the database, open `server` folder and type in the `cmd`:
`npm install` then `npm start`
After that, open `client` folder and type in the `cmd`:
`npm install` then `npm start`

Open your browser and navigate to `localhost:3000`.
