function WeightInput(props) {

    let style = {
        left: props.position.x - 10, //half of the dimension
        top: props.position.y - 10
    };

    return (
        <input 
            className = 'weight' 
            value = {props.value}
            style = {style}
            onClick = {(evt) => props.onClick(evt)}
            onChange = {(evt) => props.onChange(evt)}
        />
    );
}

export default WeightInput;