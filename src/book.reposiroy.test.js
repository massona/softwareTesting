const BookRepository = require('./book.repository');

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test"});

        expect(dbMock.write.mock.calls.length).toBe(1);
    });
});

describe('Book repository Count', function () {

    test('Count 5 books', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(5)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalCount()).toBe(5);
    });
});

describe('Book repository Price', function () {

    test('Get total price of 1,2,3,4,5,6,7,8,9', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            map : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue([1,2,3,4,5,6,7,8,9])
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalPrice()).toBe(45);
    });
});