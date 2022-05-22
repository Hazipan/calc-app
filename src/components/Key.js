const Key = (props) => {
    return(
        <button className={props.className} style={props.style} onClick={props.onClick} value={props.value}>{props.value}</button>
    )
}

export default Key;