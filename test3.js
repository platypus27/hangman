const fs = require('fs')
const readline = require('readline-sync')
const dictionary  = [
    {cat: 1, catName: "Fruits", name: "Apple", hint: "Apple"},
    {cat: 1, catName: "Fruits", name: "Mango", hint: "Mango"},
    {cat: 1, catName: "Fruits", name: "Lemon", hint: "Lemon"},
    {cat: 1, catName: "Fruits", name: "Watermelon", hint: "Watermelon"},
    {cat: 1, catName: "Fruits", name: "Banana", hint: "Banana"},
    {cat: 1, catName: "Fruits", name: "Guava", hint: "Guava"},
    {cat: 2, catName: "Colours", name: "Red", hint: "Red"},
    {cat: 2, catName: "Colours", name: "Orange", hint: "Orange"},
    {cat: 2, catName: "Colours", name: "Yellow", hint: "Yellow"},
    {cat: 2, catName: "Colours", name: "Pink", hint: "Pink"},
    {cat: 2, catName: "Colours", name: "Purple", hint: "Purple"},
    {cat: 2, catName: "Colours", name: "White", hint: "White"},
    {cat: 3, catName: "Food", name: "Noodles", hint: "Noodles"},
    {cat: 3, catName: "Food", name: "Fries", hint: "Fries"},
    {cat: 3, catName: "Food", name: "Rice", hint: "Rice"},
    {cat: 3, catName: "Food", name: "Chicken", hint: "Chicken"},
    {cat: 3, catName: "Food", name: "Burger", hint: "Burger"},
    {cat: 3, catName: "Food", name: "Pizza", hint: "Pizza"},
    {cat: 4, catName: "Countries", name: "Singapore", hint: "Singapore"},
    {cat: 4, catName: "Countries", name: "France", hint: "France"},
    {cat: 4, catName: "Countries", name: "China", hint: "China"},
    {cat: 4, catName: "Countries", name: "Japan", hint: "Japan"},
    {cat: 4, catName: "Countries", name: "United States", hint: "United States"},
    {cat: 4, catName: "Countries", name: "Germany", hint: "Germany"},
    {cat: 4, catName: "Countries", name: "Brazil", hint: "Brazil"},
    {cat: 5, catName: "Beverages", name: "Coffee", hint: "Coffee"},
    {cat: 5, catName: "Beverages", name: "Tea", hint: "Tea"},
    {cat: 5, catName: "Beverages", name: "Water", hint: "Water"},
    {cat: 5, catName: "Beverages", name: "Soda", hint: "Soda"},
    {cat: 5, catName: "Beverages", name: "Milk", hint: "Milk"},
    {cat: 5, catName: "Beverages", name: "Juice", hint: "Juice"},
]
const wonConfig = 0
const triesConfig = 4
const hintsConfig = 1
var selecteddictionary = new Array
var arrayOfChosenWord = new Array
var wordLinesArray = new Array
var categories = new Array
var categoriesName = new Array
var wordLines = new String
var guess = new String
var hint = new String
var regex = /^[A-Za-z]+$/
var categoryChosen = new String
var won = wonConfig
var tries = triesConfig
var hints = hintsConfig
var catques = `\nPlease choose a category`
var catques2 = "\n(Please enter the number): "
var guessPrompt = "\nGuess a letter or the entire word: "
var playAgainPrompt = "\nPlay again? (y/n): "
var hintPrompt = "Would you like a hint? (y/n): "

function wonMsg() {console.log("\n\t--------------------\n\t-- You have won!! --\n\t--------------------")}
function lostMsg() {console.log("\n\t-------------------\n\t-- You have lost --\n\t-------------------")}
function errorMsg1() {console.log("Please only enter an alphabet or a guess with the same length as the word")}
function errorMsg2() {console.log("Please enter y or n only")}
function triesLeftMsg(tries) {console.log("You have ", tries," lives left")}
function endMsg() {console.log("END")}

function reset() {
    selecteddictionary = []
    arrayOfChosenWord = []
    wordLinesArray = []
    catques = `\nPlease choose a category`
    won = wonConfig
    tries = triesConfig
    hints = hintsConfig
}

