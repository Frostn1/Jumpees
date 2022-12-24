import './Board.scss'
import {ReactComponent as DarkPiece} from "../../Assets/dark-piece.svg";
import {ReactComponent as LightPiece} from "../../Assets/light-piece.svg";
import {useEffect, useState} from "react";
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

const colorPallete = [
    {
        boardLightColor:'antiquewhite',
        boardDarkColor:'#282c34',
        darkPieceColor: 'saddlebrown',
        lightPieceColor: '#fff',
        pathColor: {
            bg: '#397aaf',
            boxShadow: '#fff'
        },
        clickedColor: {
            bg: '#2CDA9D',
            boxShadow: '#fff'
        },
    },
    {
        boardLightColor:'#F6E8EA',
        boardDarkColor:'#22181C',
        darkPieceColor: '#312F2F',
        lightPieceColor: '#6B818C',
        pathColor: {
            bg: '#397aaf',
            boxShadow: 'rgba(0,150,255,0.91)'
        },
        clickedColor: {
            bg: '#2CDA9D',
            boxShadow: 'rgba(0,150,255,0.91)'
        },
    },
    {
        boardLightColor:'#BEB7A4',
        boardDarkColor:'#000',
        darkPieceColor: '#423E37',
        lightPieceColor: '#A4778B',
        pathColor: {
            bg: '#397aaf',
            boxShadow: 'rgba(0,150,255,0.91)'
        },
        clickedColor: {
            bg: '#2CDA9D',
            boxShadow: 'rgba(0,150,255,0.91)'
        },
    }
]
const Board = () => {

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1);
    const [selectedValidMoves, setSelectedValidMoves] = useState(new Map());
    const [liveBoard, setLiveBoard] = useState(plain_board);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [moveCounter, setMoveCounter] = useState(0);
    const [selectedColorPallete, setSelectedColorPallete] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playerWon, setPlayerWon] = useState(null);
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

        // --------------

        if(rowIndex + 2 < BOARD_SIZE && columnIndex + 2 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex + 1].piece !== null && liveBoard[rowIndex + 2][columnIndex + 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex + 2, columnIndex + 2]))) {
            validMoves.set(JSON.stringify([rowIndex + 2, columnIndex + 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex + 2, columnIndex + 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }
        if(rowIndex + 2 < BOARD_SIZE && columnIndex - 2 >= 0 && liveBoard[rowIndex + 1][columnIndex - 1].piece !== null && liveBoard[rowIndex + 2][columnIndex - 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex + 2, columnIndex - 2]))) {
            validMoves.set(JSON.stringify([rowIndex + 2, columnIndex - 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex + 2, columnIndex - 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }
        if(rowIndex - 2 >= 0 && columnIndex + 2 < BOARD_SIZE && liveBoard[rowIndex - 1][columnIndex + 1].piece !== null && liveBoard[rowIndex - 2][columnIndex + 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex - 2, columnIndex + 2]))) {
            validMoves.set(JSON.stringify([rowIndex - 2, columnIndex + 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex - 2, columnIndex + 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
            tempValidMoves.forEach((value, _oldValidMove) => {
                validMoves.set(_oldValidMove, value)
            })
        }
        if(rowIndex - 2 >= 0 && columnIndex - 2 >= 0 && liveBoard[rowIndex - 1][columnIndex - 1].piece !== null && liveBoard[rowIndex - 2][columnIndex - 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex - 2, columnIndex - 2]))) {
            validMoves.set(JSON.stringify([rowIndex - 2, columnIndex - 2]), 0)
            const tempValidMoves = getJumpPaths(rowIndex - 2, columnIndex - 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
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

        if(columnIndex + 1 < BOARD_SIZE && rowIndex + 1 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex + 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex + 1, columnIndex + 1]), 0)
        if(columnIndex - 1  >= 0 && rowIndex - 1 >= 0 && liveBoard[rowIndex - 1][columnIndex - 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex - 1, columnIndex - 1]), 0)
        if(columnIndex + 1 < BOARD_SIZE && rowIndex - 1  >= 0 && liveBoard[rowIndex - 1][columnIndex + 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex - 1, columnIndex + 1]), 0)
        if(columnIndex - 1  >= 0 && rowIndex + 1 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex - 1].piece === null)
            validMoves.set(JSON.stringify([rowIndex + 1, columnIndex - 1]), 0)
        const tempValidMoves = getJumpPaths(rowIndex, columnIndex, pieceColor, new Map());
        tempValidMoves.forEach((value, _oldValidMove) => {
            validMoves.set(_oldValidMove, value)
        })
        return validMoves
    }
    const onClick = (rowIndex, columnIndex) => {
        if(plain_board[rowIndex][columnIndex].piece !== currentPlayer) return;
        if(selectedColumnIndex !== -1 || selectedRowIndex !== -1) {
            plain_board[selectedRowIndex][selectedColumnIndex].clicked = false;
        }
        if(rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex) {
            plain_board[rowIndex][columnIndex].clicked = false;
            clearSelection();
            return;
        }


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

    const checkWin = () => {
        let lightColorCheck = true;
        for (let i = 0;i < 3; i++)
            for(let j = 0; j < 3; j++) {
                lightColorCheck = liveBoard[i][j].piece === 1 ? true : false;
                if(!lightColorCheck)
                    i = j = 3;
            }
        if(lightColorCheck) {
            setGameOver(true);
            setPlayerWon(1)
        }
        let darkColorCheck = true;
        for (let i = 5;i < BOARD_SIZE; i++)
            for(let j = 5; j < BOARD_SIZE; j++) {
                darkColorCheck = liveBoard[i][j].piece === 0 ? true : false;
                if(!darkColorCheck)
                    i = j = BOARD_SIZE;
            }
        if(darkColorCheck) {
            setGameOver(true);
            setPlayerWon(0)
        }
    }

    const movePiece = (destRowIndex, destColumnIndex, srcRowIndex, srcColumnIndex, piece) => {
        if(liveBoard[destRowIndex][destColumnIndex].path) {
            plain_board[srcRowIndex][srcColumnIndex].piece = null;
            plain_board[destRowIndex][destColumnIndex].piece = piece;
        }
        setLiveBoard(plain_board)
        setCurrentPlayer(currentPlayer ? 0 : 1)
        setMoveCounter(moveCounter + 1)
        if(moveCounter > 15)
            checkWin()
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

    const setUpBoard = () => {
        const root = document.documentElement;
        root.style.setProperty(
            '--dark-background-color',
            colorPallete[selectedColorPallete].boardDarkColor
        )
        root.style.setProperty(
            '--light-background-color',
            colorPallete[selectedColorPallete].boardLightColor
        )
        root.style.setProperty(
            '--dark-piece-color',
            colorPallete[selectedColorPallete].darkPieceColor
        )
        root.style.setProperty(
            '--light-piece-color',
            colorPallete[selectedColorPallete].lightPieceColor
        )
        root.style.setProperty(
            '--path-bg-color',
            colorPallete[selectedColorPallete].pathColor.bg
        )
        root.style.setProperty(
            '--path-box-color',
            colorPallete[selectedColorPallete].pathColor.boxShadow
        )
        root.style.setProperty(
            '--clicked-bg-color',
            colorPallete[selectedColorPallete].clickedColor.bg
        )
        root.style.setProperty(
            '--clicked-box-color',
            colorPallete[selectedColorPallete].clickedColor.boxShadow
        )
    }
    useEffect(setUpBoard, [])
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
        {gameOver ?
            <div className={'display-game-over'}>
                Game over<br/>
                {playerWon ? 'Light' : 'Dark'} Player won !
            </div> :
            null
        }
    </div>)
};

export default Board