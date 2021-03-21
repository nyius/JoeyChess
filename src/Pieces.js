import React from 'react';
import { removeSquareColors } from './helper';
import { findMoves, checkForCheck, checkEveryMove } from './findLegalMoves';

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

	pieceHtml = (
		<div
			className={this.props.piece}
			draggable="true"
			onClick={(e) => {
				removeSquareColors();
				let row = e.target.parentNode.dataset.row;
				let sq = e.target.parentNode.id;
				let color = e.target.className.slice(0, 1);
				// this.props.checkForCheck(checkForCheck());
				// checkEveryMove(color);
				this.props.legalMoves(this.findMoves(row, sq, color));
				e.target.parentNode.classList.add(`highlight`);
			}}
			onDragStart={(e) => {
				removeSquareColors();
				let row = e.target.parentNode.dataset.row;
				let sq = e.target.parentNode.id;
				let color = e.target.className.slice(0, 1);

				this.handleDrag(e);
				this.props.prevPosition([row, sq]);
				this.props.checkForCheck(checkForCheck());
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
