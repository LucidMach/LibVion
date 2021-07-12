import "./spinner.css";

const Loading = () => {
  return (
    <div className="App">
      <p style={{ color: "#9b78f2", margin: "1rem", textAlign: "justify" }}>
        <strong>
          NOTE : if the app takes too long to respond, you probabily have a typo
          in the city name.
        </strong>
      </p>
      <div className="Loading"></div>
      <button className="btn" onClick={() => window.location.reload()}>
        CANCEL
      </button>
    </div>
  );
};

export default Loading;
