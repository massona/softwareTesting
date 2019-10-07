const Interval = require('./interval');


    var interval1 = new Interval(1,4);
    var interval2 = new Interval(5,9);
    var interval3 = new Interval(3,7);
    var interval4 = new Interval(6,8);
    var interval5 = new Interval(2,5);
    var interval6 = new Interval(4, 10);
    var interval7 = new Interval(2, 7);
    var interval8 = new Interval(4, 5);

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

describe('union', function () {
    var interval = new Interval(4,7);
    test.each([
        [new Interval(5,6), [new Interval(4,7)]],
        [new Interval(10,14), [new Interval(4,7), new Interval(10,14)]],
        [new Interval(0,2), [new Interval(4,7), new Interval(0,2)]],
        [new Interval(1,3), [new Interval(4,7), new Interval(1,3)]],
        
    ])(
        'union %s %s',
        (n, expected) => {
            expect(interval.union(n)).toStrictEqual(expected);
        }
    );
});

describe('intersection', function () {

	test('Test de intersection de (2,5) et (6,8) => taille de 0', () => {
    	expect(interval5.intersection(interval4).length).toBe(0);
	});

	test('Test intersection de (2,5) et (3,7) => taille de 1', () => {
    	expect(interval5.intersection(interval3).length).toBe(1);
	});
});

describe('exclusion', function () {
	test('Test exclusion de (2,5) et (6,8) => taille de 2', () => {
    	expect(interval5.exclusion(interval4).length).toBe(2);
	});

	test('Test exclusion de (2,5) et (3,7) => taille de 2', () => {
    	expect(interval5.exclusion(interval3).length).toBe(2);
	});

	test('Test exclusion de (4,10) et (2,5) => [2,4], [5,10]', () => {
		var excl = interval6.exclusion(interval5);
    	expect(excl[0]).toEqual(new Interval(2,4));
    	expect(excl[1]).toEqual(new Interval(5,10));
	});

	test('Test exclusion de (2,5) et (2, 7) => [5,7]', () => {
		var excl = interval5.exclusion(interval7);
    	expect(excl[0]).toEqual(new Interval(5,7));
	});

	test('Test exclusion de (2,5) et (4, 5) => [2,4]', () => {
		var excl = interval5.exclusion(interval8);
    	expect(excl[0]).toEqual(new Interval(2,4));
	});

});