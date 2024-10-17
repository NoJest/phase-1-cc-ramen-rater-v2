// index.js
//constants 

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const ramenRatingDisplay = document.querySelector('#rating-display')
const ramenCommentDisplay = document.querySelector('#comment-display')
const detailImage = document.querySelector('#detail-image')
const detailName = document.querySelector('#detail-name')
const detailRestaurant = document.querySelector('#detail-restaurant')

//submission constants 
const newRamenForm = document.querySelector('#new-ramen')
const newRamenName = document.querySelector('#new-name')
const newRamenRestaurant = document.querySelector("#new-restaurant")
const newRamenImage = document.querySelector('#new-image')
const newRamenRating = document.querySelector('#new-rating')
const newRamenComment = document.querySelector('#new-comment')
const newRamenSubmitButton = document.querySelector('#submit-button')
// const bodyBodyBody = document.querySelector

//update constants
const updateComment = document.querySelector('#update-comment')
const updateRating = document.querySelector('#update-rating')
const updateButton = document.querySelector('#update-button')
const editRamen = document.querySelector("edit-ramen")

// Callbacks
// async function defaultOne(ramen) {
//   detailImage.src = ramen[0].image
//   detailName.textContent = ramen[0].name
//   detailRestaurant.textContent = ramen[0].restaurant
//   ramenRatingDisplay.textContent = ramen[0].rating
//   ramenCommentDisplay.textContent = ramen[0].comment

// }
// defaultOne()
async function handleClick (ramen) {
 detailImage.src = ramen.image
 detailName.textContent = ramen.name
 detailRestaurant.textContent = ramen.restaurant
 ramenRatingDisplay.textContent = ramen.rating
 ramenCommentDisplay.textContent = ramen.comment
};

//Ramen submissionsssss SUBMIT OR FACE THE CONSEQUENCES
async function ramenSubmission(event) {
  event.preventDefault()
  const newImg = newRamenImage.value
  const newName = newRamenName.value
  const newRestaurant = newRamenRestaurant.value
  const newRating = newRamenRating.value
  const newComment = newRamenComment.value
  
  const response = await fetch('http://localhost:3000/ramens', {
    method: "POST",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify( { name: newName, restaurant: newRestaurant, image: newImg, rating: newRating, comment:newComment  } )
  })
  
  const newRamenInput = await response.json()
  addToMenu(newRamenInput)

  function addToMenu (ramen) {
    const ramenPicture = document.createElement ('img')
    ramenPicture.src = ramen.image
    ramenMenu.append(ramenPicture)
    ramenPicture.addEventListener("click",() => handleClick(ramen))
    // ramenPicture.addEventListener("Load", () => defaultOne(ramen) )
  }
  
  newRamenForm.reset()
}
//delete button
// const deleteButton = document.createElement('button')
// deleteButton.textContent = "delete"
// const bodyDiv = document.createElement('div')
// bodyDiv.append(deleteButton)

// --------maybe this--------//
// const deleteButton = document.querySelector('#delete-button')
// deleteButton.addEventListener('click', () => handleDelete())
// async function handleDelete() {
//     try {  
//     const response = await fetch('http://localhost:3000/ramens/:id', {
//       method: 'Delete'
//     });
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


// async function ramenUpdate(event){
//   event.preventDefault()
//   const updatedRating = updateRating.value
//   const updatedComment = updateComment.value

//   const response = await fetch(`http://localhost:3000/ramens/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify( { rating: updatedRating, comment: updatedComment } )
// })

// }


const addSubmitListener = () => { 
  // newRamenForm.addEventListener()
  newRamenSubmitButton.addEventListener("click",ramenSubmission)
  // Add code
};
// const addEditListener = () => {
//   updateButton.addEventListener("click",ramenUpdate)
// }

async function displayRamens ()  {
  const response = await fetch('http://localhost:3000/ramens')
  const ramen = await response.json()
  ramen.forEach(addToMenu)

  // automatically show ramen0
  handleClick(ramen[0])
  
  // console.log(ramen)
  // 
  
  // addramentoMenu handoff
  function addToMenu (ramen) {
    const ramenPicture = document.createElement ('img')
    ramenPicture.src = ramen.image
    ramenMenu.append(ramenPicture)
    ramenPicture.addEventListener("click",() => handleClick(ramen))
  }
};

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
};

main()

// Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
