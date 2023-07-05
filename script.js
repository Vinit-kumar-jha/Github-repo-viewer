const button = document.getElementById("btn");
const input = document.getElementById("username");
const repo = document.getElementById("repocontainer");


button.addEventListener("click", fetchrepo);

function fetchrepo(){
    const username = input.value;
    if(!username){
        alert("Enter the repo name");
        return ;
    }
    const api = `https://api.github.com/users/${username}/repos`;

    fetch(api)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      displayrepo(data);
    })
    .catch(error => {
      console.error("Error fetching repositories:", error);
    });
}

function displayrepo(repositories){
    repocontainer.innerHTML = "";
    repositories.forEach(repository => {
        const repoDiv = document.createElement("div");
        repoDiv.classList.add("repository");
    
        const nameElement = document.createElement("h2");
        nameElement.textContent = repository.name;
    
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = repository.description || "No description available";
    
        repoDiv.appendChild(nameElement);
        repoDiv.appendChild(descriptionElement);
        repocontainer.appendChild(repoDiv);
      });
}