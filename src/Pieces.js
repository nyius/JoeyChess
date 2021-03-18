import React from 'react';
import { checkForEnemy } from './helper';

// Piece move direction list:
// [N, NW, NE, E, W, SW, SE, S]

class Piece extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// each piece (numbered) and what square its currently on
			wp1: 0,
			wp2: 0,
			wp3: 0,
			wp4: 0,
			wp5: 0,
			wp6: 0,
			wp7: 0,
			wp8: 0,
			wb1: 0,
			wb2: 0,
			wn1: 0,
			wn2: 0,
			wr1: 0,
			wr2: 0,
			wk1: 0,
			wq1: 0,
			bp1: 0,
			bp2: 0,
			bp3: 0,
			bp4: 0,
			bp5: 0,
			bp6: 0,
			bp7: 0,
			bp8: 0,
			bb1: 0,
			bb2: 0,
			bn1: 0,
			bn2: 0,
			br1: 0,
			br2: 0,
			bk1: 0,
			bq1: 0,
		};
	}

	handleDrag = (e) => {
		e.dataTransfer.setData('piece', e.target.className);
	};

	/**
	 * Finds all legal moves for the current piece (eg. findMoves(12, 2, `w`))
	 * @param {Number} row Takes in the current row
	 * @param {Number} sq Takes in the current square
	 * @param {String} col Takes in the current color
	 * @returns
	 */
	findMoves = (row, sq, col) => {
		// Piece move direction list:
		// [N, NW, NE, E, W, SW, SE, S]
		let newLegalMoves = [];
		let startingLegalMoves = this.state.moves;
		let piece = this.state.piece;
		let color = col;
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];

		// Flip the startingLegalMoves if its black
		if (color === `b`) {
			let a = startingLegalMoves[1];
			let b = startingLegalMoves[2];
			startingLegalMoves.reverse();

			startingLegalMoves[5] = a;
			startingLegalMoves[6] = b;
		}

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare;
				// If the piece is black, flip all of its moves
				color === `w` ? pieceMoveToSquare = move + curSquare :	pieceMoveToSquare = -move + curSquare; //prettier-ignore

				// Handle Bishop, Queen, and Rook Moves ------------------------------------------------------------------------------------
				if (piece === `b` || piece === `q` || piece === `r`) {
					// TODO: Stop when it hits a piece
					// TODO: check if that piece is an enemy. if it is, we can capture it

					// North Move ------------------------------------------------------------------------------------
					if (dirIndex === 0) {
						//prettier-ignore
						for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
							    newLegalMoves.push(`sq` + newSquare);
							    return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }

						}
					}
					// South Move ----------------------------------------------------------------------------
					else if (dirIndex === 7) {
						//prettier-ignore
						for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
							    newLegalMoves.push(`sq` + newSquare);
							    return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }
						}
					}
					// East Move ----------------------------------------------------------------------------
					else if (dirIndex === 3) {
						//prettier-ignore
						for (let newSquare = curSquare + 1;	newSquare <= rightEdge[curRow - 1];	newSquare++) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
							    newLegalMoves.push(`sq` + newSquare);
							    return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }
						}
					}
					// West Move ----------------------------------------------------------------------------
					else if (dirIndex === 4) {
						//prettier-ignore
						for (let newSquare = curSquare - 1; newSquare >= leftEdge[curRow - 1]; newSquare--) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
							    newLegalMoves.push(`sq` + newSquare);
							    return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }
						}
					}
					// North West Move ----------------------------------------------------------------------------
					else if (dirIndex === 1) {
						//prettier-ignore
						for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else if (leftEdge.includes(newSquare)) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }
						}
					}
					// North East Move ----------------------------------------------------------------------------
					else if (dirIndex === 2) {
						//prettier-ignore
						for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else if (rightEdge.includes(newSquare)) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            
							}
						}
					}
					// South West Move ----------------------------------------------------------------------------
					else if (dirIndex === 5) {
						//prettier-ignore
						for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else if (leftEdge.includes(newSquare)) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }
						}
					}
					// South East Move ----------------------------------------------------------------------------
					else if (dirIndex === 6) {
						//prettier-ignore
						for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
                            let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                            if(squareHasEnemy === `Friendly`){
                                return;
                            } 
                            else if(squareHasEnemy) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else if (rightEdge.includes(newSquare)) {
                                newLegalMoves.push(`sq` + newSquare);
                                return;
                            } 
                            else {
                                newLegalMoves.push(`sq` + newSquare);
                            }


						}
					}
				}

				// Handle Pawn Move ------------------------------------------------------------------------------------
				if (piece === `p`) {
					// Check if our move puts us above or below the board
					if (pieceMoveToSquare > 0 && pieceMoveToSquare < 65) {
						//prettier-ignore
						let squareHasEnemy = checkForEnemy(curSquare,curRow,pieceMoveToSquare,color,dirIndex)

						// If the square has an enemy, highlight that square
						if (squareHasEnemy) {
							newLegalMoves.push(`sq` + pieceMoveToSquare);
						}

						// Check for forward moves
						if (dirIndex === 0 || dirIndex === 7) {
							let moveNum = color === `w` ? move : -move;

							// 1. Check if theres a piece infront of the pawn
							//prettier-ignore
							if (document.getElementById(`sq` + pieceMoveToSquare).innerHTML.includes(color===`w` ? `black` : `white`)) {
                                return;
                            } 
                            // 2. Check if its the first move or not (if it is, it allows us to move 2 squares)
                            else if (color === `w` && curRow === 2) {
								newLegalMoves.push(`sq` + pieceMoveToSquare);

                                if(document.getElementById(`sq` + Number(pieceMoveToSquare + moveNum)).innerHTML.includes(color===`w` ? `black` : `white`)){
                                    return;
                                }
								newLegalMoves.push(`sq` + Number(pieceMoveToSquare + moveNum));
							} 
                            else if (color === `b` && curRow === 7) {
								newLegalMoves.push(`sq` + pieceMoveToSquare);

                                if(document.getElementById(`sq` + Number(pieceMoveToSquare + moveNum)).innerHTML.includes(color===`w` ? `black` : `white`)){
                                    return;
                                }
								newLegalMoves.push(`sq` + Number(pieceMoveToSquare + moveNum));
							} 
                            // 3. If theres nothing in front and its not first move, let us move 1 square forward
                            else {
								newLegalMoves.push(`sq` + pieceMoveToSquare);
							}
						}
					}
					return;
				}

				// Check if our move puts us above or below the board ------------------------------------------------------------------------------------
				if (pieceMoveToSquare > 0 && pieceMoveToSquare < 65) {
					// if direction is right and it goes past one of our right edges, stop it ------------------------------------------------------------
					if (dirIndex === 2 || dirIndex === 3 || dirIndex === 5) {
						// If our current piece is on the right edge, we can't go right
						if (curSquare === rightEdge[curRow - 1]) {
							return;
						} else {
							newLegalMoves.push(`sq` + pieceMoveToSquare);
							return;
						}
					}

					// if direction is left and it does past one of its left eges, stop -------------------------------------------------------------------
					else if (dirIndex === 1 || dirIndex === 4 || dirIndex === 6) {
						// If our current piece is on the left edge, we can't go left
						if (curSquare === leftEdge[curRow - 1]) {
							return;
						} else {
							newLegalMoves.push(`sq` + pieceMoveToSquare);
							return;
						}
					}

					// Any other move (N, W, E, S), simply push it to our list
					newLegalMoves.push(`sq` + pieceMoveToSquare);
				}
			} else {
				newLegalMoves.push(0);
			}
		});
		// console.log(newLegalMoves);
		return newLegalMoves;
	};

	pieceHtml = (
		<div
			className={this.props.piece}
			draggable="true"
			onDragStart={(e) => {
				let row = e.target.parentNode.dataset.row;
				let sq = e.target.parentNode.id;
				let color = e.target.className.slice(0, 1);
				let legalMoves = this.findMoves(row, sq, color);

				this.handleDrag(e);
				this.props.prevPosition([row, sq]);
				this.props.legalMoves(legalMoves);
				e.target.parentNode.classList.add(`highlight`);
			}}
		></div>
	);

	render() {
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    Pieces     ///////////////////////////////////
export class Knight extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `n`,
			moves: [15, 6, -10, -17, -15, -10, 6, 17],
		};
	}

	render() {
		return this.pieceHtml;
	}
}

export class Rook extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `r`,
			moves: [8, 0, 0, 1, -1, 0, 0, -8],
		};
	}

	render() {
		return this.pieceHtml;
	}
}

export class Queen extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `q`,
			moves: [8, 7, 9, 1, -1, -9, -7, -8],
		};
	}

	render() {
		return this.pieceHtml;
	}
}

export class King extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `k`,
			moves: [8, 7, 9, 1, -1, -9, -7, -8],
		};
	}

	render() {
		return this.pieceHtml;
	}
}

export class Pawn extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `p`,
			pawnHasMoved: false,
			attacking: false,
			moves: [8, 7, 9, 0, 0, 0, 0, 0],
		};
	}

	render() {
		return this.pieceHtml;
	}
}

export class Bishop extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `b`,
			moves: [0, 9, 7, 0, 0, -9, -7, 0],
		};
	}

	render() {
		return this.pieceHtml;
	}
}
