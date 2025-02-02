function downloadLocalStorage() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-fragen.json';
    a.click();
    URL.revokeObjectURL(url);
}

function uploadLocalStorage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            const data = JSON.parse(e.target.result);
            for (const key in data) {
                localStorage.setItem(key, data[key]);
            }
            location.reload();
        };
        reader.readAsText(file);
    };
    input.click();
}
