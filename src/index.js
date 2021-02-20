import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Circle(props)  {
    let style = {
        width: props.params.radius * 2,
        height: props.params.radius * 2,
        left: props.params.x - props.params.radius,
        top: props.params.y - props.params.radius
    };

    return(
        <div className = 'circle' style = {style} onClick = {(evt) => props.onClick(evt, props.index)}>{props.index}</div>
    );
}

class Sketch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                circles: [
                   
                ]
            }],
        };

    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();

        let circlesToRender = [];
        for(let i = 0; i < circles.length; i++) {
           
            circlesToRender.push(this.renderCircle(i, circles[i]));
        }

        return(
            <div id = 'canvas' onClick = {(evt)=> this.handleClick(evt)} onContextMenu = {(evt) => this.handleRightClick(evt)}>
                {circlesToRender}
            </div>
        );
    }

    handleCircleClick(evt, index) {
        evt.stopPropagation();

        const history = this.state.history;
        const current = history[history.length - 1];
        const circles = current.circles.slice();

        const circle = circles[index];

        circles[index] = {
            x: circle.x,
            y: circle.y,
            radius: circle.radius + 10
        };

        this.setState({
            history: history.concat([{
                circles: circles
            }])
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

        this.setState({
            history: history.concat([{
                 circles: circles,
            }]),

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
  