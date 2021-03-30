#!/usr/bin/env node

// Load modules
// Create an instance of readline by configuring the readable and the writable streams
const readline = require('readline');
// Load module to read file json.
const fs = require ('fs');
// Load // Load module to gzip files.
const zlib = require('zlib');


// Creates a interface to read Userinput
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let questions = [ 
        "1) Exercise 1 (Level 1)", 
        "2) Exercise 2 (Level 1)",
        "3) Exercise 3 (Level 1)", 
        "4) Exercise 1 (Level 2)",
        "0 to Exit."];

console.log("Please choose an exercise: ");
// print menu options
questions.map(question => console.log(question));


rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case '0':
        return rl.close();
    case '1':
        console.log('Exercise 1, level 1: Creu una funció que imprimeixi recursivamente un missatge per consola amb demores d\'un segon.!');
        /* - Exercici 1
        Creu una funció que imprimeixi recursivament un missatge per consola amb demores d'un segon. 
        */
        let time = 5000;
        let counter = 1;
        const recursiveFunction = () => {
            if (time <= 0){
                return;
            } else {
                setTimeout(() => {
                    console.log(`The recursive function repeats this message: ${counter++} time(s) per second`);
                }, time);
                time = time - 1000;
                return recursiveFunction();
            }
        } 
        recursiveFunction();
        break;
    case '2':
        console.log('Exercise 2, level 1: Creu una funció que, en executar-la, escrigui el seu nom en un fitxer.');
        /* - Exercici 2
        Creu una funció que, en executar-la, escrigui el seu nom en un fitxer. */

        const writeFunctionName = () => {

            fs.writeFile("./texto.txt", "writeFunctionName", (error)=>{
                if (error) throw error;
                console.log("Name was succesfully written in text file");
            });
        }
        writeFunctionName();
        break;
    case '3':
      console.log('Exercise 3, level 1: Creu una altra que imprimeixi per pantalla el que llegeixi d\'un fitxer.');
      /* - Exercici 3
        Creu una altra que imprimeixi per pantalla el que llegeixi d'un fitxer. */
        const outputFileContent = () => {

            fs.readFile("./texto.txt",  (error, data)=>{
                if (error) throw error;
                console.log(`Following content was found in the file: ${data}.`);
            });
        }
        outputFileContent();
        break;
    case '4':
        console.log('Exercise 1, level 2: Creu una funció que comprimeixi el file del nivell 1');
        /* Exercise 1, level 2: Creu una funció que comprimeixi el file del nivell 1 */
        var zip = zlib.createGzip();
        var readFile = fs.createReadStream('./texto.txt');
        var writeFile = fs.createWriteStream('./new.txt.gz');
        //Transform stream which is zipping the input file
        readFile.pipe(zip).pipe(writeFile);	
        console.log("File was succesfully zipped!");				
        break;

    default:
      console.log(`No such an exercise. Please, try another number.`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

