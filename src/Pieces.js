import React from 'react';
import { removeSquareColors } from './helper';
import { findMoves } from './findLegalMoves';

// Piece move direction list:
// [N, NW, NE, E, W, SW, SE, S]

class Piece extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// each piece (numbered) and what square its currently on
		};
	}

	handleDrag = (e) => {
		e.dataTransfer.setData('piece', e.target.className);
	};

	checkForCheck = (e) => {
		let pieces = [`wp`, `wr`, `wn`, `wb`, `wq`, `wk`, `bb`, `br`, `bn`, `bk`, `bq`, `bp`]; //prettier-ignore

		for (let square = 1; square <= 64; square++) {
			let squareId = `sq` + square;
			let squareEl = document.getElementById(squareId);

			pieces.some((piece) => {
				if (squareEl.innerHTML.includes(piece)) {
					let color = piece.slice(0, 1);
					let pc = piece.slice(1, 2);
					let sq = squareId;
					let row = squareEl.dataset.row;

					let legalMoves = findMoves(row, sq, color, pc);

					if (legalMoves.length === 0) return `Done`;

					legalMoves.forEach((move) => {
						let squareEl2 = document.getElementById(move).innerHTML;
						if (squareEl2.includes(color === `w` ? `bk` : `wk`)) {
							console.log(`CHECK`, piece, move);
						}
					});
					return `Done`;
				}
				return null;
			});
		}
	};

	pieceHtml = (
		<div
			className={this.props.piece}
			draggable="true"
			onClick={(e) => {
				removeSquareColors();
				let row = e.target.parentNode.dataset.row;
				let sq = e.target.parentNode.id;
				let color = e.target.className.slice(0, 1);
				this.props.legalMoves(this.findMoves(row, sq, color));
				e.target.parentNode.classList.add(`highlight`);
				this.checkForCheck();
			}}
			onDragStart={(e) => {
				removeSquareColors();
				let row = e.target.parentNode.dataset.row;
				let sq = e.target.parentNode.id;
				let color = e.target.className.slice(0, 1);

				this.handleDrag(e);
				this.props.prevPosition([row, sq]);
				this.props.legalMoves(this.findMoves(row, sq, color));
				e.target.parentNode.classList.add(`highlight`);
			}}
		></div>
	);

	render() {
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Pieces     //////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////    Knight     //////////////////////////////////////////////////////////////
export class Knight extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `n`,
		};
	}

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}

//////////////////////////////////////////////////////////////    Rook     //////////////////////////////////////////////////////////////
export class Rook extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `r`,
		};
	}

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}

//////////////////////////////////////////////////////////////    Queen     //////////////////////////////////////////////////////////////
export class Queen extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `q`,
		};
	}

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}

//////////////////////////////////////////////////////////////    King     //////////////////////////////////////////////////////////////
export class King extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `k`,
		};
	}

	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}

//////////////////////////////////////////////////////////////    Pawn     //////////////////////////////////////////////////////////////
export class Pawn extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `p`,
			attacking: false,
		};
	}

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}

//////////////////////////////////////////////////////////////    Bishop     //////////////////////////////////////////////////////////////
export class Bishop extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `b`,
		};
	}

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		const newLegalMoves = findMoves(row, sq, col, this.state.piece); //prettier-ignore
		return newLegalMoves;
	};

	render() {
		return this.pieceHtml;
	}
}
