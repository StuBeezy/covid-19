module.exports = {
    Query: {
        newsArticles: async (_, { args }, { dataSources }) => {
            const response = await dataSources.newsAPI.getCovidNews();
            return response.newsArticles;
        },
        headlines: async (_, { args }, { dataSources }) => {
            const response = await dataSources.newsAPI.getCovidTopHeadlines();
            return response.topHeadlines;
        }
    }
};
