export function Range(from, to) {
    // TDD?
    this.from = from;
    this.to = to;
    //*this[Symbol.iterator](); //same
    this[Symbol.iterator] = function* (){
        for(let i = this.from; i <= this.to; i++) {
            yield i;
        }
    }
}

console.log("==== for-of ====")
const range = new Range(1, 4);
for (const rangeElement of range) {
    console.log(rangeElement);
}

console.log('=== iterator of range====');
let iterator = range[Symbol.iterator]();
let res = iterator.next();
while (!res.done) {
    console.log(res.value);
    res = iterator.next();
}