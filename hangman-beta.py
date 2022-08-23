#imports
import hashlib, random

# configurations
hashprependConfig = "no password for u "
wonConfig = 0
triesConfig = 5
hintsConfig = 1
loginFailuresConfig = 3
menuMsgConfig = "\nWelcome to The HANGHANGMAN\n\nSelect an option\n1. Leaderboard\n2. Log In\n3. Play as Guest\n4. Create an Account\n5. Game Credits\n(Please enter the number): "
catquesConfig = '\nPlease choose a category'
enterNumberPromptConfig = "\n(Please enter the number): "
guessPromptConfig = "\nGuess a letter or the entire word: "
playAgainPromptConfig = "\nPlay again? (y/n): "
hintPromptConfig = "Would you like a hint? (y/n): "
wonMsgConfig = "\n\t--------------------\n\t-- You have won!! --\n\t--------------------"
lostMsgConfig = "\n\t-------------------\n\t-- You have lost --\n\t-------------------"
errorMsg1Config = "Please only enter an alphabet or a guess with the same length as the word"
errorMsg2Config = "Please enter y or n only"
errorMsg3Config = "\nPlease enter one of the above options"
errorMsg4Config = "\nUser has to be at least 4 characters and Password has to be at least 8 characters"
errorMsg5Config = "\nThis username is taken"
endMsgConfig = "END"
noDataConfig = "There is no data"
tryAgnConfig = "Please try again"
creditsConfig = "\n\nCredits\nAuthor: Ao Yu"
createUsernameConfig = "Please enter credentials\nUser: "
createUserpassConfig = "Password: "
confirmUserpassConfig = "Enter Password again: "
leaderboardConfig = "\nLeaderboard:\n"
regex = '/^[A-Za-z]+$/'

# declaration of values
dictionary = []
selecteddictionary = []
arrayOfChosenWord = []
wordLinesArray = []
categories = []
categoriesName = []
pointsarr = []
wordLines = ""
guess = ""
hint = ""
categoryChosen = ""
loginId = 0
usersPoints = 0

# assigning configs to values
won = wonConfig
tries = triesConfig
hints = hintsConfig
catques = catquesConfig
loginFailures = loginFailuresConfig
enterNumberPrompt = enterNumberPromptConfig
guessPrompt = guessPromptConfig
playAgainPrompt = playAgainPromptConfig
hintPrompt = hintPromptConfig

# messages
def wonMsg(): print(wonMsgConfig)
def lostMsg(): print(lostMsgConfig)
def errorMsg1(): print(errorMsg1Config)
def errorMsg2(): print(errorMsg2Config)
def triesLeftMsg(tries): print(f'You have {tries} lives left')
def endMsg(): print(endMsgConfig)
def noData(): raise Exception(noDataConfig)
def tryAgn(): print(tryAgnConfig)




def sortFunction(a,b):
  if a[1] == b[1]:
    return 0
  else:
    return
    # return (a[1] < b[1] ? 1: -1)

def readDict():
  data = open("dictionary.txt", "r")
  if data.read() == "":
    noData()
  else:
    dictionary = data.split('\n')
    return dictionary
    # for i in dictionary.length:
    #   dictionary[i] = 

def menu():
  choice = input(menuMsgConfig)

  if choice == "1":
    leaderboard()
  elif choice == "2":
    login()
  elif choice == "3":
    main()
  elif choice == "4":
    createUser()
  elif choice == "5":
    print(creditsConfig)
    menu()
  else:
    print(errorMsg3Config)
    choice = input(menuMsgConfig)


def hashencrypt(password):
  password = hashprependConfig + password
  password = hashlib.md5(password.encode())
  return password

def createUser():
  data = open("dictionary.txt", "r")
  if data.read() == "":
    noData()
  else:
    createUsername = input(createUsernameConfig)
    createUserpass = input(createUserpassConfig)
    confirmUserpass = input(confirmUserpassConfig)
    loginCreds = data.split('\n')
    for i in loginCreds.length:
      newId = loginCreds[loginCreds.length - 1].id + 1
      if createUsername == loginCreds[i].name:
        print(errorMsg5Config)
        createUser()
    if createUsername.length >= 4 and createUserpass.length >= 8 and createUserpass == confirmUserpass:
      f = open("users.txt", "a")
      f.write(f'\n\{"id":{newId},"name":"{createUsername}","password":"{hashencrypt(createUserpass)}","score":0,"admin":0}')
      f.close()
    else:
      print(errorMsg4Config)

