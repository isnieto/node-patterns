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
            console.log(`The recursive function repeats this message: ${counter++} time(s)`);
        }, time);
        time = time - 1000;
        return recursiveFunction();
    }
} 
recursiveFunction();

/* - Exercici 2
Creu una funció que, en executar-la, escrigui el seu nom en un fitxer. */

const fs = require('fs')

const writeFunctionName = () => {

    fs.writeFile("./texto.txt", "printFuncionName", (error)=>{
        if (error) throw error;
        console.log("Name was succesfully written");
    });
}
writeFunctionName();

/* - Exercici 3
Creu una altra que imprimeixi per pantalla el que llegeixi d'un fitxer. */

const outputFileContent = () => {

    fs.readFile("./texto.txt",  (error, data)=>{
        if (error) throw error;
        console.log(`Following content was found in the file: ${data}.`);

    });
}
outputFileContent();