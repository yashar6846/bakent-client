const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const MakaleModel = require("./models/MakaleModel");

const DB_URI =
  "mongodb+srv://ginas:ginas123@projectdata.zcdnt.mongodb.net/ProjectDeta?retryWrites=true&w=majority";

const typeDefs = gql`
  type Makale {
    id: ID!
    baslik: String!
    icerik: String!
  }
  type Query {
    makalelerGetir: [Makale]!
  }
`;

const resolvers = {
  Query: {
    async makalelerGetir() {
      const makaleler = await MakaleModel.find();
      return makaleler;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb  basarli");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server ${res.url} adres calisyor`);
  });
