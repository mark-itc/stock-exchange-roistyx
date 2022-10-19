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
            const companyObject = new CompanyObject(getResults.profile)
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
        console.log(urlParams)
        return urlParams.get('symbol');        
    }
}

class CompanyObject {
    
    constructor (companyObject) {
        this.companyName = companyObject.companyName
        this.description = companyObject.description
        this.image = companyObject.image
        this.price = companyObject.price
        this.changesPercentage = companyObject.changesPercentage
        this.website = companyObject.website 
        this.printMe()
    }

    printMe() {
        document.getElementById('company-logo').src = this.image;
        document.getElementById('company-name').innerHTML = this.companyName;
        document.getElementById('company-description').innerHTML = this.description
        document.getElementById('changes-percentage').innerHTML = this.changesPercentage
        document.getElementById('stock-price').innerHTML = this.price
        document.getElementById('website').innerHTML = this.website;
        
        console.log(this.price)
    }
}



let company = null;
let companyUrl = null
window.onload = () => {
    companyUrl = window.location.search;
    company = new Company(companyUrl);
    
}


    