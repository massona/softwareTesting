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

describe('Book repository Get', function () {

    test('Get Narnia', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue([
                {
                    'id': 0,
                    'name': 'Picsou',
                    'price' : 20.99,
                    'added_at': '2016-09-04'
                },
                {
                    'id': 1,
                    'name': 'One Piece',
                    'price' : 17.99,
                    'added_at': '2004-12-05'
                },
                {
                    'id': 2,
                    'name': 'Narnia',
                    'price' : 12.50,
                    'added_at': '2001-06-24'
                },
            ])
            
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getBookByName('Narnia')).toStrictEqual([{
            'id': 2,
			'name': 'Narnia',
            'price' : 12.50,
            'added_at': '2001-06-24'
        }]);
    });
});