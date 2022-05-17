
// Frase em código
// function  understandRecursion(doIunderstandRecursion) {
//     const recursionAnswer = confirm('Do you understand recursion?')

//     if (recursionAnswer === true) { // caso de base ou ponto de parada
//         return true
//     }

//     understandRecursion(recursionAnswer) // chamada recursiva
// }


// FATORIAL ITERATIVO
function factorialIterative(number) {
    if (number < 0) return undefined

    let total = 1
    for (let n = number; n > 1; n--) {
        total = total * n
    }

    return total
}
//console.log(factorialIterative(7))



// FATORIAL COM RECURSÃO
function factorial(n) {
    if (n === 1 || n === 0) { // casp de base / de parada
        return 1
    }

    return n * factorial(n - 1) // chamada recursiva
}
//console.log(factorial(7))



// FIBONACCI ITERATIVO
function fibonacciIterative(n) {
    if (n < 1) return 0
    if (n <= 2) return 1

    let fibNMinus2 = 0
    let fibNminus1 = 1
    let fibN = n

    for (let i = 2; i <= n; i++) {
        fibN = fibNminus1 + fibNMinus2 // f(n-1) + f(n-2
        fibNMinus2 = fibNminus1
        fibNminus1 = fibN
    }

    return fibN
}
//console.log(fibonacciIterative(9))



// FIBONACCI RECURSIVO
function fibonacci(n) {
    if (n < 1) return 0
    if (n <= 2) return 1

    return fibonacci(n - 1) + fibonacci(n - 2)
}
//console.log(fibonacci(9))



// FIBONACCI COM MEMORIZAÇÃO
function fibonacciMemorization(n) {
    const memo = [0, 1]
    const fibonacci = (n) => {
        if (memo[n] != null) return memo[n]
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    }
    return fibonacci
}
console.log(fibonacciMemorization(9))