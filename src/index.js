let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



function renderOneToy(toys){
  let card = document.createElement('div')
  card.innerHTML =`
  <div>
  <h2>${toys.name}</h2>
  <img src="${toys.image}" class="toy-avatar" />
  <p> ${toys.likes} likes </p>
  <button class="like-btn" id="${toys.id}">Like ❤️</button>
</div>
  `
card.className = "card"
document.querySelector('#toy-collection').append(card)

let likeButton = card.querySelector(".like-btn")
likeButton.addEventListener('click', patchLikes)
}


function getToyData(){
  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
}

getToyData()


function postToyData(event){ 
  event.preventDefault()
  fetch ('http://localhost:3000/toys',{
  method: 'POST',
  headers: { 
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
    })
})
  .then(res => res.json())
  .then(data => renderOneToy(data))
}

let form = document.querySelector(".add-toy-form")
form.addEventListener('submit', postToyData)
 
function patchLikes(event) {
  const toyId = event.target.id;
  const likesElement = event.target.previousElementSibling;
  const currentLikes = parseInt(likesElement.innerText, 10);
  const newNumberOfLikes = currentLikes +1;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  .then(res => res.json())
  .then(data => {
    likesElement.innerText = `${newNumberOfLikes} likes`;
  });
}

  



