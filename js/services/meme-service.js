'use strict'

var gSavedId = 1

var gGallery = [{
    id: 0,
    url: 'img/1.jpg'
}]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [

    { id: 1, url: 'img/1.jpg', keywords: ['president', 'usa'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'kiss'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'computer'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'victory'] },
    { id: 6, url: 'img/6.jpg', keywords: ['aliens', 'history'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprise'] },
    { id: 8, url: 'img/8.jpg', keywords: ['fiction', 'hat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'troll'] },
    { id: 10, url: 'img/10.jpg', keywords: ['president', 'smile'] },
    { id: 11, url: 'img/11.jpg', keywords: ['love', 'hate'] },
    { id: 12, url: 'img/12.jpg', keywords: ['television', 'host'] },
    { id: 13, url: 'img/13.jpg', keywords: ['movie', 'success'] },
    { id: 14, url: 'img/14.jpg', keywords: ['sunglasses', 'man'] },
    { id: 15, url: 'img/15.jpg', keywords: ['zero', 'chance'] },
    { id: 16, url: 'img/16.jpg', keywords: ['excited', 'man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['president', 'two'] },
    { id: 18, url: 'img/18.jpg', keywords: ['everywhere', 'toys'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            idx: 0,
            txt: 'Line 1',
            size: 25,
            align: 'left',
            color: 'white',
            font: 'Impact',
            x: 250,
            y: 30,
            isDragged: false,
        },
        {
            idx: 1,
            txt: 'Line 2',
            size: 25,
            align: 'left',
            color: 'white',
            font: 'Impact',
            x: 250,
            y: 470,
            isDragged: false,
        },
    ]
}

function getImages() {
    let images = gImgs
    return images
}

function getMeme() {
    let meme = gMeme
    return meme
}

function setLineTxt() {

    const txt = document.querySelector('.txt').value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imageId) {
    gMeme.selectedImgId = imageId
}

function changeTxtColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function changeFontSize(newSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}

function setNewSelectedLine() {
    // console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    const memeLineAmount = gMeme.lines.length
    // console.log('memeLineAmount', memeLineAmount)
    if (gMeme.selectedLineIdx === memeLineAmount - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    // console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
}
function unselectLines() {
    gMeme.selectedLineIdx = -1
    let gElLineInput = document.querySelector('.txt')
    gElLineInput.value = 'Please Select Line'
    renderMeme()
}

function setFont() {
    let fontSelector = document.getElementById('font-select')
    let selectedFont = fontSelector.options[fontSelector.selectedIndex].value
    gMeme.lines[gMeme.selectedLineIdx].font = selectedFont
}

function lowerLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].y >= 470) return
    gMeme.lines[gMeme.selectedLineIdx].y += 10
}

function liftLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].y <= 30) return
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}

function canvasClicked(ev) {
    const { offsetX, offsetY } = ev
    // console.log('offsetX , offsetY', offsetX, offsetY)
    const meme = getMeme()
    // console.log('meme', meme)
    const clickedText = gMeme.lines.find(line => {
        const { x, y, size } = line
        // console.log('x,y,size', x, y, +size)
        return offsetX >= x - 250 && offsetX <= x + 250 &&
            offsetY >= y - 20 && offsetY <= y + 20
    })
    if (clickedText) {
        setSelectedLineIdx(clickedText.idx)
    }
    else unselectLines()
}
function isLineClicked(ev) {
    const { offsetX, offsetY } = ev
    const clickedTextIdx = gMeme.lines.findIndex(line => {
        const { x, y } = line
        return offsetX >= x - 250 && offsetX <= x + 250 && offsetY >= y - 20 && offsetY <= y + 20
    })
    // console.log('clickedText', clickedTextIdx)
    return clickedTextIdx
}

function setLineDrag(value) {
    if (gMeme.selectedLineIdx === -1) return
    gMeme.lines[gMeme.selectedLineIdx].isDragged = value
}

function setSelectedLineIdx(index) {
    gMeme.selectedLineIdx = index
    switchLine()
}

function switchLine() {
    let gElLine = document.querySelector('.txt')
    const focusedText = gMeme.lines[gMeme.selectedLineIdx].txt
    gElLine.value = focusedText
    renderMeme()

}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy
    gMeme.lines[gMeme.selectedLineIdx].x += dx

}

function addLine(value) {
    let newLine = createLine(value)
    gMeme.lines.push(newLine)
    console.log('gMeme', gMeme)
}

function createLine(txt = 'New Line') {
    return {
        idx: gMeme.lines.length,
        txt,
        size: 25,
        align: 'left',
        color: 'white',
        font: 'Impact',
        x: 250,
        y: 250,
        isDragged: false,
    }
}

function removeLine() {
    if (gMeme.selectedLineIdx === -1) {
        alert('You don\'t have any selected lines')
    }
    else if (gMeme.selectedLineIdx === 0 || gMeme.selectedLineIdx === 1) {
        alert('You can not remove the first two lines of a meme - as they are the template of it. (you can delete their content if you want)')
    } else {
        console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = 0
    }

}

function saveCanvas() {
    const canvas = document.querySelector('.canvas')
    const dataURL = canvas.toDataURL()
    let newGalleryItem = createGalleryImage(dataURL)
    let gallery = loadFromStorage(KEY_GALLERY)
    console.log('gallery', gallery)
    gallery.push(newGalleryItem)
    saveToStorage(KEY_GALLERY, gallery)
    revealSavedGallery()
}

function createGalleryImage(dataURL) {
    return {
        id: gSavedId++,
        url: dataURL
    }
}

function resetMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                idx: 0,
                txt: 'Line 1',
                size: 25,
                align: 'left',
                color: 'white',
                font: 'Impact',
                x: 250,
                y: 30,
                isDragged: false,
            },
            {
                idx: 1,
                txt: 'Line 2',
                size: 25,
                align: 'left',
                color: 'white',
                font: 'Impact',
                x: 250,
                y: 470,
                isDragged: false,
            },
        ]
    }
}