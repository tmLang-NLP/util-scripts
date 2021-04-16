const fs = require("fs");
const pdf = require("pdf-parse");

const tmChars = "žäwertyuiopňöşasdfghjklzüçýbnm- ";

console.log(process.argv);

if (process.argv.length < 4) {
  console.error("Arguments please");
  process.exit();
}

const pathOfPDF = process.argv[2];
const pathOfTXT = process.argv[3];
let isLower = true;

if (process.argv.length > 4 && process.argv[4] === "0") isLower = false;

let dataBuffer = fs.readFileSync(pathOfPDF);

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);

  // number of rendered pages
  console.log(data.numrender);

  // PDF info
  console.log(data.numpages);

  // PDF metadata
  console.log(data.metadata);

  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/

  console.log(data.version);

  // PDF text

  let text = "",
    last = "";

  for (let ch of data.text) {
    if (!tmChars.includes(ch.toLowerCase())) ch = " ";
    if (last === " " && ch === " ") continue;

    if (isLower) ch = ch.toLowerCase();

    text += ch;
    last = ch;
  }

  console.log(text);

  fs.writeFileSync(pathOfTXT, text);
});

/*
kim!!sen
// default render callback
function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
 
    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            }  
            else{
                text += '\n' + item.str;
            }    
            lastY = item.transform[5];
        }
        return text;
    });
}
 
let options = {
    pagerender: render_page
}
 
let dataBuffer = fs.readFileSync('path to PDF file...');
 
pdf(dataBuffer,options).then(function(data) {
    //use new format
});
Options
const DEFAULT_OPTIONS = {
    // internal page parser callback
    // you can set this option, if you need another format except raw text
    pagerender: render_page,
    // max page number to parse
    max: 0,
    //check https://mozilla.github.io/pdf.js/getting_started/
    version: 'v1.10.100'
}
*/
