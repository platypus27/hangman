//imports
const fs = require('fs')
const readline = require('readline-sync')
const crypto = require('crypto');

// configurations
const hashprependConfig = "no password for u "
const wonConfig = 0
const triesConfig = 5
const hintsConfig = 1
const loginFailuresConfig = 3
const menuMsgConfig = "\nWelcome to The HANGHANGMAN\n\nSelect an option\n1. Log In\n2. Play as Guest\n3. Create an Account\n4. Game Credits\n(Please enter the number): "
const catquesConfig = `\nPlease choose a category`
const enterNumberPromptConfig = "\n(Please enter the number): "
const guessPromptConfig = "\nGuess a letter or the entire word: "
const playAgainPromptConfig = "\nPlay again? (y/n): "
const hintPromptConfig = "Would you like a hint? (y/n): "
const wonMsgConfig = "\n\t--------------------\n\t-- You have won!! --\n\t--------------------"
const lostMsgConfig = "\n\t-------------------\n\t-- You have lost --\n\t-------------------"
const errorMsg1Config = "Please only enter an alphabet or a guess with the same length as the word"
const errorMsg2Config = "Please enter y or n only"
const errorMsg3Config = "\nPlease enter one of the above options"
const errorMsg4Config = "\nUser has to be at least 4 characters and Password has to be at least 8 characters"
const errorMsg5Config = "\nThis username is taken"
const endMsgConfig = "END"
const noDataConfig = "There is no data"
const tryAgnConfig = "Please try again"
const creditsConfig = "\n\nCredits\nAuthor: Ao Yu"
const createUsernameConfig = "Please enter credentials\nUser: "
const createUserpassConfig = "Password: "
const confirmUserpassConfig = "Enter Password again: "
const regex = /^[A-Za-z]+$/

// declaration of values
var dictionary = new Array
var selecteddictionary = new Array
var arrayOfChosenWord = new Array
var wordLinesArray = new Array
var categories = new Array
var categoriesName = new Array
var wordLines = new String
var guess = new String
var hint = new String
var categoryChosen = new String

// assigning configs to values
var won = wonConfig
var tries = triesConfig
var hints = hintsConfig
var catques = catquesConfig
var loginFailures = loginFailuresConfig
var enterNumberPrompt = enterNumberPromptConfig
var guessPrompt = guessPromptConfig
var playAgainPrompt = playAgainPromptConfig
var hintPrompt = hintPromptConfig

// messages
function wonMsg() {console.log(wonMsgConfig)}
function lostMsg() {console.log(lostMsgConfig)}
function errorMsg1() {console.log(errorMsg1Config)}
function errorMsg2() {console.log(errorMsg2Config)}
function triesLeftMsg(tries) {console.log(`You have ${tries} lives left`)}
function endMsg() {console.log(endMsgConfig)}
function noData() {throw new Error(noDataConfig)}
function tryAgn() {console.log(tryAgnConfig)}

// reading dictionary from file
function readDict() {
    var data = fs.readFileSync("dictionary.txt", 'utf8');
    if (data == "") {
        noData()
    }
    else {
        dictionary = data.split('\n')
        for (i = 0; i < dictionary.length; i++) {
            dictionary[i] = JSON.parse(dictionary[i])
        }
    }
}

// main menu
function menu() {
    var choice = readline.question(menuMsgConfig)
    switch (choice) {
    case "1":
        login();
        break;
    case "2":
        main();
        break;
    case "3":
        createUser();
        break;
    case "4":
        console.log(creditsConfig)
        menu()
        break;
    default:
        console.log(errorMsg3Config)
        var choice = readline.question(menuMsgConfig)
    }
}

// hashing password
function hashencrypt(password) {
    password = hashprependConfig + password
    password = crypto.createHash('md5').update(password).digest('hex')
    return password
}

// create user
function createUser() {
    var data = fs.readFileSync("users.txt", 'utf8');
    if (data == "") {
        noData()
    }
    else {
        var createUsername = readline.question(createUsernameConfig)
        var createUserpass = readline.question(createUserpassConfig)
        var confirmUserpass = readline.question(confirmUserpassConfig)
        loginCreds = data.split('\n')
        for (i = 0; i < loginCreds.length; i++) {
            loginCreds[i] = JSON.parse(loginCreds[i])
            var newId = loginCreds[loginCreds.length - 1].id + 1
            if (createUsername == loginCreds[i].name) {
                console.log(errorMsg5Config)
                createUser()
            }
        }
        if(createUsername.length >= 4 && createUserpass.length >= 8 && confirmUserpass === createUserpass){
                var data = fs.appendFileSync("users.txt", `\n{"id": ${newId}, "name": "${createUsername}", "password": "${hashencrypt(createUserpass)}", "score": 0, "admin": 0}`);
        }
        else {
            console.log(errorMsg4Config)
        }
    }
}

// login failures function
function loginFail() {
    loginFailures -= 1
    tryAgn()
    login()
}

// login
function login() {
    var loginDetailsUser = readline.question("\nUser: ")
    var loginDetailsPassw = readline.question("Password: ")
    var data = fs.readFileSync("users.txt", 'utf8');
    if (data == "") {
        noData()
    }
    else {
        loginCred = data.split('\n')
        for (i = 0; i < loginCred.length; i++) {
            loginCred[i] = JSON.parse(loginCred[i])
            if (loginCred[i].name == loginDetailsUser && loginCred[i].password == hashencrypt(loginDetailsPassw)) {
                main()
            }
        }
        loginFail()
    }
}

// resetting values for next game
function reset() {
    selecteddictionary = []
    arrayOfChosenWord = []
    wordLinesArray = []
    catques = catquesConfig
    won = wonConfig
    tries = triesConfig
    hints = hintsConfig
}

// for replaying of game
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

// picking a category to play
function pickCat() {
    readDict()
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
    categoryChosen = readline.question(catques.concat(enterNumberPrompt))
    return categoryChosen
}

// random word generator from dictionary
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

// to get a hint if necessary
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

// game logic
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

menu()