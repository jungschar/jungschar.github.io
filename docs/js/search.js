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
            score += 10;
        }
        if (game.suchbegriffe.includes(searchToken)) {
            score += 5;
        }
        if (game.shortDescriptionTokens.includes(searchToken)) {
            score += 2;
        }
        if (game.markdownTokens.includes(searchToken)) {
            score += 1;
        }
    });
    return score;
}


function getMatchingScoreForGameProperties(game, params) {
    let score = 0;
    console.log(game);
    console.log(params);
    console.log("\n");
    return score;
}


function handleSearch(games, params) {

    // Step 0: assign an initial matching score of 0 to each game
    games.forEach(game => game.matchingScore = 0);

    // Step 1: searching for text
    const searchTokens = splitIntoTokens(params.search_text);
    games.forEach(game => {

        // prepare all tokens
        game.titleTokens = splitIntoTokens(game.title);
        // game.suchbegriffe (keywords)
        game.markdownTokens = splitIntoTokens(game.markdown);
        game.shortDescriptionTokens = splitIntoTokens(game.short_description);

        // calculate matching score for each game based on search tokens
        game.matchingScore += getMatchingScoreForTokens(game, searchTokens);
    });

    // Step 2: use game properties to calculate matching scores
    games.forEach(game => {
        game.matchingScore += getMatchingScoreForGameProperties(game, params);
    });

    // Step 3: sort games by matching score in descending order
    games.sort((a, b) => b.matchingScore - a.matchingScore);
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
                game.markdown = markdown;
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
