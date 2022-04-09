export class Book {
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

