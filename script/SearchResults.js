class Stock {

    constructor(searchPhrase) {
        this.searchQuery = searchPhrase
        this.queryUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchQuery}&limit=10&exchange=NASDAQ`;
        this.queryResult = this.getStocks()       
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
            const url = this.queryUrl;
            const response = await fetch(url);            
            const getResults = await response.json();
            getResults.forEach((item) => {
                this.companyProfile(item.symbol);
                return; 
                });
                
            return;

        } catch(error) {

            return error;

        } finally {
            this.setIsLoading(false);
        };   
    };

    async companyProfile(stockSymbol) {

        const company = new CompanySearchedResult(stockSymbol);
        const profile = await company.getCompanyProfile();
        
        const {
            image,
            companyName,
            symbol,
            changesPercentage,
        } = profile;

        const http = "company.html?symbol=";
        const resultsContainer = document.getElementById('results');
        const div = document.createElement('div');
        div.innerHTML = `
            <ul class="list-group list-group-horizontal border-bottom pt-2">
                <li class="list-group-item"><image src="${image}" ></li>
                <li class="list-group-item">
                    <a href="${http+symbol}">
                    ${companyName}</a>
                </li>
                <li class="list-group-item">${symbol}</li>
                <li class="list-group-item">${changesPercentage}%</li>
            </ul>`;
        
        return  resultsContainer.appendChild(div);
    };     
};

class CompanySearchedResult {

    constructor (symbol) {
        this.companySymbol = symbol;
        this.searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.companySymbol}`;
        this.CompanyProfile = this.getCompanyProfile();   
    };  
       
    async getCompanyProfile(){

        try {
            const url = this.searchUrl

            const response = await fetch(url);
            const getResults = await response.json();
            const companyObject = new SearchedCompanyObject(
                getResults.profile, 
                this.companySymbol,
                );
    
            return companyObject;     
        
         } catch(error) {

            return error;

        } finally {
            
        };
    };

};

class SearchedCompanyObject {

    constructor (companyObject, companySymbol) {
        this.companyName = companyObject.companyName;
        this.description = companyObject.description;
        this.image = companyObject.image;
        this.symbol = companySymbol;
        this.price = companyObject.price;
        this.changesPercentage = companyObject.changesPercentage;
        this.website = companyObject.website;   
    };
};



  
    
