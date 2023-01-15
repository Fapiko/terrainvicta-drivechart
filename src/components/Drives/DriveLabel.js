const DriveLabel = (props) => {
    const clickHandler = (e) => {
        props.clickHandler(props.datum.dataName);
    }
    
    return (
        <text x={props.x}
              y={props.y}
              fontSize={5}
              onClick={clickHandler}>
            {props.datum.name}
        </text>
    )
}

export default DriveLabel;