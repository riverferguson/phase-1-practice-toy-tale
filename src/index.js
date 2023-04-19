let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')
  const toysListDiv = document.querySelector('#toy-collection')

 const toyOnPage = (toyObj) => {
  const div = document.createElement("div")
  div.className = "card"
  const h2 = document.createElement("h2")
  h2.textContent = toyObj.name 
  const img = document.createElement("img")
  img.src = toyObj.image
  img.className = "toy-avatar"
  const p = document.createElement("p")
  p.textContent = `${toyObj.likes} Likes`
  const button = document.createElement("button")
  button.className = "like-btn"
  button.id = toyObj.id
  button.textContent = "Like ❤️"
  button.addEventListener('click', (e) => {
    p.textContent = `${++toyObj.likes} Likes`
  })

  div.append(h2, img, p, button)
  toysListDiv.append(div)
 }
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newToyName = e.target.name.value
    const newToyImage = e.target.image.value
    const newToyId = parseInt(toysListDiv.lastChild.querySelector(".like-btn").id)

    const newToy = {
      name: newToyName,
      image: newToyImage,
      likes: 0,
      id: newToyId
    }

    toyOnPage(newToy)
    e.target.reset()
  })

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysList => toysList.forEach(toy => toyOnPage(toy)))

})