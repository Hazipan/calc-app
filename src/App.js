import React from 'react';
import ThreeWayToggleSwitch from './components/ThreeWayToggleSwitch';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // position state for three way switch
      position: 1
    }
    this.switchClick = this.switchClick.bind(this);
  }

  // Functions to handle switch click event
  // Change position to 1, 2, or 3 according to previous position
  switchClick() {
    console.log("switch registered")
    switch (this.state.position) {
      case 1:
        this.setState({
          position: 2
        });
        break;
      case 2:
        this.setState({
          position: 3
        });
        break;
      case 3:
        this.setState({
          position: 1
        });
        break;
    }
    // Once position in state is changed, change position visually
    let colorSwitch = document.getElementById('indicator');
    switch (this.state.position) {
      case 1:
        colorSwitch.classList.remove('left');
        colorSwitch.classList.add('center');
        break;
      case 2:
        colorSwitch.classList.remove('center');
        colorSwitch.classList.add('right');
        break;
      case 3:
        colorSwitch.classList.remove('right');
        colorSwitch.classList.add('left');
        break;
    }
    console.log('switch position changed');
  }

  render() {
    return (
      <div>
        <ThreeWayToggleSwitch position={this.state.position} onClick={this.switchClick}/>
        <div className='test'></div>
      </div>
    );
  }
}


export default App;
