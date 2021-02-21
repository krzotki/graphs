function Matrix(props) {

    const weights = props.weights.slice();
    let rows = weights.length;
    let cols = rows;

    let tableRows = [];

    for(let i = 0; i < rows + 1; i++) {
        let cells = [];

        for(let j = 0; j < cols + 1; j++) {
            let value;
            
            if(i === 0 && j === 0) value = '';
            else if(i === 0) value = 'P' + (j - 1);
            else if(j === 0) value = 'P' + (i - 1);
            else value = weights[i - 1][j - 1];

            cells.push(<td key = {i + j}>{value}</td>)
        }

        tableRows.push(<tr key = {i}>{cells}</tr>);
    }

    return(
        <table id = 'matrix'>
            <tbody>{tableRows}</tbody>
        </table>
    );

}

export default Matrix;