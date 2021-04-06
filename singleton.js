#!/usr/bin/env node
/* Nivell 2
- Exercici 1 - Singleton
Construeixi una aplicació que creï diversos jugadors. Els jugadors podran ser afegits a un Joc, que mostrarà un marcador amb les puntuacions i el guanyador.
 Podrà fixar en cada jugador punts guanyats o perduts perquè el marcador canviï. 
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
    constructor(firstScore, secondScore, winner) {
        if (!score) {
            this.firstScore = firstScore;
            this.secondScore = secondScore;
            this.winner = winner;
            score =  this;
        } else {
            return score;
        }
    }
}

// Create  Game: class pattern
class Game{
    constructor(score, firstPlayer, secondPlayer){
        this.score = score;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
    }
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

const namePlayer1 = prompt('What is your name?');
const player1 = players.createPlayers(namePlayer1);
const namePlayer2 = prompt('Please enter also your name?');
const player2 = players.createPlayers(namePlayer2);

//Starts game
const scoreGame = new ScoreBoard(0, 0, "pending");
const newGame = new Game(scoreGame, player1, player2)


console.log(newGame);