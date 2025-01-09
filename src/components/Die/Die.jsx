export default function Die(props) {
    const btnStyles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white',
    };
    return (
        <button onClick={props.hold} style={btnStyles}>
            {props.value}
        </button>
    );
}
