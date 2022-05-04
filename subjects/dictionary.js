import { defaulToString } from '../util.js'

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }

    toString() {
        return `[#${this.key}: ${this.value}]`
    }
}

export default class Dictionary {
    constructor (toStrFn = defaulToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }

    hasKey(key) {
        return this.table[this.toStrFn(key) != null]
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }

    get(key) {
        const ValuePair = this.table[this.toStrFn(key)]
        return ValuePair == null ? undefined : ValuePair.value
    }

    // Second way to write get method, although cost more processing 
    // because the access in the table object it happens two times
    // FIRST in the haskey() method and the second inside if instruction
    getLegacy(key) {
        if (this.hasKey(key)) {
            return this.table[this.toStrFn(key)]
        }
        return undefined
    }

    keyValuesNew() {
        return Object.values(this.table)
    }

    // How the method Object.values (above) maybe not be avaliable to all browsers,
    // We can also use the following code
    keyValues() {
        const valuePairs = []
        for (const k in this.table) {
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k])
            }
        }

        return valuePairs
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key)

        //We cane alto use the following code
        // const keys = [];
        // const valuePairs = this.keyValues();
        // for (let i = 0; i < valuePairs.length; i++) {
        //     keys.push(valuePairs[i].key);
        // }
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value)
    }

    forEach(callbackFn) {
        const valuePairs = this.keyValues()

        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
            if (result === false) {
                break
            }
        }
    }

    size() {
        return Object.keys(this.table).length
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.table = {}
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }

        const valuePairs = this.keyValues()
        let objString = `${valuePairs[0].toString()}`

        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`
        }

        return objString
    }
}

const dictionary = new Dictionary()
dictionary.set('Louran', 'louran@mail.com')
dictionary.set('Mariana', 'mariana@mail.com')
dictionary.set('Frida', 'frida@mail.com')

console.log(dictionary.hasKey('Louran'))
console.log(dictionary.size())