const fs = require("fs");
const pdf = require("pdf-parse");

const includedChars = "žäwertyuiopňöşasdfghjklzüçýbnm- ";

if (process.argv.length < 4) {
  console.error("Wrong number of arguments, expected 3");
  process.exit();
}

const pathOfPDF = process.argv[2];
const pathOfTXT = process.argv[3];
let isLower = true;

if (process.argv.length > 4 && process.argv[4] === "0") isLower = false;

let dataBuffer = fs.readFileSync(pathOfPDF);

pdf(dataBuffer).then(function (data) {
  let text = "",
    last = "";

  for (let ch of data.text) {
    if (!includedChars.includes(ch.toLowerCase())) ch = " ";
    if (last === " " && ch === " ") continue;

    if (isLower) ch = ch.toLowerCase();

    text += ch;
    last = ch;
  }

  fs.writeFileSync(pathOfTXT, text);
});
