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

function onImgSelect(imageId) {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.editor')
    elGallery.hidden = true
    elEditor.hidden = false
    setImg(imageId)
    renderMeme()
}