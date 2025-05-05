// fibonacci with generator
export function Fibonacci(quantity) {
    this.quantity = quantity;
    this[Symbol.iterator] = function* () {
        let prev = 1;
        let prevPrev = 1;
        let count = 1;
        while (count <= this.quantity) {
            if (count++ <= 2) {
                yield 1;
            } else {
                const current = prev;
                prev = prev + prevPrev;
                prevPrev = current;
                yield prev;
            }
        }
    }
}