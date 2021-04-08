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

// Function with exericises

function getExercises(choice){
    let exercises ={

        '1': function(){
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
                return 'Exercise 1, level 1: Creu una funció que imprimeixi recursivamente un missatge per consola amb demores d\'un segon.!' 
        },
        '2': function(){
                const writeFunctionName = () => {
                    fs.writeFile("./texto.txt", "writeFunctionName", (error)=>{
                        if (error) throw error;
                        console.log("Name was succesfully written in text file");
                    });
                }
                writeFunctionName();
                return 'Exercise 2, level 1: Creu una funció que, en executar-la, escrigui el seu nom en un fitxer.';
        },
        '3': function(){
                const outputFileContent = () => {

                    fs.readFile("./texto.txt",  (error, data)=>{
                        if (error) throw error;
                        return `Following content was found in the file: ${data}.`;
                    });
                }
                outputFileContent();
                return 'Exercise 3, level 1: Creu una altra que imprimeixi per pantalla el que llegeixi d\'un fitxer.';
        },
        '4': function(){
                /* Exercise 1, level 2: Creu una funció que comprimeixi el file del nivell 1 */
                let zip = zlib.createGzip();
                let readFile = fs.createReadStream('./texto.txt');
                let writeFile = fs.createWriteStream('./new.txt.gz');
                //Transform stream which is zipping the input file
                readFile.pipe(zip).pipe(writeFile);	
                return "File was succesfully zipped!";
        }, 
        '5': function(){
            rl.close();
        }
    } // Object end

    return exercises[choice]();
}






console.log("Please choose an exercise: ");
// print menu options
let questions = [ 
        "1) Exercise 1 (Level 1)", 
        "2) Exercise 2 (Level 1)",
        "3) Exercise 3 (Level 1)", 
        "4) Exercise 1 (Level 2)",
        "5) Exit program"]

        questions.map(question => console.log(question));

// Start prompt to take user input
rl.prompt();
rl.on('line', (line) => {
    console.log(getExercises(line));
  rl.prompt();
});

rl.on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

