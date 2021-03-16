// eslint-disable-next-line
import { pawn, bishop, rook, knight, king, queen } from './Pieces';

// Check if the letter is uppercase, lowercase, or letter (for FEN)
export const parseFEN = (arr) => {
	let board = [];
	let row = [];
	let endLine = [];

	// using Array.some allows us to exit the loop when we encounter a space
	arr.some((piece) => {
		// if piece is a space (only used at the end of the FEN diagram)
		if (/\s/.test(piece)) {
			endLine = arr.slice(arr.indexOf(piece) + 1, arr.length);
			board.push(row);
			board.push(endLine);
			return /\s/.test(piece);
		}
		// if the piece is a number, that denotes a empty square space
		if (!isNaN(piece * 1)) {
			for (let i = piece; i > 0; i--) row.push(` `);
			return null;
		}
		// if the piece is a back slash, new line
		if (piece === '/') {
			board.push(row);
			row = [];
			return null;
		}
		// if piece is uppercase, its white
		if (piece === piece.toUpperCase()) {
			if (piece === `P`) {
				row.push(pawn(`white`));
				return null;
			}
			if (piece === `R`) {
				row.push(rook(`white`));
				return null;
			}
			if (piece === `B`) {
				row.push(bishop(`white`));
				return null;
			}
			if (piece === `N`) {
				row.push(knight(`white`));
				return null;
			}
			if (piece === `Q`) {
				row.push(queen(`white`));
				return null;
			}
			if (piece === `K`) {
				row.push(king(`white`));
				return null;
			}
			return null;
		}
		// if piece is lowercase, its black
		if (piece === piece.toLowerCase()) {
			if (piece === `p`) {
				row.push(pawn(`black`));
				return null;
			}
			if (piece === `r`) {
				row.push(rook(`black`));
				return null;
			}
			if (piece === `b`) {
				row.push(bishop(`black`));
				return null;
			}
			if (piece === `n`) {
				row.push(knight(`black`));
				return null;
			}
			if (piece === `q`) {
				row.push(queen(`black`));
				return null;
			}
			if (piece === `k`) {
				row.push(king(`black`));
				return null;
			}
			return null;
		}
		return null;
	});
	return board;
};
