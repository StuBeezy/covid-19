const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        newsArticles: [News]! 
        headlines: [News]!
    }
    
    type News {
        author: String
        description: String
        image: String
        publishedAt: String
        title: String
        url: String
    }
    
`;

module.exports = typeDefs;