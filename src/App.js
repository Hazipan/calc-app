import React from 'react';
import ThreeWayToggleSwitch from './components/ThreeWayToggleSwitch';
import './App.css';
import { theme1, theme2, theme3 } from './colors.js';
import Key from './components/Key.js';
import { Textfit } from 'react-textfit';

const keyValues = [
  ['7', '8', '9', 'DEL'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '-'],
  ['.', '0', '/', 'x'],
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
      indicatorClass: 'theme1Indicator left',
      sign: '',
      number: '0',
      result: '0',
    }
    this.switchClick = this.switchClick.bind(this);
    this.numClick = this.numClick.bind(this);
    this.signClick = this.signClick.bind(this);
    this.delClick = this.delClick.bind(this);
    this.equalsClick = this.equalsClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
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

  equalsClick() {
    const sign = this.state.sign;
    const number = this.state.number;
    const result = this.state.result;

    if (sign && number) {
      const math = (a, b, sign) => 
        sign === '+' ? a + b
          : sign === '-' ? a - b
            : sign === 'x' ? a * b
              : a / b;

      this.setState({
        number: '0',
        result:
          // if number is 0 and your try to divide, return error
          number === "0" && sign === '/' ? "err: div by 0"
            // calculate result and number using sign
            : math(Number(result), Number(number), sign),
        // reset sign and number
        sign: ''        
      })
    }
  }

  delClick() {
    const number = this.state.number;
    const arr = [];
    for(let i = 0; i < number.length - 1; i++){
      arr.push(number[i]);
    }
    const newNumber = arr.join('');
    this.setState({
      number: newNumber
    });
  }

  resetClick() {
    this.setState({
      number: '0',
      result: '0',
      sign: ''
    })
  }

  signClick(event) {
    const value = event.target.innerHTML;
    const number = this.state.number;
    const result = this.state.result;

    this.setState({
      // set value as sign
      sign: value,
      // if result is 0 and number is not 0, set result to number. Otherwise result doesn't change
      result: result === '0' && number !== '0' ? number : result,
      // set number to 0
      number: '0'
    });
  }

  decimalClick(event) {
    event.preventDefault();
    const value = event.target.innerHTML;
    const number = this.state.number;
    this.setState({
      // if number doesn't alread have a period, concat value (.) and number, otherwise, number doesn't change
      number: !number.toString().includes('.') ? number + value : number
    })
  }

  numClick(event) {
    event.preventDefault();
    const number = this.state.number;
    const value = event.target.innerHTML;
    const sign = this.state.sign;
    const result = this.state.result;

    // Do not let number exceed 15 characters
    if (number.length < 16) {
      this.setState({
        number: 
          // if number and value both equal 0, return just 0
          number === '0' && value === '0' ? "0"
            // if number is a whole number, concat number and value and return as a number
            : number === '0' ? value
              // otherwise, concat number and value
              : number + value,
        // if no sign has been selected, result is 0, otherwise keep result
        result: !sign ? '0' : result
      })
    }
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
          <Textfit className='screen' style={theme.screen} mode='single' max={48}>
            {/* Display result when number is equal to 0 */}
            {this.state.number === '0' ? this.state.result : this.state.number}
          </Textfit>
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
                  onClick={
                    btn === '=' ? this.equalsClick
                      : btn === 'RESET' ? this.resetClick
                        : btn === 'DEL' ? this.delClick
                          : btn === 'x' || btn === '/' || btn === '+' || btn === '-' ? this.signClick
                            : btn === '.' ? this.decimalClick
                              : this.numClick
                  }
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
