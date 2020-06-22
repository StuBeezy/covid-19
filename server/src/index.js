const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const NewsAPI = require('./ds/news');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        newsAPI: new NewsAPI()
    }),
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
        schemaTag: 'development',
        debugPrintReports: true,
    }
});

const app = express();
server.applyMiddleware({ app });
// use server.applyMiddleware({app, path: '/SOME_PATH_NAME'}) if you want
// to use your own custom url
// server.listen().then(({ url }) => (
//     console.log(`🚀 Server ready at ${url}`)
// ));
app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

