import { defaulToString } from '../util'

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
}