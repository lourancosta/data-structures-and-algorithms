import Dictionary from '../subjects/dictionary.js'
import { Queue } from './queue.js'

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}

const initializeColor = vertices => {
    const color = {}
    for (let i = 0; i < vertices.length; i ++) {
        color[vertices[i]] = Colors.WHITE
    }

    return color
}

// PERCORRENDO GRAFO
// BFS (Breadth-First Search) -> Breadth <---->
export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const queue = new Queue()
    queue.enqueue(startVertex)

    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY

        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)
            }
        }

        color[u] = Colors.BLACK
        if (callback) {
            callback(u)
        }
    }
}




// GRAPH CLASS
class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected
        this.vertices = []
        this.adjList = new Dictionary()
    }

    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v)
            this.adjList.set(v, [])
        }
    }

    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertex(v)
        }

        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }

        this.adjList.get(v).push(w)
        if (!this.isDirected) {
            this.adjList.get(w).push(v)
        }
    }

    getVertices() {
        return this.vertices
    }

    getAdjList() {
        return this.adjList
    }

    toString() {
        let s = ''
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `

            const neighbors = this.adjList.get(this.vertices[i])
            for (let j = 0; j < neighbors.length; j++) {
                s += `${neighbors[j]} `
            }
            s += '\n'
        }
        return s
    }
}

const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph)
console.log('\n')
// console.log(graph.toString())

const printVertex = (value) => console.log('Visited vertex: ' + value)
breadthFirstSearch(graph, myVertices[0], printVertex)