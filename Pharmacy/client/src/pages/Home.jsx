import React from 'react';
import WeatherComponent from '../components/WeatherComponent';
import NewsComponent from '../components/NewsComponent';
import '../styles/App.css'
import banner from '../images/banner.png'
import Block from '../components/UI/Block/Block';

const Home = () => {
    return (
        <div class="page">

            <div className="banner-container">

                <div className="banner">
                    <a href="https://baldursgate.fandom.com/ru/wiki/Baldur%27s_Gate_III" target="_blank">
                        <img className="banner-image" src={banner} alt="Banner" />
                    </a>
                </div>
            </div>

            <Block>
                <WeatherComponent />
            </Block>

            <Block>
                <NewsComponent />
            </Block>

        </div>
    );
};

export default Home;
