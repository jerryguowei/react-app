import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
class Board extends Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}  onClick={()=>this.props.onClick(i)} />;
    }
    render() {
      return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );

    }
}
class Game extends Component {
    constructor(props){
     super(props);
     this.state={
      history:[
          {squares:Array(9).fill(null)
          }],
      xIsNext:true,
      stepNumber:0,
     }
     this.handleClick=this.handleClick.bind(this);
  }
    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const currentSquares=history[history.length-1].squares.slice();
        if(calculateWinner(currentSquares)||currentSquares[i]) return;
        currentSquares[i]=this.state.xIsNext?'X':'O';
        this.setState({history:history.concat([{squares:currentSquares}]),xIsNext:!this.state.xIsNext,stepNumber:history.length});
       }
    jumpTo(i){
      this.setState({
         stepNumber:i,
         xIsNext:i%2===0
      });

    }
    render() {
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=calculateWinner(current.squares);
        let status='';
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: '+(this.state.xIsNext?'X':'O');
        }
        const moves=history.map((step,index)=>{
            const desc=index?'GO TO STEP #'+index:'GO TO START';
            return (
                <li key={index}>
                <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
             );
        }

        );

        return (
            <div className="game">
                <div className="game-board">
                    <Board  squares={current.squares} onClick={this.handleClick}/>
                </div>
                <div className="game-info">
                <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );

    }
}
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

ReactDOM.render(<Game />, document.getElementById('root'));