import React from 'react';
import ReactDOM from 'react-dom';
import LineTo, { Line } from 'react-lineto';
import './index.css';
import Circle from './circle.js';
import Matrix from './matrix.js';
import WeightInput from './weightInput.js';

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

                weights: [

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
        let inputsToRender = [];

        for(let i = 0; i < circles.length; i++) {
            let selected = current.selectedCircles.includes(i);
            circlesToRender.push(this.renderCircle(i, circles[i], selected));
        }

        for(let j = 0; j < lines.length; j++) {
            let from = lines[j].from;
            let to = lines[j].to;

            if(from === to) continue;
            linesToRender.push(
                <LineTo 
                    borderColor = 'green' 
                    zIndex = {0} 
                    key = {'line' + from + "-" + to} 
                    from = {"circle " + from}
                    to = {"circle " + to}>
                </LineTo>
            );

            let inputPosition = {
                x: (circles[from].x + circles[to].x) / 2,
                y: (circles[from].y + circles[to].y) / 2
            };

            inputsToRender.push(
                <WeightInput 
                    key = {'weight'+ from + "-" + to} 
                    from = {from}
                    to = {to}
                    position = {inputPosition} 
                    value = {current.weights[from][to]}
                    onClick = {(evt) => this.handleWeightInputClick(evt)}
                    onChange = {(evt) => this.handleWeightInputChange(evt, from, to)}
                    >
                </WeightInput>
            );
        }

        return(
            <div id = 'container'>
                <div id = 'canvas' onClick = {(evt)=> this.handleClick(evt)} onContextMenu = {(evt) => this.handleRightClick(evt)}>
                    {linesToRender}
                    {circlesToRender}
                    {inputsToRender}
               </div>
               <Matrix weights = {current.weights}></Matrix>
            </div>
        );
    }

    handleCircleClick(evt, index) {
        evt.stopPropagation();
        const history = this.state.history;
        const current = history[history.length - 1];
        const selectedCircles = current.selectedCircles.slice();
        const lines = current.lines.slice();
        const weights = current.weights.slice();


        if(selectedCircles[0] !== index) {
            selectedCircles.push(index);
        } else {
            selectedCircles.pop();
        }

        if(selectedCircles.length === 2) {
            let from = selectedCircles[0];
            let to = selectedCircles[1];

            if(lines.filter(line => (line.from === from && line.to === to) || (line.from === to && line.to === from)).length === 0)
            {
                lines.push({
                    from: from,
                    to: to,
                });
    
                const fromRow = weights[from].slice();    
                fromRow[to] = 1;
                weights[from] = fromRow;
    
                const toRow = weights[to].slice();
                toRow[from] = 1;
                weights[to] = toRow;
            }
               
            selectedCircles.pop();
            selectedCircles.pop();
        }

        let newHistoryItem = {...current};
        newHistoryItem.selectedCircles = selectedCircles;
        newHistoryItem.lines = lines;
        newHistoryItem.weights = weights;

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

    handleWeightInputClick(evt) {
        evt.stopPropagation();
    } 

    handleWeightInputChange(evt, from, to) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const weights = current.weights.slice();

        let value = Number(evt.target.value);

        const fromRow = weights[from].slice();    
        fromRow[to] = value;
        weights[from] = fromRow;

        const toRow = weights[to].slice();
        toRow[from] = value;
        weights[to] = toRow;

        let newHistoryItem = {...current};
        newHistoryItem.weights = weights;

        this.setState({
            history: history.concat([newHistoryItem]),
        });
    }

    handleClick(evt) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();
        const weights = current.weights.slice();

        console.log(evt)

        circles.push({
            x: evt.pageX,
            y: evt.pageY,
            radius: 20
        });

        weights.push(Array(circles.length).fill(0));

        for(let i = 0; i < circles.length - 1; i++) {
            let row = weights[i].slice();
            row[circles.length - 1]  = 0;
            weights[i] = row;       
        }
        
        let newHistoryItem = {...current};
        newHistoryItem.circles = circles;
        newHistoryItem.weights = weights;

        this.setState({
            history: history.concat([newHistoryItem]),
        });

    }

    renderCircle(index, circle, selected) {
        return <Circle 
            key = {index} 
            index = {index} 
            params = {circle}
            onClick = {(evt, index) => this.handleCircleClick(evt, index)}
            color = {(selected)? 'blue' : 'red'}
            >
        </Circle>
    }
}

ReactDOM.render(
    <Sketch />,
    document.getElementById('root')
  );
  