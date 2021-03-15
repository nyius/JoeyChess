import React from 'react';
import './scss/index.scss';
import { BOARD_HEIGHT, BOARD_WIDTH } from './config';

class JoeyChess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//
		};
	}

	chessBoard() {
		let board = [];
		let squareCount = 1;
		for (let j = 0; j < BOARD_HEIGHT; j++) {
			for (let i = 0; i < BOARD_WIDTH; i++) {
				if (j % 2 == 0) {
					//prettier-ignore
					board.push(<tr id={"Square--"+squareCount} key={i + 1} className={i % 2 == 0 ? "board_square board_square--white" : "board_square board_square--black" }></tr>);
				} else {
					//prettier-ignore
					board.push(<tr id={"Square--"+squareCount} key={i + 1} className={i % 2 == 0 ? "board_square board_square--black" : "board_square board_square--white" }></tr>);
				}

				squareCount++;
			}
		}
		return board;
	}

	render() {
		return (
			<div className="board_container">
				<this.chessBoard />
			</div>
		);
	}
}

function App() {
	return <JoeyChess />;
}

export default App;
