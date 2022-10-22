import {Company} from './company.js';
import {Marquee} from './Marquee.js';
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
        const spinner = document.getElementById('spinner').style;
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
            <div class="border-bottom">
            <ul class="list-group list-group-flush list-group-horizontal">
                <li class="list-group-item"><image src="${image}" ></li>
                <li class="list-group-item">
                    <a href="${this.http+this.symbol}">
                    ${companyName}</a>
                </li>
                <li class="list-group-item">${symbol}</li>
                <li class="list-group-item">${changesPercentage}%</li>
            </ul>
             </div>`
        
        return  resultsContainer.appendChild(div);
    };     
};


let marquee = null;

window.onload = () => {
    marquee = new Marquee();
    return new StockSearcher();
    };




  
    
