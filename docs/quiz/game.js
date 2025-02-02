function loadAll() {
    /*elem = document.getElementById("questionModal");
    elem.close();
    elem.style.display = "none";*/

    buildTableFromLS()
    
    if (localStorage.blue && localStorage.red) {
        document.getElementById("blue").textContent = "" + localStorage.blue + " Punkte";
        document.getElementById("red").textContent = "" + localStorage.red + " Punkte";
    } else {
        localStorage.setItem("blue", 0);
        localStorage.setItem("red", 0);
    }
}

function buildTableFromLS() {
    const table = document.getElementById("quizTable");
    table.classList.add("table-dark-mode");

    let rows = localStorage.getItem("rows");
    let cols = localStorage.getItem("cols");

    // Clear any previous content
    table.innerHTML = "";

    // Build table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.classList.add("table-header-row");

    for (let col = 1; col <= cols; col++) {
        const th = document.createElement("th");
        th.textContent = localStorage.getItem(`category-${col - 1}`);
        th.id = `category-${col - 1}`;
        th.classList.add("table-header-cell");
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Build table body
    const tbody = document.createElement("tbody");

    for (let row = 0; row < rows; row++) {
        const tr = document.createElement("tr");
        tr.classList.add("table-row");

        for (let col = 0; col < cols; col++) {
            const td = document.createElement("td");
            td.id = `cell-${row}-${col}`;
            td.textContent = localStorage.getItem(`points-${row}`);
            td.classList.add("table-cell");
            td.setAttribute("onclick", `cellClicked(${row}, ${col})`);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

function cellClicked(row, col) {
    currentRow = row;
    currentCol = col;
    const question = localStorage.getItem(`question-${row}-${col}`);
    const modal = document.getElementById("questionModal");


    document.getElementById("modalSpace").innerHTML = `
        <dialog id="questionModal">
            <h1 id="question">Beispiel Frage</h1>
            <div class="button-container">
            <button class="answerBox" style="background-color: rgb(0, 80, 228)" onclick="blueWon()">Blau hat gewonnen</button>
            <button class="answerBox" style="background-color: rgb(78, 78, 78)" onclick="nobodyWon()">Keiner hat gewonnen</button>
            <button class="answerBox" style="background-color: rgb(254, 51, 51)" onclick="redWon()">Rot hat gewonnen</button>
            </div>
        </dialog>
    `
    document.getElementById("questionModal").showModal();

}


function blueWon() {
    // update points
    localStorage.blue = parseInt(localStorage.blue) + parseInt(localStorage.getItem(`points-${currentRow}`));
    document.getElementById("blue").textContent = "" + localStorage.blue + " Punkte";

    // update color of cell to '0050e4
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    cell.style.backgroundColor = "#0050e4";
    cell.style.color = "white";

    // close modal
    document.getElementById("modalSpace").innerHTML = "";
}

function redWon() {
    // update points
    localStorage.red = parseInt(localStorage.red) + parseInt(localStorage.getItem(`points-${currentRow}`));
    document.getElementById("red").textContent = "" + localStorage.red + " Punkte";

    // update color of cell to 'e40000'
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    cell.style.backgroundColor = "#fe3333";
    cell.style.color = "white";

    // close modal
    document.getElementById("modalSpace").innerHTML = "";
}

function nobodyWon() {
    // update color of cell to '0050e4
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    cell.style.backgroundColor = "#4e4e4e";
    cell.style.color = "white";

    // close modal
    document.getElementById("modalSpace").innerHTML = "";
}


function reset() {
    localStorage.blue = 0;
    localStorage.red = 0;
    loadAll();
}


currentRow = 0;
currentCol = 0;
loadAll()