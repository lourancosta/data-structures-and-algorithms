import { defaulToString } from '../util.js'
import { ValuePair } from '../subjects/dictionary.js'
import LinkedList from '../subjects/linked-list.js'

class HashTable {
    constructor(toStrFn = defaulToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }

    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key
        }

        const tableKey = this.toStrFn(key)
        let hash = 0
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }
        return hash % 37
    }

    hashCode(key) {
        return this.loseloseHashCode(key)
    }

    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            this.table[position] = new ValuePair(key, value)
            return true
        }

        return false
    }

    get(key) {
        const valuePair = this.table[this.hashCode(key)]
        return valuePair == null ? undefined : valuePair.value
    }

    remove(key) {
        const hash = this.hashCode(key)
        const valuePair = this.table[hash]

        if (valuePair != null) {
            delete this.table[hash]
            return true
        }

        return false
    }

    toString() {
        const keys = Object.keys(this.table)
        
        if (keys.length === 0) {
            return ''
        }

       let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
       for (let i = 1; i < keys.length; i++) {
           objString = `${objString}\n{${keys[i]} => ${this.table[keys[i]].toString()}}`
       }
       return objString
    }
}

class HashTableSeparateChaining {
    constructor(toStrFn = defaulToString) {
        this.toStrFn = toStrFn
        this.table = {}
        this.hashTable = new HashTable()
    }

    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashTable.hashCode(key)

            if (this.table[position] == null) {
                this.table[position] = new LinkedList()
            }

            this.table[position].push(new ValuePair(key, value))
            return true
        }

        return false
    }

    get(key) {
        const position = this.hashTable.hashCode(key)
        const linkedList = this.table[position]

        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value
                }
                current = current.next
            }
        }

        return undefined
    }
}

const hashVah = new HashTableSeparateChaining()
hashVah.put('Louran', 'louran@mail.com')
hashVah.put('Mariana', 'mariana@mail.com')
hashVah.put('Frida', 'frida@mail.com')
hashVah.put('Maria', 'maria1@mail.com')
hashVah.put('Maria', 'maria2@mail.com')

console.log(hashVah.get('Maria'))



const hash = new HashTable()
// hash.put('Louran', 'louran@mail.com')
// hash.put('Mariana', 'mariana@mail.com')
// hash.put('Frida', 'frida@mail.com')
// console.log(hash)
// console.log()

// console.log(hash.hashCode('Louran') + ' - Louran')
// console.log(hash.hashCode('Mariana') + ' - Mariana')
// console.log(hash.hashCode('Frida') + ' - Frida')
// console.log()

// console.log(hash.get('Louran'))
// console.log(hash.get('xela'))
// console.log()

// hash.remove('Frida')
// console.log(hash.get('Frida'))
// console.log(hash)




hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');

// console.log(hash.hashCode('Ygritte') + ' - Ygritte')
// console.log(hash.hashCode('Jonathan') + ' - Jonathan')
// console.log(hash.hashCode('Jamie') + ' - Jamie')
// console.log(hash.hashCode('Jack') + ' - Jack')
// console.log(hash.hashCode('Jasmine') + ' - Jasmine')
// console.log(hash.hashCode('Jake') + ' - Jake')
// console.log(hash.hashCode('Nathan') + ' - Nathan')
// console.log(hash.hashCode('Athelstan') + ' - Athelstan')
// console.log(hash.hashCode('Sue') + ' - Sue')
// console.log(hash.hashCode('Aethelwulf') + ' - Aethelwulf')
// console.log(hash.hashCode('Sargeras') + ' - Sargeras')

//console.log(hash.toString())