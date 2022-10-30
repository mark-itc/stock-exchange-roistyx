
class StockSearcher {
    
    constructor() {
        this.html = document.getElementById ('form').innerHTML = 
        `<form class="d-flex " id="form" role="search">
        <div class="form-floating w-100 " >
            <input type="text" class="form-control" id="floatingInput">
            <label for="floatingInput"></label>   
        </div>
        <button class="btn btn-outline-success" id="search" type="submit">Search</button>
         <div id="spinner" class="spinner-border rounded-circle" style="display:none" role="status"></div>
     </form>`
     

     document.getElementById('search').addEventListener("click", (e) => {
        e.preventDefault();
        this.postEventValue(
            document.getElementById('floatingInput').value
            )
      });
    };

    postEventValue(searchTerm) {
        const result = searchTerm;
        this.callSearch(result);
    };

    search(callSearch) {
        this.callSearch = callSearch
    };  
};