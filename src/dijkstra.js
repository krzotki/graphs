function Dijkstra(matrix, start) {
    let v = start;
    
    let Q = Array(matrix.length).fill(false);

    let d = Array(matrix.length).fill(Infinity);
    let p = Array(matrix.length).fill(-1);

    d[v] = 0;

    while(Q.includes(false)) {
        let minD = Infinity;
        let index = -1;
        for(let i = 0; i < d.length; i++) {
            if(d[i] < minD && !Q[i]) {
                minD = d[i];
                index = i;
            }
        }

        const neighbours = matrix[index];

        if(neighbours === undefined) return p;

        for(let i = 0; i < neighbours.length; i++) {
            if(!Q[i] && d[i] > neighbours[i] + minD && neighbours[i] > 0) {
                d[i] = neighbours[i] + minD;
                p[i] = index;
            }
        }

        Q[index] = true;
    }

    return p;
}

export default Dijkstra;