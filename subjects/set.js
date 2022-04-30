class Set {
    constructor() {
        this.items = {}
    }

    has(element) {
        return element in this.items
    }

    // has2(element) {
    //     return Object.prototype.constructor.hasOwnProperty.call(this.element, element)
    // }

    add(element) {
        if (!this.has(element)) {
            this.items[element] = element
            return true
        }
        
        return false
    }

    delete(element) {
        if (this.has(element)) {
            delete this.items[element]
            return true
        }

        return false
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    sizeLegacy() {
        let count = 0
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++
            }
        }
        return count
    }

    values() {
        return Object.values(this.items)
    }

    valuesLegacy() {
        let values = []
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key)
            }
        }
        return values
    }

    union(otherSet) {
        const unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))

        return unionSet
    }

    intersection(otherSet) {
        const intersectionSet = new Set()
        const values = this.values()

        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i])
            }
        }
        return intersectionSet
    }

}

// TESTING CLASS SET OPERATIONS - INTERSECTION
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)

const intersectionAB = setA.intersection(setB)
console.log(intersectionAB.values())

// TESTING FIRST CLASS SET METHODS 
// const set = new Set()
// set.add(123)
// set.add(1)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.has(111))
// console.log(`Object size -> ${set.size()}`)
// console.log('\n')

// set.add(2)
// set.add(22)
// console.log(set.values())
// console.log(set.has(2))
// console.log(`Object size -> ${set.size()}`)
// console.log('\n')

// set.delete(123)
// console.log(set.values())
// console.log(`Object size -> ${set.size()}`)


// TESTING CLASS SET OPERATIONS - UNION
// const setA = new Set()
// setA.add(1)
// setA.add(2)
// setA.add(3)
// setA.add(4)
// setA.add(0)
// setA.add(7)
// console.log(setA.values())

// const setB = new Set()
// setB.add(3)
// setB.add(4)
// setB.add(5)
// setB.add(6)
// console.log(setB.values())

// const unionAB = setA.union(setB)
// console.log(unionAB.values())

