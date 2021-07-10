let resultsContainer = document.getElementById("resultsContainer")
let wikiSearch = document.getElementById("wikiSearch")
let spinner = document.getElementById("spinner")
wikiSearch.addEventListener("keydown",wikipediaSearch)

function wikipediaSearch(event){
    if(event.key === "Enter"){
        spinner.classList.remove("d-none")
        resultsContainer.textContent = ""
        let search = wikiSearch.value 
        let url = "https://apis.ccbp.in/wiki-search?search=" + search

        let options={
            method:"GET"
        }

        fetch(url,options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            let { search_results } = data;
            displayResults(search_results)
        })
    }
}

function displayResults(search_results){
    spinner.classList.add("d-none")
    for (let i of search_results){
    appendResults(i)
    }
}

function appendResults(result){

    let divElement = document.createElement("div")
    resultsContainer.appendChild(divElement)

    let aElement = document.createElement("a")
    aElement.textContent = result.title
    aElement.classList.add("wiki-title")
    aElement.href = result.link
    aElement.target = "_blank"
    divElement.appendChild(aElement)

    let brElement = document.createElement("br")
    divElement.appendChild(brElement)
    
    let linkElement = document.createElement("a")
    linkElement.textContent = result.link 
    linkElement.classList.add("wiki-link")
    linkElement.href = result.link
    linkElement.target = "_blank"
    divElement.appendChild(linkElement)

    let brElement2 = document.createElement("br")
    divElement.appendChild(brElement2)

    let pElement = document.createElement("p")
    pElement.textContent = result.description
    divElement.appendChild(pElement)
}