import fs from 'fs';
import {parse} from 'csv-parse';

fs.readFile('../train.csv', 'utf8',(err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    parse(data,{columns:true, skip_empty_lines: true, trim: true}, (err, records) => {
        if(err){
            console.log(err);
            return;
        }
        const totalFare = records.reduce((sum, passenger)=>{
            return sum + parseFloat(passenger.Fare || 0);
        }, 0)

        const averageFare = records.reduce((acc, res)=> {
            res = records.reduce((acc, passenger) => {
                const key = passenger.Pclass;
                if (!acc[key]) {
                    acc[key] = {eachFare: 0, count: 0};
                }
                if (passenger.Fare != NaN) {
                    acc[key].eachFare += +passenger.Fare;
                    acc[key].count++;
                }
                return acc;
            }, {});
            for (let key in res) {
                const total = res[key].eachFare;
                const count = res[key].count;
                acc[key] = (total/count).toFixed(2);
            }
            return acc
        }, {});
        const totalSurvived = records.reduce((acc, p)=>{
            const key = +p.Survived ? 'Survived' : 'Non Survived';
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] ++;
            return acc;
        }, {})

        const totalSurvivedByGender = records.reduce((acc, p)=>{
            const survived = +p.Survived ? 'Survived' : 'Non Survived';
            const age = parseFloat(p.Age)
            let group;
            if (!isNaN(age)&& age <18)
            {
                group = 'Children'
            }
            else {
                group = p.Sex === 'male' ? 'Men' : 'Women';
            }
            if(!acc[group]){
                acc[group] = {'Survived' :0, 'Non Survived':0}
            }
            acc[group][survived]++
            return acc;
        }, {})

        console.log('The total fare is:', + totalFare.toFixed(2));
        console.log('Total survived: \n' + JSON.stringify(totalSurvived, null, 2));
        console.log('Average Fare by classes: \n' + JSON.stringify(averageFare, null, 2));
        console.log('Survived by gender: \n' + JSON.stringify(totalSurvivedByGender, null, 2));
    });
})