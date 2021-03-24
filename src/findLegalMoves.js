import { checkForEnemy } from './helper';
import {LEFT_EDGE, RIGHT_EDGE, TOP_EDGE, BOTTOM_EDGE, KNIGHT_MOVES, BISHOP_MOVES, ROOK_MOVES, QUEEN_MOVES, KING_MOVES, PAWN_MOVES_WHITE, PAWN_MOVES_BLACK, NORTH, NORTH_WEST, NORTH_EAST, EAST, WEST, SOUTH_WEST, SOUTH_EAST, SOUTH } from './config' //prettier-ignore
// [N, NW, NE, E, W, SW, SE, S]

let checkingPieceSquares          = []; //prettier-ignore
let everyMove                     = []; //prettier-ignore
let checkingLine                  = []; //prettier-ignore
let checkingLineTemp              = []; //prettier-ignore
let allCheckingLine               = []; //prettier-ignore
let allCheckingLineTemp           = []; //prettier-ignore
let checkBlockingPiecesTemp       = []; //prettier-ignore
let everyLegalMove                = []; //prettier-ignore
let checkBlockingPieces           = []; //prettier-ignore
let checkBlockingPiecesAttacker   = []; //prettier-ignore
let checkBlockingPiecesDefender   = []; //prettier-ignore
let kingInCheck, turn, lastTurn; //prettier-ignore

