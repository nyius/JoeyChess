// eslint-disable-next-line
import { Rook, Knight, King, Queen, Pawn, Bishop } from './Pieces';
import { BOARD_HEIGHT, BOARD_WIDTH, NORTH_WEST, NORTH_EAST, EAST, WEST, SOUTH_WEST, SOUTH_EAST } from './config'; //prettier-ignore

let previousPosition, pieceMoves, kingInCheck, boardState;

const prevPosition = (e) => {
	previousPosition = e;
};

const legalMoves = (newLegalMoves) => {
	// Loop over our legal squares and set their color on the board
	newLegalMoves.forEach((square) => {
		document.getElementById(square).classList.add(`legalMoves`);
	});
	pieceMoves = newLegalMoves;
};

const checkForCheck = (e) => {
	if (e === `check`) {
		kingInCheck = true;
	}
};

const getBoardState = (e) => {
	return boardState;
};

const wp = <Pawn   piece="white piece wp" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const wr = <Rook   piece="white piece wr" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const wb = <Bishop piece="white piece wb" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const wn = <Knight piece="white piece wn" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const wq = <Queen  piece="white piece wq" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const wk = <King   piece="white piece wk" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const bp = <Pawn   piece="black piece bp" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const br = <Rook   piece="black piece br" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const bb = <Bishop piece="black piece bb" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const bn = <Knight piece="black piece bn" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const bq = <Queen  piece="black piece bq" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore
const bk = <King   piece="black piece bk" prevPosition={prevPosition} legalMoves={legalMoves} checkForCheck={checkForCheck} getBoardState={getBoardState} />; //prettier-ignore

// Check if the letter is uppercase, lowercase, or letter (for boardPositionFEN)
// Returns a new board state object
export const parseFEN = (currentBoard, boardPositionFEN) => {
	let board         = []; //prettier-ignore
	let row           = []; //prettier-ignore
	let endLine       = []; //prettier-ignore
	let curRow        = BOARD_WIDTH; //prettier-ignore
	let startingBoard = currentBoard; //prettier-ignore

	// Loop over each piece in the game (from the boardPositionFEN) and parse what it is ----------------------------------------------------------------------------
	// using Array.some allows us to exit the loop when we encounter a space (where the board position ends)
	boardPositionFEN.some((piece) => {
		// if piece is a space (only used at the end of the boardPositionFEN diagram)
		if (/\s/.test(piece)) {
			endLine = boardPositionFEN.slice(
				boardPositionFEN.indexOf(piece) + 1,
				boardPositionFEN.length
			);
			board.push(row);
			board.push(endLine);

			boardState = [];
			boardState = endLine.join(``);
			return /\s/.test(piece);
		}

		if (!isNaN(piece * 1)) {
			for (let i = piece; i > 0; i--) row.push(` `);
			return null;
		}

		if (piece === '/') {
			board.push(row);
			row = [];
			return null;
		}

		if (piece === piece.toUpperCase()) {
			if (piece === `P`) {
				row.push(wp);
				return null;
			}
			if (piece === `R`) {
				row.push(wr);
				return null;
			}
			if (piece === `B`) {
				row.push(wb);
				return null;
			}
			if (piece === `N`) {
				row.push(wn);
				return null;
			}
			if (piece === `Q`) {
				row.push(wq);
				return null;
			}
			if (piece === `K`) {
				row.push(wk);
				return null;
			}
			return null;
		}

		if (piece === piece.toLowerCase()) {
			if (piece === `p`) {
				row.push(bp);
				return null;
			}
			if (piece === `r`) {
				row.push(br);
				return null;
			}
			if (piece === `b`) {
				row.push(bb);
				return null;
			}
			if (piece === `n`) {
				row.push(bn);
				return null;
			}
			if (piece === `q`) {
				row.push(bq);
				return null;
			}
			if (piece === `k`) {
				row.push(bk);
				return null;
			}
			return null;
		}
		return null;
	});

	//  Create the board state ----------------------------------------------------------------------------
	// 1. loop over each row
	for (let i = curRow; i > 0; i--) {
		// 2. Grab all of the squares IDs in that row & reset our current column cursor to 0
		let squares = Object.keys(startingBoard[`row${i}`]);
		let columnCount = 0;
		// 3. for each square in the row, set its content to that of our board array, which is our parsedFEN data
		squares.forEach((square) => {
			startingBoard[`row${i}`][square] = board[8 - i][columnCount];
			columnCount++;
		});
	}
	// Need to rejoin the last line so we have access to more
	return [startingBoard, endLine.join(``)];
};

