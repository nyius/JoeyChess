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
		for (let i = 0; i < BOARD_WIDTH; i++) {
			board.push(
				<tr key={i + 1} className="board_square board_square--white"></tr>
			);
		}
		console.log(board);
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
