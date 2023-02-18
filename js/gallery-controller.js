'use strict'

function renderGallery() {
    var images = getImages()
    var strHtmls = images.map(image => `
        <article class="image-preview">
        <img onclick="onImgSelect('${image.id}')" class="gallery-img" src=${image.url} alt="${image.id}">
        </article> 
        `)

    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function renderSavedGallery() {
    var images = loadFromStorage(KEY_GALLERY)
    var strHtmls = images.map(image => `
        <article class="image-preview">
        <img class="saved-img" src=${image.url} alt="${image.id}">
        </article> 
        `)

    document.querySelector('.saved-container').innerHTML = strHtmls.join('')
}

function onImgSelect(imageId) {
    // let elGallery = document.querySelector('.gallery')
    // let elEditor = document.querySelector('.editor')
    // let elSaved = document.querySelector('.saved')
    gElGallery.hidden = true
    gElEditor.hidden = false
    gElSaved.hidden = true
    setImg(imageId)
    renderMeme()
}