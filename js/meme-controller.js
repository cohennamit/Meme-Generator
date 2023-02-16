'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    const imgs = getImages()
    const imgIdx = imgs.findIndex(img => +meme.selectedImgId === +img.id)
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    const img = new Image()
    img.src = `${imgs[imgIdx].url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        for (let i = 0; i < meme.lines.length; i++) {
            // let x
            // let y
            // if (i === 0) {
            //     x = 250
            //     y = 30
            // } else if (i === 1) {
            //     x = 250
            //     y = 470
            // } else {
            //     x = 250
            //     y = 250
            // }
            // drawText(meme.lines[i].txt, x, y, i)
            drawText(meme.lines[i].txt, meme.lines[i].x, meme.lines[i].y, i)
            if (meme.selectedLineIdx !== -1) {

                if (i === meme.selectedLineIdx) {
                    // drawLine(0, y + 22)
                    drawLine(0, meme.lines[i].y + 22)
                    // drawLine(0, y - 22)
                    drawLine(0, meme.lines[i].y - 22)
                }
            }
        }
    }


}

function drawLine(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(gElCanvas.width, y)

    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

function drawText(text, x, y, i) {
    const meme = getMeme()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = `${meme.lines[i].color}`
    gCtx.font = `${meme.lines[i].size}px ${meme.lines[i].font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    // console.log('gCtx.measureText()', gCtx.measureText(text))
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLineTxt() {
    setLineTxt()
    renderMeme()
}

function onChangeTxtColor(value) {
    changeTxtColor(value)
    renderMeme()
}

function onChangeFontSize(ev, elForm) {
    ev.preventDefault()
    let newSize = elForm.querySelector('input[name="font-size"]').value
    changeFontSize(newSize)
    renderMeme()
}

function onSwitchLine() {
    let gElLineInput = document.querySelector('.txt')
    setNewSelectedLine()
    const meme = getMeme()
    const focusedText = meme.lines[meme.selectedLineIdx].txt
    gElLineInput.value = focusedText
    renderMeme()

}

function onUnselectLines() {
    unselectLines()
    renderMeme()
}

function onSetFont() {
    setFont()
    renderMeme()
}

function onLowerLine() {
    lowerLine()
    renderMeme()

}

function onLiftLine() {
    liftLine()
    renderMeme()
}

function onCanvasClicked(ev) {
    canvasClicked(ev)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}
function onRemoveLine() {
    removeLine()
    renderMeme()
}