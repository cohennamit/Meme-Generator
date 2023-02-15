'use strict'

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
function unselectLines() {
    gMeme.selectedLineIdx = -1
}