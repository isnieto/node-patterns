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