def leaderboard():
  data = open("users.txt", "r")
  if data.read() == "":
    noData()
  else:
    pointslbdata = data.split('\n')
    for i in pointslbdata.length:
      if pointslbdata[i].score != 0:
        pointsarr.append([{pointslbdata[i].name}, pointslbdata[i].score])
    pointsarr.sort()
    # pointsarr = '\n'.join(pointsarr)
    # pointsarr = pointsarr.replace()
    print(pointsarr)

def loginFail():
  loginFailures -= 1
  tryAgn()
  login()

def login():
  loginDetailsUser = input("\nUser: ")
  loginDetailsPassw = input("Password:")
  data = open("users.txt", "r")
  if data.read() == "":
    noData()
  else:
    loginCred = data.split('\n')
    for i in loginCred.length:
      if loginCred[i].name == loginDetailsUser and loginCred[i].password == hashencrypt(loginDetailsPassw):
        loginId = loginCred[i].id
        main()
        return

    loginFail()

def points():
  data = open("users.txt", "r")
  if data.read() == "":
    noData()
  else:
    pointsdata = data.split('\n')
    for i in pointsdata.length:
      if loginId == pointsdata[i].id:
        pointsdata[i].score += 100
    f = open("users.txt", "a")
    f.write(pointsdata)
    f.close()

def reset():
  selecteddictionary = []
  arrayOfChosenWord = []
  wordLinesArray = []
  catques = catquesConfig
  won = wonConfig
  tries = triesConfig
  hints = hintsConfig

def replay():
  replay = ""
  while "y" not in replay and "n" not in replay:
    replay = input(playAgainPrompt).lower()
    if "y" in replay:
      main()
    elif "n" in replay:
      endMsg()
    else:
      errorMsg2

def pickCat():
  readDict()
  for t in dictionary.length:
    categories[t] = dictionary[t].cat
    categoriesName[t] = dictionary[t].catName


def randomWordPicker():
  for i in dictionary.length:
    if dictionary[i].cat == categoryChosen:
      selecteddictionary.push(dictionary[i])
  randomNumber= random.randint(0, selecteddictionary.length-1)
  chosenWord = selecteddictionary[randomNumber].name
  for i in chosenWord.length:
    arrayOfChosenWord[i] = chosenWord.charAt(i).upper()
  for e in arrayOfChosenWord.length:
    if arrayOfChosenWord[e] == " " or arrayOfChosenWord[e] == "-":
      wordLinesArray[e] = arrayOfChosenWord[e]
    else:
      wordLinesArray[e] = "_"
  wordLines = wordLinesArray.join(" ")
  print("\n", wordLines)
  return randomNumber

def getHint(randomNumber):
  hintOfChosenWord = selecteddictionary[randomNumber].hint
  needHint = input(hintPrompt)
  if needHint.includes("y"):
    print(hintOfChosenWord)
  elif needHint.includes("n"):
    return
  else:
    errorMsg2()
    getHint(randomNumber)

def guessWord():
  if arrayOfChosenWord.join("").includes(guess.upper()):
    if guess.length == 0:
      errorMsg1
    elif guess.length >= 1 and guess.split("").length != arrayOfChosenWord.length:
      tries -= 1
      triesLeftMsg(tries)
      errorMsg1()
    elif guess.length == 1:
      for i in arrayOfChosenWord.length:
        if arrayOfChosenWord[i].includes(guess.upper()):
          wordLinesArray[i] = arrayOfChosenWord[i]
          if wordLinesArray.includes("_"):
            print("\n", wordLinesArray.join(" "))
          elif won == 0:
            won = 1
            print("\n", wordLinesArray.join(" "))
            points()
            wonMsg()
            replay()
          else:
            print("error 1")
    else:
      errorMsg1()
  elif regex.test(guess) == True:
    tries -= 1
    triesLeftMsg(tries)
  else:
    errorMsg1()

def main():
  reset()
  pickCat()
  randomNumber = randomWordPicker()
  while tries > 0 and won == 0:
    if tries == 3 and hints > 0:
      getHint(randomNumber)
      hints -= 1
    guessWord()
  if tries == 0:
    lostMsg()
    replay()

menu()