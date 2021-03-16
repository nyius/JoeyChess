export const pawn = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wp' : 'piece bp'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};

export const bishop = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wb' : 'piece bb'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};

export const knight = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wn' : 'piece bn'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};

export const rook = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wr' : 'piece br'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};

export const queen = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wq' : 'piece bq'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};

export const king = (color) => {
	return (
		<div
			className={color === 'white' ? 'piece wk' : 'piece bk'}
			draggable="true"
			onDragStart={(e) => this.handleDrag(e)}
		></div>
	);
};
