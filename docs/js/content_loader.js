function extractGameUrl(url) {
    const regex = /\/([^\/]+)\/?$/; // Matches the last part of the URL after the last "/"
    const match = regex.exec(url);
    if (match && match[1]) {
        return match[1];
    } else {
        return null; // URL format not recognized
    }
}


function setHtmlTitle(response) {
    const name = extractGameUrl(window.location.href);
    if (!name) return;
    const games = response.spiele;
    for (let i = 0; i < games.length; i++) {
        if (games[i].url === name) {
            document.title = games[i].name + " - Jungschar Spiele"
            break;
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
    .then(response => setHtmlTitle(response));
