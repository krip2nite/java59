import readline from "readline";
import fs from 'fs';

const filestream = fs.createReadStream('../train.csv','utf8')

const reader = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
})

let isFirstLine = true;
let totalFare = 0;
let totalSurvived = {};
let averageFare = {};
let totalSurvivedByGender ={};
let linesArray = [];

reader.on('line', (data) => {
    if (isFirstLine){
        isFirstLine = false;
        return;
    }
    data = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    linesArray.push(data);
    averageFare = linesArray.map(c => ({pClass: c[2], fare: +c[9]}))
        .reduce((acc, info) => {
            const key = info.pClass;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(info.fare);
            return acc;
        }, {})
    for (const key in averageFare) {
        averageFare[key] = +(averageFare[key].reduce((a, b) => a + b) / averageFare[key].length).toFixed(2);
    }
    totalSurvived = linesArray.reduce((acc, c) => {
            const key = +c[1] ? 'Survived' : 'Non survived';
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key]++;
            return acc;
        }, {})

    totalSurvivedByGender = linesArray.reduce((acc, p)=>{
        const survived = +p[1] ? 'Survived' : 'Non Survived';
        const age = parseFloat(p[5])
        let group;
        if (!isNaN(age)&& age <18)
        {
            group = 'Children'
        }
        else {
            group = p[4] === 'male' ? 'Men' : 'Women';
        }
        if(!acc[group]){
            acc[group] = {'Survived' :0, 'Non Survived':0}
        }
        acc[group][survived]++
        return acc;
    }, {})
    totalFare += +data[9];
})
reader.on('close', () => {
    console.log('The total fare is:', + totalFare.toFixed(2));
    console.log('Total survived: \n' + JSON.stringify(totalSurvived, null, 2));
    console.log('Average Fare by classes: \n' + JSON.stringify(averageFare, null, 2));
    console.log('Survived by gender: \n' + JSON.stringify(totalSurvivedByGender, null, 2));
})