export const checkForCheck = (color) => {
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
						checkState  = turn.slice(0,1); //prettier-ignore
						kingInCheck = checkState; //prettier-ignore
					}
				});
				return `Done`;
			}
			return null;
		});
	}

	lastTurn       = turn; //prettier-ignore
	everyLegalMove = everyLegalMoveTemp; //prettier-ignore
	everyLegalMove.forEach((square) => {
		document.getElementById(square).classList.add(`runAway`);
	});
	return checkState;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Find legal moves     //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const findMoves = (row, sq, col, pc, getBoardState) => {
	// Piece move direction list:
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

	checkBlockingPieces.forEach((checkLine, i) => {
		if (!checkBlockingPiecesDefender.includes(checkLine[0]))
			checkBlockingPiecesDefender.push(checkLine[0]);
		if (!checkBlockingPiecesAttacker.includes(checkLine[1]))
			checkBlockingPiecesAttacker.push(checkLine[1]);
	});

	//  ----------------------------------------------------------------------------
	// TODO: EN-PASSANT
	// TODO: Cant Castle through check
	//  ----------------------------------------------------------------------------

	// Generate an array of legal squares we can go to
	startingLegalMoves.forEach((move, dirIndex) => {
		if (move) {
			let pieceMoveToSquare = move + curSquare;
			if (pieceMoveToSquare <= 0 || pieceMoveToSquare > 64) return; // if piece is above or below board, get rid of move immediately

			const moveCheck = (newSquare) => {
				let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
				let pieceInFront, piece2InFront, pieceLeft1, pieceLeft2, pieceLeft3, pieceRight1, pieceRight2; //prettier-ignore

				if (piece === `p`) {
					pieceInFront  = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
					piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + move)) //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `w` && curSquare === 5 && getBoardState?.includes(`K`)) {
					pieceRight1 = document.getElementById(`sq` + 6).innerHTML; //prettier-ignore
					pieceRight2 = document.getElementById(`sq` + 7).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `w` && curSquare === 5 && getBoardState?.includes(`Q`)) {
					pieceLeft1 = document.getElementById(`sq` + 4).innerHTML; //prettier-ignore
					pieceLeft2 = document.getElementById(`sq` + 3).innerHTML; //prettier-ignore
					pieceLeft3 = document.getElementById(`sq` + 2).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `b` && curSquare === 61 && getBoardState?.includes(`k`)) {
					pieceRight1 = document.getElementById(`sq` + 62).innerHTML; //prettier-ignore
					pieceRight2 = document.getElementById(`sq` + 63).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `b` && curSquare === 61 && getBoardState?.includes(`q`)) {
					pieceLeft1  = document.getElementById(`sq` + 60).innerHTML; //prettier-ignore
					pieceLeft2  = document.getElementById(`sq` + 59).innerHTML; //prettier-ignore
					pieceLeft3  = document.getElementById(`sq` + 58).innerHTML; //prettier-ignore
				}
				if (color !== kingInCheck) {
					if (squareHasEnemy === `Friendly`) return true;
					if (squareHasEnemy === `check`) {
						newLegalMoves.push(`sq` + newSquare);
						return `check`;
					}
					//prettier-ignore
					if (checkBlockingPiecesDefender.includes(curSquare)) {
						if(checkBlockingPiecesAttacker.includes(newSquare)){
							newLegalMoves.push(`sq` + newSquare);
						}
						return;
					}
					if (
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === WEST       && LEFT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === EAST       && RIGHT_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH      && piece === `p` && color === `w` && curRow === 2) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `p` && color === `b` && curRow === 7) //prettier-ignore
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
						dirIndex === NORTH_WEST  && piece === `p` && squareHasEnemy || //prettier-ignore
						(dirIndex === NORTH_EAST && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_WEST && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `p` && squareHasEnemy) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
					}

					//prettier-ignore
					if (piece === `k` && !pieceLeft1?.includes(`piece`) && !pieceLeft2?.includes(`piece`) && !pieceLeft3?.includes(`piece`) && !everyLegalMove.includes(`sq` + newSquare)) {
						if (piece === `k` && curSquare === 5  && getBoardState?.includes(`Q`)) newLegalMoves.push(`sq` + 3); //prettier-ignore
						if (piece === `k` && curSquare === 61 && getBoardState?.includes(`q`)) newLegalMoves.push(`sq` + 59); //prettier-ignore
					}
					//prettier-ignore
					if (piece === `k` && !pieceRight1?.includes(`piece`) && !pieceRight2?.includes(`piece`) && !everyLegalMove.includes(`sq` + newSquare)) {
						if (piece === `k` && curSquare === 5  && getBoardState?.includes(`K`)) newLegalMoves.push(`sq` + 7); //prettier-ignore
						if (piece === `k` && curSquare === 61 && getBoardState?.includes(`k`)) newLegalMoves.push(`sq` + 63); //prettier-ignore
					}
					if (
						(dirIndex === NORTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === NORTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === SOUTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === EAST       && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH      && piece === `n` && RIGHT_EDGE.includes(curSquare)) ||//prettier-ignore
						(dirIndex === EAST       && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === WEST       && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH      && piece === `n` && LEFT_EDGE.includes(curSquare)) ||//prettier-ignore
						(piece === `k` && everyLegalMove.includes(`sq` + newSquare)) //prettier-ignore
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
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(newSquare)  && checkingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(newSquare)  && checkingLine.includes(newSquare)) ||//prettier-ignore
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(newSquare) && checkingLine.includes(newSquare)) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (
						(dirIndex === NORTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === NORTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === SOUTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === EAST       && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `n` && RIGHT_EDGE.includes(curSquare)) || //prettier-ignore 
						(dirIndex === NORTH      && piece === `n` && LEFT_EDGE.includes(curSquare)) || //prettier-ignore
						(dirIndex === EAST       && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) //prettier-ignore
					) {
						return true;
					}

					//prettier-ignore
					if (squareHasEnemy && checkingLine.includes(newSquare)) {
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

			// Bishop Rook Queen ----------------------------------------------------------------------------
			if (piece === `b` || piece === `r` || piece === `q`) {
				checkingLineTemp = [];
				//prettier-ignore
				for (let newSquare = curSquare + move; newSquare <= 64 && newSquare >= 1; newSquare += move) {
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

			// King ----------------------------------------------------------------------------
			if (piece === `k` || piece === `p`) {
				moveCheck(pieceMoveToSquare);
			}
		}
	});
	return newLegalMoves;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////    Find Every move     //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const findEveryMove = (row, sq, col, pc, getBoardState) => {
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

	// Generate an array of legal squares we can go to
	startingLegalMoves.forEach((move, dirIndex) => {
		if (move) {
			let pieceMoveToSquare = move + curSquare;
			if (pieceMoveToSquare <= 0 || pieceMoveToSquare > 64) return; // if piece is above or below board, get rid of move immediately

			const moveCheck = (newSquare) => {
				let squareHasEnemy = checkForEnemy(curSquare,curRow,newSquare,color,dirIndex); //prettier-ignore
				let pieceInFront, piece2InFront, pieceLeft1, pieceLeft2, pieceLeft3, pieceRight1, pieceRight2; //prettier-ignore
				if (piece === `p`) {
					pieceInFront  = document.getElementById(`sq` + pieceMoveToSquare); //prettier-ignore
					piece2InFront = document.getElementById(`sq` + Number(pieceMoveToSquare + move)) //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `w` && curSquare === 5 && getBoardState?.includes(`K`)) {
					pieceRight1 = document.getElementById(`sq` + 6).innerHTML; //prettier-ignore
					pieceRight2 = document.getElementById(`sq` + 7).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `w` && curSquare === 5 && getBoardState?.includes(`Q`)) {
					pieceLeft1 = document.getElementById(`sq` + 4).innerHTML; //prettier-ignore
					pieceLeft2 = document.getElementById(`sq` + 3).innerHTML; //prettier-ignore
					pieceLeft3 = document.getElementById(`sq` + 2).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `b` && curSquare === 61 && getBoardState?.includes(`k`)) {
					pieceRight1 = document.getElementById(`sq` + 62).innerHTML; //prettier-ignore
					pieceRight2 = document.getElementById(`sq` + 63).innerHTML; //prettier-ignore
				}
				//prettier-ignore
				if (piece === `k` && color === `b` && curSquare === 61 && getBoardState?.includes(`q`)) {
					pieceLeft1 = document.getElementById(`sq` + 60).innerHTML; //prettier-ignore
					pieceLeft2 = document.getElementById(`sq` + 59).innerHTML; //prettier-ignore
					pieceLeft3 = document.getElementById(`sq` + 58).innerHTML; //prettier-ignore
				}
				if (color !== kingInCheck) {
					if (squareHasEnemy === `check`) {
						// console.log(piece, curSquare, newSquare);
						newLegalMoves.push(`sq` + newSquare);
						return `check`;
					}
					if (
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(newSquare)   && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(newSquare)   && piece !== `p`) || //prettier-ignore
						(dirIndex === WEST       && LEFT_EDGE.includes(newSquare)   && piece !== `p`) || //prettier-ignore
						(dirIndex === EAST       && RIGHT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(newSquare)  && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH_EAST && TOP_EDGE.includes(newSquare)    && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH_WEST && TOP_EDGE.includes(newSquare)    && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_EAST && BOTTOM_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH_WEST && BOTTOM_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH      && TOP_EDGE.includes(newSquare)    && piece !== `p`) || //prettier-ignore
						(dirIndex === SOUTH      && BOTTOM_EDGE.includes(newSquare) && piece !== `p`) || //prettier-ignore
						(dirIndex === NORTH      && piece === `p` && color === `w`  && curRow === 2) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `p` && color === `b`  && curRow === 7) //prettier-ignore
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
						(dirIndex === NORTH_WEST && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === NORTH_EAST && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_WEST && piece === `p` && squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `p` && squareHasEnemy) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
					}
					if (
						piece === `k` &&
						!pieceLeft1?.includes(`piece`) &&
						!pieceLeft2?.includes(`piece`) &&
						!pieceLeft3?.includes(`piece`)
					) {
						//prettier-ignore
						if (piece === `k` && curSquare === 5  && getBoardState?.includes(`Q`)) newLegalMoves.push(`sq` + 3); //prettier-ignore
						if (piece === `k` && curSquare === 61 && getBoardState?.includes(`q`)) newLegalMoves.push(`sq` + 59); //prettier-ignore
					}
					if (
						piece === `k` &&
						!pieceRight1?.includes(`piece`) &&
						!pieceRight2?.includes(`piece`)
					) {
						//prettier-ignore
						if (piece === `k` && curSquare === 5  && getBoardState?.includes(`K`)) newLegalMoves.push(`sq` + 7); //prettier-ignore
						if (piece === `k` && curSquare === 61 && getBoardState?.includes(`k`)) newLegalMoves.push(`sq` + 63); //prettier-ignore
					}

					if (
						(dirIndex === NORTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === SOUTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === EAST       && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH      && piece === `n` && RIGHT_EDGE.includes(curSquare)) ||//prettier-ignore
						(dirIndex === EAST       && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === WEST       && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH      && piece === `n` && LEFT_EDGE.includes(curSquare)) ||//prettier-ignore
						(dirIndex === SOUTH_EAST && BOTTOM_EDGE.includes(newSquare)) ||//prettier-ignore
						(dirIndex === SOUTH_WEST && BOTTOM_EDGE.includes(newSquare)) ||//prettier-ignore
						(dirIndex === NORTH      && TOP_EDGE.includes(newSquare)) ||//prettier-ignore
						(dirIndex === NORTH_EAST && TOP_EDGE.includes(newSquare)) ||//prettier-ignore
						(dirIndex === NORTH_WEST && TOP_EDGE.includes(newSquare)) ||//prettier-ignore
						(dirIndex === SOUTH      && BOTTOM_EDGE.includes(newSquare)) //prettier-ignore
					) {
						return true;
					}
					newLegalMoves.push(`sq` + newSquare);
				}
				if (color === kingInCheck) {
					if (piece === `k` && !everyLegalMove.includes(`sq` + newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(newSquare) && allCheckingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(newSquare)  && allCheckingLine.includes(newSquare)) || //prettier-ignore
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(newSquare)  && allCheckingLine.includes(newSquare)) ||//prettier-ignore
						(dirIndex === SOUTH_EAST && RIGHT_EDGE.includes(newSquare) && allCheckingLine.includes(newSquare)) //prettier-ignore
					) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					if (
						(dirIndex === NORTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === SOUTH      && piece === `p` && pieceInFront.innerHTML.includes(`piece`)) ||
						(dirIndex === NORTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === NORTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === SOUTH_WEST && piece === `p` && !squareHasEnemy) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `p` && !squareHasEnemy) ||//prettier-ignore
						(dirIndex === NORTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === SOUTH_WEST && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === EAST       && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === NORTH_EAST && RIGHT_EDGE.includes(curSquare)) ||
						(dirIndex === WEST       && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === NORTH_WEST && piece === `n` && LEFT_EDGE.includes(curSquare - 1)) || //prettier-ignore
						(dirIndex === SOUTH_EAST && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) || //prettier-ignore
						(dirIndex === SOUTH      && piece === `n` && RIGHT_EDGE.includes(curSquare)) || //prettier-ignore 
						(dirIndex === NORTH      && piece === `n` && LEFT_EDGE.includes(curSquare)) ||
						(dirIndex === EAST       && piece === `n` && RIGHT_EDGE.includes(curSquare + 1)) //prettier-ignore
					) {
						return true;
					}
					//prettier-ignore
					if (squareHasEnemy && allCheckingLine.includes(`sq` + newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
						return true;
					}
					//prettier-ignore
					if (piece !== `k` && allCheckingLine.includes(newSquare)) {
						newLegalMoves.push(`sq` + newSquare);
					}
				}
			};

			// Bishop Queen Rook ----------------------------------------------------------------------------
			// TODO: ONLY ADD THE SQUARE IF THERES LESS THAN 1 IN THE LINE
			//prettier-ignore
			if (piece === `b` || piece === `r` || piece === `q`) {
				// Loop over our enemies squares
				for (let newSquare = curSquare + move; newSquare <= 64 && newSquare >= 1; newSquare += move) {
					if(!allCheckingLineTemp.includes(newSquare)) allCheckingLineTemp.push(newSquare);
					let lineCheck = moveCheck(newSquare)

					if (lineCheck === `check`) {
						allCheckingLineTemp.splice(-1) // Dont include the kings square, which will be the last one
						allCheckingLineTemp.push(curSquare)
						allCheckingLineTemp.forEach((e, i) => {
							if(allCheckingLine.includes(e)) allCheckingLineTemp.splice(i) // if we already have that square, delete it
						})
						allCheckingLine.push(allCheckingLineTemp);
						allCheckingLineTemp = [];
						return;
					}
					if (lineCheck) {

						allCheckingLineTemp = [];
						return;
					}
				}
			}

			// King Pawn Knight ----------------------------------------------------------------------------
			if (piece === `k` || piece === `p` || piece === `n`) {
				moveCheck(pieceMoveToSquare);
			}
		}
	});
	if (allCheckingLine.length > 0) {
		// 1. Loop over the array of lines giving check
		allCheckingLine.forEach((line, j) => {
			// console.log(line);
			let pieces = 0;
			let tempLine = [];
			//2. Loop over each square in that line
			line.forEach((sq, i) => {
				if (i === line.length - 1) return;

				//3. get the element for the sqaure
				let square = document.getElementById(`sq` + sq);

				//4. If that element contains a piece
				if (square?.innerHTML.includes(`piece`)) {
					pieces++;
					// 	//5. if our piece count gets above 1, exit
					if (pieces > 1) {
						tempLine = ``;
						return;
					}
					tempLine.push(sq, ...line.slice(-1));
				}
			});

			checkBlockingPieces.push(tempLine);
		});
	}
	let stringArr = [];

	checkBlockingPieces?.forEach((line, i) => {
		stringArr.push(JSON.stringify(line));
	});

	let newArr = new Set(stringArr);
	stringArr = [];
	newArr.forEach((e) => {
		stringArr.push(JSON.parse(e));
	});
	checkBlockingPieces = stringArr;
	return newLegalMoves;
};

