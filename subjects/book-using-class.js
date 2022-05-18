//simple object
let objSimple1 = new Object()
let objSimple2 = {}

//full objetc
objFull1 = {
    name: {
        first: 'Louran',
        last: 'Costa'
    },
    address: {
        avenueStreet: 'Rua Nelson Freitas',
        complement: 'Bloco H Apt 33',
        number: 881,
        district: 'Parque Lauriano Tebar',
        city: 'São José do Rio Preto',
        country: 'Brasil',
        postalCode: '15040-210'
    }
}

// class (constructor)
function Book(title, pages, isbn) {
    this.title = title
    this.pages = pages
    this.isbn = isbn

    this.printPages = function() {
        console.log(this.pages)
    }

}

let newBook = new Book('title', 'pages', 'isbn')
let newBookTitle


newBookTitle = newBook.title = 'O salario do medo'
newBook.pages = 231

newBookTitle = newBook.title = 'Estrutura de dados - Loaiane'
newBook.pages = 302

const titleBook = newBook.title
const pagesBook = newBook.pages

console.log('chegou no final do debug')
let a = 0



//######################################################
class Book {
    constructor(title, pages, isbn) {
        this.title = title
        this.pages = pages
        this.isbn = isbn
    }

    printIsbn() {
        console.log(this.isbn)
    }
}

let book = new Book('EDD - Loiane', 420, 'isbn')
book.title = 'Estrutura de Dados e Algoritmos - Loiane'


class ITBook extends Book {
    constructor(title, pages, isbn, technology) {
        super(title, pages, isbn)
        this.technology = technology
    }
    printTechnology() {
        console.log(this.technology)
    }
}

let jsBook = new ITBook('Learning JS Algorithms', 200, 1234567890, 'JavaScript')
console.log('final')



//######################################################
class Person {
    constructor(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }
}

let swChar = new Person('Darth Vader')
console.log(swChar.name)

swChar.name = 'Yoda'
console.log(swChar.name)

swChar._name = 'Han Solo'
console.log(swChar.name)