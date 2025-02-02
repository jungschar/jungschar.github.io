
// load all from localStorage
function loadAll() {
    if (localStorage.rows && localStorage.cols) {
        buildTable(localStorage.rows, localStorage.cols);
        loadQuestionsAndPointsAndCategoriesFromLocalStorage();
    } else {
        buildTable(5, 5);
    }
}


function loadQuestionsAndPointsAndCategoriesFromLocalStorage() {
    const rows = localStorage.rows;
    const cols = localStorage.cols;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const value = localStorage.getItem(`question-${row}-${col}`);
            document.getElementById(`cell-${row}-${col}`).textContent = value;
        }
        const points = localStorage.getItem(`points-${row}`);
        document.getElementById(`points-${row}`).textContent = points;
    }
    for (let col = 0; col < cols; col++) {
        const value = localStorage.getItem(`category-${col}`);
        document.getElementById(`category-${col}`).textContent = value;
    }
}

function deleteAll() {
    localStorage.clear();
    //location.reload();
}


function cellClicked(row, col) {
    const newValue = prompt("Enter new value for cell", "");
    if (newValue) {
        document.getElementById(`cell-${row}-${col}`).textContent = newValue;
        localStorage.setItem(`question-${row}-${col}`, newValue);
    }
}

function categoryClicked(col) {
    const newValue = prompt(`Enter new value for category ${col}`, "");
    if (newValue) {
        document.getElementById(`category-${col}`).textContent = newValue;
        localStorage.setItem(`category-${col}`, newValue);
    }
}


function changePoints(row) {
    const newValue = prompt(`Enter new value for points ${row + 1}00`, "");
    if (newValue) {
        document.getElementById(`points-${row}`).textContent = newValue;
        localStorage.setItem(`points-${row}`, newValue);
    }
}
    


function changeSize() {
    if (!confirm("Changing the size will DELETE all current questions. Are you sure you want to continue?")) 
        return;
    
    let cols = prompt("Enter number of categories", 5);
    let rows = prompt("Enter number of questions", 5);
    // validate input
    if (isNaN(cols) || isNaN(rows)) {
        alert("Please enter a number");
        return;
    }

    deleteAll();
    localStorage.rows = rows;
    localStorage.cols = cols;
    buildTable(rows, cols);
}

function buildTable(rows, cols) {
    const table = document.getElementById("quizTable");

    // Clear any previous content
    table.innerHTML = "";

    // Build table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    th_points = document.createElement("th");
    th_points.textContent = "Points";
    headerRow.appendChild(th_points);
    for (let col = 1; col <= cols; col++) {
        const th = document.createElement("th");
        th.textContent = `Category ${col}`;
        th.id = `category-${col-1}`;
        th.setAttribute("onclick", `categoryClicked(${col-1})`);
        headerRow.appendChild(th);

        // if the category in localStorage is undefined, set it to th.textContent
        if (localStorage.getItem(`category-${col-1}`) === null) {
            localStorage.setItem(`category-${col-1}`, th.textContent);
        }
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Build table body
    const tbody = document.createElement("tbody");
    for (let row = 0; row < rows; row++) {
        const tr = document.createElement("tr");
        td_points = document.createElement("td");
        td_points.textContent = `${row + 1}00`;
        td_points.id = `points-${row}`;
        td_points.setAttribute("onclick", `changePoints(${row})`);
        tr.appendChild(td_points);

        // if the points in localStorage is undefined, set it to td_points.textContent
        if (localStorage.getItem(`points-${row}`) === null) {
            localStorage.setItem(`points-${row}`, td_points.textContent);
        }

        for (let col = 0; col < cols; col++) {
            const td = document.createElement("td");
            td.id = `cell-${row}-${col}`;
            td.textContent = '???'
            td.setAttribute("onclick", `cellClicked(${row}, ${col})`);
            tr.appendChild(td);
            
            // if the question in localStorage is undefined, set it to td.textContent
            if (localStorage.getItem(`question-${row}-${col}`) === null) {
                localStorage.setItem(`question-${row}-${col}`, td.textContent);
            }
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}



loadAll();