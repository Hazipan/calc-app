import React from 'react';
import './ThreeWayToggleSwitch.css';

const ThreeWayToggleSwitch = (props) => {
  return (
    <div className="toggleSwitch" onClick={props.onClick}>
      <div className="label">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <div className="switch">
        <div className="indicator left" id="indicator" />
      </div>
      <p>{props.position}</p>
    </div>
  );
}


export default ThreeWayToggleSwitch;