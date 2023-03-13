function handleGames(games) {

    // Get the games
    games = games["spiele"]

    // shuffle the games
    for (let i = games.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [games[i], games[j]] = [games[j], games[i]];
    }

    // create the html for the carousel
    let allHTML = ""
    for (let i = 0; i < games.length; i++) {
        let gameName = games[i]["name"]
        let gameDescription = games[i]["kurzbeschreibung"]
        let url = games[i]["url"]
        let active = ""
        if (i == 0) active = "active"
        let html = `
        <div class="carousel-item ${active}">
            <div style="padding-left: 15%; padding-right: 15%;">
                <a href="/spiele/${url}/" class="text-decoration-none"><h4>${gameName}</h4></a>
                <p>${gameDescription}</p>
            </div>
        </div>
        `
        allHTML += html
    }

    // set the html
    document.getElementById("carousel-inner").innerHTML = allHTML
}


fetch("/spiele/index.json")
  .then(response => response.json())
  .then(response => handleGames(response))