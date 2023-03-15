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


function limitString(str, limit) {
    if (str.length > limit) {
        return str.substring(0, limit) + "...";
    }
    return str;
}


function buildHtmlForCarousel(gamesList) {
    let ret = "";
    for (let i = 0; i < gamesList.length; i++) {
        let gameName = gamesList[i]["name"];
        let gameDescription = limitString(gamesList[i]["kurzbeschreibung"], 100);
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


function buildSubtitleText(game) {
    let ret = "Ein Spiel für ";

    // handle weather
    if (game["wetter"] == "draussen") {
        ret += "draußen";
    } else if (game["wetter"] == "drinnen") {
        ret += "innen";
    } else {
        ret += "draußen und drinnen";
    }

    // handle brightness
    ret += ", im ";
    if (game["helligkeit"] == "hell") {
        ret += "hellen";
    } else if (game["helligkeit"] == "dunkel") {
        ret += "dunklen";
    } else {
        ret += "hellen und dunklen";
    }

    // handle the number of people
    if (game["anz_ma"] == "normal" && game["anz_kinder"] == "normal") {
        return ret;
    }

    // we handle the following cases:
    // anz_ma       anz_kinder
    // ---------------------------------
    // wenig        wenig
    // wenig        normal
    // wenig        viele

    // normal       wenig
    // normal       viele

    // viele        wenig
    // viele        normal
    // viele        viele

    ret += ", mit ";
    if (game["anz_ma"] == "wenig" && game["anz_kinder"] == "wenig") {
        ret += "wenigen Mitarbeitern und Kindern";

    } else if (game["anz_ma"] == "wenig" && game["anz_kinder"] == "normal") {
        ret += "wenigen Mitarbeitern";

    } else if (game["anz_ma"] == "wenig" && game["anz_kinder"] == "viele") {
        ret += "wenigen Mitarbeitern und vielen Kindern";

    } else if (game["anz_ma"] == "normal" && game["anz_kinder"] == "wenig") {
        ret += "wenigen Kindern";

    } else if (game["anz_ma"] == "normal" && game["anz_kinder"] == "viele") {
        ret += "viele Kindern";

    } else if (game["anz_ma"] == "viele" && game["anz_kinder"] == "wenig") {
        ret += "wenigen Mitarbeitern und vielen Kindern";

    } else if (game["anz_ma"] == "viele" && game["anz_kinder"] == "normal") {
        ret += "viele Mitarbeitern";

    } else if (game["anz_ma"] == "viele" && game["anz_kinder"] == "viele") {
        ret += "viele Mitarbeitern und Kindern";
    }

    return ret;
}


function buildHtmlForList(gamesList) {
    let ret = `
    <div class="card-header">
        <h5 class="card-title text-center">Ergebnisse (alphabetisch sortiert)</h5>
    </div>`;
    for (let i = 0; i < gamesList.length; i++) {
        let gameName = gamesList[i]["name"];
        let gameDescription = gamesList[i]["kurzbeschreibung"];
        let url = gamesList[i]["url"];
        let subtitleText = buildSubtitleText(gamesList[i]);
        let html = `
        <div class="card">
            <div class="card-body">
                <h5><a href="/spiele/${url}" class="text-success">${gameName}</a></h5>
                <p class="card-text">${gameDescription}</p>
                <p class="card-text"><small class="text-muted">${subtitleText}</small></p>
            </div>
        </div>`;
        ret += html;
    }
    return ret;
}


function handleGames(games) {

    // get the games
    let gamesList = games["spiele"];

    // shuffle the games
    // and build the html for the carousel
    shuffleList(gamesList);
    document.getElementById("carousel-inner").innerHTML = buildHtmlForCarousel(gamesList);

    // sort the games
    // and build the html for the results-list
    sortListByName(gamesList);
    document.getElementById("results").innerHTML = buildHtmlForList(gamesList) ;
}


// fetch the games
fetch("/spiele/index.json")
    .then(response => response.json())
    .then(response => handleGames(response));
