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
    


    // REMOVENDO UM NÓ
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node, key) {
        if (node == null) {
            return null
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // key is equal node.item
            // case 1
            if (node.left == null && node.right == null) {
                node = null
                return node
            }

            // case 2
            if (node.left == null) {
                node = node.right
                return node
            } else if (node.right == null) {
                node = node.left
                return node
            }

            // case 3
            const aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    }
}


// Testing the tree class
// const tree = new BinarySearchTree()
// tree.insert(11)
// tree.insert(7)
// tree.insert(15)
// tree.insert(5)
// tree.insert(3)
// tree.insert(9)
// tree.insert(8)
// tree.insert(10)
// tree.insert(13)
// tree.insert(12)
// tree.insert(14)
// tree.insert(20)
// tree.insert(18)
// tree.insert(25)
// tree.insert(6)

// tree.remove(15)

// const printNode = (value) => console.log(value)
// tree.inOrderTraverse(printNode)



// AVL - Mode de árvore que possui auto balanceamento, tendo como diferença máxima 1 nível entre as ramificaçoes
class AVLTree extends BinarySearchTree {
    constructor (compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }



    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }

    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)

        const BalanceFactor = {
            UNBALANCED_RIGHT: 1,
            SLIGHTLY_UNBALANCED_RIGHT: 2,
            BALANCED: 3,
            SLIGHTLY_UNBALANCED_LEFT: 4,
            UNBALANCED_LEFT: 5
        }

        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }



    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }

    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    rotarionRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }



    insert(key) {
        this.root = this.insertNode(this.root, key)
    }

    insertNode(node, key) {
        //insere o nó como em uma BST
        if (node == null) {
            return new Node(key)
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node // chave duplicada
        }

        // Balanceia a árvore, se for necessário
        const balanceFactor = this.getBalanceFactor(node)

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node)
            } else {
                return this.rotarionRL(node)
            }
        }

        return node
    }



    removeNode(node, key) {
        node = super.removeNode(node, key)
        if (node === null) {
            return node // null, nao é necessario balancear
        }

        // Verifica se a arvore esta balanceada
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node)
            }

            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left)
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const  balanceFactorRight = this.getBalanceFactor(node.right)
            if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node)
            }

            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotarionRL(node.right)
            }
        }

        return node
    }
}



// ARVORE RUBRO NEGRA
class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    insert(key: T) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this. insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            module.right = mode.right = new rebb
        }
    }
}

class RedBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Colors.RED
        this.parent = null
    }

    isRed() {
        return this.color === Colors.RED
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key)
            node.right.parent = node
            return node.right
        } else {
            return this.insertNode(node.right, key)
        }
    }

    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent
            const grandParent = parent.parent

            // caso A: o pai é o filho a esquerda
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right
                
                // caso A1: o tio do nó tambem é vermelho - basta recolorir
                if (uncle && uncle.color === Colors.Red) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    // caso A2: o nó é o filho a direita - rotacao a esquerda
                    if (node === parent.right) {
                        this.rotationRR(parent)
                        node = parent
                        parent = node.parent
                    }

                    // caso A3: o nó é o filho a esquerda - rotacao a direita
                    this.rotationLL(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            } else { // caso B: o pai é o filho a direita
                const uncle = grandParent.left

                // caso B1: o tio é vermelho - basta recolorir
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    // caso B2: o nó é o filho a esquerda – rotação a direita
                    if (node === parent.left) {
                        this.rotationLL(parent)
                        node = parent
                        parent = node.parent
                    }

                    // caso B3: o nó é o filho a direita – rotação a esquerda
                    this.rotationRR(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            }
        }



        this.root.color = Colors.BLACK
    }

    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right

        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node
        }

        tmp.parent = node.parent

        if (!node.parent) {
            this.root = tmp
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp
            } else {
                node.parent.right = tmp
            }
        }

        tmp.right = node
        node.parent = tmp
    }

    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left

        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node
        }

        tmp.parent = node.parent

        if (!node.parent) {
            this.root = tmp
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp
            } else {
                node.parent.right = tmp
            }
        }

        tmp.left = node
        node.parent = tmp
    }
}