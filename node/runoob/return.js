var fs=require("fs");

//var data = fs.readFileSync('input.txt');
//
//console.log( data.toString());
//console.log("End");

fs.readFile('input.txt',function(err,data){
    if(err){
        console.error(err.stark);
        return; 
    }
    console.log(data.toString());
} );

console.log("End");