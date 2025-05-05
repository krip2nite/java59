import fs from 'fs';
import { differenceInYears } from "date-fns";

// Total salary
// Total employees
// Average salary
// Average age
fs.readFile('./employees.csv','utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        const lines = data.trim().split('\r\n');
        const headers = lines[0].split(',');
        const res = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index].trim();
                return obj;
            }, {});
        });
        const total = res.reduce((sum, employee) => {
            return sum + Number(employee.Salary);
        }, 0)
        const totalEmployees = res.length
        let totalAge = res.reduce((sum, employee) => {
            const age = differenceInYears(new Date(), new Date(employee.Birthdate));
            return sum + age;
        }, 0);
        console.log('Total salary:', total);
        console.log('Total employees:', totalEmployees);
        const avgSalary = total/ totalEmployees;
        console.log('Average salary:', avgSalary);
        console.log(totalAge/ totalEmployees);
    }
})