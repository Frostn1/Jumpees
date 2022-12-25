import './JumpeesBoard.scss'
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const BOARD_SIZE = 8;
const jumpees_board = [
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


const JumpeesBoard = (props) => {

    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1);
    const [selectedValidMoves, setSelectedValidMoves] = useState(new Map());
    const [liveBoard, setLiveBoard] = useState(jumpees_board);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [moveCounter, setMoveCounter] = useState(0);
    const [colorPallete] = useState(props.colorPallete)
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
        if(jumpees_board[rowIndex][columnIndex].piece !== currentPlayer) return;
        if(selectedColumnIndex !== -1 || selectedRowIndex !== -1) {
            jumpees_board[selectedRowIndex][selectedColumnIndex].clicked = false;
        }
        if(rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex) {
            jumpees_board[rowIndex][columnIndex].clicked = false;
            clearSelection();
            return;
        }

        setSelectedRowIndex(rowIndex);
        setSelectedColumnIndex(columnIndex);
        jumpees_board[rowIndex][columnIndex].clicked = true;
        selectedValidMoves.forEach((value, _oldValidMove) => {
            const parsedValidMove = JSON.parse(_oldValidMove)
            jumpees_board[parsedValidMove[0]][parsedValidMove[1]].path = false;
        })

        const validMoves = getSlidePaths(rowIndex, columnIndex, jumpees_board[rowIndex][columnIndex].piece)
        validMoves.forEach((value, _validMove) => {
            const parsedValidMove = JSON.parse(_validMove)

            jumpees_board[parsedValidMove[0]][parsedValidMove[1]].path = true;
        })
        setSelectedValidMoves(validMoves);

        setLiveBoard(jumpees_board)
    }

    const checkWin = () => {
        let lightColorCheck = true;
        for (let i = 0;i < 3; i++)
            for(let j = 0; j < 3; j++) {
                lightColorCheck = liveBoard[i][j].piece === 1;
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
                darkColorCheck = liveBoard[i][j].piece === 0;
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
            jumpees_board[srcRowIndex][srcColumnIndex].piece = null;
            jumpees_board[destRowIndex][destColumnIndex].piece = piece;
        }
        setLiveBoard(jumpees_board)
        setCurrentPlayer(currentPlayer ? 0 : 1)
        setMoveCounter(moveCounter + 1)
        if(moveCounter > 15)
            checkWin()
        clearSelection();
    }

    const clearSelection = () => {
        selectedValidMoves.forEach((value, _oldValidMove) => {
            const parsedValidMove = JSON.parse(_oldValidMove)
            jumpees_board[parsedValidMove[0]][parsedValidMove[1]].path = false;
        })
        jumpees_board[selectedRowIndex][selectedColumnIndex].clicked = false;
        setSelectedValidMoves(new Map());
        setSelectedRowIndex(-1);
        setSelectedColumnIndex(-1);
        setLiveBoard(jumpees_board)
    }

    const setUpBoard = () => {
        const root = document.documentElement;
        root.style.setProperty(
            '--dark-background-color',
            colorPallete[props.selectedColorPallete].boardDarkColor
        )
        root.style.setProperty(
            '--light-background-color',
            colorPallete[props.selectedColorPallete].boardLightColor
        )
        root.style.setProperty(
            '--dark-piece-color',
            colorPallete[props.selectedColorPallete].darkPieceColor
        )
        root.style.setProperty(
            '--light-piece-color',
            colorPallete[props.selectedColorPallete].lightPieceColor
        )
        root.style.setProperty(
            '--path-bg-color',
            colorPallete[props.selectedColorPallete].pathColor.bg
        )
        root.style.setProperty(
            '--path-box-color',
            colorPallete[props.selectedColorPallete].pathColor.boxShadow
        )
        root.style.setProperty(
            '--clicked-bg-color',
            colorPallete[props.selectedColorPallete].clickedColor.bg
        )
        root.style.setProperty(
            '--clicked-box-color',
            colorPallete[props.selectedColorPallete].clickedColor.boxShadow
        )
    }
    useEffect(setUpBoard, [])
    useEffect(setUpBoard, [props.selectedColorPallete])

    return (
        <div id={'jumpees-board-pane'}>
        {liveBoard.map((row, rowIndex) => {
            return (
                <div className={'row'}>
                {row.map((square, columnIndex) => {
                    return (
                    <>
                        <div
                            className={`square ${rowIndex % 2 === 0 && columnIndex % 2 === 0 || rowIndex % 2 !== 0 && columnIndex % 2 !== 0 ? 'white' : 'black'}  ${square.clicked ? 'clicked-color' : ''} 
                                ${square.path && props.showPaths ? 'path-color' : ''}`} onClick={square.path ? () => {movePiece(rowIndex, columnIndex, selectedRowIndex, selectedColumnIndex, liveBoard[selectedRowIndex][selectedColumnIndex].piece)} : () => {}}>
                            {square.piece !== null ?
                                <div
                                className={`piece ${square.piece === 1 ? 'light-piece-color' : 'dark-piece-color'} 
                               `} onClick={() => {onClick(rowIndex, columnIndex)}}/>
                                : null}
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
JumpeesBoard.propTypes = {
    showPaths: PropTypes.bool.isRequired,
    colorPallete: PropTypes.array.isRequired,
    selectedColorPallete: PropTypes.number.isRequired,
}
export default JumpeesBoard