import {Fibonacci} from "../iterator/fibonachi.js";

describe('fibonacci', () => {
    test('8 elements', () => {
        const actual = Array.from(new Fibonacci(8));
        expect(actual)
            .toEqual([1, 1, 2, 3, 5, 8, 13, 21]);
    });
    test('2 elements', () => {
        const actual = Array.from(new Fibonacci(2));
        expect(actual)
            .toEqual([1, 1]);
    });
    test('1 element', () => {
        const actual = Array.from(new Fibonacci(1));
        expect(actual)
            .toEqual([1]);
    });
    test('sum of 8 elements', () => {
        const fib = new Fibonacci(8);
        let sum = 0;
        for (const elem of fib) {
            sum += elem;
        }
        expect(sum)
            .toBe(54);
    })
})