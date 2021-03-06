// [N, NW, NE, E, W, SW, SE, S]
export const BOARD_WIDTH        = 8; //prettier-ignore
export const BOARD_HEIGHT       = 8; //prettier-ignore
export const LEFT_EDGE          = [1, 9, 17, 25, 33, 41, 49, 57]; //prettier-ignore
export const RIGHT_EDGE         = [8, 16, 24, 32, 40, 48, 56, 64]; //prettier-ignore
export const KNIGHT_MOVES       = [15, 6, 17, 10, -10, -17, -6, -15]; //prettier-ignore
export const BISHOP_MOVES       = [0, 9, 7, 0, 0, -9, -7, 0]; //prettier-ignore
export const ROOK_MOVES         = [8, 0, 0, 1, -1, 0, 0, -8]; //prettier-ignore
export const QUEEN_MOVES        = [8, 7, 9, 1, -1, -9, -7, -8]; //prettier-ignore
export const KING_MOVES         = [8, 7, 9, 1, -1, -9, -7, -8]; //prettier-ignore
export const PAWN_MOVES_WHITE   = [8, 7, 9, 0, 0, 0, 0, 0]; //prettier-ignore
export const PAWN_MOVES_BLACK   = [0, 0, 0, 0, 0, -7, -9, -8]; //prettier-ignore
