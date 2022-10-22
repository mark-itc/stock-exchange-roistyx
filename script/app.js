import {Company} from './company.js';
class StockSearcher {
    constructor() {
        this.searchQuery = "";
        this.searchLimit = 10;
        this.marketName = "NASDAQ";

        const searchForm = document.getElementById('search-form');
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.runSearch();
        });
    };

    setIsLoading(isLoading) {
        const spinner = document.getElementById('spinner').style
        if (isLoading) {
            return  spinner.display = "block" ;
        } else spinner.display = "none";
    };

    async getStocks() {
        try {
            this.setIsLoading(true);
            const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchQuery}&limit=${this.searchLimit}&exchange=${this.marketName}`;

            const response = await fetch(url);            
            const getResults = await response.json();
            
            return(getResults);

        } catch(error) {

            return error;
        } finally {

            this.setIsLoading(false); 
        };   
    };

    async runSearch() {
        const results = await this.getStocks();
        const stocksObjects =[];  
        this.searchQuery = document.getElementById('floatingInput').value;  
        results.forEach((item) => {
            const stock = new Stock(item);

            stocksObjects.push(stock);
        });
    };
};

class Stock {
    constructor(stockObject) {
        this.symbol = stockObject.symbol;
        this.name = stockObject.name;
        this.http = "company.html?symbol=";
        this.profile = this.companyProfile();
        
             
    };

    async companyProfile() {
        const company = new Company(this.symbol);
        const profile = await company.getCompanyProfile();

        const {
            image,
            companyName,
            symbol,
            changesPercentage,
        } = profile;

        const resultsContainer = document.getElementById('results-container');
        const div = document.createElement('div');
        div.innerHTML = `
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item"><image src="${image}" ></li>
                <li class="list-group-item">
                    <a href="${this.http+this.symbol}">
                    ${companyName}</a>
                </li>
                <li class="list-group-item">${symbol}</li>
                <li class="list-group-item">${changesPercentage}%</li>
            </ul>`
        
        return  resultsContainer.appendChild(div);
    };     
};

class Marquee {
    constructor() {
        this.url = "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=79407a4b5093d8ab0b88ffb381a79d19";
        this.ticker = document.getElementById('marquee');
        this.tickerObject = this.getTicker();
        this.marqueeItemLimit = 10;
    }

    async getTicker() {
        
        const response = await fetch(this.url);            
        const getResults = await response.json();
        const array = await getResults.map((index) => {
            return {
                index  }
        })

        
        
        array.forEach((element) => printMe(element));
       

        console.log( array)

        
        
             
        // this.ticker.innerHTML = `<span >${newArray}</span>`
        
        
        // symbol.forEach(() => array.push(symbol[1]+" "+change[1]));
        // change.forEach((element) => console.log(element));
        
        
        // document.write(JSON.stringify(merge(r)));

        function printMe(element) {
            const {
                caca,
            } = element;
            console.log(caca)
        } 
    };

    

}

let stockSearcher = null;
let marquee = null;
window.onload = () => {
    stockSearcher = new StockSearcher();
    marquee = new Marquee();
}




  
    
