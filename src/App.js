import React from "react";
import "./style.css";
import {useState, useEffect} from 'react'; 

const withMousePosition = (WrappedComponent) => {
  return(props) => {

    const [mousePosition, setMousePosition] = useState({
      x:0,
      y:0,
    })

    useEffect(() => {
      const handleMousePositionChange = (e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }

      window.addEventListener("mousemove", handleMousePositionChange);

      return() => {
        window.removeEventListener("mousemove", handleMousePositionChange);
      }
    }, [])

    return (
      <WrappedComponent {...props} mousePosition={mousePosition} />
    )
  };
};

const PanelMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }

  return (
    <div  className = "BasicTracker">
      <p>Mouse Position</p>
      <div style={styles}className = "Row">
        <span > x : {mousePosition.x},</span>
        <span> y : {mousePosition.y}</span>
      </div>
    </div>
);
};

const PointMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }

  return (
    <p style={styles}>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
}

let styles = {
  marginRight: '20px',
  marginBottom: '0px',
  marginTop: '0px',
  width: '250px',
  height: '25px',
  backgroundColor: '#F0EEED',
};

const NewPanelMouseLogger = withMousePosition(PanelMouseLogger);
const NewPointMouseLogger = withMousePosition(PointMouseLogger);

// style={styles}

function App() {
  return (
    <div className = "App">
      <h1 className = "header"> Mouse Tracker `🖱</h1>
      <NewPanelMouseLogger />
      <NewPointMouseLogger />
    </div>
  )
}

export default App;