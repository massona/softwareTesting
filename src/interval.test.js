const Interval = require('./interval');

    var interval1 = new Interval(1,4);
    var interval2 = new Interval(5,9);
    var interval3 = new Interval(3,7);
    var interval4 = new Interval(6,7)

describe('overlaps', function () {

    test('Test overlaps de (1,4) et (5,9) => false', () => {
        expect(interval1.overlaps(interval2)).toBe(false);
    });

    test('Test overlaps de (1,4) et (3,7) => true', () => {
        expect(interval1.overlaps(interval3)).toBe(true);
    });
});

describe('includes', function () {

    test('Test includes de (5,9) et (6,7) => true', () => {
        expect(interval2.includes(interval4)).toBe(true);
    });

    test('Test includes de (1,4) et (3,7) => false', () => {
        expect(interval2.includes(interval3)).toBe(false);
    });
});