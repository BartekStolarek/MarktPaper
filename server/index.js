const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

//Connect to mlab database
const mongoURI = '';

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});