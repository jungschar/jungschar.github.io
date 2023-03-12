fetch('index.md')
  .then(response => response.text())
  .then(response => document.getElementById("main").innerHTML = markdown(response))