export default function Die(props) {
    const btnStyles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white',
    };
    return (
        <button
            onClick={props.hold}
            style={btnStyles}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? 'held' : 'not held'}`}
        >
            {props.value}
        </button>
    );
}
