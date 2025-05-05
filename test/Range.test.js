import {Range} from "../iterator/range.js";

describe('range', () => {
    test('should return range 1-5', () => {
        const actual = Array.from(new Range(1, 5));
        expect(actual).toEqual([1, 2, 3, 4, 5]);
    })
    test('should return range 2-3', () => {
        const actual = Array.from(new Range(2, 3));
        expect(actual).toEqual([2, 3]);
    })
    test('should return range 5-5', () => {
        const actual = Array.from(new Range(5, 5));
        expect(actual).toEqual([5]);
    })
    test('should return range 1-5', () => {
        const actual = Array.from(new Range(5, 1));
        expect(actual).toEqual([]);
    })
})