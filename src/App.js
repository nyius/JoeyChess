import React from 'react';
import './scss/index.scss';
import { BOARD_HEIGHT, BOARD_WIDTH } from './config';
// eslint-disable-next-line
import { pawn, bishop, rook, knight, king, queen } from './Pieces';
import { parseFEN } from './helper';

class JoeyChess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPosition: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`,
			board: {
				row1: {
					sq1: null,
					sq2: null,
					sq3: null,
					sq4: null,
					sq5: null,
					sq6: null,
					sq7: null,
					sq8: null,
				},
				row2: {
					sq9: null,
					sq10: null,
					sq11: null,
					sq12: null,
					sq13: null,
					sq14: null,
					sq15: null,
					sq16: null,
				},
				row3: {
					sq17: null,
					sq18: null,
					sq19: null,
					sq20: null,
					sq21: null,
					sq22: null,
					sq23: null,
					sq24: null,
				},
				row4: {
					sq25: null,
					sq26: null,
					sq27: null,
					sq28: null,
					sq29: null,
					sq30: null,
					sq31: null,
					sq32: null,
				},
				row5: {
					sq33: null,
					sq34: null,
					sq35: null,
					sq36: null,
					sq37: null,
					sq38: null,
					sq39: null,
					sq40: null,
				},
				row6: {
					sq41: null,
					sq42: null,
					sq43: null,
					sq44: null,
					sq45: null,
					sq46: null,
					sq47: null,
					sq48: null,
				},
				row7: {
					sq49: null,
					sq50: null,
					sq51: null,
					sq52: null,
					sq53: null,
					sq54: null,
					sq55: null,
					sq56: null,
				},
				row8: {
					sq57: null,
					sq58: null,
					sq59: null,
					sq60: null,
					sq61: null,
					sq62: null,
					sq63: null,
					sq64: null,
				},
			},
		};
	}

	componentDidMount() {
		// Here we should set the initial board state
		const startingBoard = { ...this.state.board };
		let curRow = BOARD_WIDTH;
		let board = parseFEN([...this.state.startingPosition]).slice(0, 8);
		console.log(board);

		// for each row
		for (let i = curRow; i > 0; i--) {
			let squares = Object.keys(startingBoard[`row${i}`]);
			let columnCount = 0;

			// for each piece in the row
			squares.forEach((square) => {
				startingBoard[`row${i}`][square] = board[8 - i][columnCount];
				columnCount++;
			});
		}
		this.setState({
			board: startingBoard,
		});
		console.log(startingBoard);
	}

	handleDragOver = (e) => {
		e.preventDefault();
	};

	handleDrag = (e) => {
		e.dataTransfer.setData('piece', e.target.className);
	};

	handleDrop = (e) => {
		e.preventDefault();
		e.target.classList.remove(`dragOver`);
		let droppedPiece = e.dataTransfer.getData('piece');
		let newBoardState = { ...this.state.board };
		newBoardState[e.target.dataset.row][e.target.id] = droppedPiece;

		this.setState({
			board: newBoardState,
		});
	};

	handleDragLeave = (e) => {
		e.preventDefault();
		e.target.classList.remove(`dragOver`);
	};

	handleDragEnter = (e) => {
		e.preventDefault();
		e.target.classList.add(`dragOver`);
	};

	chessBoard = (e) => {
		let board = [];
		let rowCount = BOARD_WIDTH;
		// Loop over each row
		for (let j = 0; j < BOARD_HEIGHT; j++) {
			// Loop over each square
			for (let i = BOARD_WIDTH; i > 0; i--) {
				let curBoardRow = this.state.board['row' + rowCount];
				let squareCount = 64 - j * 8 - i + 1; // This is so 1 is the bottom left (if youre white. super annoying because var - var in for loop breaks apparently)
				let squareId = `sq${squareCount}`; // Get the current square ID
				let curSquare = curBoardRow[squareId]; // pass the current square id in so we get its value and find out if it has a piece
				let squareClass;
				if (j % 2 === 0) {
					squareClass =
						i % 2 === 0 ? 'board_square --white' : 'board_square --black';
				} else {
					squareClass =
						i % 2 === 0 ? 'board_square --black' : 'board_square --white';
				}

				board.push(
					<div
						id={'sq' + squareCount}
						data-row={'row' + rowCount}
						key={squareCount}
						className={squareClass}
						onDrop={(e) => this.handleDrop(e)}
						onDragEnter={(e) => this.handleDragEnter(e)}
						onDragOver={(e) => this.handleDragOver(e)}
						onDragLeave={(e) => this.handleDragLeave(e)}
					>
						{/* Inside the square, we add a piece if one exists */}
						{curSquare}
						<h4>{squareCount}</h4>
					</div>
				);
			}
			rowCount--;
		}

		return board;
	};

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
