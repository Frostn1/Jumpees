import PropTypes from 'prop-types';
import './CheckersBoard.scss';
import {useEffect, useState} from "react";

const BOARD_SIZE = 8;
const jumpees_board = [
  [
    {
      clicked: false, path: false, piece: null
    }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }
  ],
  [
    {
      clicked: false, path: false, piece: 0
    }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }
  ],
  [
    {
      clicked: false, path: false, piece: null
    }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 0
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
    clicked: false, path: false, piece: 1
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
      clicked: false, path: false, piece: 1
    }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 3
  }, {
    clicked: false, path: false, piece: null
  }
  ],
  [
    {
      clicked: false, path: false, piece: null
    }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }
  ],
  [
    {
      clicked: false, path: false, piece: 1
    }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }, {
    clicked: false, path: false, piece: 1
  }, {
    clicked: false, path: false, piece: null
  }
  ]
]

const CheckersBoard = (props) => {


  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1);
  const [selectedValidMoves, setSelectedValidMoves] = useState(new Map());
  const [liveBoard, setLiveBoard] = useState(jumpees_board);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [moveCounter, setMoveCounter] = useState(0);
  const [colorPallete] = useState(props.colorPallete)
  const [gameOver, setGameOver] = useState(false);
  const [playerWon, setPlayerWon] = useState(null);
  const [lightCount, setLightCount] = useState(12);
  const [darkCount, setDarkCount] = useState(12);
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
  const getJumpPaths = (rowIndex, columnIndex, pieceColor, oldValidMoves) => {
    // [[x,y]...] which are valid moves
    const validMoves = new Map();
    if( (oldValidMoves.size || (pieceColor === 0)) && rowIndex + 2 < BOARD_SIZE && columnIndex + 2 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex + 1].piece !== null && (liveBoard[rowIndex + 1][columnIndex + 1].piece !== pieceColor && Math.abs(liveBoard[rowIndex + 1][columnIndex + 1].piece - pieceColor) !== 2)  && liveBoard[rowIndex + 2][columnIndex + 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex + 2, columnIndex + 2]))) {
      validMoves.set(JSON.stringify([rowIndex + 2, columnIndex + 2]), [[rowIndex, columnIndex]])
      const tempValidMoves = getJumpPaths(rowIndex + 2, columnIndex + 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
      tempValidMoves.forEach((value, _oldValidMove) => {
        const pushedValue = [[rowIndex, columnIndex], ...value]
        validMoves.set(_oldValidMove, pushedValue)
      })
    }
    if((oldValidMoves.size || (pieceColor === 0)) && rowIndex + 2 < BOARD_SIZE && columnIndex - 2 >= 0 && liveBoard[rowIndex + 1][columnIndex - 1].piece !== null && (liveBoard[rowIndex + 1][columnIndex + 1].piece !== pieceColor && Math.abs(liveBoard[rowIndex + 1][columnIndex + 1].piece - pieceColor) !== 2)   && liveBoard[rowIndex + 2][columnIndex - 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex + 2, columnIndex - 2]))) {
      validMoves.set(JSON.stringify([rowIndex + 2, columnIndex - 2]), [[rowIndex, columnIndex]])
      const tempValidMoves = getJumpPaths(rowIndex + 2, columnIndex - 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
      tempValidMoves.forEach((value, _oldValidMove) => {
        const pushedValue = [[rowIndex, columnIndex], ...value]
        validMoves.set(_oldValidMove, pushedValue)
      })
    }
    if((oldValidMoves.size || (pieceColor === 1)) && rowIndex - 2 >= 0 && columnIndex + 2 < BOARD_SIZE && liveBoard[rowIndex - 1][columnIndex + 1].piece !== null && (liveBoard[rowIndex + 1][columnIndex + 1].piece !== pieceColor && Math.abs(liveBoard[rowIndex + 1][columnIndex + 1].piece - pieceColor) !== 2)   && liveBoard[rowIndex - 2][columnIndex + 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex - 2, columnIndex + 2]))) {
      validMoves.set(JSON.stringify([rowIndex - 2, columnIndex + 2]), [[rowIndex, columnIndex]])
      const tempValidMoves = getJumpPaths(rowIndex - 2, columnIndex + 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
      tempValidMoves.forEach((value, _oldValidMove) => {
        const pushedValue = [[rowIndex, columnIndex], ...value]
        validMoves.set(_oldValidMove, pushedValue)
      })
    }
    if((oldValidMoves.size || pieceColor === 1) && rowIndex - 2 >= 0 && columnIndex - 2 >= 0 && liveBoard[rowIndex - 1][columnIndex - 1].piece !== null && (liveBoard[rowIndex + 1][columnIndex + 1].piece !== pieceColor && Math.abs(liveBoard[rowIndex + 1][columnIndex + 1].piece - pieceColor) !== 2)   && liveBoard[rowIndex - 2][columnIndex - 2].piece === null && !oldValidMoves.has(JSON.stringify([rowIndex - 2, columnIndex - 2]))) {
      validMoves.set(JSON.stringify([rowIndex - 2, columnIndex - 2]), [[rowIndex, columnIndex]])
      const tempValidMoves = getJumpPaths(rowIndex - 2, columnIndex - 2, pieceColor, new Map([...validMoves, ...oldValidMoves]));
      tempValidMoves.forEach((value, _oldValidMove) => {
        const pushedValue = [[rowIndex, columnIndex], ...value]
        validMoves.set(_oldValidMove, pushedValue)
      })
    }

    return validMoves;
  }

  const getSlidePaths = (rowIndex, columnIndex, pieceColor) => {
    // [[x,y]...] which are valid moves
    const validMoves = new Map();

    if(pieceColor !== 0 && columnIndex - 1  >= 0 && rowIndex - 1 >= 0 && liveBoard[rowIndex - 1][columnIndex - 1].piece === null)
      validMoves.set(JSON.stringify([rowIndex - 1, columnIndex - 1]), 0)
    if(pieceColor !== 0 && columnIndex + 1 < BOARD_SIZE && rowIndex - 1  >= 0 && liveBoard[rowIndex - 1][columnIndex + 1].piece === null)
      validMoves.set(JSON.stringify([rowIndex - 1, columnIndex + 1]), 0)
    if(pieceColor !== 1 && columnIndex + 1 < BOARD_SIZE && rowIndex + 1 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex + 1].piece === null)
      validMoves.set(JSON.stringify([rowIndex + 1, columnIndex + 1]), 0)
    if(pieceColor !== 1 && columnIndex - 1  >= 0 && rowIndex + 1 < BOARD_SIZE && liveBoard[rowIndex + 1][columnIndex - 1].piece === null)
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
    setSelectedRowIndex(rowIndex);
    setSelectedColumnIndex(columnIndex);
    jumpees_board[rowIndex][columnIndex].clicked = true;
    setLiveBoard(jumpees_board)
  }
  const checkWin = () => {
    if(!lightCount) {
      setGameOver(true);
      setPlayerWon(0)
    }

    if(!darkCount) {
      setGameOver(true);
      setPlayerWon(1)
    }
  }
  const movePiece = (destRowIndex, destColumnIndex, srcRowIndex, srcColumnIndex, piece) => {
    if(liveBoard[destRowIndex][destColumnIndex].path) {
      const destTuple = JSON.stringify([destRowIndex, destColumnIndex]);
      const selectedMove = selectedValidMoves.get(destTuple);
      if(Array.isArray(selectedMove))
        selectedMove.forEach((move, index) => {
          let xCoord = 0;
          let yCoord = 0;
          console.log('sean .. move', move[0], move[1]);
          if (index < selectedMove.length - 1) {
            xCoord = (move[0] + selectedMove[index + 1][0]) / 2
            yCoord = (move[1] + selectedMove[index + 1][1]) / 2
          } else {
            xCoord = (move[0] + destRowIndex) / 2
            yCoord = (move[1] + destColumnIndex) / 2
          }



          jumpees_board[xCoord][yCoord].piece === 1 ? setLightCount(lightCount - 1) : setDarkCount(darkCount - 1);
          jumpees_board[xCoord][yCoord].piece = null;
        })
      jumpees_board[srcRowIndex][srcColumnIndex].piece = null;
      jumpees_board[destRowIndex][destColumnIndex].piece = piece;
    }
    setLiveBoard(jumpees_board)
    setCurrentPlayer(currentPlayer ? 0 : 1)
    setMoveCounter(moveCounter + 1)
    if(moveCounter > 15) {
      checkWin();
    }
    clearSelection();
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
        <div id={'checkers-board-pane'}>
          {liveBoard.map((row, rowIndex) => {
            return (
                <div className={'row'}>
                  {row.map((square, columnIndex) => {
                    return (
                        <>
                          <div
                              className={`square ${(rowIndex % 2 === 0 && columnIndex % 2 === 0) || (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) ? 'white' : 'black'}  ${square.clicked ? 'clicked-color' : ''} 
                                ${square.path && props.showPaths ? 'path-color' : ''}`} onClick={square.path ? () => {movePiece(rowIndex, columnIndex, selectedRowIndex, selectedColumnIndex, liveBoard[selectedRowIndex][selectedColumnIndex].piece)} : () => {}}>
                            {square.piece !== null ?
                                <div
                                    className={`${square.piece === 1 || square.piece === 0 ? 'piece' : 'queen'} ${square.piece === 1 || square.piece === 3 ? 'light-piece-color' : 'dark-piece-color'} 
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
        </div>
    )
};

CheckersBoard.propTypes = {
  showPaths: PropTypes.bool.isRequired,
  colorPallete: PropTypes.array.isRequired,
  selectedColorPallete: PropTypes.number.isRequired,
};

export default CheckersBoard;