import React from 'react';
import ReactDOM from 'react-dom';
import LineTo, { Line } from 'react-lineto';
import './index.css';

function Circle(props)  {
    let style = {
        width: props.params.radius * 2,
        height: props.params.radius * 2,
        left: props.params.x - props.params.radius,
        top: props.params.y - props.params.radius
    };

    return(
        <div className = {'circle ' + props.index} style = {style} onClick = {(evt) => props.onClick(evt, props.index)}>{props.index}</div>
    );
}

function Matrix(props) {

    const circles = props.circles.slice();
    let rows = circles.length;
    let cols = rows;

    let tableRows = [];

    for(let i = 0; i < rows + 1; i++) {
        let cells = [];

        for(let j = 0; j < cols + 1; j++) {
            let value;
            
            if(i === 0 && j === 0) value = '';
            else if(i === 0) value = 'P' + (j - 1);
            else if(j === 0) value = 'P' + (i - 1);
            else value = 0;

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

class Sketch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                selectedCircles: [

                ],

                circles: [
                   
                ],

                lines: [
                    
                ],
            }],
        };

    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();
        const lines = current.lines.slice();

        let circlesToRender = [];

        let linesToRender = [];

        for(let i = 0; i < circles.length; i++) {
            circlesToRender.push(this.renderCircle(i, circles[i]));
        }

        for(let j = 0; j < lines.length; j++) {
            let from = lines[j].from;
            let to = lines[j].to;

            if(from === to) continue;
            linesToRender.push(
                <LineTo key = {from + "-" + to} from = {"circle " + from} to = {"circle " + to}></LineTo>
            );
        }

        return(
            <div id = 'container'>
                <div id = 'canvas' onClick = {(evt)=> this.handleClick(evt)} onContextMenu = {(evt) => this.handleRightClick(evt)}>
                    {circlesToRender}
                    {linesToRender}
               </div>
               <Matrix circles = {circles}></Matrix>
            </div>
        );
    }

    handleCircleClick(evt, index) {
        evt.stopPropagation();
        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();
        const circle = circles[index];
        const selectedCircles = current.selectedCircles.slice();
        const lines = current.lines.slice();

        if(selectedCircles.includes(index)) return;

        selectedCircles.push(index);

        if(selectedCircles.length === 2) {
            lines.push({
                from: selectedCircles[0],
                to: selectedCircles[1]
            });

            selectedCircles.pop();
            selectedCircles.pop();
        }

        let newHistoryItem = {...current};
        newHistoryItem.selectedCircles = selectedCircles;
        newHistoryItem.lines = lines;

        this.setState({
            history: history.concat([newHistoryItem]),
        });
    }

    handleRightClick(evt) {
        evt.preventDefault();

        if(this.state.history.length > 1) {
            const history = this.state.history.slice(0,  this.state.history.length - 1);
            this.setState({history: history});
        }
    }

    handleClick(evt) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();

        circles.push({
            x: evt.clientX,
            y: evt.clientY,
            radius: 20
        });

        let newHistoryItem = {...current};
        newHistoryItem.circles = [...circles];

        this.setState({
            history: history.concat([newHistoryItem]),
        });

    }

    renderCircle(index, circle) {
        return <Circle 
            key = {index} 
            index = {index} 
            params = {circle}
            onClick = {(evt, index) => this.handleCircleClick(evt, index)}
            >
        </Circle>
    }
}

ReactDOM.render(
    <Sketch />,
    document.getElementById('root')
  );
  