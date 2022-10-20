export function searchParam() {
    let companyUrl = null;
    companyUrl = window.location.search;
    const urlParams = new URLSearchParams(companyUrl);
    const symbol = urlParams.get('symbol'); 
    return symbol;       
};
export class Company {
    constructor (symbol) {
        this.companySymbol = symbol;
        this.searchUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
        this.CompanyProfile = this.getCompanyProfile()     
    }  
       
    async getCompanyProfile(){

        try {
            this.setIsLoading(true);
            const url = this.searchUrl+this.companySymbol;

            const response = await fetch(url);
            const getResults = await response.json();
            const companyObject = new CompanyObject(
                getResults.profile, 
                this.companySymbol
                );
    
            return companyObject;     
        
         } catch(error) {
            return error;

        } finally {
            this.setIsLoading(false); 
        };
    };

    setIsLoading(isLoading) {
        const spinner = document.getElementById('spinner').style;
        if (isLoading) {
            return  spinner.display = "block" ;
        } else spinner.display = "none";
    };
};
export class CompanyObject {
    constructor (companyObject, companySymbol) {
        this.companyName = companyObject.companyName;
        this.description = companyObject.description;
        this.image = companyObject.image;
        this.symbol = companySymbol;
        this.price = companyObject.price;
        this.changesPercentage = companyObject.changesPercentage;
        this.website = companyObject.website; 
        this.printIt = this.printMe();
        
    }

    companyProfile() {
       const inLineProfile = {
            logo: this.image,
            name: this.companyName,
            symbol: this.symbol, 
            change: this.changesPercentage,
        } 

        return inLineProfile
    }
    
    printMe() {
        if (searchParam()!= null) {
            document.getElementById('company-logo').src = this.image;
            document.getElementById('company-name').innerHTML = this.companyName;
            document.getElementById('company-description').innerHTML = this.description;
            document.getElementById('changes-percentage').innerHTML = this.changesPercentage;
            document.getElementById('stock-price').innerHTML = this.price;
            document.getElementById('website').innerHTML = `<a href="${this.website}">${this.companyName}</a>`
        }  
    }
}

export class CompanyChart {
    constructor() {
        this.symbol = searchParam();
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`
        this.chartObject = this.getCompanyChart(); 
    }

    async getCompanyChart(){

        try {const url = this.url

            this.setIsLoading(true);
    
            const response = await fetch(url); 
            const getResults = await response.json();

            const historical = getResults.historical;            

            const dates = historical.map((element) => element.date);
            const closePrice = historical.map((element) => element.close);
            dates.reverse();
            closePrice.reverse();
            const canvas = document.getElementById('my-chart');
            
            const data = {
                labels: dates,
                datasets: [
                    {
                        label: "Stock price history",
                        backgroundColor: "black",
                        borderColor: "purple",
                        rectRounded: "rectRounded",
                        data: closePrice,

                    },

                ],

            };

            const config = {
                type: 'line',
                data,
                options: {},
            };       

            return  new Chart(canvas, config);   
        
         } catch(error) {
            return error;

        } finally {
            this.setIsLoading(false);
        }
    } 

    setIsLoading(isLoading) {
        const spinner = document.getElementById('spinner').style
        if (isLoading) {
            return  spinner.display = "block" ;
        } else spinner.display = "none";
    };
}

    

window.onload = () => {
    searchParam();
    return new Company(searchParam());    
}

