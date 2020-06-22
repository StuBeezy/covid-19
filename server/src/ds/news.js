const { RESTDataSource } = require('apollo-datasource-rest');
const _ = require('lodash');
const { newsApiKey } = require('../apiKeys');

function formatArticle(article) {
    return {
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt
    };
}
class NewsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://newsapi.org/v2/';
        this.apiKey = newsApiKey;
    }

    async getCovidTopHeadlines() {
        const response = await this.get('/top-headlines', {
            apiKey: this.apiKey,
            q: 'COVID',
            country: 'us',
            page: 1,
            pageSize: 10
        });

        if (_.isEqual(response.status, 'error')) {
            throw new Error(
                `Status code: ${response.code} 
                message: ${response.message}`
            );
        }

        const sortedArticles = _.sortBy(response.articles, 'publishedAt').reverse();

        return {
            topHeadlines: sortedArticles.map(formatArticle)
        }

    }

    async getCovidNews() {
        const response = await this.get('/everything', {
            apiKey: this.apiKey,
            q: 'COVID',
            language: 'en',
            pageSize: 10,
            page: 1
        });

        if (_.isEqual(response.status, 'error')) {
            throw new Error(
                `Status code: ${response.code} 
                message: ${response.message}`
            );
        }

        const sortedArticles = _.sortBy(response.articles, 'publishedAt').reverse();
        return {
            newsArticles: sortedArticles.map(formatArticle)
        };
    }
}

module.exports = NewsAPI;
