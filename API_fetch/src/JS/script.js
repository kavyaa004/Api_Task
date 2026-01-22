Promise.all([

  fetch("https://jsonplaceholder.typicode.com/photos").then(res => res.json()),

  fetch("../data/images.json").then(res => res.json())

]).then(([photos, imageData]) => {

  const albums = {}

  const images = imageData.images

  photos.forEach(photo => {

    if (photo.albumId >= 1 && photo.albumId <= 5) {

      if (!albums[photo.albumId]) albums[photo.albumId] = []

      if (albums[photo.albumId].length < 2) {

        albums[photo.albumId].push(photo)

      }

    }

  })

  renderAlbums(albums, images)

})

function renderAlbums(albums, images) {

  const container = document.getElementById("albums-container")

  let imgIndex = 0

  Object.keys(albums).forEach(albumId => {

    const albumDiv = document.createElement("div")

    albumDiv.className = "album"

    albumDiv.innerHTML = `<h3>Album ${albumId}</h3>`

    const cardsDiv = document.createElement("div")

    cardsDiv.className = "cards"

    albums[albumId].forEach(photo => {

      const imgSrc = images[imgIndex % images.length]

      imgIndex++

      const card = document.createElement("div")

      card.className = "card"

      card.innerHTML = `
<span class="photo-id">${photo.id}</span>
<img src="${imgSrc}" alt="photo" />
<p class="title">${photo.title}</p>

      `

      cardsDiv.appendChild(card)

    })

    albumDiv.appendChild(cardsDiv)

    container.appendChild(albumDiv)

  })

}
 