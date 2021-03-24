import React from 'react';
import './scss/index.scss';
import { BOARD_HEIGHT, BOARD_WIDTH } from './config';
// eslint-disable-next-line
//prettier-ignore
import { parseFEN, generateFEN, pieceCheck, removeSquareColors } from './helper';

class JoeyChess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// boardPositionFEN: `r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 w KQkq - 0 1`,
			// boardPositionFEN: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`,
			boardPositionFEN: `rnbqkbnr/pp3ppp/2p5/3pp2Q/3P4/4P3/PPP2PPP/RNB1KBNR w KQkq - 0 4`,
			boardState: null,
			newSquare: [],
			curSquare: null,
			whoseTurn: `w`,
			turnNum: 1,
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
		// Create the starting position. pass in the current state, and the current starting positon FEN
		//prettier-ignore
		let parsedFEN = parseFEN({ ...this.state.board }, [...this.state.boardPositionFEN])
		this.setState({
			board: parsedFEN[0],
			boardState: parsedFEN[1],
		});
	}

	componentDidUpdate() {}

	handleDragOver = (e) => {
		e.preventDefault();
	};

	handleDrop = (e) => {
		// TODO: EN-PASSANT
		// TODO: CASTLE
		// TODO: PROMOTING
		// TODO: CHECKMATE

		e.preventDefault();
		if (!e.dataTransfer.getData('piece')) return;
		const droppedPiece = e.dataTransfer.getData('piece');
		const newPiece = pieceCheck(droppedPiece); // returns the new piece, and the previous square it was on
		const turn = Object.values({ ...this.state.boardState });
		const whoseTurn = turn[0];
		const legalMoves = newPiece[2];
		const kingInCheck = newPiece[3];

		// Check if its the right players move. If not, do absolutely nothing
		if (newPiece[0].props.piece[0] === whoseTurn) {
			let newBoardState = { ...this.state.board };
			let newFEN, parsedFEN;

			// if (kingInCheck) return;

			// If Our move isn't legal, do nothing
			if (!legalMoves.includes(e.target.id) && !legalMoves.includes(e.target.parentNode.id)) return; //prettier-ignore

			// Remove/add a whole bunch of board highlights ----------------------------------------------------------------------------------------
			removeSquareColors();
			e.target.id ? e.target.classList.add(`highlight`):e.target.parentNode.classList.add(`highlight`); //prettier-ignore
			document.querySelector('.highlight2')?.classList.remove(`highlight2`);
			document.getElementById(newPiece[1][1]).classList.add('highlight2');
			//  --------------------------------------------------------------------------------------------------------------------------------------

			// Handle Castling Movements -------------------------------------------------------------------------------------------------------------
			//prettier-ignore
			if (droppedPiece.includes(`wk`) && newPiece[1][1] === `sq5` && this.state.newSquare[1] === `sq7`) {
				let newRook = pieceCheck(`white piece wr`);
				newBoardState[`row1`][`sq8`] = ``
				newBoardState[`row1`][`sq6`] = newRook[0]
			}
			//prettier-ignore
			if (droppedPiece.includes(`wk`) && newPiece[1][1] === `sq5` && this.state.newSquare[1] === `sq3`) {
				let newRook = pieceCheck(`white piece wr`);
				newBoardState[`row1`][`sq1`] = ``
				newBoardState[`row1`][`sq4`] = newRook[0]
			}
			//  ----------------------------------------------------------------------------------------------------------------------------------------

			// Remove the piece from the old square, move it to the new square, and generate a new FEN + parse it and save it to the state
			newBoardState[newPiece[1][0]][newPiece[1][1]] = ''; // set the square that the piece came from to blank
			newBoardState[this.state.newSquare[0]][this.state.newSquare[1]] = newPiece[0]; //prettier-ignore
			newFEN = generateFEN(newBoardState, this.state.boardState); // generate a new FEN based on the board
			parsedFEN = parseFEN({ ...this.state.board }, [...newFEN]); // parse the new FEN into the new position
			//  --------------------------------------------------------------------------------------------------------------------------------------

			this.setState({
				boardPositionFEN: newFEN,
				board: parsedFEN[0],
				boardState: parsedFEN[1],
			});
		} else {
			removeSquareColors();
		}
	};

	handleDragLeave = (e) => {
		e.preventDefault();
		if (this.state.curSquare.id) {
			e.target.classList.remove(`dragOver`);
		}
	};

	handleDragEnter = (e) => {
		e.preventDefault();
		if (e.target.id) {
			e.target.classList.add(`dragOver`);
			this.setState({
				newSquare: [e.target.dataset.row, e.target.id],
				curSquare: e.target,
			});
		} else {
			e.target.parentNode.classList.add(`dragOver`);
			this.setState({
				newSquare: [e.target.parentNode.dataset.row, e.target.parentNode.id],
				curSquare: e.target,
			});
		}
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
				let curPiece = curBoardRow[squareId]; // pass the current square id in so we get its value and find out if it has a piece
				let squareClassName;

				if (j % 2 === 0) {
					squareClassName =
						i % 2 === 0 ? 'board_square --white' : 'board_square --black';
				} else {
					squareClassName =
						i % 2 === 0 ? 'board_square --black' : 'board_square --white';
				}

				board.push(
					<div
						id={'sq' + squareCount}
						data-row={'row' + rowCount}
						key={squareCount}
						className={squareClassName}
						onDrop={(e) => this.handleDrop(e)}
						onDragEnter={(e) => this.handleDragEnter(e)}
						onDragOver={(e) => this.handleDragOver(e)}
						onDragLeave={(e) => this.handleDragLeave(e)}
					>
						{/* Inside the square, we add a piece if one exists */}
						{curPiece}
						<h4>{squareCount}</h4>
					</div>
				);
			}
			rowCount--;
		}

		return board;
	};

	render() {
		const turn = Object.values({ ...this.state.boardState });
		const whoseTurn = turn[0];
		const turnNum = turn[turn.length - 1];
		return (
			<div className="board_container">
				<this.chessBoard />
				<div id="turn">
					<h1>{whoseTurn + ` ` + turnNum}</h1>
				</div>
			</div>
		);
	}
}

function App() {
	return <JoeyChess />;
}

export default App;
