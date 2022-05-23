export class Node {
    constructor(key) {
        this.key = key // valor do nó
        this.left = null // ref ao no que é o filho a esquerda
        this.right = null // ref ao no que é o filho a direita
    }
}



// BINARY SEARCH TREE
import { Compare, defaultCompare } from '../util.js'

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }



    // FORMAS DE PERCORRER ARVORES
    // IN-ORDER
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }


    // PRE-ORDER
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }


    // POS-ORDER
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }

    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }



    // FORMAS DE PERCORRER ARVORES -> Valor MIN, MAX e ESPECIFICO
    // Pesquisando valor minimo
    min() {
        return this.minNode(this.root)
    }

    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    // Pesquisando valor máximo
    max() {
        return this.maxNode(this.root)
    }

    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }

    // Pesquisando valor específico
    search(key) {
        return this.seachNode(this.root, key)
    }

    seachNode(node, key) {
        if (node == null) {
            return false
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.seachNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.seachNode(node.right, key)
        } else {
            return true
        }
    }

    
}


// Testing the tree class
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)


console.log(tree.search(1) ? 'Key 1 found' : 'Key 1 not found')
console.log(tree.search(8) ? 'Key 8 found' : 'Key 8 not found')