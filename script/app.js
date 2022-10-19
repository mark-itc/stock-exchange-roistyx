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
    }

    setIsLoading(isLoading) {
        const spinner = document.getElementById('spinner').style
        if (isLoading) {
            return  spinner.display = "block" ;
        } else spinner.display = "none";
    };

    async getStocks() {
        try {
            const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchQuery}&limit=${this.searchLimit}&exchange=${this.marketName}`;

            this.setIsLoading(true);

            const response = await fetch(url);
            console.log(url)
            const getResults = await response.json();
            
            return(getResults);

        } catch(error) {
            return[];
        } finally {
            this.setIsLoading(false); 
            
        }   
    } 

    async runSearch() {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';
        const results = await this.getStocks();
        const stocksObjects =[];  
        this.searchQuery = document.getElementById('floatingInput').value;  
        results.forEach((item) => {
            const stock = new Stock(item);

            stocksObjects.push(stock);
            
            return stock.createStockEntry(resultsContainer);
        });
    };
};

class Stock {
    constructor(stockObject) {
        this.symbol = stockObject.symbol;
        this.name = stockObject.name;
        this.http = "company.html?symbol=";
    };

    createStockEntry(resultsContainer) {  
        const node = document.createElement('a');
        const textNode = document.createTextNode(this.symbol + ", "+ this.name)
        node.setAttribute('href', this.http+this.symbol);
        node.appendChild(textNode)
        resultsContainer.appendChild(node);
        
        return 
    }    
}

let stockSearcher = null;
window.onload = () => {
    stockSearcher = new StockSearcher();
}


    
