function Circle(props)  {
    let style = {
        width: props.params.radius * 2,
        height: props.params.radius * 2,
        left: props.params.x - props.params.radius,
        top: props.params.y - props.params.radius
    };

    return(
        <div className = {'circle ' + props.index + ' ' + props.color} style = {style} onClick = {(evt) => props.onClick(evt, props.index)}>{props.index}</div>
    );
}

export default Circle;