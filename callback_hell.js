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

// Read and reverse contents of text files in a directory
/* readdir(inbox, (error, files) => {
  if (error) return console.log("Error: Folder inaccessible");
  files.forEach(file => {
    readFile(join(inbox, file), "utf8", (error, data) => {
      if (error) return console.log("Error: File error");
      writeFile(join(outbox, file), reverseText(data), error => {
        if (error) return console.log("Error: File could not be saved!");
        console.log(`${file} was successfully saved in the outbox!`);
      });
    });
  });
});
 */
// With Promisses
const accessDir = (inbox) => {
    return new Promise( (resolve, reject) => {
      readdir(inbox, (error, files) => {
        if (error) return error;
        return files;
      });
    });
};

accessDir(inbox)
  .then(data => {console.log("First promise done!", data)})
  .catch(err => {console.log("It did not worked")});