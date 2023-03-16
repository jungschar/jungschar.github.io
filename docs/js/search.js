const searchForm = document.getElementById('search-form');
let games = [];


function splitIntoTokens(text) {
    // use regular expression to split text into words and remove non-alphanumeric characters
    const tokens = text.toLowerCase().match(/\b\w+\b/g).map(word => word.replace(/[^a-z0-9]/g, ''));
    return tokens;
}


function getMatchingScoreForTokens(game, searchTokens) {
    let score = 0;
    searchTokens.forEach(searchToken => {
        if (game.titleTokens.includes(searchToken)) {
            score += 1000;
        }
        if (game.suchbegriffe.includes(searchToken)) {
            score += 500;
        }
        if (game.shortDescriptionTokens.includes(searchToken)) {
            score += 200;
        }
        if (game.markdownTokens.includes(searchToken)) {
            score += 100;
        }
    });
    return score;
}


function getMatchingScoreForGameProperties(game, params) {
    let score = 0;

    // handle weather
    if (game.wetter == "egal") {
        if (params.wetter == "egal") score += 1;
    } else if (game.wetter == "drinnen") {
        if (params.wetter == "drinnen") score += 5;
    } else if (game.wetter == "draussen") {
        if (params.wetter == "draussen") score += 5;
    }

    // handle brightness
    if (game.helligkeit == "egal") {
        if (params.helligkeit == "egal") score += 1;
    } else if (game.helligkeit == "hell") {
        if (params.helligkeit == "hell") score += 4;
    } else if (game.helligkeit == "dunkel") {
        if (params.helligkeit == "dunkel") score += 4;
    }

    // handle number of kids
    if (game.anz_kinder == "normal") {
        if (params["anzahl-kinder"] == "normal") score += 1;
    } else if (game.anz_kinder == "wenig") {
        if (params["anzahl-kinder"] == "wenig") score += 3;
    } else if (game.anz_kinder == "viele") {
        if (params["anzahl-kinder"] == "viele") score += 3;
    }

    // handle number of adults
    if (game.anz_ma == "normal") {
        if (params["anzahl-mitarbeiter"] == "normal") score += 1;
    } else if (game.anz_ma == "wenig") {
        if (params["anzahl-mitarbeiter"] == "wenig") score += 3;
    } else if (game.anz_ma == "viele") {
        if (params["anzahl-mitarbeiter"] == "viele") score += 3;
    }

    return score;
}


function getMatchingScoreForText(game, txt) {
    let score = 0;
    if (game.name.toLowerCase().includes(txt)) score += 500;
    if (game.suchbegriffe.includes(txt)) score += 250;
    if (game.kurzbeschreibung.toLowerCase().includes(txt)) score += 100;
    if (game.markdown.toLowerCase().includes(txt)) score += 50;
    return score;
}


function replaceUmlauts(txt) {
    return txt.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
}


function handleSearch(games, params) {

    // Step 0: assign an initial matching score of 0 to each game
    games.forEach(game => game.matchingScore = 0);

    // Step 1: searching for text
    if (params.search_text) {
        // split search text into tokens
        const searchTokens = splitIntoTokens(replaceUmlauts(params.search_text));
        games.forEach(game => {

            // prepare all tokens
            game.titleTokens = splitIntoTokens(game.name);
            // game.suchbegriffe (keywords)
            game.markdownTokens = splitIntoTokens(game.markdown);
            game.shortDescriptionTokens = splitIntoTokens(game.kurzbeschreibung);

            // calculate matching score for each game based on search tokens
            game.matchingScore += getMatchingScoreForTokens(game, searchTokens);

            // simply check if the search text is contained anywhere
            game.matchingScore += getMatchingScoreForText(game, replaceUmlauts(params.search_text.toLowerCase()));
        });
    }

    // Step 2: use game properties to calculate matching scores
    games.forEach(game => {
        game.matchingScore += getMatchingScoreForGameProperties(game, params);
    });

    // shuffle games to make the order more random
    shuffleList(games)

    // Step 3: sort games by matching score in descending order
    games.sort((a, b) => b.matchingScore - a.matchingScore);

    // Step 4: render the results
    document.getElementById("results").innerHTML = buildHtmlForList(games) ;
}


// preload markdown files and index.json
fetch('/spiele/index.json')
    .then(response => response.json())
    .then(data => {
        games = data.spiele;
        // iterate over games and load markdown content
        games.forEach(game => {
            fetch(`/spiele/${game.url}/index.md`)
            .then(response => response.text())
            .then(markdown => {
                game.markdown = replaceUmlauts(markdown);
                console.log(`Loaded markdown for game "${game.name}" (/spiele/${game.url})`);
            })
            .catch(error => {
            console.error(`Error loading markdown for game ${game.url}: ${error}`);
            });
        });
    })
    .catch(error => {
        console.error(`Error loading games data: ${error}`);
    });


// add event listener to search form
searchForm.addEventListener('submit', function(event) {

    // prevent the form from submitting
    event.preventDefault(); 

    // get the form data
    const formData = new FormData(searchForm);
    const params = {};

    // iterate over the form data to build the params object
    for (const [key, value] of formData.entries()) {
        params[key] = value;
    }

    // fetch the games
    fetch("/spiele/index.json")
        .then(response => response.json())
        .then(response => handleSearch(games, params));

});
