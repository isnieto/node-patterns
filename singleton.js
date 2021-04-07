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

let score = null;
// Create ScoreBoard: singleTon pattern
class ScoreBoard{
    constructor(playerOne, playerTwo, winner) {
        if (!score) {
            this.playerOne = playerOne.name;
            this.playerTwo = playerTwo.name;
            this.firstScore = playerOne.score;
            this.secondScore = playerTwo.score;
            this.winner = winner;
            score =  this;
        } else {
            return score;
        }
    }//End constructor
    getWinner(){
        if (this.firstScore > this.secondScore){
            this.winner = this.playerOne;
        } else if (this.firstScore < this.secondScore){
            this.winner = this.playerTwo;
        } else {
            this.winner = "Nobody";
        }
        console.log(`Game Over. ${this.winner} wins. ${this.firstScore} to ${this.secondScore}}!`)
    }
}

// Create  Game: class pattern
class Game{
    constructor(score, firstPlayer, secondPlayer){
        this.score = score;
        this.firstPlayer = firstPlayer.name;
        this.secondPlayer = secondPlayer.name;
    }

    start(){
        let counter = 0;
        // Set rounds to play
        const rounds = +prompt("Let's Play! How many rounds would you like to play? ");
        // Repeat so often like rounds
        while (counter < rounds){
            ++counter;
            // Random a number to be guessed by Players
            let numberToGuess = Math.floor(Math.random() * 3)
            console.log(`This is the number to guess: ${numberToGuess}`);
            // Enter Player choices
            let firstChoice = +prompt(`${this.firstPlayer}, please enter a number between 0 and 3: `);
            let secondChoice = +prompt(`${this.secondPlayer}, please enter a number between 0 and 3: `);
            //Check result and modify scores
            if (firstChoice === numberToGuess && secondChoice !== numberToGuess){
                console.log(`${this.firstPlayer} wins this round! 100 Points. `)
                this.score.firstScore += 100;
            } else if (firstChoice !== numberToGuess && secondChoice === numberToGuess){
                console.log(`${this.secondPlayer} wins this round! 100 Points `)
                this.score.secondScore += 100;
            } else if (firstChoice === numberToGuess && secondChoice === numberToGuess){
                console.log(`Path situation. Both players get 50 Points. `)
                this.score.firstScore += 50;
                this.score.secondScore += 50;
            } else {
                console.log(`Nobody wins. Both players get 0 Points. `)
            }
        } // End While-loop
        console.log( this.score.firstScore, this.score.secondScore)
        this.score.getWinner();
    }// End start method
}

// Create playerFactory: Factory pattern
class PlayerFactory{
    createPlayers(name){
        return new Player(name);
    }
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
const scoreGame = new ScoreBoard(player1, player2, "pending");
const newGame = new Game(scoreGame, player1, player2)


//console.log(newGame);
newGame.start()