// Create a FEN position based on the current board ----------------------------------------------------------------------------
//prettier-ignore
export const generateFEN = (newBoardPosition, currentState, enPassant = false) => {
	let startingBoard    = newBoardPosition; //prettier-ignore
	let columnCount      = 0; //prettier-ignore
	let newFEN           = []; //prettier-ignore
	let newState         = [...currentState]; //prettier-ignore
	let whoseTurn        = currentState[0]; //prettier-ignore
	let currentTurnNum   = Number(currentState[currentState.length - 1]); //prettier-ignore
	// Loop over the board and create the FEN
	for (let j = BOARD_HEIGHT; j > 0; j--) {
		let whiteSpace = 0;
		for (let i = BOARD_WIDTH; i > 0; i--) {
			let squares    = Object.values(startingBoard[`row${j}`]); //prettier-ignore
			let pieceType  = squares[columnCount].type?.name; //prettier-ignore
			let pieceProps = squares[columnCount].props?.piece; //prettier-ignore

			// Detect what piece is in each square
			if (!pieceType) {
				whiteSpace++;
			} else if (pieceType === 'Pawn' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('P');
			} else if (pieceType === 'Bishop' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('B');
			} else if (pieceType === 'Knight' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('N');
			} else if (pieceType === 'Rook' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('R');
			} else if (pieceType === 'Queen' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('Q');
			} else if (pieceType === 'King' && pieceProps[0] === 'w') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('K');
			} else if (pieceType === 'Pawn' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('p');
			} else if (pieceType === 'Bishop' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('b');
			} else if (pieceType === 'Knight' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('n');
			} else if (pieceType === 'Rook' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('r');
			} else if (pieceType === 'Queen' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('q');
			} else if (pieceType === 'King' && pieceProps[0] === 'b') {
				if (whiteSpace) {
					newFEN.push(whiteSpace);
					whiteSpace = 0;
				}
				newFEN.push('k');
			}

			// Check if we're at the end of the board, if we are reset count values. If we aren't, increase column count by 1
			if (columnCount === BOARD_WIDTH - 1) {
				columnCount = 0;
				if (whiteSpace) newFEN.push(whiteSpace);
			} else {
				columnCount++;
			}
		}
		if (j !== 1) {
			newFEN.push('/');
		}
	}

	// Update whose turn it is and the current turn count
	if (whoseTurn === 'w') {
		whoseTurn = 'b';
	} else {
		whoseTurn = 'w';
		currentTurnNum++;
	}
	newState[0] = whoseTurn;
	let whiteQueenRook = document.getElementById(`sq1`).innerHTML;
	let whiteKingRook = document.getElementById(`sq8`).innerHTML;
	let blackQueenRook = document.getElementById(`sq57`).innerHTML;
	let blackKingRook = document.getElementById(`sq64`).innerHTML;
	let whiteKing = document.getElementById(`sq5`).innerHTML;
	let blackKing = document.getElementById(`sq61`).innerHTML;
	let backwardsState = [...newState];

	backwardsState.reverse();
	if (enPassant) {
		if (backwardsState[4] !== `-`){
			backwardsState[4] = enPassant
			backwardsState.splice(5,1)
			backwardsState.reverse()
			newState = [...backwardsState]
		};
		newState[newState.lastIndexOf(`-`)] = enPassant;
	} else if(!enPassant){
		if (backwardsState[4] !== `-`){
			backwardsState[4] = `-`
			backwardsState.splice(5,1)
			backwardsState.reverse()
			newState = [...backwardsState]
		};
	}

	newState[newState.length - 1] = currentTurnNum;
	if (!whiteKing.includes(`wk`)) {
		newState[newState.indexOf(`Q`)] = ``;
		newState[newState.indexOf(`K`)] = ``;
	}
	if (!blackKing.includes(`bk`)) {
		newState[newState.indexOf(`q`)] = ``;
		newState[newState.indexOf(`k`)] = ``;
	}
	if (!whiteQueenRook.includes(`wr`)) newState[newState.indexOf(`Q`)] = ``;
	if (!whiteKingRook.includes(`wr`)) newState[newState.indexOf(`K`)] = ``;
	if (!blackQueenRook.includes(`br`)) newState[newState.indexOf(`q`)] = ``;
	if (!blackKingRook.includes(`br`)) newState[newState.indexOf(`k`)] = ``;
	if (!newState.includes(`Q`) && !newState.includes(`K`) && !newState.includes(`q`) && !newState.includes(`k`)) newState[2] = `-`; //prettier-ignore
	// Join everything together now that we're done looping
	newFEN = [newFEN.join(``)]; // join all of the letters together from the abvove loop
	newFEN.push(newState.join(``)); // push the current game state to the array
	newFEN = newFEN.join(` `); // join them togther with a space
	return newFEN;
};

