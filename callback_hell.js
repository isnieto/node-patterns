const {
  readdir,
  readFile,
  writeFile
} = require("fs");

const {
  join
} = require("path");

const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
  str
  .split("")
  .reverse()
  .join("");

// Read and reverse contents of text files in a directory
// readdir(inbox, (error, files) => {
//   if (error) return console.log("Error: Folder inaccessible");
//   files.forEach(file => {
//     readFile(join(inbox, file), "utf8", (error, data) => {
//       if (error) return console.log("Error: File error");
//       writeFile(join(outbox, file), reverseText(data), error => {
//         if (error) return console.log("Error: File could not be saved!");
//         console.log(`${file} was successfully saved in the outbox!`);
//       });
//     });
//   });
// });
// With AsyncAwait
const accessDir = (inbox) => {
  return new Promise( (resolve, reject) => {
    readdir(inbox, (error, files) => {
      if (error) return reject(new Error("Error: Folder inaccessible"));
      resolve(files);
    });
  });
};
const readData = (inbox, file) => {
  return new Promise( (resolve, reject) => {
    readFile( join(inbox, file), "utf8", (error, data) => {
      if (error) return console.log("Error: File error");
      resolve(data)
    });
  });
};

const writeData =  (outbox, file, data) => {
     writeFile(join(outbox, file), reverseText(data), error => {
      if (error) return console.log("Error: File could not be saved!");
      console.log(`${file} was successfully saved in the outbox!`);
    }); 
}

const start = async () => {
  try {
    const files = await accessDir(inbox); 
    files.forEach(file =>{
      readData(inbox, file).then(datos => writeData(outbox, file, datos))
    })
  } catch (error){
    console.log(error, "!!!!");
  }
} // End accessDir

// Start Function
start()

// With Promisses
/* const accessDir = (inbox) => {
  return new Promise( (resolve, reject) => {
    readdir(inbox, (error, files) => {
      if (error) return reject(new Error("Error: Folder inaccessible"));
      resolve(files);
    });
  });
};

const readData = (file) => {
  return new Promise((resolve, reject) => {
    readFile( join(inbox, file), "utf8", (error, data) =>{
      if (error) return reject(new Error("Error: File error"));
      resolve(data);
    });
  });
};

accessDir(inbox)
  .then(files => {
    files.forEach(file => {
      readData(file)
        .then(data => {
            writeFile(join(outbox, file), reverseText(data), error => {
              if (error) return console.log("Error: File could not be saved!");
              console.log(`${file} was successfully saved in the outbox!`);
            });
        })
    })
  }) 
  .catch(error); */

  
    
      
    

  