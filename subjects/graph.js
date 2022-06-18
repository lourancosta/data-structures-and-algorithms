import Dictionary from '../subjects/dictionary.js'
import { Queue } from './queue.js'
import { Stack } from "./stack.js"

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


// ---------------------------------------  BFS  ---------------------------------------
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

// BFS melhorado, caso do problema apresentando no livro sobre a distancia (em número de arestas) 
// de v (vertice de origem) até cada vertice u
const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const distances = {}
    const predecessors = {}
    const queue = new Queue()

    queue.enqueue(startVertex)

    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY

        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]

            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                distances[w] = distances[u] + 1
                predecessors[w] = u
                queue.enqueue(w)
            }
        }

        color[u] = Colors.BLACK
    }

    return {
        distances,
        predecessors
    }

}


// ---------------------------------------  DFS  ---------------------------------------
const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)

    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback)
        }
    }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY
    if (callback) {
        callback(u)
    }

    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w, color, adjList, callback)
        }
    }
    color[u] = Colors.BLACK
}

export const DFS = graph => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const d = {}
    const f = {}
    const p = {}
    const time = { count: 0 }

    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0
        d[vertices[i]] = 0
        p[vertices[i]] = null
    }

    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList)
        }
    }

    return {
        discovery: d,
        finished: f,
        predecessors: p
    }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY
    d[u] = ++time.count
    
    const neighbors = adjList.get(u)
    
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            p[w] = u
            DFSVisit(w, color, d, f, p, time, adjList)
        }
    }

    color[u] = Colors.BLACK
    f[u] = ++time.count
}


// -----------------------------------  GRAPH CLASS  -----------------------------------
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


// ---------------------------------------  TESTS  ---------------------------------------
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

// console.log(graph)
// console.log(graph.toString())

const printVertex = (value) => console.log('Visited vertex: ' + value)
// breadthFirstSearch(graph, myVertices[0], printVertex)

const shortesPasthA = BFS(graph, myVertices[0])
// console.log(shortesPasthA)

const fromVertex = myVertices[0]
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i]
    const path = new Stack()

    for (let v = toVertex; v!== fromVertex; v = shortesPasthA.predecessors[v]) {
        path.push(v)
    }
    path.push(fromVertex)

    let s = path.pop()
    while (!path.isEmpty()) {
        s += ' - ' + path.pop()
    }
    //console.log(s)
}
//depthFirstSearch(graph, printVertex)
//console.log(DFS(graph))


// ------------------  NOVO GRAPH PARA TESTAR ORDENACAO TOPOLOGICA USANDO DFS
const graph2 = new Graph(true)
const myVertices2 = ['A', 'B', 'C', 'D', 'E', 'F']

for (let i = 0; i < myVertices2.length; i++) {
    graph.addVertex(myVertices2[i])
}

graph2.addEdge('A', 'C')
graph2.addEdge('A', 'D')
graph2.addEdge('B', 'D')
graph2.addEdge('B', 'E')
graph2.addEdge('C', 'F')
graph2.addEdge('F', 'E')

const result = DFS(graph2)
const fTimes = result.finished
let s = ''

for (let count = 0; count < myVertices2.length; count++) {
    let max = 0
    let maxName = null

    for (let i = 0; i < myVertices2.length; i ++) {
        if (fTimes[myVertices2[i]] > max) {
            max = fTimes[myVertices2[i]]
            maxName = myVertices2[i] 
        }
    }
    s += ' - ' + maxName
    delete fTimes[maxName]
}
//console.log(s)


// ----------------------------------  ALGORITMO DE DIJKSTRA ----------------------------------
var graphDijkstra = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
]

const INF = Number.MAX_SAFE_INTEGER
const dijkstra = (graphDijkstra, src) => {
    const dist = []
    const visited = []
    const { length } = graphDijkstra

    for (let i = 0; i < length; i++) {
        dist[i] = INF
        visited[i] = false
    }
    dist[src] = 0

    for (let i = 0; i < length - 1; i++) {
        const u = minDistance(dist, visited)
        visited[u] = true
        
        for (let v = 0; v < length; v++) {
            if (!visited[v] && graphDijkstra[u][v] !== 0 && dist[u] !== INF && dist[u] + graphDijkstra[u][v] < dist[v]) {
                dist[v] = dist[u] + graphDijkstra[u][v]
            }
        }
    }
    return dist
}

const minDistance = (dist, visited) => {
    let min = INF
    let minIndex = -1

    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v]
            minIndex = v
        }
    }
    return minIndex
}
//console.log(dijkstra(graphDijkstra, 0))


// ----------------------------------  ALGORITMO DE FLOYD-WARSHALL ----------------------------------
var graphFW = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
]

const floydWarshall = graph => {
    const dist = []
    const { length } = graph

    for (let i = 0; i < length; i++) {
        dist[i] = []

        for (let j = 0; j < length; j++) {
            if (i === j) {
                dist[i][j] = 0
            } else if (!isFinite(graph[i][j])) {
                dist[i][j] = Infinity
            } else {
                dist[i][j] = graph[i][j]
            }
        }
    }

    for (let k = 0; k < length; k++) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }

    return dist
}
console.log(floydWarshall(graphFW))