let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//add.addEventListeners for submit
document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

// //event handlers

function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  createToy(toyObj)
}

//dom render 
function renderOneToy(toy) {
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">
  <p><span>${toy.likes}</span> Likes</p>
  <button class='like-btn' id="${toy.id}" >Like ❤️</button>
  `

  //add the card to the dom
  document.querySelector('#toy-collection').appendChild(card)

  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1;
    card.querySelector('p span').textContent = toy.likes;
    updateToyLikes(toy);
  })

}

//permanently save the updated number of likes of a toy

function updateToyLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then(resp => resp.json)
  .then(toy => console.log(toy))
}

//FETCH

function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then((resp) => resp.json())
    .then((toyData) => {
      toyData.forEach(toy => renderOneToy(toy))
    })
  console.log("before fetch returns")
}

//creating a toy object and posting it to db
function createToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(toyObj)
  })
    .then(resp => resp.json())
  .then(toy => console.log(toy))
}

//get data and render it to the DOM

function initialize() {
  // toyData.forEach(toy => renderOneToy(toy))

  getAllToys();
  console.log("after fetch returns")
}
initialize();