'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [

    { id: 1, url: 'img/1.jpg', keywords: ['president', 'usa'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'kiss'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'dog'] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Line 1',
            size: 25,
            align: 'left',
            color: 'white'
        },
        {
            txt: 'Line 2',
            size: 25,
            align: 'left',
            color: 'white'
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
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    const memeLineAmount = gMeme.lines.length
    console.log('memeLineAmount', memeLineAmount)
    if (gMeme.selectedLineIdx === memeLineAmount - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
}