import React from 'react';
import { checkForEnemy, removeSquareColors } from './helper';

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
		let color = col;
		let newLegalMoves = [];
		let piece = this.state.piece;
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
		let startingLegalMoves = color === `b` ? this.state.movesBlack : this.state.movesWhite; //prettier-ignore

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare;
				// If the piece is black, flip all of its moves. Except for knight because this really messes everything up
				if (color === `w`) {
					pieceMoveToSquare = move + curSquare;
				} else if (color === `b` && piece === `n`) {
					pieceMoveToSquare = move + curSquare;
				} else if (color === `b` && piece !== `n`) {
					pieceMoveToSquare = -move + curSquare;
				}

				if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

				// Handle Bishop, Queen, and Rook Moves ------------------------------------------------------------------------------------
				if (piece === `b` || piece === `q` || piece === `r`) {
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

                                if (rightEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
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
                                
                                if (leftEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
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

                                if (leftEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
                                    return;
                                } 
                                else if (leftEdge.includes(newSquare)){
                                    newLegalMoves.push(`sq` + newSquare);
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
					// North East Move ----------------------------------------------------------------------------
					else if (dirIndex === 2) {
						//prettier-ignore
						for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
                                let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                                if (rightEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
                                    return;
                                } 
                                else if (rightEdge.includes(newSquare)){
                                    newLegalMoves.push(`sq` + newSquare);
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
					// South West Move ----------------------------------------------------------------------------
					else if (dirIndex === 5) {
						//prettier-ignore
						for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
                                let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                                if (leftEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
                                    return;
                                } 
                                else if (leftEdge.includes(newSquare)){
                                    newLegalMoves.push(`sq` + newSquare);
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
					// South East Move ----------------------------------------------------------------------------
					else if (dirIndex === 6) {
						//prettier-ignore
						for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
                                let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                                if (rightEdge.includes(curSquare)) {
                                    return;
                                } 
                                else if(squareHasEnemy === `Friendly`){
                                    return;
                                } 
                                else if (rightEdge.includes(newSquare)){
                                    newLegalMoves.push(`sq` + newSquare);
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
				}

				// Handle Pawn Move ------------------------------------------------------------------------------------
				if (piece === `p`) {
					//prettier-ignore
					let squareHasEnemy = checkForEnemy(curSquare,curRow,pieceMoveToSquare,color,dirIndex)

					// Check for forward moves
					if (dirIndex === 0 || dirIndex === 7) {
						let moveNum = color === `w` ? move : -move;
						let pieceInFront = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
						let piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + moveNum)) //prettier-ignore
						// 1. Check if theres a piece infront of the pawn
						//prettier-ignore
						if (pieceInFront.innerHTML.includes(`piece`)) {
                                return;
                            } 
                            // 2. Check if its the first move or not (if it is, it allows us to move 2 squares)
                            else if (color === `w` && curRow === 2) {
								newLegalMoves.push(`sq` + pieceMoveToSquare);
                                if(piece2InFront.innerHTML.includes(`piece`)){
                                    return;
                                }
								newLegalMoves.push(`sq` + Number(pieceMoveToSquare + moveNum));
							} 
                            else if (color === `b` && curRow === 7) {
								newLegalMoves.push(`sq` + pieceMoveToSquare);
                                if(piece2InFront.innerHTML.includes(`piece`)){
                                    return;
                                }
								newLegalMoves.push(`sq` + Number(pieceMoveToSquare + moveNum));
							} 
                            // 3. If theres nothing in front and its not first move, let us move 1 square forward
                            else {
								newLegalMoves.push(`sq` + pieceMoveToSquare);
							}
					}
					// If the square has an enemy, highlight that square
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
					return;
				}

				// Handle King Move ------------------------------------------------------------------------------------
				if (piece === 'k') {
					//prettier-ignore
					let squareHasEnemy = checkForEnemy(curSquare,curRow,pieceMoveToSquare,color,dirIndex)
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
			}
		});
		return newLegalMoves;
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

///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////    Pieces     ///////////////////////////////////
export class Knight extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			piece: `n`,
			// [N, NW, NE, E, W, SW, SE, S]
			moves: [15, 6, 17, 10, -10, -17, -6, -15],
		};
	}

	findMoves = (row, sq, col) => {
		// Piece move direction list:
		// [N, NW, NE, E, W, SW, SE, S]
		let color = col;
		let newLegalMoves = [];
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
		let startingLegalMoves = this.state.moves; //prettier-ignore

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare = move + curSquare;

				if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

				// North Move ----------------------------------------------------------------------------
				if (dirIndex === 0) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					if (rightEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];

					//prettier-ignore
					if (rightEdge.includes(curSquare + 1)) {
                            return;
                        }
					if (rightEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// West Move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					//prettier-ignore
					if (rightEdge.includes(curSquare - 1)) {
								return;
							}
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					//prettier-ignore
					if (leftEdge.includes(curSquare - 1)) {
                            return;
                        }
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					if (rightEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					//prettier-ignore
					if (rightEdge.includes(curSquare + 1)) {
                        return;
                    }
					if (rightEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					}
				}
			}
		});
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
			moves: [8, 0, 0, 1, -1, 0, 0, -8],
		};
	}

	findMoves = (row, sq, col) => {
		// Piece move direction list:
		// [N, NW, NE, E, W, SW, SE, S]
		let color = col;
		let newLegalMoves = [];
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
		let startingLegalMoves = this.state.moves; //prettier-ignore

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare = move + curSquare;

				if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
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
                        
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
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
			}
		});
		return newLegalMoves;
	};

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

	findMoves = (row, sq, col) => {
		// Piece move direction list:
		// [N, NW, NE, E, W, SW, SE, S]
		let color = col;
		let newLegalMoves = [];
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
		let startingLegalMoves = this.state.moves;

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare = move + curSquare;

				if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
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
                        
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
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

                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
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
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					//prettier-ignore
					for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
                        let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
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
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
                        let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
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
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					//prettier-ignore
					for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
                        let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex)

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if(squareHasEnemy === `Friendly`){
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
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
			}
		});
		return newLegalMoves;
	};

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

	findMoves = (row, sq, col) => {
		// Piece move direction list:
		// [N, NW, NE, E, W, SW, SE, S]
		let color = col;
		let newLegalMoves = [];
		let curRow = Number(row.slice(3));
		let curSquare = Number(sq.slice(2));
		let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
		let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
		let startingLegalMoves = this.state.moves; //prettier-ignore

		// Generate an array of legal squares we can go to
		startingLegalMoves.forEach((move, dirIndex) => {
			if (move) {
				let pieceMoveToSquare = move + curSquare;

				if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

				//prettier-ignore
				let squareHasEnemy = checkForEnemy(curSquare,curRow,pieceMoveToSquare,color,dirIndex)

				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					if(squareHasEnemy === `Friendly`){
                        return;
                    } 
                    else if(squareHasEnemy) {
                        newLegalMoves.push(`sq` + pieceMoveToSquare);
                        return;
                    } 
                    else {
                        newLegalMoves.push(`sq` + pieceMoveToSquare);
                    }
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// East move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					if (rightEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// West move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					//prettier-ignore
					if (leftEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					//prettier-ignore
					if (leftEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					//prettier-ignore
					if (rightEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					if (leftEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					//prettier-ignore
					if (rightEdge.includes(curSquare)) {
						return;
					} else if (squareHasEnemy === `Friendly`) {
						return;
					} else if (squareHasEnemy) {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
			}
		});
		return newLegalMoves;
	};

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
			movesWhite: [8, 7, 9, 0, 0, 0, 0, 0],
			movesBlack: [0, 0, 0, 0, 0, 7, 9, 8],
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
			movesWhite: [0, 9, 7, 0, 0, -9, -7, 0],
			movesBlack: [0, -7, -9, 0, 0, 9, 7, 0],
		};
	}

	render() {
		return this.pieceHtml;
	}
}
