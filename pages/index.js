import Head from 'next/head'
import Image from 'next/image'
import React from 'react';

const clickables = [
  {
    id: 'clear',
    text: 'AC',
    cssClass: 'col-6 p-3 font-18 ac'
  },
  {
    id: 'divide',
    text: '/',
    cssClass: "col-3 font-18 operator"
  },
  {
    id: 'multiply',
    text: 'X',
    cssClass: "col-3 font-18 operator"
  },
  {
    id: 'seven',
    text: '7',
    cssClass: "col-3 font-18 p-3 number"
  },
  {
    id: 'eight',
    text: '8',
    cssClass: "col-3 font-18 number"
  },
  {
    id: 'nine',
    text: '9',
    cssClass: "col-3 font-18 number"
  },
  {
    id: 'subtract',
    text: '-',
    cssClass: "col-3 font-18 operator"
  },
   {
    id: 'four',
    text: '4',
    cssClass: "col-3 p-3 font-18 number"
  },
  {
    id: 'five',
    text: '5',
    cssClass: "col-3 font-18 number"
  },
  {
    id: 'six',
    text: '6',
    cssClass: "col-3 font-18 number"
  },
  {
    id: 'add',
    text: '+',
    cssClass: "col-3 font-18 operator"
  },
  {
    id: 'one',
    text: '1',
    cssClass: "col-4 p-3 font-18 number"
  },
  {
    id: 'two',
    text: '2',
    cssClass: "col-4 p-3 font-18 number"
  },
  {
    id: 'three',
    text: '3',
    cssClass: "col-4 p-3 font-18 number"
  },
  {
    id: "equals",
    text: "=",
    cssClass: "col-12 pad-fill font-18 operator"
  },
  {
    id: 'zero',
    text: '0',
    cssClass: "col-8 p-3 font-18 number"
  },
  {
    id: 'decimal',
    text: '.',
    cssClass: "col-4 p-3 font-18 number"
  },
  
];

const Button = (props) => {
  return ( 
    <button id={props.id} className={props.className} onClick={() => props.handleClick(props.text)}>
      {props.text}
    </button>
   );
}
 
const Display = (props) => {
  return ( 
    <div className="display">
        <div style={{paddingBottom: '10px'}} className="text-right">
          {props.expression}
        </div>
        <div id="display" className="text-right">
          {props.error.length !== 0 ? props.error :props.currentVal}
        </div>
      </div>
   );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentVal: 0,
      previousVal: 0,
      expression: "",
      calculated: false,
      error: ""
     };
     this.handleClick = this.handleClick.bind(this);
     this.multiply = this.handleOperator.bind(this);
     
  }

  handleOperator(param) {
    param !== "-"? this.setState({
      currentVal: param,
      expression: this.state.calculated ? this.state.previousVal + param :
         /[/X+-]+$/g.test(this.state.expression)? this.state.expression.replace(/[/X+-]+$/g, param) :
         this.state.expression + param,
         calculated: false
    })
    :
    this.setState({
        currentVal: param,
        expression: this.state.calculated ? this.state.previousVal + param :
        /[-]+$/g.test(this.state.expression)? this.state.expression.replace(/[-]+$/g, param) :
         this.state.expression + param,
        calculated: false
      });
  }

  handleClick(val) {
    if(val === "AC") {
      this.setState({
            currentVal: 0,
            previousVal: 0,
            expression: "",
            calculated: false,
            error: ""
          })
    }

    if(this.state.currentVal.toString().length > 22) {
      switch(val) {
         case "/":
            this.handleOperator(val)
            break
          case "X":
            this.handleOperator(val)
            break
          case "+":
           this.handleOperator(val)
            break 
          case "-":
            this.handleOperator(val)
            break
        default: break;
    }
    }

    if(this.state.currentVal.toString().length <= 22) {
      switch(val) {
        case "AC":
          this.setState({
            currentVal: 0,
            previousVal: 0,
            expression: "",
            calculated: false,
            error: ""
          })
          break;
          case "/":
            this.handleOperator(val)
            break
          case "X":
           this.handleOperator(val)
            break
          case "+":
            this.handleOperator(val)
            break 
          case "-":
            this.handleOperator(val)
            break 
          case "=":
            let express = this.state.expression.replaceAll("X", "*");
            try{
              this.setState({
                currentVal: eval(express),
                previousVal: eval(express),
                calculated: true
              })
            }
            catch(e) {
              this.setState({
                error: "Syntax Error"
              })
              setTimeout(() => {this.setState({error : "" })}, 1000)
            }
            break
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":          
            this.setState({
              currentVal: this.state.currentVal !== 0? 
              /^[/X+-]/g.test(this.state.currentVal) ? val : this.state.currentVal + val
              : val,
              expression: this.state.expression + val
            });
            break;
          case "0":
            let reg = /^0/g;
            reg.test(this.state.currentVal.toString()) && val === "0" && this.state.currentVal.length === 1?
            this.setState({
              currentVal: this.state.currentVal,
              expression: this.state.currentVal
            }):
            this.setState({
              currentVal: this.state.currentVal !== 0? 
              /^[/X+-]/g.test(this.state.currentVal) ? val : this.state.currentVal + val
              : val,
              expression: this.state.expression + val
            })

            break
          case ".":
            this.state.currentVal.toString().includes(".")?
            this.setState({
              currentVal: this.state.currentVal,
              expression: this.state.expression
            })
            :
            this.setState({
              currentVal: this.state.currentVal !== 0? this.state.currentVal + val: "0.",
              expression: this.state.currentVal !== 0? this.state.expression + val: "0."
            });
            break
            default: alert("unknown");
      }
    }
    else {
      this.setState({
        error: "Max Limit Met"
      })

      setTimeout(() => {this.setState({error : "" })}, 1000)
    }


  }

  render() { 
    return ( 
      <div className="calculator ">
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        </Head>
        <Display currentVal={this.state.currentVal} error={this.state.error} expression={this.state.expression} />
        <div className="row no-gutters">
          
          {clickables.map((obj, i) => (
            i < 11? <Button 
              id={obj.id} 
              text={obj.text}
              className={obj.cssClass} 
              key={i}
              handleClick={this.handleClick} />: ""
              ))}
         </div>
         <div className="row no-gutters">
          <div className="  col-9">

             {clickables.map((obj, i) => (
              i > 10 && i !== 14 ? <Button 
                id={obj.id} 
                text={obj.text}
                className={obj.cssClass} 
                key={i}
                handleClick={this.handleClick} />: ""
                ))}
          </div>
          <div className="col-3">
              {clickables.map((obj, i) => (
              i === 14 ? <Button 
                id={obj.id} 
                text={obj.text}
                className={obj.cssClass} 
                key={i}
                handleClick={this.handleClick} />: ""
                ))}
          </div>
         </div>
      </div>
     );
  }
}
export default Calculator;
