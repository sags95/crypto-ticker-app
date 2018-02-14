import React, { Component} from 'react';
import Crypto from './Crypto';
import axios from 'axios';
import './Tickers.css';

export default class Tickers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: "bitcoin",
                    name: "Bitcoin",
                    symbol: "BTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "ethereum",
                    name: "Ethereum",
                    symbol: "ETH",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "litecoin",
                    name: "Litecoin",
                    symbol: "LTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }
            ]
        };
    }

    render() {
        const tickers = this.state.data.map((currency) =>
            <Crypto data={currency} key={currency.id} />
        );

        return (
            <div className="tickers-container">
                <ul className="tickers">{tickers}</ul>
                <p>Info updated every 10 seconds from coinmarketcap.com</p>
            </div>
        );
    }
    
    fetchCryptoData(){
        axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
            .then(response => {
                var wanted = ["bitcoin", "ethereum", "litecoin"];
                var result = response.data.filter(currency => wanted.includes(currency.id));
                this.setState({data: result});
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.fetchCryptoData();
        this.interval = setInterval(() => this.fetchCryptoData(), 10 * 1000);
    }

}