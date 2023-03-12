fetch('index.md')
  .then(response => response.json())
  .then(jsonResponse => console.log(markdown(jsonResponse)))  