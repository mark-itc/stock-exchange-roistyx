// export default function mySymbol() {
//     companyUrl = window.location.search;
//     const urlParams = new URLSearchParams(companyUrl);
// // console.log(urlParams)
//     console.log(urlParams.get('symbol'))
//     return }

class Company {
    constructor () {
        this.companySymbol = this.getSymbol();
        this.companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.companySymbol}`;
        this.CompanyProfile = this.getCompanyProfile()   
    }    
    
    async getCompanyProfile(){

        try {const url = this.companyUrl

            this.setIsLoading(true);
    
            const response = await fetch(url); 
            const getResults = await response.json();
            const companyObject = new CompanyObject(getResults.profile, this.companySymbol)
            console.log(companyObject)
            return   companyObject     
        
         } catch(error) {
            return[];

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
    

    getSymbol() {
        const urlParams = new URLSearchParams(companyUrl);
        // console.log(urlParams)
        return urlParams.get('symbol');        
    }
}

class CompanyObject {
    
    constructor (companyObject, companySymbol) {
        this.companyName = companyObject.companyName
        this.description = companyObject.description
        this.image = companyObject.image
        this.symbol = companySymbol
        this.price = companyObject.price
        this.changesPercentage = companyObject.changesPercentage
        this.website = companyObject.website 
        this.printIt = this.printMe()
        this.chart = this.chart()
    }
    
    // chart () {
    //     chart = new CompanyChart(this.symbol);
    // }

    printMe() {
        document.getElementById('company-logo').src = this.image;
        document.getElementById('company-name').innerHTML = this.companyName;
        document.getElementById('company-description').innerHTML = this.description
        document.getElementById('changes-percentage').innerHTML = this.changesPercentage
        document.getElementById('stock-price').innerHTML = this.price
        document.getElementById('website').innerHTML = this.website;
        
        
    }
}

let company = null;
let companyUrl = null
window.onload = () => {
    companyUrl = window.location.search;
    company = new Company(companyUrl);
    
}

export default class CompanyChart {
    constructor(symbol) {
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
        this.myConstructor = this.myConstructor(symbol);
        this.chartObject = this.getCompanyChart();
        
        
    }

    myConstructor(symbol) {
        // const myChart = document.getElementById('my-chart')
        // myChart.innerHTML = param;
        console.log(this.chartObject)
        // return 
    }

    async getCompanyChart(){

        try {const url = this.url

            this.setIsLoading(true);
    
            const response = await fetch(url); 
            const getResults = await response.json();

            const historical = getResults.historical;
            // console.log(historical)

            const dates = historical.map((element) => element.date);
            const closePrice = historical.map((element) => element.close);
            dates.reverse();
            closePrice.reverse();

            console.log(closePrice)

            const canvas = document.getElementById('my-chart')
            

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
            return[];

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

    