// Checks All of enemies moves
export const checkEveryMove = (col, getBoardState) => {
	everyMove                   = []; //prettier-ignore
	allCheckingLine             = []; //prettier-ignore
	checkBlockingPieces         = []; //prettier-ignore
	checkBlockingPiecesAttacker = []; //prettier-ignore
	checkBlockingPiecesDefender = []; //prettier-ignore

	let pieces = []; //prettier-ignore
	col === `b` ? (pieces = [`wp`, `wr`, `wn`, `wb`, `wq`, `wk`]) : (pieces = [`bb`, `br`, `bn`, `bk`, `bq`, `bp`]); //prettier-ignore
	// if its blacks turn, we want to see where whites moves are

	// For every square on the board
	for (let square = 1; square <= 64; square++) {
		let squareId = `sq` + square;
		let squareEl = document.getElementById(squareId);

		pieces.forEach((piece) => {
			if (squareEl.innerHTML.includes(piece)) {
				let color = piece.slice(0, 1);
				let pc = piece.slice(1, 2);

				let moves = findEveryMove(
					squareEl.dataset.row,
					squareId,
					color,
					pc,
					getBoardState
				);

				// Everything below here is just to add a pretty highlight to the square --------------------------------------------------------------------
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
		// everyMove.forEach((square) => {
		// 	document.getElementById(square).classList.add(`runAway`);
		// });
	}
	return everyMove;
};
