const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

//连接到mlab数据库
mongoose.connect('mongodb://test:test123@ds147723.mlab.com:47723/graphql-demo', {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mlab');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('now listen on port 4000');
});
