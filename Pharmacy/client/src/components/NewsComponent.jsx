import React, { Component } from 'react';
import axios from 'axios';

class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };

        this.fetchNews();
    }

    fetchNews = async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: 'ru',
                    apiKey: '8c41bbbc22144f9ba156f765d9c0d67c', // Замените на свой ключ API
                },
            });
            const newArticles = response.data.articles;
            this.setState({ news: newArticles });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    render() {
        const { news } = this.state;
        const firstFiveNews = news.slice(0, 5); // Получаем подмассив из первых 5 новостей

        return (
            <div style={{margin: "10px 0"}}>
                <h2 style={{fontWeight: "bold"}}>Fresh News</h2>
                <br/>
                {firstFiveNews.length > 0 ? (
                    <ul>
                        {firstFiveNews.map((article, index) => (
                            <li key={index}>{article.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No news available</p>
                )}
            </div>
        );
    }
}


export default NewsComponent;
