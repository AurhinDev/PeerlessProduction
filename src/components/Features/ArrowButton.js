import "./ArrowButton.css";

function ArrowButton(props) {
  const upOrDown = props.upOrDown;

  return (
    <span className={`arrow ${upOrDown}`}>
      <span></span>
      <span></span>
    </span>
  );
}

export default ArrowButton;
