'use strict'
let gElCanvass = document.querySelector('.canvas-container')
let gCtxx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElGallery = document.querySelector('.gallery')
let gElEditor = document.querySelector('.editor')
let gElSaved = document.querySelector('.saved-area')
let gElAbout = document.querySelector('.about-area')

function onInit() {
    renderGallery()
    // let elGallery = document.querySelector('.gallery')
    // let elEditor = document.querySelector('.editor')
    // let elSaved = document.querySelector('.saved')
    // elGallery.hidden = false
    // elEditor.hidden = true
    // elSaved.hidden = true
    resizeCanvas()
    addListeners()
    checkSavedGallery()
    saveToStorage(KEY_GALLERY, gGallery)
}

function checkSavedGallery() {

    gGallery = loadFromStorage(KEY_GALLERY)
    if (!gGallery) {
        gGallery = [
            createGalleryImage('img/1.jpg')
        ]
    }
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container')
    gElCanvass.width = elContainer.offsetWidth
    gElCanvass.height = elContainer.offsetHeight
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvass.addEventListener('mousedown', onDown)
    gElCanvass.addEventListener('mousemove', onMove)
    gElCanvass.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvass.addEventListener('touchstart', onDown)
    gElCanvass.addEventListener('touchmove', onMove)
    gElCanvass.addEventListener('touchend', onUp)
}

function onDown(ev) {
    //     // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    // console.log('isLineClicked(ev)', isLineClicked(ev))
    if (isLineClicked(ev) >= 0) {

        setLineDrag(true)
        //Save the pos we start from
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    } else {
        return
    }
}

function onMove(ev) {
    const meme = getMeme()
    // console.log('meme', meme.lines[meme.selectedLineIdx].isDragged)
    if (meme.selectedLineIdx === -1) return
    if (!meme.lines[meme.selectedLineIdx].isDragged) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function revealSavedGallery() {
    // var elGallery = document.querySelector('.gallery')
    // var elEditor = document.querySelector('.editor')
    // var elSaved = document.querySelector('.saved-container')
    gElGallery.hidden = true
    gElEditor.hidden = true
    gElSaved.hidden = false
    gElAbout.hidden = true
    renderSavedGallery()
}


function revealGallery() {
    // var elGallery = document.querySelector('.gallery')
    // var elEditor = document.querySelector('.editor')
    // var elSaved = document.querySelector('.saved-container')
    gElGallery.hidden = false
    gElEditor.hidden = true
    gElSaved.hidden = true
    gElAbout.hidden = true
    renderGallery()
}

function revealAbout() {
    gElGallery.hidden = true
    gElEditor.hidden = true
    gElSaved.hidden = true
    gElAbout.hidden = false
}