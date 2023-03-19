function extractGameUrl(url) {
    const regex = /\/([^\/]+)\/?$/; // Matches the last part of the URL after the last "/"
    const match = regex.exec(url);
    if (match && match[1]) {
        return match[1];
    } else {
        return null; // URL format not recognized
    }
}


function setHtmlHead(response) {
    // find game in json file
    const name = extractGameUrl(window.location.href);
    if (!name) return;
    const games = response.spiele;
    for (let i = 0; i < games.length; i++) {
        if (games[i].url === name) { // found game

            // set html title
            document.title = games[i].name + " - Jungschar Spiele"

            // set meta description
            const meta = document.createElement("meta");
            meta.name = "description";
            meta.content = games[i].kurzbeschreibung;
            document.getElementsByTagName("head")[0].appendChild(meta);

            // set meta keywords
            const meta2 = document.createElement("meta");
            meta2.name = "keywords";
            meta2.content = games[i].suchbegriffe;
            document.getElementsByTagName("head")[0].appendChild(meta2);

            break; // stop searching
        }
    }
}


// load markdown file and convert it to html
fetch("index.md")
    .then(response => response.text())
    .then(response => document.getElementById("main").innerHTML = markdown(response));

// load json file and set html title
fetch("/spiele/index.json")
    .then(response => response.json())
    .then(response => setHtmlHead(response));
