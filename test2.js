const readline = require('readline-sync')
const fruitDictionary  = [
    {name: "Apple", hint: "Bright red fruit"},
    {name: "Orange", hint: "Bright orange fruit"},
    {name: "Lemon", hint: "Bright yellow fruit"}
]

var arrayOfChosenWord = new Array
var wordLinesArray = new Array
var wordLines = ""
var tries = 10
var guess = ""
var regex = /^[A-Za-z]+$/

function guessWord() {
    guess = readline.question("Guess a letter: ")
    if (arrayOfChosenWord.includes(guess.toUpperCase())) {
        for (var i = 0; i < arrayOfChosenWord.length; i++){
            if (arrayOfChosenWord[i].includes(guess.toUpperCase())) {
                wordLinesArray[i] = arrayOfChosenWord[i]
                if (wordLinesArray.includes("_")){
                    console.log(wordLinesArray.join(" "))
                }
                else {
                    console.log("You have won!!")
                    break
                }
            }
        }
    }
    else if (regex.test(guess) == true) {
    console.log("You have ", tries," left")
        console.log("Wrong!")
        tries -= 1
    }
    else {
        console.log("Please only enter an alphabet")
    }
}

function main() {
    var randomNumber = Math.floor((Math.random() * fruitDictionary.length));
    var chosenWord = fruitDictionary[randomNumber].name
    var hintOfChosenWord = fruitDictionary[randomNumber].hint
    console.log(chosenWord, " ", hintOfChosenWord)

    for (var i = 0; i < chosenWord.length; i++) {
        arrayOfChosenWord[i] = chosenWord.charAt(i).toUpperCase()
    }

    for (var e = 0; e < arrayOfChosenWord.length; e++) {
        wordLinesArray[e] = "_"
    }
    wordLines = wordLinesArray.join(" ")
    console.log(wordLines)

    while (tries > 0 && wordLinesArray.includes('_') == true) {
        guessWord()
    }
    if (tries == 0) {
        console.log("You have lost")
    }
}

main()