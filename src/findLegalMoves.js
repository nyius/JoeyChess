import { checkForEnemy } from './helper';

// TODO: I Need to check for check in here, and return NO legal moves if we're in check

let checkingPieceSquares = [];
let everyMove = [];
let kingInCheck;

export const checkForCheck = (e) => {
	// If its white turn, this function checks every single black piece and finds its legal moves.
	// If one of its legal squares lands on whites king, we're in check and cant do anything about it.
	// Return a list of all squares white(or blacks depending on whose turn it is) controls to the find legal moves function.
	checkingPieceSquares = [];
	let pieces = []; //prettier-ignore
	let checkState;
	let turn = document.getElementById(`turn`).innerHTML.includes(`w`) ? `white` : `black`; //prettier-ignore
	turn === `black` ? (pieces = [`wp`, `wr`, `wn`, `wb`, `wq`, `wk`]) : (pieces = [`bb`, `br`, `bn`, `bk`, `bq`, `bp`]); //prettier-ignore

	// For every square on the board
	for (let square = 1; square <= 64; square++) {
		let squareEl = document.getElementById(`sq` + square);

		// And for every piece that exists, check the square for it
		// As soon as we find a matching piece, throw away the other results
		pieces.some((piece) => {
			if (squareEl.innerHTML.includes(piece)) {
				if (squareEl.innerHTML.includes(turn)) return; // if any squares contain whoevers turn it us, skip them.
				let color = piece.slice(0, 1);
				let pc = piece.slice(1, 2);
				let row = squareEl.dataset.row;

				let legalMoves = findMoves(row, `sq` + square, color, pc); // Check for legal moves for that piece

				if (legalMoves.length === 0) return `Done`;

				// For every legal move that piece has
				legalMoves.forEach((move) => {
					let squareEl2 = document.getElementById(move).innerHTML;
					if (checkingPieceSquares.includes(move)) return; // if we already have that piece saved, get rid of it
					checkingPieceSquares.push(...legalMoves);
					// checkState = `check`;
					// kingInCheck = true;
					// check if that legal move contains the opposite color king
					// if (squareEl2.includes(color === `w` ? `bk` : `wk`)) {
					// 	if (checkingPieceSquares.includes(move)) {
					// 		return;
					// 	}
					// 	return;
					// }
				});
				return `Done`;
			}
			return null;
		});
	}

	if (checkingPieceSquares) {
		checkingPieceSquares.forEach((square) => {
			document.getElementById(square).classList.add(`runAway`);
		});
	}
	return checkState;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Find legal moves     //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const findMoves = (row, sq, col, pc) => {
	// Piece move direction list:
	// [N, NW, NE, E, W, SW, SE, S]
	let color = col;
	let piece = pc;
	let newLegalMoves = [];
	let curRow = Number(row.slice(3));
	let curSquare = Number(sq.slice(2));
	let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
	let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
	let startingLegalMoves;
	let knightMoves = [15, 6, 17, 10, -10, -17, -6, -15];
	let bishopMoves = [0, 9, 7, 0, 0, -9, -7, 0];
	let rookMoves = [8, 0, 0, 1, -1, 0, 0, -8];
	let queenMoves = [8, 7, 9, 1, -1, -9, -7, -8];
	let kingMoves = [8, 7, 9, 1, -1, -9, -7, -8];
	let pawnMovesWhite = [8, 7, 9, 0, 0, 0, 0, 0];
	let pawnMovesBlack = [0, 0, 0, 0, 0, -7, -9, -8];

	if (piece === `p`) {
		startingLegalMoves = color === `b` ? pawnMovesBlack : pawnMovesWhite;
	}
	if (piece === `n`) {
		startingLegalMoves = knightMoves;
	}
	if (piece === `b`) {
		startingLegalMoves = bishopMoves;
	}
	if (piece === `r`) {
		startingLegalMoves = rookMoves;
	}
	if (piece === `q`) {
		startingLegalMoves = queenMoves;
	}
	if (piece === `k`) {
		startingLegalMoves = kingMoves;
	}

	// NEED TO FIND MOVES DEPENDING ON WHAT PIECE IS CLICKED
	// AKA IF BLACK CLICKS BUT THEYRE IN CHECK, SHOW ONLY THEIR MOVES THEY CAN DO IN CHECK
	// BUT IF WHITE CLICKS WHILE BLACKS IN CHECK, SHOW THEIR FULL RANGE OF MOVES LIKE NORMAL

	// Generate an array of legal squares we can go to
	startingLegalMoves.forEach((move, dirIndex) => {
		if (move) {
			let pieceMoveToSquare = move + curSquare;

			if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move immediately

			const moveCheck = (newSquare) => {
				let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore

				if (squareHasEnemy === `Friendly`) {
					return true;
				}
				// North
				if (dirIndex === 0 && piece === `n` && leftEdge.includes(curSquare)) {
					return;
				}

				// North West
				if (dirIndex === 1 && leftEdge.includes(newSquare)) {
					newLegalMoves.push(`sq` + newSquare);
					return true;
				}
				if (dirIndex === 1 && leftEdge.includes(curSquare)) {
					return true;
				}
				//prettier-ignore
				if (dirIndex === 1 && piece === `n` && leftEdge.includes(curSquare - 1)) {
					return true;
				}

				// North East
				if (dirIndex === 2 && rightEdge.includes(newSquare)) {
					newLegalMoves.push(`sq` + newSquare);
					return true;
				}
				if (dirIndex === 2 && rightEdge.includes(curSquare)) {
					return true;
				}

				if (dirIndex === 3 && rightEdge.includes(curSquare)) {
					return true;
				}
				//prettier-ignore
				if (dirIndex === 3 && piece === `n` && rightEdge.includes(curSquare + 1)) {
					return true;
				}
				if (dirIndex === 4 && leftEdge.includes(curSquare)) {
					return true;
				}
				//prettier-ignore
				if (dirIndex === 4 && piece === `n` && leftEdge.includes(curSquare - 1)) {
					return true;
				}

				if (dirIndex === 5 && leftEdge.includes(newSquare)) {
					newLegalMoves.push(`sq` + newSquare);
					return true;
				}
				if (dirIndex === 5 && leftEdge.includes(curSquare)) {
					return true;
				}

				if (dirIndex === 6 && rightEdge.includes(newSquare)) {
					newLegalMoves.push(`sq` + newSquare);
					return true;
				}
				//prettier-ignore
				if (dirIndex === 6 && piece === `n` && rightEdge.includes(curSquare + 1)) {
					return true;
				}

				if (dirIndex === 7 && piece === `n` && rightEdge.includes(curSquare)) {
					return true;
				}
				// else if (checkingPieceSquares.includes(`sq` + newSquare)) {
				//     newLegalMoves.push(`sq` + newSquare);
				//     return;
				// }
				else if (squareHasEnemy) {
					newLegalMoves.push(`sq` + newSquare);
					return `end`;
				} else {
					newLegalMoves.push(`sq` + newSquare);
				}
			};

			// Knight ----------------------------------------------------------------------------
			if (piece === `n`) {
				moveCheck(pieceMoveToSquare);
			}

			// Bishop ----------------------------------------------------------------------------
			if (piece === `b`) {
				if (dirIndex === 1) {
					//prettier-ignore
					for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {
						if(moveCheck(newSquare)) return;

					}
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					//prettier-ignore
					for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
						if(moveCheck(newSquare)) return;
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
						if(moveCheck(newSquare)) return;
					}
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					//prettier-ignore
					for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
						if(moveCheck(newSquare)) return;
					}
				}
			}

			// Rook ----------------------------------------------------------------------------
			if (piece === `r`) {
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
						if(moveCheck(newSquare)) return;
					}
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
						if(moveCheck(newSquare)) return;
					}
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= rightEdge[curRow - 1];	newSquare++) {
						if(moveCheck(newSquare)) return;
					}
				}
				// West Move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					//prettier-ignore
					for (let newSquare = curSquare - 1; newSquare >= leftEdge[curRow - 1]; newSquare--) {
						if(moveCheck(newSquare)) return;
					}
				}
			}

			// Queen ----------------------------------------------------------------------------
			if (piece === `q`) {
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= rightEdge[curRow - 1];	newSquare++) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// West Move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					//prettier-ignore
					for (let newSquare = curSquare - 1; newSquare >= leftEdge[curRow - 1]; newSquare--) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					//prettier-ignore
					for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					//prettier-ignore
					for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
						if(moveCheck(newSquare)) return;
                    }
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					//prettier-ignore
					for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
						if(moveCheck(newSquare)) return;
                    }
				}
			}

			// King ----------------------------------------------------------------------------
			if (piece === `k`) {
				moveCheck(pieceMoveToSquare);
			}

			// Pawn ----------------------------------------------------------------------------
			if (piece === `p`) {
				let squareHasEnemy = checkForEnemy(
					curSquare,
					curRow,
					pieceMoveToSquare,
					color,
					dirIndex
				);

				// Check for forward moves
				if (dirIndex === 0 || dirIndex === 7) {
					let pieceInFront = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
					let piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + move)) //prettier-ignore
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
                        newLegalMoves.push(`sq` + Number(pieceMoveToSquare + move));
                    } 
                    else if (color === `b` && curRow === 7) {
                        newLegalMoves.push(`sq` + pieceMoveToSquare);
                        if(piece2InFront.innerHTML.includes(`piece`)){
                            return;
                        }
                        newLegalMoves.push(`sq` + Number(pieceMoveToSquare + move));
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
		}
	});
	return newLegalMoves;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Find Every move     //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const findEveryMove = (row, sq, col, pc) => {
	// Piece move direction list:
	// [N, NW, NE, E, W, SW, SE, S]
	let piece = pc;
	let newLegalMoves = [];
	let curRow = Number(row.slice(3));
	let curSquare = Number(sq.slice(2));
	let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
	let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
	let startingLegalMoves;

	if (piece === `p`) {
		startingLegalMoves = col === `b` ? [0, 0, 0, 0, 0, -7, -9, -8] : [8, 7, 9, 0, 0, 0, 0, 0]; //prettier-ignore
	}
	if (piece === `n`) {
		startingLegalMoves = [15, 6, 17, 10, -10, -17, -6, -15];
	}
	if (piece === `b`) {
		startingLegalMoves = [0, 9, 7, 0, 0, -9, -7, 0];
	}
	if (piece === `r`) {
		startingLegalMoves = [8, 0, 0, 1, -1, 0, 0, -8];
	}
	if (piece === `q`) {
		startingLegalMoves = [8, 7, 9, 1, -1, -9, -7, -8];
	}
	if (piece === `k`) {
		startingLegalMoves = [8, 7, 9, 1, -1, -9, -7, -8];
	}

	// Generate an array of legal squares we can go to
	startingLegalMoves.forEach((move, dirIndex) => {
		if (move) {
			let pieceMoveToSquare = move + curSquare;

			if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move

			// Knight ----------------------------------------------------------------------------
			if (piece === `n`) {
				// North Move ----------------------------------------------------------------------------
				if (dirIndex === 0) {
					let newSquare = curSquare + startingLegalMoves[dirIndex];
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore
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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore

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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore

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
					if (leftEdge.includes(curSquare - 1)) {
						return;
					}
					if (leftEdge.includes(curSquare)) {
						return;
					}
					if (newSquare > 64 || newSquare < 1) {
						return;
					}
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore
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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore
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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore

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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore

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
					let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,col,dirIndex); //prettier-ignore

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

			// Bishop ----------------------------------------------------------------------------
			if (piece === `b`) {
				if (dirIndex === 1) {
					//prettier-ignore
					for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {

                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
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
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
                            return;
                        }
                        else {
                            newLegalMoves.push(`sq` + newSquare);
                        }
                    }
				}
			}

			// Rook ----------------------------------------------------------------------------
			if (piece === `r`) {
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
                        newLegalMoves.push(`sq` + newSquare);
                    }
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
                        newLegalMoves.push(`sq` + newSquare);
                    }
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= rightEdge[curRow - 1];	newSquare++) {
                        if (rightEdge.includes(curSquare)) {
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
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else {
                            newLegalMoves.push(`sq` + newSquare);
                        }
                    }
				}
			}

			// Queen ----------------------------------------------------------------------------
			if (piece === `q`) {
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
                        newLegalMoves.push(`sq` + newSquare);
                    }
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
                        newLegalMoves.push(`sq` + newSquare);
                    }
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= rightEdge[curRow - 1];	newSquare++) {
                        if (rightEdge.includes(curSquare)) {
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
                        if (leftEdge.includes(curSquare)) {
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
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
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
                        if (leftEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (leftEdge.includes(newSquare)){
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

                        if (rightEdge.includes(curSquare)) {
                            return;
                        } 
                        else if (rightEdge.includes(newSquare)){
                            newLegalMoves.push(`sq` + newSquare);
                            return;
                        }
                        else {
                            newLegalMoves.push(`sq` + newSquare);
                        }
                    }
				}
			}

			// King ----------------------------------------------------------------------------
			if (piece === `k`) {
				//prettier-ignore
				let squareHasEnemy = checkForEnemy(curSquare,curRow,pieceMoveToSquare,col,dirIndex)
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					newLegalMoves.push(`sq` + pieceMoveToSquare);
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					newLegalMoves.push(`sq` + pieceMoveToSquare);
				}
				// East move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					//prettier-ignore
					if (rightEdge.includes(curSquare)) {
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
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					//prettier-ignore
					if (leftEdge.includes(curSquare)) {
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
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					if (leftEdge.includes(curSquare)) {
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
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
			}

			// Pawn ----------------------------------------------------------------------------
			if (piece === `p`) {
				let squareHasEnemy = checkForEnemy(
					curSquare,
					curRow,
					pieceMoveToSquare,
					col,
					dirIndex
				);

				// Check for forward moves
				if (dirIndex === 0 || dirIndex === 7) {
					let pieceInFront = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
					let piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + move)) //prettier-ignore
					// 1. Check if theres a piece infront of the pawn
					//prettier-ignore
					if (pieceInFront.innerHTML.includes(`piece`)) {
                        return;
                    } 
                    // 2. Check if its the first move or not (if it is, it allows us to move 2 squares)
                    else if (col === `w` && curRow === 2) {
                        newLegalMoves.push(`sq` + pieceMoveToSquare);
                        if(piece2InFront.innerHTML.includes(`piece`)){
                            return;
                        }
                        newLegalMoves.push(`sq` + Number(pieceMoveToSquare + move));
                    } 
                    else if (col === `b` && curRow === 7) {
                        newLegalMoves.push(`sq` + pieceMoveToSquare);
                        if(piece2InFront.innerHTML.includes(`piece`)){
                            return;
                        }
                        newLegalMoves.push(`sq` + Number(pieceMoveToSquare + move));
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
		}
	});
	return newLegalMoves;
};

export const checkEveryMove = (col) => {
	everyMove = [];
	let pieces = []; //prettier-ignore
	col === `w` ? (pieces = [`wp`, `wr`, `wn`, `wb`, `wq`, `wk`]) : (pieces = [`bb`, `br`, `bn`, `bk`, `bq`, `bp`]); //prettier-ignore

	// For every square on the board
	for (let square = 1; square <= 64; square++) {
		let squareId = `sq` + square;
		let squareEl = document.getElementById(squareId);

		pieces.forEach((piece) => {
			if (squareEl.innerHTML.includes(piece)) {
				let color = piece.slice(0, 1);
				let pc = piece.slice(1, 2);

				let moves = findEveryMove(squareEl.dataset.row, squareId, color, pc);

				if (moves.length === 0) return `Done`;

				moves.forEach((move) => {
					if (everyMove.includes(move)) {
						return;
					} else {
						everyMove.push(move);
					}
				});
			}
		});
		everyMove.forEach((square) => {
			document.getElementById(square).classList.add(`runAway`);
		});
	}
	return everyMove;
};
