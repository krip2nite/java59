import fs from 'node:fs';

fs.stat('./package.json', (err, stats) => {
    if(err){
        console.log(err);
    }
    else {
        console.log(stats);
    }
})

// fs.writeFile('./test.txt', 'Aloha!',function (err){
//     if(err)
//         console.log(err)
//     else
//         console.log('Files created successfully.');
// })

// fs.appendFile('./test.txt', '\nHello Java59!', function (err){
//     if(err)
//         console.log(err)
//      else
//         console.log('Files created successfully.');
// })
fs.readFile('./test.txt', 'utf-8', (err, data) => {
    if(err)
        console.log(err)
    else
        console.log(data);
})