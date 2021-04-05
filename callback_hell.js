const {
  readdir,
  readFile,
  writeFile
} = require("fs");

const {
  join
} = require("path");

const inbox = join(__dirname, "inbox");
console.log(inbox);
const outbox = join(__dirname, "outbox");

const reverseText = str =>
  str
  .split("")
  .reverse()
  .join("");


// With Promisses
const accessDir = (inbox) => {
    return new Promise( (resolve, reject) => {
      readdir(inbox, (error, files) => {
        //if (error) return error;
        resolve(files);
      });
    });
};

const readData = (file)=> {
  return new Promise((resolve, reject) => {
    readFile(join(inbox, file), "utf8", (error, data) => {
      resolve(data);
    });
  });
}


accessDir(inbox)
  .then(files => {
    files.forEach(file => {
      readData(file)
        .then(data => {
            writeFile(join(outbox, file), reverseText(data), error => {
              console.log(`${file} was successfully saved in the outbox!`);
            });
        })
    })
  }) 
  .catch(console.log("Error"));
    
      
    

  