function replay() {
    var replay = ""
    while (!replay.includes("y") && !replay.includes("n")) {
        replay = readline.question(playAgainPrompt).toLowerCase()
        if (replay.includes("y")) {
            main()
        }
        else if (replay.includes("n")) {
            endMsg()
        }
        else {
            errorMsg2()
        }
    }
}

function pickCat() {
    for (var t = 0; t < dictionary.length; t++) {
        categories[t] = dictionary[t].cat
        categoriesName[t] = dictionary[t].catName
    }
    var categorieTypes = categories.filter((x, i, a) => a.indexOf(x) === i)
    var categoriesNameTypes = categoriesName.filter((x, i, a) => a.indexOf(x) === i)

    for (var i = 0; i < categorieTypes.length; i ++) {
        var strr = `\n${categorieTypes[i]}: ${categoriesNameTypes[i]}`
        catques = catques.concat(strr)
    }
    categoryChosen = readline.question(catques.concat(catques2))
    return categoryChosen
}

function randomWordPicker() {
    for (i = 0; i < dictionary.length; i++) {
        if (dictionary[i].cat == categoryChosen) {
            selecteddictionary.push(dictionary[i])
        }
    }
    var randomNumber = Math.floor((Math.random() * selecteddictionary.length));
    var chosenWord = selecteddictionary[randomNumber].name
    for (var i = 0; i < chosenWord.length; i++) {
        arrayOfChosenWord[i] = chosenWord.charAt(i).toUpperCase()
    }
    for (var e = 0; e < arrayOfChosenWord.length; e++) {
        if (arrayOfChosenWord[e] == " " || arrayOfChosenWord[e] == "-" ) {
            wordLinesArray[e] = arrayOfChosenWord[e]
        }
        else {
            wordLinesArray[e] = "_"
        }
    }
    wordLines = wordLinesArray.join(" ")
    console.log("\n", wordLines)
    return randomNumber
}

function getHint(randomNumber) {
    var hintOfChosenWord = selecteddictionary[randomNumber].hint
    var needHint = readline.question(hintPrompt)
    if (needHint.includes("y")) {
        console.log(hintOfChosenWord)
    }
    else if (needHint.includes("n")) {
    }
    else {
        errorMsg2()
        getHint(randomNumber)
    }

}

function guessWord() {
    guess = readline.question(guessPrompt)
    if (arrayOfChosenWord.join('').includes(guess.toUpperCase())) {
        if (guess.length == 0) {
            errorMsg1()
        }
        else if (guess.length > 1 && guess.split('').length == arrayOfChosenWord.length) {
            if (guess.toUpperCase() == arrayOfChosenWord.join('')) {
                won = 1
                wonMsg()
                replay()
            }
        }
        else if (guess.length > 1 && guess.split('').length != arrayOfChosenWord.length) {
            tries -= 1
            triesLeftMsg(tries)
            errorMsg1()
        }
        else if (guess.length = 1) {
            for (var i = 0; i < arrayOfChosenWord.length; i++){
                if (arrayOfChosenWord[i].includes(guess.toUpperCase())) {
                    wordLinesArray[i] = arrayOfChosenWord[i]
                    if (wordLinesArray.includes("_")){
                        console.log("\n", wordLinesArray.join(" "))
                    }
                    else if (won == 0) {
                        won = 1
                        console.log("\n", wordLinesArray.join(" "))
                        wonMsg()
                        replay()
                    }
                    else {
                        console.log("error 1")
                    }
                }
            }
        }
        else {
            errorMsg1()
        }
    }
    else if (regex.test(guess) == true) {
        tries -= 1
        triesLeftMsg(tries)
    }
    else {
        errorMsg1()
    }
}

function main() {
    reset()
    pickCat()
    randomNumber = randomWordPicker()
    while (tries > 0 && won == 0) {
        if (tries == 3 && hints > 0) {
            getHint(randomNumber)
            hints -= 1
        }
        guessWord()
    }
    if (tries == 0) {
        lostMsg()
        replay()
    }
}

main()