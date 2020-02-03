'use strict';

console.log('Touch nums');
//TODO - when restarting game the num counter returns





var gBoardSize = 16
var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
var gNumCount = 1;
var timer = document.querySelector('.timer');
var elNextNum = document.querySelector('.next-num span')
var elNums = document.querySelector('.next-num')
var elWon = document.querySelector('.won');
var elTable = document.querySelector('.table');
var watch = new stopWatch(timer);
var gameIsOn = true;

init(gBoardSize)


function init(size = 16) {
    elTable.style.display = 'flex';
    elWon.style.display = 'none';
    gNumCount = 1
    elNextNum.innerText = gNumCount
    watch.stop()
    watch.reset()
    gameIsOn = true;
    genArray(gBoardSize)
    createTable(size)
}

function genArray(gBoardSize) {
    gNums = [];
    for (var i = 0; i < gBoardSize; i++) {
        gNums.push(i + 1)
    }
    // console.log('new gNums', gNums);
    return gNums;
}

function changeLevel(level) {
    var elAllButtons = document.querySelectorAll('.buttons div')
    for(var i = 0 ; i < elAllButtons.length ; i++){
        elAllButtons[i].classList.remove('clickedLevel')
    }
    // console.log('buttons',elAllButtons);
    level.classList.add('clickedLevel')
    var level = +(level.querySelector('span').innerHTML)
    gBoardSize = level
    init(gBoardSize)
    return gBoardSize
}


function createTable(size) {
    var shuffledNums = shuffle(gNums)
    var strHtml = ''
    for (var i = 0; i < Math.sqrt(size); i++) {
        strHtml += `<tr data-row="${i}">`
        for (var j = 0; j < Math.sqrt(size); j++) {
            strHtml += `<td class="cell" data-i = "${i}" data-j = "${j}" onclick="cellClicked(this)">${shuffledNums.pop()}</td>`
        }
        elTable.innerHTML = strHtml;
    }
    strHtml += '<tr>'
}

function cellClicked(clickedNum) {
    if ((+clickedNum.innerHTML) === gNumCount) {
        clickedNum.classList.toggle('clicked')
        if (!(gNumCount >= gBoardSize)) {
            gNumCount++

            elNextNum.innerText = gNumCount
            watch.start();

        }else{
            elNextNum.innerHTML = '&#128518';
        }
    }
    isVictory()
}

function isVictory() {
    if (gameIsOn) {
        if (gNumCount - 1 === gBoardSize) {
            gameIsOn = false;
            watch.stop()
            elTable.style.display = 'none';
            elWon.style.display = 'flex'
            // console.log('gNumCount', gNumCount);
            // console.log('gBoardSize', gBoardSize);
            // console.log('GAME OVER!');
        }
    }
}


// utility functions

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}