import './Board.scss'
import {ReactComponent as DarkPiece} from "../../Assets/dark-piece.svg";
import {ReactComponent as LightPiece} from "../../Assets/light-piece.svg";
import {useState} from "react";
import {click} from "@testing-library/user-event/dist/click";

const BOARD_SIZE = 8;
const plain_board = [
    [
        {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }
    ],
    [
        {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }
    ],
    [
        {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: 0
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }
    ],
    [
        {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }
    ],
    [
        {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }
    ],
    [
        {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }
    ],
    [
        {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }
    ],
    [
        {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: null
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }, {
            clicked: false, path: false, piece: 1
        }
    ]
]
const Board = () => {

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1);
    const [selectedValidMoves, setSelectedValidMoves] = useState(new Map());
    const [liveBoard, setLiveBoard] = useState(plain_board)

    const getJumpPaths = (rowIndex, columnIndex, pieceColor, oldValidMoves) => {
        // [[x,y]...] which are valid moves
        const validMoves = new Map();
        if(rowIndex - 2 >= 0 && liveBoard[rowIndex - 1][columnIndex].piece !== null && liveBoard[rowIndex - 2][columnIndex].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex - 2, columnIndex]))) {
            validMoves.set(JSON.stringify([rowIndex - 2, columnIndex]), 0)
            const tempValidMoves = getJumpPaths(rowIndex - 2, columnIndex, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })

        }
        if(rowIndex + 2 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex].piece !== null && liveBoard[rowIndex + 2][columnIndex].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex + 2, columnIndex]))) {
            validMoves.set(JSON.stringify([rowIndex + 2, columnIndex]), 0)
            const tempValidMoves = getJumpPaths(rowIndex + 2, columnIndex, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }
        if(columnIndex - 2 >= 0 && liveBoard[rowIndex][columnIndex - 1].piece !== null && liveBoard[rowIndex][columnIndex - 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex, columnIndex - 2]))) {
            validMoves.set(JSON.stringify([rowIndex, columnIndex - 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex, columnIndex - 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }
        if(columnIndex + 2 < BOARD_SIZE && liveBoard[rowIndex][columnIndex + 1].piece !== null && liveBoard[rowIndex][columnIndex + 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex, columnIndex + 2]))) {
            validMoves.set(JSON.stringify([rowIndex, columnIndex + 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex, columnIndex + 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }

        return validMoves;
    }
    const getSlidePaths = (rowIndex, columnIndex, pieceColor) => {
        // [[x,y]...] which are valid moves
        const validMoves = new Map();
        if(rowIndex - 1 >= 0 && liveBoard[rowIndex - 1][columnIndex].piece === null)
            validMoves.set(JSON.stringify([rowIndex - 1, columnIndex]), 0)
        if(rowIndex + 1 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex].piece === null)
            validMoves.set(JSON.stringify([rowIndex + 1, columnIndex]), 0)
        if(columnIndex - 1 >= 0 && liveBoard[rowIndex][columnIndex - 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex, columnIndex - 1]), 0)
        if(columnIndex + 1 < BOARD_SIZE && liveBoard[rowIndex][columnIndex + 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex, columnIndex + 1]), 0)

        const tempValidMoves = getJumpPaths(rowIndex, columnIndex, pieceColor, new Map());
        tempValidMoves.forEach((value, _oldValidMove) => {
            validMoves.set(_oldValidMove, value)
        })
        return validMoves
    }
    const onClick = (rowIndex, columnIndex) => {
        if(selectedColumnIndex !== -1 || selectedRowIndex !== -1)
            plain_board[selectedRowIndex][selectedColumnIndex].clicked = false;

        setSelectedRowIndex(rowIndex);
        setSelectedColumnIndex(columnIndex);
        plain_board[rowIndex][columnIndex].clicked = true;
        selectedValidMoves.forEach((value, _oldValidMove) => {
            const parsedValidMove = JSON.parse(_oldValidMove)
            plain_board[parsedValidMove[0]][parsedValidMove[1]].path = false;
        })
        const validMoves = getSlidePaths(rowIndex, columnIndex, plain_board[rowIndex][columnIndex].piece)
        validMoves.forEach((value, _validMove) => {
            const parsedValidMove = JSON.parse(_validMove)

            plain_board[parsedValidMove[0]][parsedValidMove[1]].path = true;
        })
        setLiveBoard(plain_board)
        setSelectedValidMoves(validMoves);
    }

    const movePiece = (destRowIndex, destColumnIndex, srcRowIndex, srcColumnIndex, piece) => {
        if(liveBoard[destRowIndex][destColumnIndex].path) {
            plain_board[srcRowIndex][srcColumnIndex].piece = null;
            plain_board[destRowIndex][destColumnIndex].piece = piece;
        }
        setLiveBoard(plain_board)
        clearSelection();
    }

    const clearSelection = () => {
        selectedValidMoves.forEach((value, _oldValidMove) => {
            const parsedValidMove = JSON.parse(_oldValidMove)
            plain_board[parsedValidMove[0]][parsedValidMove[1]].path = false;
        })
        plain_board[selectedRowIndex][selectedColumnIndex].clicked = false;
        setSelectedValidMoves(new Map());
        setSelectedRowIndex(-1);
        setSelectedColumnIndex(-1);
        setLiveBoard(plain_board)
    }

    return (<div id={'board-pane'}>
        {liveBoard.map((row, rowIndex) => {
            return (<div className={'row'}>
                {row.map((square, columnIndex) => {
                    return (<>
                        <div
                            className={`square ${rowIndex % 2 === 0 && columnIndex % 2 === 0 || rowIndex % 2 !== 0 && columnIndex % 2 !== 0 ? 'white' : 'black'}  ${square.clicked ? 'clicked-color' : ''} 
                                ${square.path ? 'path-color' : ''}`} onClick={square.path ? () => {movePiece(rowIndex, columnIndex, selectedRowIndex, selectedColumnIndex, plain_board[selectedRowIndex][selectedColumnIndex].piece)} : () => {}}>
                            {square.piece !== null ? <div
                                className={`piece ${square.piece === 1 ? 'light-piece-color' : 'dark-piece-color'} 
                               `} onClick={() => {onClick(rowIndex, columnIndex)}}/> : null}
                        </div>
                    </>)
                })}
            </div>)
        })}
    </div>)
};

export default Board