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

    // Funcao hash com melhor desempenho do que a loseloseHashCode
    djb2HashCode(key) {
        const tableKey = this.toStrFn(key)
        let hash = 5381

        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i)
        }

        return hash % 1013
    }


    hashCode(key) {
        return this.djb2HashCode(key)
    }

    /* Aqui estamos tratando o caso de colisões nas tabelas hash com ENCADEAMENTO SEPARADO, que consiste em
    cada item da hash table ter uma instancia de lista ligada, se por acaso algum item ter a mesma posição
    de umque já foi incluso, o segundo item será adicionado na segunda posição da lista ligada da posição,
    assim não sobrescrevendo o primeiro.
    */
    put1(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)

            if (this.table[position] == null) {
                this.table[position] = new LinkedList()
            }

            this.table[position].push(new ValuePair(key, value))
            return true
        }

        return false
    }

    get1(key) {
        const position = this.hashCode(key)
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

    remove1(key) {
        const position = this.hashCode(key)
        const linkedList = this.table[position]

        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element)
                    if (linkedList.isEmpty()) {
                        delete this.table[position]
                    }
                    return true
                }
                current = current.next
            }
        }
        return false
    }

    /* Aqui vamos comecar a ter uma outra abordagem, a SONDAGEM LINEAR. Ela consiste de se um novo elemento for adicionado
    e a posição hash dele ja estiver ocupada, verificaremos o position + 1, se também a posição estiver ocupada verificaremos o
    position + 2 e assim sucessivamente até encontramos uma posição vazia para adicionarmos o novo elemento na hashtable

    Quando tivermos a necessidade de excluir um elemento, moveremos os elementos que estão após o item excluido, assim o
    position deles será um para trás. Desta forma manteremos a efiencia da tabela hash, não a fazendo pesquisar em posições
    vazias.
    */
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value)
            } else {
                let index = position + 1
                while (this.table[index] != null) {
                    index++
                }
                this.table[index] = new ValuePair(key, value)
            }
            return true
        }
        return false
    }

    get(key) {
        const position = this.hashCode(key)
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                return this.table[position].value
            }

            let index = position + 1
            while (this.table[index] != null && this.table[index].key !== key){
                index++
            }

            if (this.table[index] != null && this.table[index].key === key) {
                return this.table[position].value
            }
        }

        return undefined
    }

    remove(key) {
        const position = this.hashCode(key)
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position]
                this.verifyRemoveSideEffect(key, position)
                return true
            }

            let index = position + 1
            while (this.table[index] != null && this.table[index.key] === key) {
                delete this.table[index]
                this.verifyRemoveSideEffect(key, index)
                return true
            }
        }

        return false
    }

    verifyRemoveSideEffect(key, removedPosition) {
        const hash = this.hashCode(key)
        let index = removedPosition + 1
        while (this.table[index] != null) {
            const posHash = this.hashCode(this.table[index].key)

            if (posHash <= hash || posHash <= removedPosition) {
                this.table[removedPosition] = this.table[index]
                delete this.table[index]
                removedPosition = index
            }

            index++
        }
    }
}





// ######################################################################
// TESTS com classe desenvolvida durante leitura

const hashVah = new HashTableSeparateChaining()
// hashVah.put('Louran', 'louran@mail.com')
// hashVah.put('Mariana', 'mariana@mail.com')
// hashVah.put('Frida', 'frida@mail.com')
// hashVah.put('Maria', 'maria1@mail.com')
// hashVah.put('Maria', 'maria2@mail.com')
// console.log(hashVah)
// console.log('')

// hashVah.remove('Maria')
// console.log(hashVah.get('Maria'))
// console.log(hashVah)



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




// hashVah.put('Ygritte', 'ygritte@email.com');
// hashVah.put('Jonathan', 'jonathan@email.com');
// hashVah.put('Jamie', 'jamie@email.com');
// hashVah.put('Jack', 'jack@email.com');
// hashVah.put('Jasmine', 'jasmine@email.com');
// hashVah.put('Jake', 'jake@email.com');
// hashVah.put('Nathan', 'nathan@email.com');
// hashVah.put('Athelstan', 'athelstan@email.com');
// hashVah.put('Sue', 'sue@email.com');
// hashVah.put('Aethelwulf', 'aethelwulf@email.com');
// hashVah.put('Sargeras', 'sargeras@email.com');
// console.log(hashVah)
// hashVah.remove('Jonathan')
// console.log(hashVah)




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

// ######################################################################

// Usando classe Map padrao do JavaScript

const map = new Map()
console.log(map)

map.set('Louran', 'louran@email.com')
map.set('Mariana', 'mariana@email.com')
map.set('Frida', 'frida@email.com')
console.log(map)

console.log(map.has('Frida'))
console.log(map.size)
console.log(map.keys())
console.log(map.values())
console.log(map.get('Louran'))