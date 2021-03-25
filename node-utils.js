// Load modules
// Create an instance of readline by configuring the readable and the writable streams
const readline = require('readline');
// Load module to read file json.
const fs = require ('fs');


// Creates a interface to read Userinput
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Hola Jonatan");
console.log("1) Exercise 1 (Level 1)");
console.log("2) Exercise 2 (Level 1)");
console.log("3) Exercise 3 (Level 1)");
console.log("4) Exercise 1 (Level 2)");
rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case '0':
        return rl.close();
    case '1':
        console.log('Exercise 1, level 1!');
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
        setTimeout(()=>{
            console.log("Please, choose another option");
        }, 5000);
        break;
    case '2':
        console.log('Exercise 2, level 1!');
        /* - Exercici 2
        Creu una funció que, en executar-la, escrigui el seu nom en un fitxer. */

        const writeFunctionName = () => {

            fs.writeFile("./texto.txt", "writeFunctionName", (error)=>{
                if (error) throw error;
                console.log("Name was succesfully written");
            });
        }
        writeFunctionName();
        setTimeout(()=>{
            console.log("Please, choose another option");
        }, 1000);
        break;
    case '3':
      console.log('Exercise 3, level 1!');
      /* - Exercici 3
        Creu una altra que imprimeixi per pantalla el que llegeixi d'un fitxer. */
        const outputFileContent = () => {

            fs.readFile("./texto.txt",  (error, data)=>{
                if (error) throw error;
                console.log(`Following content was found in the file: ${data}.`);
            });
        }
        outputFileContent();
        setTimeout(()=>{
            console.log("Please, choose another option");
        }, 1000);
        break;
    default:
      console.log(`No such an option. Please, try another number.`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

