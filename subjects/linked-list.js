import { defaultEquals } from '../util.js'
import { Node, DoublyNode } from '../models/linked-list-models.js'

export default class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalsFn = equalsFn
    }

    push(element) {
        const node = new Node(element)
        let current

        if (this.head == null) {
            this.head = node
        } else {
            current = this.head

            while (current.next != null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            
            //previous.next = current.next
            this.count--
            return current.element
        }

        return undefined
    }

    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head
            for (let i = 0;  i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)

            if (index === 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                const previous = this.getElementAt(index - 1)
                const current = previous.next
                node.next = current
                previous.next = node
            }

            this.count++
            return true
        }

        return false
    }

    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    size() {
        return this.count
    }

    isEmpty() {
        return this.size() === 0
    }

    getHead() {
        return this.head
    }
    
    toString() {
        if (this.head == null) {
            return ''
        }

        let objString = `${this.head.element}`
        let current = this.head.next
        
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString}, ${current.element}`
            current = current.next
        }

        return objString
    }

    //teste louran
    escreverNaTela() {
        const count = this.count
        let current = this.head

        for (let i = 0; i < count; i++) {
            console.log(current.element)
            current = current.next
        }
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this.tail = undefined
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head

            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }
            } else if (index === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node

            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }

            this.count++
            return true
        }

        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) { 
            let current = this.head
            if (index === 0) {
                this.head = current.next
                if (this.count === 1) {
                    this.tail = undefined
                } else {
                    this.head.prev = undefined
                }
            } else if (index === this.count - 1) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                previous.next = current.next
                current.next.prev = previous
            } 
            this.count--
            return current.element
        } 
        return undefined
    }
}

class CircleLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }

    insert(element, index) {
        if (index >= 0  && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head

            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    node.next = this.head
                } else {
                    node.next = current
                    current = this.getElementAt(this.size())
                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }

            this.count++
            return true
        }

        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined
                } else {
                    const removed = this.head
                    current = this.getElementAt(this.size())
                    this.head = this.head.next
                    current.next = this.head
                    current = removed
                }
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn)
        this.compareFn = compareFn
    }

    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0)
        }

        const pos = this.getIndexNextSortedElement(element)
        return super.insert(element, pos)
    }

    getIndexNextSortedElement(element) {
        let current = this.head
        let i = 0

        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element)

            if (comp === Compare.LESS_THAN) {
                return i
            }
            current = current.next
        }
        return i
    }
}


class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList()
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items.removeAt(this.size() - 1)
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items.getElementAt(this.size() - 1).element
    }

    isEmpty() {
        return this.items.isEmpty()
    }

    size() {
        return this.items.size()
    }

    clear() {
        this.items.clear()
    }

    toString() {
        return this.items.toString()
    }
}

//const list = new LinkedList()
// list.push('Frida')
// list.push('Mariana')
// list.push('Louran')
// list.push('Liz')
// list.escreverNaTela()

// // list.escreverNaTela()
// // list.removeAt(4)
// // console.log('\n')

// list.insert('Porra', 3)
// console.log('\n')
// list.escreverNaTela()

// // list.remove('Louran')
// // console.log('\n')
// // list.escreverNaTela()

// console.log('\n')
// console.log(`Tamanho da lista: ${list.size()}`)

// console.log('\n')
// console.log(`A lista está vazia? ${list.isEmpty()}`)

// console.log('\n')
// console.log(list.toString())
// list.toString()

// const doubleList = new DoublyLinkedList()
// doubleList.insert('Mariana', 0)
// doubleList.insert('Frida', 0)
// doubleList.insert('Louran', 2)
// doubleList.insert('Matheus', 3)
// doubleList.insert('Nayara', 4)
// doubleList.insert('Maria', 2)
// doubleList.insert('Aristides', 1)
// doubleList.escreverNaTela()
// console.log('\n')

// console.log(doubleList)

// doubleList.removeAt(61)
// doubleList.escreverNaTela()
// console.log('\n')


// const circleList = new CircleLinkedList()
// circleList.insert('Mariana', 0)
// circleList.insert('Louran', 1)
// circleList.insert('Aristides', 2)
// circleList.insert('Frida', 3)
// circleList.escreverNaTela()
// console.log(circleList)

//circleList.removeAt(2)

// const sortedList = new SortedLinkedList()
// sortedList.insert('Mariana')
// sortedList.insert('Louran')
// sortedList.insert('Frida')
// sortedList.insert('Nayara') 
//sortedList.insert('Aristides')