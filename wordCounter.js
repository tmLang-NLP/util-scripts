console.log(process.argv);
if(process.argv.length === 2) {
    console.log("please enter argv"); 
    process.exit();
} 

const fs = require("fs"); 

let text = fs.readFileSync(process.argv[2]); 
text = text.toString();
console.log(text);

const res = {};

const set = text.split(' ');

for(let i of set){
    if(!res[i]) res[i]=0;
    res[i]++;
}
delete res[''];

const arr = [];

for(let i in res){
    arr.push([i, res[i]]);
}

arr.sort(function(a,b){
    return b[1] - a[1];
})

const result = [];

for(i of arr){
    result.push({"word": i[0], "count": i[1]});
}
// console.log(result);


fs.writeFileSync("1.json", JSON.stringify(result));
