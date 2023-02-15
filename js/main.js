'use strict'


function onInit() {
    renderGallery()
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.editor')
    elGallery.hidden = false
    elEditor.hidden = true
}