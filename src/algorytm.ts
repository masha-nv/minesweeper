export function minesweeper(board: any, click: any) {
    const row = click[0], col = click[1], n = board.length, m = board[0].length;
    const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]]

    if (board[row][col] === 'M' || board[row][col] === 'X') {
        board[row][col] = 'X';
        return board;
    }

    let mines = 0;

    for (const [r,c] of directions) {
        const newR = r+row, newC = c+col;

        if (newR >=0 && newC >=0 && newR < n && newC < m && board[newR][newC] === 'M' ) mines++;
    }

    if (mines) {
        board[row][col] = mines;
        return board;
    }

    board[row][col] = 'B';

    for (const [r,c] of directions) {
        const newR = r+row, newC = c+col;

        if (newR >=0 && newC >=0 && newR < n && newC < m && board[newR][newC] === 'E' ) {
            minesweeper(board, [newR, newC])
        }
    }
    return board;
}