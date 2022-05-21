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
      // position is for the three way switch
      position: 1,
      theme: theme1,
      headerColor: theme1.secondaryText,
      keyClass: 'theme1Key key',
      resetClass: 'theme1Reset key',
      equalsClass: 'theme1Equals key',
      switchClass: 'theme1Switch',
      indicatorClass: 'theme1Indicator left'
    }
    this.switchClick = this.switchClick.bind(this);
  }

  // Functions to handle switch click event
  // Change theme to 1, 2, or 3 according to previous position
  switchClick() {
    switch (this.state.position) {
      // if at theme 1, set to theme 2
      case 1:
        this.setState({
          position: 2,
          theme: theme2,
          headerColor: theme2.mainText,
          keyClass: 'theme2Key key',
          resetClass: 'theme2Reset key',
          equalsClass: 'theme2Equals key',
          switchClass: 'theme2Switch',
          indicatorClass: 'theme2Indicator center'
        });
        break;
      // if at theme 2, set to theme 3
      case 2:
        this.setState({
          position: 3,
          theme: theme3,
          headerColor: theme3.mainText,
          keyClass: 'theme3Key key',
          resetClass: 'theme3Reset key',
          equalsClass: 'theme3Equals key',
          switchClass: 'theme3Switch',
          indicatorClass: 'theme3Indicator right'
        });
        break;
      // if at theme 3, set to theme 1
      case 3:
        this.setState({
          position: 1,
          theme: theme1,
          headerColor: theme1.secondaryText,
          keyClass: 'theme1Key key',
          resetClass: 'theme1Reset key',
          equalsClass: 'theme1Equals key',
          switchClass: 'theme1Switch',
          indicatorClass: 'theme1Indicator left'
        });
        break;
    }

    console.log('color theme changed');
  }

  keyClick() {
    console.log('Key clicked!')
  }

  render() {
    // Style colors change depedning on state of theme
    // To be able to have hover states on the buttons, their classes are outlined in App.scss
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
      }
    }
    return (
      <div className="app" style={theme.app}>
        <div className="calc">
          <div className="header" style={theme.header}>
            <p className='title'>calc</p>
            <div className='themeSwitch'>
              <p className="themeLabel">THEME</p>
              <ThreeWayToggleSwitch
                position={this.state.position} 
                onClick={this.switchClick}
                switchClass={this.state.switchClass}
                indicatorClass={this.state.indicatorClass}
              />
            </div>
          </div>
          <p className='screen' style={theme.screen}>{10}</p>
          <div className='keypad' style={theme.keypad}>
            {keyValues.flat().map((btn, i) => {
              return (
                <Key
                  key={i}
                  value={btn}
                  className={btn === "=" ? this.state.equalsClass + ' equals'
                    : btn === 'RESET' ? this.state.resetClass + ' reset'
                      : btn === "DEL" ? this.state.resetClass + ' delete'
                        : this.state.keyClass}
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
