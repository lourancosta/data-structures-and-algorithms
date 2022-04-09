// interface Person {
//     name: string
//     age: number
// }

// function printName(person: Person) {
//     console.log(person.name)
// }

// const john = { name: 'John', age: 21 }
// const mary = { name: 'Mary', age: 21, phone: '123-45678' }

// printName(john)
// printName(mary)

// //#############################################################

// interface Comparable {
//     compareTo(b): number 
// }

// class MyObject implements Comparable {
//     age: number
//     compareTo(b): number {
//         if (this.age === b.age) {
//             return 0
//         }

//         return this.age > b.age ? 1 : -1
//     }
// }

// //#############################################################

// interface Comparable2<T> {
//     compareTo(b: T): number
// }


// class MyObject2 implements Comparable2<MyObject2> {
//     age: number
//     compareTo(b: MyObject2): number {
//         if (this.age === b.age) {
//             return 0
//         }

//         return this.age > b.age ? 1 : -1
//     }
// }


//#############################################################

interface Person {
    name: string;
    age: number;
}

const friends = [
    { name: 'Frida', age: 3 },
    { name: 'Mariana', age: 31 },
    { name: 'Louran', age: 30 }
]

function comparePerson(a: Person, b: Person) {
    //conteudo da funcao
}

