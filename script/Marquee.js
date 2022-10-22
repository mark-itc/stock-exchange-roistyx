export class Marquee {
    constructor() {
        this.getMarquee = this.getMarquee();
    }

    getMarquee() {
        const api_url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=$%7Blimit%7D";
        const marquee = document.getElementById("marquee");
        
        let elementWidth = marquee.offsetWidth;
        let parentWidth = marquee.parentElement.offsetWidth;
        let flag = 2;
        
        setInterval(() => {
            marquee.style.marginLeft = --flag + "px";
            if (elementWidth == -flag) {
                flag = parentWidth;
            }
        }, 20);
        
        setInterval(getMarqueeData, 10000);

        async function getMarqueeData() {
            const response = await fetch(api_url);
            var getResults = await response.json();
            console.log("I'm refreshed");

            for (let i = 0; i < 30; i++) {
            let results = [
                    getResults[	0	].symbol	+	"  "	+	getResults[	0	].price	+	"%   |   "	+
                    getResults[	1	].symbol	+	"  "	+	getResults[	1	].price	+	"%   |   "	+
                    getResults[	2	].symbol	+	"  "	+	getResults[	2	].price	+	"%   |   "	+
                    getResults[	3	].symbol	+	"  "	+	getResults[	3	].price	+	"%   |   "	+
                    getResults[	4	].symbol	+	"  "	+	getResults[	4	].price	+	"%   |   "	+
                    getResults[	5	].symbol	+	"  "	+	getResults[	5	].price	+	"%   |   "	+
                    getResults[	6	].symbol	+	"  "	+	getResults[	6	].price	+	"%   |   "	+
                    getResults[	7	].symbol	+	"  "	+	getResults[	7	].price	+	"%   |   "	+
                    getResults[	8	].symbol	+	"  "	+	getResults[	8	].price	+	"%   |   "	+
                    getResults[	9	].symbol	+	"  "	+	getResults[	9	].price	+	"%   |   "	+
                    getResults[	10	].symbol	+	"  "	+	getResults[	10	].price	];
                
                marquee.innerHTML = `<span >${results}</span>`;

            return;
        };

        return; 
        };

        getMarqueeData();
        
        return; 
    };

};
