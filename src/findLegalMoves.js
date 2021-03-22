import { checkForEnemy } from './helper';
import {LEFT_EDGE, RIGHT_EDGE, KNIGHT_MOVES, BISHOP_MOVES, ROOK_MOVES, QUEEN_MOVES, KING_MOVES, PAWN_MOVES_WHITE, PAWN_MOVES_BLACK} from './config' //prettier-ignore

let checkingPieceSquares = [];
let everyMove            = []; //prettier-ignore
let checkingLine         = []; //prettier-ignore
let checkingLineTemp     = []; //prettier-ignore
let everyLegalMove       = []; //prettier-ignore
let kingInCheck, turn, lastTurn;

export const checkForCheck = (e) => {
	checkingPieceSquares   = []; //prettier-ignore
	kingInCheck            = false; //prettier-ignore
	let checkState;
	let pieces             = []; //prettier-ignore
	let everyLegalMoveTemp = []; //prettier-ignore
	turn                   = document.getElementById(`turn`).innerHTML.includes(`w`) ? `white` : `black`; //prettier-ignore
	turn === `black` ? (pieces = [`wp`, `wr`, `wn`, `wb`, `wq`, `wk`]) : (pieces = [`bb`, `br`, `bn`, `bk`, `bq`, `bp`]); //prettier-ignore
	if (turn !== lastTurn) checkingLine = []; // If we're on a new turn, reset the checking line.

	for (let square = 1; square <= 64; square++) {
		let squareEl = document.getElementById(`sq` + square);

		// for every piece of our enemies color, check the square for it
		pieces.some((piece) => {
			if (squareEl.innerHTML.includes(piece)) {
				if (squareEl.innerHTML.includes(turn)) return; // if any squares contain whoevers turn it us, skip them.

				let color      = piece.slice(0, 1); //prettier-ignore
				let pc         = piece.slice(1, 2); //prettier-ignore
				let row        = squareEl.dataset.row; //prettier-ignore
				let legalMoves = findMoves(row, `sq` + square, color, pc); //prettier-ignore

				if (legalMoves.length === 0) return `Done`; // Exit if theres no legal moves for that piece

				// For every legal move that piece has
				legalMoves.forEach((move) => {
					everyLegalMoveTemp.push(...legalMoves);
					// check if that legal move contains the opposite color king
					//prettier-ignore
					if (document.getElementById(move).innerHTML.includes(color === `w` ? `bk` : `wk`)) {
						checkingPieceSquares.push(...legalMoves);
						checkState = turn.slice(0,1);
						kingInCheck = checkState;
					}
				});
				return `Done`;
			}
			return null;
		});
	}
	lastTurn = turn;
	everyLegalMove = everyLegalMoveTemp;
	return checkState;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Find legal moves     //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const findMoves = (row, sq, col, pc) => {
	// Piece move direction list:
	// [N, NW, NE, E, W, SW, SE, S]
	let startingLegalMoves; //prettier-ignore
	let color             = col; //prettier-ignore
	let piece             = pc; //prettier-ignore
	let newLegalMoves     = []; //prettier-ignore
	let curRow            = Number(row.slice(3)); //prettier-ignore
	let curSquare         = Number(sq.slice(2)); //prettier-ignore

	if (piece === `p`) startingLegalMoves = color === `b` ? PAWN_MOVES_BLACK : PAWN_MOVES_WHITE; //prettier-ignore
	if (piece === `n`) startingLegalMoves = KNIGHT_MOVES;
	if (piece === `b`) startingLegalMoves = BISHOP_MOVES;
	if (piece === `r`) startingLegalMoves = ROOK_MOVES;
	if (piece === `q`) startingLegalMoves = QUEEN_MOVES;
	if (piece === `k`) startingLegalMoves = KING_MOVES;

	//  ----------------------------------------------------------------------------
	// TODO: Fix discovered check
	//  ----------------------------------------------------------------------------

	// Generate an array of legal squares we can go to
	startingLegalMoves.forEach((move, dirIndex) => {
		if (move) {
			let pieceMoveToSquare = move + curSquare;

			if (pieceMoveToSquare < 0 || pieceMoveToSquare > 65) return; // if piece is above or below board, get rid of move immediately

			const moveCheck = (newSquare) => {
				let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
				let pieceInFront, piece2InFront;
				if (piece === `p`) {
					pieceInFront  = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
					piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + move)) //prettier-ignore
				}

				if (color !== kingInCheck) {
					if (squareHasEnemy === `Friendly`) return true;
					if (squareHasEnemy === `check`) {
						newLegalMoves.push(`sq` + newSquare);
						return `check`;
					}
					// North West
					if (
						(dirIndex === 1 && LEFT_EDGE.includes(newSquare) && piece !== `p`) ||
						(dirIndex === 5 && LEFT_EDGE.includes(newSquare) && piece !== `p`) ||
						(dirIndex === 2 && RIGHT_EDGE.includes(newSquare) && piece !== `p`) ||
						(dirIndex === 6 && RIGHT_EDGE.includes(newSquare) && piece !== `p`) ||
						(dirIndex === 0 && piece === `p` && color === `w` && curRow === 2) || //prettier-ignore
						(dirIndex === 7 && piece === `p` && color === `b` && curRow === 7) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
						//prettier-ignore
						if (piece === `p` && piece2InFront.innerHTML.includes(`piece`)) {
							return;
						} 
						//prettier-ignore
						else if(piece === `p` && !piece2InFront.innerHTML.includes(`piece`)) {
							newLegalMoves.push(`sq` + Number(pieceMoveToSquare + move));
						}
						return true;
					}
					if (
						dirIndex === 1 && piece === `p` && squareHasEnemy || //prettier-ignore
						(dirIndex === 2 && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === 5 && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === 6 && piece === `p` && squareHasEnemy) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
					}
					if (
						(dirIndex === 0 && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === 7 && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === 1 && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === 2 && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === 5 && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === 6 && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === 3 && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === 2 && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === 6 && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === 5 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 4 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 1 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 7 && piece === `n` && RIGHT_EDGE.includes(curSquare)) ||//prettier-ignore
						(dirIndex === 3 && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === 6 && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === 4 && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === 1 && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === 0 && piece === `n` && LEFT_EDGE.includes(curSquare)) //prettier-ignore
					) {
						return true;
					}
					if (squareHasEnemy) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					} else {
						newLegalMoves.push(`sq` + newSquare);
					}
				}
				if (color === kingInCheck) {
					if (squareHasEnemy === `Friendly`) return true;
					if (piece === `k` && !everyLegalMove.includes(`sq` + newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (
						(dirIndex === 2 && RIGHT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === 1 && LEFT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === 5 && LEFT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) ||//prettier-ignore
						(dirIndex === 6 && RIGHT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (
						(dirIndex === 0 && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === 7 && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === 1 && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === 2 && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === 5 && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === 6 && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === 1 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 5 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 4 && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 3 && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === 2 && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === 4 && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === 1 && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === 6 && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === 7 && piece === `n` && RIGHT_EDGE.includes(curSquare)) || //prettier-ignore 
						(dirIndex === 0 && piece === `n` && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === 3 && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) //prettier-ignore
					) {
						return true;
					}
					//prettier-ignore
					if (squareHasEnemy && checkingLine.includes(`sq` + newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (piece !== `k` && checkingLine.includes(newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
					}
				}
			};
			// Knight ----------------------------------------------------------------------------
			if (piece === `n`) {
				checkingLineTemp = [];

				checkingLineTemp.push(pieceMoveToSquare);
				let lineCheck = moveCheck(pieceMoveToSquare);

				if (lineCheck === `check`) {
					checkingLineTemp.push(curSquare);
					checkingLine = checkingLineTemp;
					return;
				}
				if (lineCheck) {
					checkingLineTemp = [];
					return;
				}
			}

			// Bishop ----------------------------------------------------------------------------
			if (piece === `b`) {
				if (dirIndex === 1) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
			}

			// Rook ----------------------------------------------------------------------------
			if (piece === `r`) {
				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					checkingLineTemp = [];
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= RIGHT_EDGE[curRow - 1];	newSquare++) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
				// West Move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 1; newSquare >= LEFT_EDGE[curRow - 1]; newSquare--) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
					}
				}
			}

			// Queen ----------------------------------------------------------------------------
			if (piece === `q`) {
				checkingLineTemp = [];

				// North Move ------------------------------------------------------------------------------------
				if (dirIndex === 0) {
					//prettier-ignore
					for (let newSquare = curSquare + 8; newSquare <= 64; newSquare += 8) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// South Move ----------------------------------------------------------------------------
				else if (dirIndex === 7) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 8; newSquare > 0; newSquare -= 8) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// East Move ----------------------------------------------------------------------------
				else if (dirIndex === 3) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 1;	newSquare <= RIGHT_EDGE[curRow - 1]; newSquare++) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// West Move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 1; newSquare >= LEFT_EDGE[curRow - 1]; newSquare--) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 7; newSquare <= 63; newSquare += 7) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare + 9; newSquare <= 64; newSquare += 9) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 9; newSquare >= 1; newSquare -= 9) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)

						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						}
                    }
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					checkingLineTemp = [];

					//prettier-ignore
					for (let newSquare = curSquare - 7; newSquare >= 8; newSquare -= 7) {
						checkingLineTemp.push(newSquare)
						let lineCheck = moveCheck(newSquare)
						if(lineCheck === `check`){
							checkingLineTemp.push(curSquare)
							checkingLine = (checkingLineTemp)
							return;
						}
						if(lineCheck){
							checkingLineTemp = []
							return
						} 
                    }
				}
			}

			// King ----------------------------------------------------------------------------
			if (piece === `k`) {
				moveCheck(pieceMoveToSquare);
			}

			// Pawn ----------------------------------------------------------------------------
			if (piece === `p`) {
				moveCheck(pieceMoveToSquare);
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
	let startingLegalMoves;

	if (piece === `n`) startingLegalMoves = KNIGHT_MOVES;
	if (piece === `b`) startingLegalMoves = BISHOP_MOVES;
	if (piece === `r`) startingLegalMoves = ROOK_MOVES;
	if (piece === `q`) startingLegalMoves = QUEEN_MOVES;
	if (piece === `k`) startingLegalMoves = KING_MOVES;
	if (piece === `p`) startingLegalMoves = col === `b` ? PAWN_MOVES_BLACK : PAWN_MOVES_WHITE; //prettier-ignore

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
					if (LEFT_EDGE.includes(curSquare)) {
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
					if (RIGHT_EDGE.includes(curSquare)) {
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
					if (RIGHT_EDGE.includes(curSquare + 1)) {
                        return;
                    }
					if (RIGHT_EDGE.includes(curSquare)) {
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
					if (LEFT_EDGE.includes(curSquare - 1)) {
						return;
					}
					if (LEFT_EDGE.includes(curSquare)) {
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
					if (LEFT_EDGE.includes(curSquare - 1)) {
                        return;
                    }
					if (LEFT_EDGE.includes(curSquare)) {
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
					if (RIGHT_EDGE.includes(curSquare)) {
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
					if (LEFT_EDGE.includes(curSquare)) {
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
					if (RIGHT_EDGE.includes(curSquare + 1)) {
                    return;
                }
					if (RIGHT_EDGE.includes(curSquare)) {
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

                        if (LEFT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (LEFT_EDGE.includes(newSquare)){
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

                        if (RIGHT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (RIGHT_EDGE.includes(newSquare)){
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
                        if (LEFT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (LEFT_EDGE.includes(newSquare)){
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

                        if (RIGHT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (RIGHT_EDGE.includes(newSquare)){
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
					for (let newSquare = curSquare + 1;	newSquare <= RIGHT_EDGE[curRow - 1];	newSquare++) {
                        if (RIGHT_EDGE.includes(curSquare)) {
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
					for (let newSquare = curSquare - 1; newSquare >= LEFT_EDGE[curRow - 1]; newSquare--) {                        
                        if (LEFT_EDGE.includes(curSquare)) {
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
					for (let newSquare = curSquare + 1;	newSquare <= RIGHT_EDGE[curRow - 1];	newSquare++) {
                        if (RIGHT_EDGE.includes(curSquare)) {
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
					for (let newSquare = curSquare - 1; newSquare >= LEFT_EDGE[curRow - 1]; newSquare--) {                        
                        if (LEFT_EDGE.includes(curSquare)) {
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
                        if (LEFT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (LEFT_EDGE.includes(newSquare)){
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

                        if (RIGHT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (RIGHT_EDGE.includes(newSquare)){
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
                        if (LEFT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (LEFT_EDGE.includes(newSquare)){
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

                        if (RIGHT_EDGE.includes(curSquare)) {
                            return;
                        } 
                        else if (RIGHT_EDGE.includes(newSquare)){
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
					if (RIGHT_EDGE.includes(curSquare)) {
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// West move ----------------------------------------------------------------------------
				else if (dirIndex === 4) {
					//prettier-ignore
					if (LEFT_EDGE.includes(curSquare)) {
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// North West Move ----------------------------------------------------------------------------
				else if (dirIndex === 1) {
					//prettier-ignore
					if (LEFT_EDGE.includes(curSquare)) {
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// North East Move ----------------------------------------------------------------------------
				else if (dirIndex === 2) {
					//prettier-ignore
					if (RIGHT_EDGE.includes(curSquare)) {
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// South West Move ----------------------------------------------------------------------------
				else if (dirIndex === 5) {
					//prettier-ignore
					if (LEFT_EDGE.includes(curSquare)) {
						return;
					} else {
						newLegalMoves.push(`sq` + pieceMoveToSquare);
					}
				}
				// South East Move ----------------------------------------------------------------------------
				else if (dirIndex === 6) {
					//prettier-ignore
					if (RIGHT_EDGE.includes(curSquare)) {
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
