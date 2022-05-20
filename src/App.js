import React from 'react';
import ThreeWayToggleSwitch from './components/ThreeWayToggleSwitch';
import './App.css';
import { theme1, theme2, theme3 } from './colors.js';
import Key from './components/Key.js';

const keyValues = [
  [7, 8, 9, 'DEL'],
  [4, 5, 6, '+'],
  [1, 2, 3, '-'],
  ['.', 0, '/', 'x'],
  ['RESET', '=']
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // position state for three way switch
      position: 1,
      theme: theme1,
      headerColor: theme1.secondaryText
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
          position: 2,
          theme: theme2,
          headerColor: theme2.mainText
        });
        break;
      case 2:
        this.setState({
          position: 3,
          theme: theme3,
          headerColor: theme3.mainText
        });
        break;
      case 3:
        this.setState({
          position: 1,
          theme: theme1,
          headerColor: theme1.secondaryText
        });
        break;
    }
    // Once position in state is changed, change position visually
    let indicator = document.getElementById('indicator');
    switch (this.state.position) {
      case 1:
        indicator.classList.remove('left');
        indicator.classList.add('center');
        break;
      case 2:
        indicator.classList.remove('center');
        indicator.classList.add('right');
        break;
      case 3:
        indicator.classList.remove('right');
        indicator.classList.add('left');
        break;
    }

    console.log('switch position changed');
  }

  keyClick() {
    console.log('Key clicked!')
  }

  render() {
    // Style colors change depedning on state of theme
    const theme = {
      app: {
        backgroundColor: this.state.theme.mainBackground,
        color: this.state.theme.primaryText
      },
      header: {
        color: this.state.headerColor
      },
      keypad: {
        backgroundColor: this.state.theme.keypadBackground
      },
      screen: {
        backgroundColor: this.state.theme.screenBackground,
        color: this.state.headerColor,
      },
      key: {
        backgroundColor: this.state.theme.mainKeysBackground,
        color: this.state.theme.mainText,
        boxShadow: `0 4px ${this.state.theme.mainKeysShadow}`
      },
      equals: {
        backgroundColor: this.state.theme.equalsBackground,
        color: this.state.theme.tertiaryText,
        boxShadow: `0 4px ${this.state.theme.equalsShadow}`
      },
      resetDel: {
        backgroundColor: this.state.theme.resetDeleteBackground,
        color: this.state.theme.secondaryText,
        boxShadow: `0 4px ${this.state.theme.resetDeleteShadow}`
      }
    }
    return (
      <div className="app" style={theme.app}>
        <div className="calc">
          <div className="header" style={theme.header}>
            <p className='title'>calc</p>
            <div className='themeSwitch'>
              <p className="themeLabel">THEME</p>
              <ThreeWayToggleSwitch position={this.state.position} onClick={this.switchClick} />
            </div>
          </div>
          <p className='screen' style={theme.screen}>{100}</p>
          <div className='keypad' style={theme.keypad}>
            {keyValues.flat().map((btn, i) => {
              return (
                <Key
                  key={i}
                  value={btn}
                  className={btn === "=" ? "equals key"
                    : btn === 'RESET' ? "reset key"
                      : btn === "DEL" ? 'delete key'
                        : 'key'}
                  onClick={this.keyClick}
                  style={
                    btn === '=' ? theme.equals
                      : btn === 'RESET' || btn === 'DEL' ? theme.resetDel
                        : theme.key
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
