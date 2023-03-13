function buildHtmlForCarousel(gamesList) {
    let ret = "";
    for (let i = 0; i < gamesList.length; i++) {
        let gameName = gamesList[i]["name"];
        let gameDescription = gamesList[i]["kurzbeschreibung"];
        let url = gamesList[i]["url"];
        let active = "";
        if (i == 0) active = "active";
        let html = `
        <div class="carousel-item ${active}">
            <div style="padding-left: 15%; padding-right: 15%;">
                <a href="/spiele/${url}/" class="text-decoration-none"><h4>${gameName}</h4></a>
                <p>${gameDescription}</p>
            </div>
        </div>
        `;
        ret += html;
    }
    return ret;
}


function shuffleList(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
}


function sortListByName(list) {
    list.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}


function buildHtmlForList(gamesList) {
    let ret = `
    <div class="card-header">
        <h5 class="card-title text-center">Ergebnisse</h5>
    </div>`
    for (let i = 0; i < gamesList.length; i++) {
        let gameName = gamesList[i]["name"];
        let gameDescription = gamesList[i]["kurzbeschreibung"];
        let url = gamesList[i]["url"];
        let html = `
        <div class="card">
            <div class="card-body">
                <h5><a href="/spiele/${url}" class="text-success">${gameName}</a></h5>
                <p class="card-text">${gameDescription}</p>
                <p class="card-text"><small class="text-muted">Ein Spiel für draußen, im hellen, mit vielen Mitarbeitern</small></p>
            </div>
        </div>`
        ret += html;
    }
    return ret;
}


function handleGames(games) {

    // Get the games
    let gamesList = games["spiele"]

    // build the html for the carousel
    // shuffle the games
    shuffleList(gamesList)
    document.getElementById("carousel-inner").innerHTML = buildHtmlForCarousel(gamesList)

    // build the html for the list
    // sort the games
    sortListByName(gamesList)
    document.getElementById("results").innerHTML = buildHtmlForList(gamesList)

    
}


fetch("/spiele/index.json")
    .then(response => response.json())
    .then(response => handleGames(response))