/**
 * used to check what piece is moved based on its css class tag. Returns if the king is in check
 * @param {string} piece Takes a string of a pieces class (eg. 'white piece wp' <- wp="white pawn")
 * @returns
 */
export const pieceCheck = (piece) => {
	if (piece.includes(`bb`)) {
		return [bb, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`bn`)) {
		return [bn, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`br`)) {
		return [br, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`bp`)) {
		return [bp, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`bq`)) {
		return [bq, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`bk`)) {
		return [bk, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wn`)) {
		return [wn, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wb`)) {
		return [wb, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wr`)) {
		return [wr, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wp`)) {
		return [wp, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wq`)) {
		return [wq, previousPosition, pieceMoves, kingInCheck];
	} else if (piece.includes(`wk`)) {
		return [wk, previousPosition, pieceMoves, kingInCheck];
	}
};

/**
 * Used to check if a square has an enemy piece
 * @param {Number} squareNum The square to check for an enemy
 * @param {String} color The color of our current piece
 * @returns
 */
export const squareHasPiece = (squareNum, color) => {
	if (squareNum === 0) return;
	//prettier-ignore
	if (document.getElementById(`sq` + squareNum).innerHTML.includes(color===`w` ? `bk` : `wk`)) {
        return (`check`);
    }
	//prettier-ignore
	if (document.getElementById(`sq` + squareNum).innerHTML.includes(color===`w` ? `black` : `white`)) {
        return (`enemy`);
    }
	//prettier-ignore
	if (document.getElementById(`sq` + squareNum).innerHTML.includes(color===`w` ? `white` : `black`)) {
        return (`Friendly`)
    }
};

/**
 * Used to check for an enemy
 * @param {Number} curSquare Current square number (like 55, 6)
 * @param {Number} curRow Current row number
 * @param {Number} pieceMoveToSquare Square we want to go to
 * @param {String} pieceColor Color of our current piece
 * @param {Number} directionalIndex Our directional index based on [N, NW, NE, E, W, SW, SE, S]
 * @returns
 */
//prettier-ignore
export const checkForEnemy = (curSquare, curRow, pieceMoveToSquare, pieceColor, directionalIndex) => {
	let leftEdge       = [1, 9, 17, 25, 33, 41, 49, 57]; //prettier-ignore
	let rightEdge      = [8, 16, 24, 32, 40, 48, 56, 64]; //prettier-ignore
	let squareHasEnemy = squareHasPiece(pieceMoveToSquare, pieceColor); //prettier-ignore

    if(squareHasEnemy === `Friendly`) return `Friendly`;
    if(squareHasEnemy === `check`) return `check`;
	
	if (directionalIndex === NORTH_EAST || directionalIndex === EAST || directionalIndex === SOUTH_EAST) {
		// If our current piece is on the right edge, we can't go right
		if (curSquare === rightEdge[curRow - 1]) {
			return;
		} else {
			if (squareHasEnemy) return squareHasEnemy;
		}
	}
	// if direction is left and it does past one of its left eges, stop -------------------------------------------------------------------
    else if (directionalIndex === NORTH_WEST || directionalIndex === WEST || directionalIndex === SOUTH_WEST) {
		// If our current piece is on the left edge, we can't go left
		if (curSquare === leftEdge[curRow - 1]) {
			return;
		} else {
			if (squareHasEnemy) return squareHasEnemy;
		}
	}

    // if the direction is North
    else if(directionalIndex === 0 || directionalIndex === 7) {
        if(squareHasEnemy) return squareHasEnemy;
    }
};

/**
 * Simply removes any highlighting/bordering on a square
 * @param {*} e
 */
export const removeSquareColors = (e) => {
	document.querySelectorAll(`.dragOver`)?.forEach(el   => el.classList.remove(`dragOver`)); //prettier-ignore
	document.querySelectorAll(`.legalMoves`)?.forEach(el => el.classList.remove(`legalMoves`)) //prettier-ignore
	document.querySelectorAll(`.highlight`)?.forEach(el  => el.classList.remove(`highlight`)) //prettier-ignore
	document.querySelectorAll(`.runAway`)?.forEach(el    => el.classList.remove(`runAway`)) //prettier-ignore
};

/**
 * Takes in a number between 1 and 64. returns the board notation for it (eg. 1 = a1, 34 = b5)
 * @param {Number} num Number between 1 and 64
 * @returns
 */
export const boardNumToChessNotation = (num) => {
	if (num === 1)  return `a1`; //prettier-ignore
	if (num === 9)  return `a2`; //prettier-ignore
	if (num === 17) return `a3`; //prettier-ignore
	if (num === 25) return `a4`; //prettier-ignore
	if (num === 33) return `a5`; //prettier-ignore
	if (num === 41) return `a6`; //prettier-ignore
	if (num === 49) return `a7`; //prettier-ignore
	if (num === 57) return `a8`; //prettier-ignore
	if (num === 2)  return `b1`; //prettier-ignore
	if (num === 10) return `b2`; //prettier-ignore
	if (num === 18) return `b3`; //prettier-ignore
	if (num === 26) return `b4`; //prettier-ignore
	if (num === 34) return `b5`; //prettier-ignore
	if (num === 42) return `b6`; //prettier-ignore
	if (num === 50) return `b7`; //prettier-ignore
	if (num === 58) return `b8`; //prettier-ignore
	if (num === 3)  return `c1`; //prettier-ignore
	if (num === 11) return `c2`; //prettier-ignore
	if (num === 19) return `c3`; //prettier-ignore
	if (num === 27) return `c4`; //prettier-ignore
	if (num === 35) return `c5`; //prettier-ignore
	if (num === 43) return `c6`; //prettier-ignore
	if (num === 51) return `c7`; //prettier-ignore
	if (num === 59) return `c8`; //prettier-ignore
	if (num === 4)  return `d1`; //prettier-ignore
	if (num === 12) return `d2`; //prettier-ignore
	if (num === 20) return `d3`; //prettier-ignore
	if (num === 28) return `d4`; //prettier-ignore
	if (num === 36) return `d5`; //prettier-ignore
	if (num === 44) return `d6`; //prettier-ignore
	if (num === 52) return `d7`; //prettier-ignore
	if (num === 60) return `d8`; //prettier-ignore
	if (num === 5)  return `e1`; //prettier-ignore
	if (num === 13) return `e2`; //prettier-ignore
	if (num === 21) return `e3`; //prettier-ignore
	if (num === 29) return `e4`; //prettier-ignore
	if (num === 37) return `e5`; //prettier-ignore
	if (num === 45) return `e6`; //prettier-ignore
	if (num === 53) return `e7`; //prettier-ignore
	if (num === 61) return `e8`; //prettier-ignore
	if (num === 6)  return `f1`; //prettier-ignore
	if (num === 14) return `f2`; //prettier-ignore
	if (num === 22) return `f3`; //prettier-ignore
	if (num === 30) return `f4`; //prettier-ignore
	if (num === 38) return `f5`; //prettier-ignore
	if (num === 46) return `f6`; //prettier-ignore
	if (num === 54) return `f7`; //prettier-ignore
	if (num === 62) return `f8`; //prettier-ignore
	if (num === 7)  return `g1`; //prettier-ignore
	if (num === 15) return `g2`; //prettier-ignore
	if (num === 23) return `g3`; //prettier-ignore
	if (num === 31) return `g4`; //prettier-ignore
	if (num === 39) return `g5`; //prettier-ignore
	if (num === 47) return `g6`; //prettier-ignore
	if (num === 55) return `g7`; //prettier-ignore
	if (num === 63) return `g8`; //prettier-ignore
	if (num === 8)  return `h1`; //prettier-ignore
	if (num === 16) return `h2`; //prettier-ignore
	if (num === 24) return `h3`; //prettier-ignore
	if (num === 32) return `h4`; //prettier-ignore
	if (num === 40) return `h5`; //prettier-ignore
	if (num === 48) return `h6`; //prettier-ignore
	if (num === 56) return `h7`; //prettier-ignore
	if (num === 64) return `h8`; //prettier-ignore
};
