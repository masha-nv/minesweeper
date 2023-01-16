import { Component, OnInit } from '@angular/core';
import { minesweeper } from 'src/algorytm';

const ROWS = 4, COLS = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board = Array.from({length: ROWS}, () => Array(COLS));
  isGameOver: boolean = false;
  constructor() {}

  ngOnInit(): void {
      this.fillBoard();
      console.log(this.board);
  }

  fillBoard() {
    for (let i = 0; i<ROWS; i++) {
      for (let j = 0; j<COLS; j++) {
        let char = 'E';
        const rand = Math.random();
        if (rand <.3) {
          char = 'M'
        }
        this.board[i][j] = char; 
      }
    }
  }

  getBoardClasses() {
    return {
      display: 'grid',
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      border: '1px solid grey'
    }
  }

  onClick(r: number, c:number) {
    if (this.isGameOver) return;
    this.board = minesweeper(this.board, [r, c]);
    if (this.board[r][c] === 'X') {
      this.isGameOver = true;
    }
    console.log(this.board);
    if (this.checkIfWinner()) alert('You won')
  }

  checkIfWinner(): boolean {
    for (let i = 0; i<this.board.length; i++) {
      for (let j = 0; j<this.board[i].length; j++) {
        if (this.board[i][j] === 'E') {
          return false;
        }
      }
    }
    return true;
  }

  getCellClass(r: number, c: number) {
    if (this.board[r][c] === 'X') {
      return {mine: true}
    }
    if (/\d/.test(this.board[r][c])) {
      this.setInnerHtml(r, c)
    }
    if (this.board[r][c] === 'B') {
      return {blank: true}
    } 
    
    return {}
  }

  setInnerHtml(r: number, c: number) {
    const cell = document.getElementById(`${r}|${c}`);
    if (cell) cell.innerHTML = this.board[r][c]
  }

}
