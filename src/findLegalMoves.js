import { checkForEnemy } from './helper';

export const findMoves = (row, sq, col, pc, moves, movesBlack) => {
	// Piece move direction list:
	// [N, NW, NE, E, W, SW, SE, S]
	let color = col;
	let piece = pc;
	let newLegalMoves = [];
	let curRow = Number(row.slice(3));
	let curSquare = Number(sq.slice(2));
	let leftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
	let rightEdge = [8, 16, 24, 32, 40, 48, 56, 64];
	let startingLegalMoves = moves; //prettier-ignore
	if (piece === `p`) {
		startingLegalMoves = color === `b` ? moves : movesBlack;
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

			// Bishop ----------------------------------------------------------------------------
			if (piece === `b`) {
				if (dirIndex === 1) {
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

			// Rook ----------------------------------------------------------------------------
			if (piece === `r`) {
				console.log(`rook`);
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

			// Queen ----------------------------------------------------------------------------
			if (piece === `q`) {
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

			// King ----------------------------------------------------------------------------
			if (piece === `k`) {
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
