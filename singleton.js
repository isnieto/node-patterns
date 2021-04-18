#!/usr/bin/env node
/* Nivell 2
- Exercici 1 - Singleton
Construeixi una aplicació que creï diversos jugadors. Els jugadors podran ser afegits a un Joc, 
que mostrarà un marcador amb les puntuacions i el guanyador.
 Podrà fixar en cada jugador punts guanyats o perduts perquè el marcador canvï. 
La classe Marcador deurà, com a requisit indispensable, implementar un patró Singleton. */

// Load modules
const prompt = require('prompt-sync')();

// Create Player: class pattern
class Player{
    constructor(name, score=0){
        this.name = name;
        this.score = score;
    }
}

// Create playerFactory: Factory pattern
class PlayerFactory{
    createPlayers(name){
        return new Player(name);
    }
}

// Create ScoreBoard: singleTon pattern
class ScoreBoard{
    constructor(playerOne, playerTwo, winner) {
            this.playerOne = playerOne.name;
            this.playerTwo = playerTwo.name;
            this.firstScore = playerOne.score;
            this.secondScore = playerTwo.score;
            this.winner = winner;
    }//End constructor
    
    // return instance
    static getInstance(playerOne, playerTwo, winner){
        if (!this._instance) {
            this._instance = new ScoreBoard(playerOne, playerTwo, winner);
        } 
        return this._instance;
    }
    // Pull out current score
    showScore(){
        console.log(`Current score is: ${this.firstScore} to ${this.secondScore}!\n`);
    }

    // Check who wins
    getWinner(){
        if (this.firstScore > this.secondScore){
            this.winner = this.playerOne;
        } else if (this.firstScore < this.secondScore){
            this.winner = this.playerTwo;
        } else {
            this.winner = "Nobody";
        }
        console.log(`Game Over. ${this.winner} wins: ${this.firstScore} to ${this.secondScore}!`)
    }
} // End Scoreborad

// Create  Game: class pattern
class Game{
    constructor(score, firstPlayer, secondPlayer){
        this.score = score;
        this.firstPlayer = firstPlayer.name;
        this.secondPlayer = secondPlayer.name;
    }
    //Start 
    start(){
        // Set rounds to play
        const gameTimes = +prompt("Let's Play! How many rounds would you like to play? ");
        // Repeat so often like rounds
        this.gameInProcess(gameTimes);
        this.score.getWinner();
    }// End start method
    //Gameplay
    gameInProcess(rounds){
        let counter = 0;
        while (counter < rounds){
            ++counter;
            // Random a number to be guessed by Players
            let numberToGuess = Math.floor(Math.random() * 3)
            //console.log(`This is the number to guess: ${numberToGuess}`);
            // Enter Player choices
            let firstChoice = +prompt(`${this.firstPlayer}, please enter a number between 0 and 3: `);
            let secondChoice = +prompt(`${this.secondPlayer}, please enter a number between 0 and 3: `);
            //Check result and modify scores
            if (firstChoice === numberToGuess && secondChoice !== numberToGuess){
                console.log(`${this.firstPlayer} wins this round! 100 Points. `)
                this.score.firstScore += 100;
                this.score.showScore();
            } else if (firstChoice !== numberToGuess && secondChoice === numberToGuess){
                console.log(`${this.secondPlayer} wins this round! 100 Points `)
                this.score.secondScore += 100;
                this.score.showScore();
            } else if (firstChoice === numberToGuess && secondChoice === numberToGuess){
                console.log(`Path situation. Both players get 50 Points. `)
                this.score.firstScore += 50;
                this.score.secondScore += 50;
                this.score.showScore();
            } else {
                console.log(`Nobody wins. Both players get 0 Points. `);
                this.score.showScore();
            }
        } // End While-loop
        
    }//End gameInProcess
}


// class factory declares
const players = new PlayerFactory();

// Application starts
//Enter players
const namePlayer1 = prompt('Name of first player: ');
const player1 = players.createPlayers(namePlayer1);
const namePlayer2 = prompt('Name of second player: ');
const player2 = players.createPlayers(namePlayer2);

//Starts game
const scoreGame = ScoreBoard.getInstance(player1, player2, "pending");
const newGame = new Game(scoreGame, player1, player2)


//console.log(newGame);
newGame.start()