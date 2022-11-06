var lightColor = "#EEEED2";
var darkColor = "#769656";
var defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var container = document.getElementById("container");
var boardPosition = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
var boardRank = ["A", "B", "C", "D", "E", "F", "G", "H"];
var boardFile = ["8", "7", "6", "5", "4", "3", "2", "1"];
var whiteToMove = true;
var nextMoves = [];
var isWhiteRookMoved1 = false;
var isWhiteRookMoved2 = false;
var isWhiteKingMoved = false;
var isBlackRookMoved1 = false;
var isBlackRookMoved2 = false;
var isBlackKingMoved = false;
var LastMove;
var moveCntr = 0;

//#region Start Position

function createBoard() {
    var board = document.createElement("div");
    board.style.width = "800px";
    board.style.height = "800px";
    board.style.display = "flex";
    board.style.margin = "0 auto";
    board.style.flexWrap = "wrap";

    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            var tile = document.createElement("div");
            tile.setAttribute("id", file + "_" + rank);
            tile.style.width = "100px";
            tile.style.height = "100px";
            tile.style.display = "flex";
            tile.style.justifyContent = "center";
            tile.style.alignItems = "center";
            tile.style.position = "relative";
            var isLight = (file + rank) % 2 == 0;

            if (isLight) {
                tile.style.background = lightColor;
                tile.setAttribute("color", "light");
            } else {
                tile.style.background = darkColor;
                tile.setAttribute("color", "dark");
            }

            board.appendChild(tile);
        }
    }
    container.appendChild(board);
}

function generatePieces(FEN) {
    var file = 0;
    var rank = 0;

    if (FEN.includes(" ")) {
        if (FEN[FEN.length - 1] == "w") {
            whiteToMove = true;
        } else if (FEN[FEN.length - 1] == "b") {
            whiteToMove = false;
        }
        for (let i = 0; i < FEN.length - 2; i++) {
            var tile = document.getElementById(rank + "_" + file);
            if (FEN[i] == "r") {
                tile.classList.add("DarkRook");
                tile.setAttribute("piece", "r");
                boardPosition[rank][file] = "r";
                file++;
            } else if (FEN[i] == "n") {
                tile.classList.add("DarkKnight");
                tile.setAttribute("piece", "n");
                boardPosition[rank][file] = "n";
                file++;
            } else if (FEN[i] == "b") {
                tile.classList.add("DarkBishop");
                tile.setAttribute("piece", "b");
                boardPosition[rank][file] = "b";
                file++;
            } else if (FEN[i] == "q") {
                tile.classList.add("DarkQueen");
                tile.setAttribute("piece", "q");
                boardPosition[rank][file] = "q";
                file++;
            } else if (FEN[i] == "k") {
                tile.classList.add("DarkKing");
                tile.setAttribute("piece", "k");
                boardPosition[rank][file] = "k";
                file++;
            } else if (FEN[i] == "p") {
                tile.classList.add("DarkPawn");
                tile.setAttribute("piece", "p");
                boardPosition[rank][file] = "p";
                file++;
            } else if (FEN[i] == "/") {
                rank++;
            } else if (FEN[i] == "R") {
                tile.classList.add("LightRook");
                tile.setAttribute("piece", "R");
                boardPosition[rank][file] = "R";
                file++;
            } else if (FEN[i] == "N") {
                tile.classList.add("LightKnight");
                tile.setAttribute("piece", "N");
                boardPosition[rank][file] = "N";
                file++;
            } else if (FEN[i] == "B") {
                tile.classList.add("LightBishop");
                tile.setAttribute("piece", "B");
                boardPosition[rank][file] = "B";
                file++;
            } else if (FEN[i] == "Q") {
                tile.classList.add("LightQueen");
                tile.setAttribute("piece", "Q");
                boardPosition[rank][file] = "Q";
                file++;
            } else if (FEN[i] == "K") {
                tile.classList.add("LightKing");
                tile.setAttribute("piece", "K");
                boardPosition[rank][file] = "K";
                file++;
            } else if (FEN[i] == "P") {
                tile.classList.add("LightPawn");
                tile.setAttribute("piece", "P");
                boardPosition[rank][file] = "P";
                file++;
            } else if (FEN[i] == "w") {
                whiteToMove = true;
            } else if (FEN[i] == "b") {
                whiteToMove = false;
            } else {
                file += FEN[i] - "0";
                file %= 8;
            }
            file %= 8;
        }
    } else {
        for (let i = 0; i < FEN.length; i++) {
            var tile = document.getElementById(rank + "_" + file);
            if (FEN[i] == "r") {
                tile.classList.add("DarkRook");
                tile.setAttribute("piece", "r");
                boardPosition[rank][file] = "r";
                file++;
            } else if (FEN[i] == "n") {
                tile.classList.add("DarkKnight");
                tile.setAttribute("piece", "n");
                boardPosition[rank][file] = "n";
                file++;
            } else if (FEN[i] == "b") {
                tile.classList.add("DarkBishop");
                tile.setAttribute("piece", "b");
                boardPosition[rank][file] = "b";
                file++;
            } else if (FEN[i] == "q") {
                tile.classList.add("DarkQueen");
                tile.setAttribute("piece", "q");
                boardPosition[rank][file] = "q";
                file++;
            } else if (FEN[i] == "k") {
                tile.classList.add("DarkKing");
                tile.setAttribute("piece", "k");
                boardPosition[rank][file] = "k";
                file++;
            } else if (FEN[i] == "p") {
                tile.classList.add("DarkPawn");
                tile.setAttribute("piece", "p");
                boardPosition[rank][file] = "p";
                file++;
            } else if (FEN[i] == "/") {
                rank++;
            } else if (FEN[i] == "R") {
                tile.classList.add("LightRook");
                tile.setAttribute("piece", "R");
                boardPosition[rank][file] = "R";
                file++;
            } else if (FEN[i] == "N") {
                tile.classList.add("LightKnight");
                tile.setAttribute("piece", "N");
                boardPosition[rank][file] = "N";
                file++;
            } else if (FEN[i] == "B") {
                tile.classList.add("LightBishop");
                tile.setAttribute("piece", "B");
                boardPosition[rank][file] = "B";
                file++;
            } else if (FEN[i] == "Q") {
                tile.classList.add("LightQueen");
                tile.setAttribute("piece", "Q");
                boardPosition[rank][file] = "Q";
                file++;
            } else if (FEN[i] == "K") {
                tile.classList.add("LightKing");
                tile.setAttribute("piece", "K");
                boardPosition[rank][file] = "K";
                file++;
            } else if (FEN[i] == "P") {
                tile.classList.add("LightPawn");
                tile.setAttribute("piece", "P");
                boardPosition[rank][file] = "P";
                file++;
            } else if (FEN[i] == "w") {
                whiteToMove = true;
            } else if (FEN[i] == "b") {
                whiteToMove = false;
            } else {
                file += FEN[i] - "0";
                file %= 8;
            }
            file %= 8;
        }
    }
}

//#endregion

//#region Calculate Board

function isMoveValid(move) {
    let newBoardPos = boardPosition.map(function (arr) {
        return arr.slice();
    });
    let fileTo;
    let rankTo;
    let file;
    let rank;
    let moveList = [];
    let flag = 0;

    if (move.includes("--")) {
        if (move[0] == "O") {
            newBoardPos[7][0] = 0;
            newBoardPos[7][2] = "K";
            newBoardPos[7][3] = "R";
            newBoardPos[7][4] = 0;
        } else {
            newBoardPos[0][0] = 0;
            newBoardPos[0][2] = "k";
            newBoardPos[0][3] = "r";
            newBoardPos[0][4] = 0;
        }
    } else if (move.includes("-")) {
        if (move[0] == "O") {
            newBoardPos[7][7] = 0;
            newBoardPos[7][6] = "K";
            newBoardPos[7][5] = "R";
            newBoardPos[7][4] = 0;
        } else {
            newBoardPos[0][7] = 0;
            newBoardPos[0][6] = "k";
            newBoardPos[0][5] = "r";
            newBoardPos[0][4] = 0;
        }
    } else {
        if (!move.includes("t")) {
            if (move.length == 5) {
                rankTo = move[3].charCodeAt(0) - 65;
                fileTo = 7 - (move[4] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
            } else {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
            }
            newBoardPos[fileTo][rankTo] = move[0];
            newBoardPos[file][rank] = 0;
        } else {
            if (move.length == 7) {
                rankTo = move[3].charCodeAt(0) - 65;
                fileTo = 7 - (move[4] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
            } else {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
            }
            newBoardPos[fileTo][rankTo] = move[0];
            newBoardPos[file][rank] = 0;
        }
    }

    if (whiteToMove) {
        moveList = generateMovesBlackNoCastle(newBoardPos);
        moveList.forEach((mv) => {
            if (mv.includes("xK")) flag = 1;
        });
    } else {
        moveList = generateMovesWhiteNoCastle(newBoardPos);
        moveList.forEach((mv) => {
            if (mv.includes("xk")) flag = 1;
        });
    }

    if (flag == 0) {
        return true;
    } else {
        return false;
    }
}

function isMoveValidNoCastle(move) {
    let newBoardPos = boardPosition.map(function (arr) {
        return arr.slice();
    });
    let fileTo;
    let rankTo;
    let file;
    let rank;
    let moveList = [];
    let flag = 0;

    if (move.includes("--")) {
        if (move[0] == "O") {
            newBoardPos[7][0] = 0;
            newBoardPos[7][2] = "K";
            newBoardPos[7][3] = "R";
            newBoardPos[7][4] = 0;
        } else {
            newBoardPos[0][0] = 0;
            newBoardPos[0][2] = "k";
            newBoardPos[0][3] = "r";
            newBoardPos[0][4] = 0;
        }
    } else if (move.includes("-")) {
        if (move[0] == "O") {
            newBoardPos[7][7] = 0;
            newBoardPos[7][6] = "K";
            newBoardPos[7][5] = "R";
            newBoardPos[7][4] = 0;
        } else {
            newBoardPos[0][7] = 0;
            newBoardPos[0][6] = "k";
            newBoardPos[0][5] = "r";
            newBoardPos[0][4] = 0;
        }
    } else {
        if (move.length == 5) {
            rankTo = move[3].charCodeAt(0) - 65;
            fileTo = 7 - (move[4] - "0" - 1);
            rank = move[1].charCodeAt(0) - 65;
            file = 7 - (move[2] - "0" - 1);
        } else {
            rankTo = move[5].charCodeAt(0) - 65;
            fileTo = 7 - (move[6] - "0" - 1);
            rank = move[1].charCodeAt(0) - 65;
            file = 7 - (move[2] - "0" - 1);
        }
        newBoardPos[fileTo][rankTo] = move[0];
        newBoardPos[file][rank] = 0;
    }

    if (whiteToMove) {
        moveList = generateMovesBlackNoCastle(newBoardPos);
        moveList.forEach((mv) => {
            if (mv.includes("xK")) flag = 1;
        });
    } else {
        moveList = generateMovesWhiteNoCastle(newBoardPos);
        moveList.forEach((mv) => {
            if (mv.includes("xk")) flag = 1;
        });
    }

    if (flag == 0) {
        return true;
    } else {
        return false;
    }
}

function isCastlePossible(long) {
    let moveList;
    let flag = 0;
    if (whiteToMove) {
        moveList = generateMovesBlackNoCastle(boardPosition);
        moveList.forEach((mv) => {
            if (mv.includes("xK")) flag = 1;
            if (long) {
                if (mv.length == 5) {
                    if (mv[3] == "C" && mv[4] == "1") flag = 1;
                }
            } else {
                if (mv.length == 5) {
                    if (mv[3] == "G" && mv[4] == "1") flag = 1;
                }
            }
        });
    } else {
        moveList = generateMovesWhiteNoCastle(boardPosition);
        moveList.forEach((mv) => {
            if (mv.includes("xk")) flag = 1;
            if (long) {
                if (mv.length == 5) {
                    if (mv[3] == "C" && mv[4] == "8") flag = 1;
                }
            } else {
                if (mv.length == 5) {
                    if (mv[3] == "G" && mv[4] == "8") flag = 1;
                }
            }
        });
    }
    if (flag == 1) return true;
    else return false;
}

function isChecked() {
    let moveList;
    let flag = 0;
    if (whiteToMove) {
        moveList = generateValidMovesBlackWithoutCastle(boardPosition);
        moveList.forEach((mv) => {
            if (mv.includes("xK")) flag = 1;
        });
    } else {
        moveList = generateValidMovesWhiteWithoutCastle(boardPosition);
        moveList.forEach((mv) => {
            if (mv.includes("xk")) flag = 1;
        });
    }
    if (flag == 1) return true;
    else return false;
}

function isPlayable(boardPos) {
    let whiteKing = 0;
    let whiteQueen = 0;
    let whiteRook = 0;
    let whiteKnight = 0;
    let whiteBishop = 0;
    let whitePawn = 0;
    let blackKing = 0;
    let blackQueen = 0;
    let blackRook = 0;
    let blackKnight = 0;
    let blackBishop = 0;
    let blackPawn = 0;
    boardPos.forEach((pcs) => {
        pcs.forEach((pc) => {
            if (pc == "K") {
                whiteKing++;
            } else if (pc == "Q") {
                whiteQueen++;
            } else if (pc == "R") {
                whiteRook++;
            } else if (pc == "B") {
                whiteBishop++;
            } else if (pc == "N") {
                whiteKnight++;
            } else if (pc == "P") {
                whitePawn++;
            } else if (pc == "k") {
                blackKing++;
            } else if (pc == "q") {
                blackQueen++;
            } else if (pc == "r") {
                blackRook++;
            } else if (pc == "b") {
                blackBishop++;
            } else if (pc == "n") {
                blackKnight++;
            } else if (pc == "p") {
                blackPawn++;
            }
        });
    });
    if (moveCntr == 100) {
        return false;
    }
    if (whiteQueen == 0 && whiteRook == 0 && whitePawn == 0 && blackQueen == 0 && blackRook == 0 && blackPawn == 0) {
        if (whiteKnight == 0 && whiteBishop == 0 && blackKnight == 0 && blackBishop == 0) {
            return false;
        } else if (whiteBishop == 0 && blackKnight == 0 && blackBishop == 0) {
            return false;
        } else if (whiteKnight == 0 && whiteBishop == 0 && blackKnight == 0) {
            return false;
        } else if (whiteKnight == 0 && whiteBishop == 0 && blackBishop == 0) {
            return false;
        } else if (whiteKnight == 0 && blackKnight == 0 && blackBishop == 0) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function isCheckMated() {
    let moveList;
    if (whiteToMove) {
        moveList = generateValidMovesWhite(boardPosition);
    } else {
        moveList = generateValidMovesBlack(boardPosition);
    }
    if (isChecked() && moveList.length == 0) {
        return "Checkmate";
    } else if (!isChecked() && moveList.length == 0) {
        return "Draw";
    } else {
        return "Play";
    }
}

function calculateBoardValue(boardPos) {
    let val = 0;
    boardPos.forEach((pcs) => {
        pcs.forEach((pc) => {
            if (pc == "K") {
                val += 9999999;
            } else if (pc == "Q") {
                val += 9;
            } else if (pc == "R") {
                val += 5;
            } else if (pc == "B") {
                val += 3;
            } else if (pc == "N") {
                val += 3;
            } else if (pc == "P") {
                val += 1;
            } else if (pc == "k") {
                val -= 9999999;
            } else if (pc == "q") {
                val -= 9;
            } else if (pc == "r") {
                val -= 5;
            } else if (pc == "b") {
                val -= 3;
            } else if (pc == "n") {
                val -= 3;
            } else if (pc == "p") {
                val -= 1;
            }
        });
    });
    return val;
}

//#endregion

//#region Generate Moves

function generateKingMovesNoCastle(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "K") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
    } else if (boardPos[file][rank] == "k") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
    }
    return moves;
}

function generateKingMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "K") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
                if (file == 7 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank - 3] = "K";
                    newBoardPos[file][rank - 4] = 0;
                    newBoardPos[file][rank - 1] = "R";
                    if (!isCastlePossible(true) && boardPos[file][rank - 2] == 0 && boardPos[file][rank - 3] == 0 && boardPos[file][rank - 4] == "R" && !isWhiteKingMoved && !isWhiteRookMoved1) {
                        move = "O--O";
                        moves.push(move);
                    }
                }
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
                if (file == 7 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank + 2] = "K";
                    newBoardPos[file][rank + 3] = 0;
                    newBoardPos[file][rank + 1] = "R";
                    if (!isCastlePossible(false) && boardPos[file][rank + 2] == 0 && boardPos[file][rank + 3] == "R" && !isWhiteKingMoved && !isWhiteRookMoved2) {
                        move = "O-O";
                        moves.push(move);
                    }
                }
            }
        }
    } else if (boardPos[file][rank] == "k") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
                if (file == 0 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank - 3] = "k";
                    newBoardPos[file][rank - 4] = 0;
                    newBoardPos[file][rank - 1] = "r";
                    if (!isCastlePossible(true) && boardPos[file][rank - 2] == 0 && boardPos[file][rank - 3] == 0 && boardPos[file][rank - 4] == "r" && !isBlackKingMoved && !isBlackRookMoved1) {
                        move = "o--o";
                        moves.push(move);
                    }
                }
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
                if (file == 0 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank + 2] = "k";
                    newBoardPos[file][rank + 3] = 0;
                    newBoardPos[file][rank + 1] = "r";
                    if (!isCastlePossible(false) && boardPos[file][rank + 2] == 0 && boardPos[file][rank + 3] == "r" && !isBlackKingMoved && !isBlackRookMoved2) {
                        move = "o-o";
                        moves.push(move);
                    }
                }
            }
        }
    }
    return moves;
}

function generateQueenMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let file3 = file;
    let file4 = file;
    let file5 = file;
    let file6 = file;
    let rank1 = rank;
    let rank2 = rank;
    let rank3 = rank;
    let rank4 = rank;
    let rank5 = rank;
    let rank6 = rank;
    if (boardPos[file][rank] == "Q") {
        while (file5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file5 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file5 = newFile;
            }
        }
        while (file6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file6 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file6 = newFile;
            }
        }
        while (rank5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank5 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank5 = newRank;
            }
        }
        while (rank6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank6 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank6 = newRank;
            }
        }
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "q") {
        while (file5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file5 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file5 = newFile;
            }
        }
        while (file6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file6 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file6 = newFile;
            }
        }
        while (rank5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank5 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank5 = newRank;
            }
        }
        while (rank6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank6 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank6 = newRank;
            }
        }
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    }
    return moves;
}

function generateBishopMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let file3 = file;
    let file4 = file;
    let rank1 = rank;
    let rank2 = rank;
    let rank3 = rank;
    let rank4 = rank;
    if (boardPos[file][rank] == "B") {
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "b") {
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    }
    return moves;
}

function generateRookMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let rank1 = rank;
    let rank2 = rank;

    if (boardPos[file][rank] == "R") {
        while (file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
            }
        }
        while (file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
            }
        }
        while (rank1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank1 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank1 = newRank;
            }
        }
        while (rank2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank2 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank2 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "r") {
        while (file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file1 = newFile;
            }
        }
        while (file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                file2 = newFile;
            }
        }
        while (rank1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank1 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank1 = newRank;
            }
        }
        while (rank2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank2 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                moves.push(move);
                rank2 = newRank;
            }
        }
    }
    return moves;
}

function generatePawnMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "P") {
        if (file == 6) {
            if (boardPos[file - 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                newBoardPos[newFile][rank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                if (boardPos[file - 2][rank] == 0) {
                    let newBoardPos2 = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let newFile2 = file - 2;
                    newBoardPos2[newFile2][rank] = "P";
                    newBoardPos2[file][rank] = 0;
                    let move = "P" + boardRank[rank] + boardFile[file] + boardRank[newFile2] + boardFile[rank];
                    moves.push(move);
                }
            }
            if (boardPos[file - 1][rank - 1] != 0 && boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
            }
            if (boardPos[file - 1][rank + 1] != 0 && boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
            }
        } else {
            if (boardPos[file - 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                newBoardPos[newFile][rank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tR";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (boardPos[file - 1][rank - 1] != 0 && boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tR";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (boardPos[file - 1][rank + 1] != 0 && boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tR";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (file == 3) {
                if (LastMove[0] == "p" && LastMove[1] == boardRank[rank + 1] && LastMove[3] == boardRank[rank + 1] && LastMove[2] - LastMove[4] == 2 && boardFile[file] == LastMove[4]) {
                    let move = "P" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
                if (LastMove[0] == "p" && LastMove[1] == boardRank[rank - 1] && LastMove[3] == boardRank[rank - 1] && LastMove[2] - LastMove[4] == 2 && boardFile[file] == LastMove[4]) {
                    let move = "P" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
            }
        }
    } else if (boardPos[file][rank] == "p") {
        if (file == 1) {
            if (boardPos[file + 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                newBoardPos[newFile][rank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                moves.push(move);
                if (boardPos[file + 2][rank] == 0) {
                    let newBoardPos2 = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let newFile2 = file + 2;
                    newBoardPos2[newFile2][rank] = "p";
                    newBoardPos2[file][rank] = 0;
                    let move = "p" + boardRank[rank] + boardFile[file] + boardRank[newFile2] + boardFile[rank];
                    moves.push(move);
                }
            }
            if (boardPos[file + 1][rank + 1] != 0 && boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
            }
            if (boardPos[file + 1][rank - 1] != 0 && boardPos[file + 1][rank - 1] <= "Z" && file <= 6 && rank >= 1) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                moves.push(move);
            }
        } else {
            if (boardPos[file + 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                newBoardPos[newFile][rank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move1 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tq";
                    let move2 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tn";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tr";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (boardPos[file + 1][rank + 1] != 0 && boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move1 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tq";
                    let move2 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tn";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tr";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (boardPos[file + 1][rank - 1] != 0 && boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move2 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tq";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tn";
                    let move1 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tr";
                    moves.push(move1);
                    moves.push(move2);
                    moves.push(move3);
                    moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                    moves.push(move);
                }
            }
            if (file == 4) {
                if (LastMove[0] == "P" && LastMove[1] == boardRank[rank + 1] && LastMove[3] == boardRank[rank + 1] && LastMove[2] - LastMove[4] == -2 && boardFile[file] == LastMove[4]) {
                    let move = "p" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
                if (LastMove[0] == "P" && LastMove[1] == boardRank[rank - 1] && LastMove[3] == boardRank[rank - 1] && LastMove[2] - LastMove[4] == -2 && boardFile[file] == LastMove[4]) {
                    let move = "p" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
            }
        }
    }
    return moves;
}

function generateKnightMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "N") {
        if (file <= 6 && rank <= 5)
            if (boardPos[file + 1][rank + 2] == 0 || boardPos[file + 1][rank + 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 1 && rank <= 5)
            if (boardPos[file - 1][rank + 2] == 0 || boardPos[file - 1][rank + 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 6 && rank >= 2)
            if (boardPos[file + 1][rank - 2] == 0 || boardPos[file + 1][rank - 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 1 && rank >= 2)
            if (boardPos[file - 1][rank - 2] == 0 || boardPos[file - 1][rank - 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 5 && rank <= 6)
            if (boardPos[file + 2][rank + 1] == 0 || boardPos[file + 2][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank + 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 5 && rank >= 1)
            if (boardPos[file + 2][rank - 1] == 0 || boardPos[file + 2][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank - 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 2 && rank <= 6)
            if (boardPos[file - 2][rank + 1] == 0 || boardPos[file - 2][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank + 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 2 && rank >= 1)
            if (boardPos[file - 2][rank - 1] == 0 || boardPos[file - 2][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank - 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
    } else if (boardPos[file][rank] == "n") {
        if (file <= 6 && rank <= 5)
            if (boardPos[file + 1][rank + 2] == 0 || boardPos[file + 1][rank + 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 1 && rank <= 5)
            if (boardPos[file - 1][rank + 2] == 0 || boardPos[file - 1][rank + 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 6 && rank >= 2)
            if (boardPos[file + 1][rank - 2] == 0 || boardPos[file + 1][rank - 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 1 && rank >= 2)
            if (boardPos[file - 1][rank - 2] == 0 || boardPos[file - 1][rank - 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 5 && rank <= 6)
            if (boardPos[file + 2][rank + 1] == 0 || boardPos[file + 2][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank + 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file <= 5 && rank >= 1)
            if (boardPos[file + 2][rank - 1] == 0 || boardPos[file + 2][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank - 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 2 && rank <= 6)
            if (boardPos[file - 2][rank + 1] == 0 || boardPos[file - 2][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank + 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
        if (file >= 2 && rank >= 1)
            if (boardPos[file - 2][rank - 1] == 0 || boardPos[file - 2][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank - 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                moves.push(move);
            }
    }
    return moves;
}

//#endregion

//#region Generate Valid Moves

function generateValidKingMovesWithoutCastle(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "K") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
    } else if (boardPos[file][rank] == "k") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValidNoCastle(move)) moves.push(move);
            }
        }
    }
    return moves;
}

function generateValidKingMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "K") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
                if (file == 7 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank - 3] = "K";
                    newBoardPos[file][rank - 4] = 0;
                    newBoardPos[file][rank - 1] = "R";
                    if (!isCastlePossible(true) && boardPos[file][rank - 2] == 0 && boardPos[file][rank - 3] == 0 && boardPos[file][rank - 4] == "R" && !isWhiteKingMoved && !isWhiteRookMoved1) {
                        move = "O--O";
                        if (isMoveValid(move)) moves.push(move);
                    }
                }
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "K";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "K" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "K" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
                if (file == 7 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank + 2] = "K";
                    newBoardPos[file][rank + 3] = 0;
                    newBoardPos[file][rank + 1] = "R";
                    if (!isCastlePossible(false) && boardPos[file][rank + 2] == 0 && boardPos[file][rank + 3] == "R" && !isWhiteKingMoved && !isWhiteRookMoved2) {
                        move = "O-O";
                        if (isMoveValid(move)) moves.push(move);
                    }
                }
            }
        }
    } else if (boardPos[file][rank] == "k") {
        if (file <= 6 && rank <= 6) {
            if (boardPos[file + 1][rank + 1] == 0 || boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file <= 6 && rank >= 1) {
            if (boardPos[file + 1][rank - 1] == 0 || boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank <= 6) {
            if (boardPos[file - 1][rank + 1] == 0 || boardPos[file - 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1 && rank >= 1) {
            if (boardPos[file - 1][rank - 1] == 0 || boardPos[file - 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file >= 1) {
            if (boardPos[file - 1][rank] == 0 || boardPos[file - 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (file <= 6) {
            if (boardPos[file + 1][rank] == 0 || boardPos[file + 1][rank] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        }
        if (rank >= 1) {
            if (boardPos[file][rank - 1] == 0 || boardPos[file][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank - 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
                if (file == 0 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank - 3] = "k";
                    newBoardPos[file][rank - 4] = 0;
                    newBoardPos[file][rank - 1] = "r";
                    if (!isCastlePossible(true) && boardPos[file][rank - 2] == 0 && boardPos[file][rank - 3] == 0 && boardPos[file][rank - 4] == "r" && !isBlackKingMoved && !isBlackRookMoved1) {
                        move = "o--o";
                        if (isMoveValid(move)) moves.push(move);
                    }
                }
            }
        }
        if (rank <= 6) {
            if (boardPos[file][rank + 1] == 0 || boardPos[file][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "k";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file][rank + 1] != 0) {
                    move = "k" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "k" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
                if (file == 0 && rank == 4) {
                    let newBoardPos = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let move;
                    newBoardPos[file][rank] = 0;
                    newBoardPos[file][rank + 2] = "k";
                    newBoardPos[file][rank + 3] = 0;
                    newBoardPos[file][rank + 1] = "r";
                    if (!isChecked(false) && boardPos[file][rank + 2] == 0 && boardPos[file][rank + 3] == "r" && !isBlackKingMoved && !isBlackRookMoved2) {
                        move = "o-o";
                        if (isMoveValid(move)) moves.push(move);
                    }
                }
            }
        }
    }
    return moves;
}

function generateValidQueenMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let file3 = file;
    let file4 = file;
    let file5 = file;
    let file6 = file;
    let rank1 = rank;
    let rank2 = rank;
    let rank3 = rank;
    let rank4 = rank;
    let rank5 = rank;
    let rank6 = rank;
    if (boardPos[file][rank] == "Q") {
        while (file5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file5 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file5 = newFile;
            }
        }
        while (file6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file6 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file6 = newFile;
            }
        }
        while (rank5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank5 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank5 = newRank;
            }
        }
        while (rank6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank6 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank6 = newRank;
            }
        }
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "Q";
                    newBoardPos[file][rank] = 0;
                    let move = "Q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "Q";
                newBoardPos[file][rank] = 0;
                let move = "Q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "q") {
        while (file5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file5 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file5 = newFile;
            }
        }
        while (file6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file6 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file6 = newFile;
            }
        }
        while (rank5 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank5 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank5 = newRank;
            }
        }
        while (rank6 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank6 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank6 = newRank;
            }
        }
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "q";
                    newBoardPos[file][rank] = 0;
                    let move = "q" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "q";
                newBoardPos[file][rank] = 0;
                let move = "q" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    }
    return moves;
}

function generateValidBishopMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let file3 = file;
    let file4 = file;
    let rank1 = rank;
    let rank2 = rank;
    let rank3 = rank;
    let rank4 = rank;
    if (boardPos[file][rank] == "B") {
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] >= "a") {
                    newBoardPos[newFile][newRank] = "B";
                    newBoardPos[file][rank] = 0;
                    let move = "B" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "B";
                newBoardPos[file][rank] = 0;
                let move = "B" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "b") {
        while (rank1 >= 1 && file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            let newRank = rank1 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
                rank1 = newRank;
            }
        }
        while (rank2 >= 1 && file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            let newRank = rank2 - 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
                rank2 = newRank;
            }
        }
        while (rank3 <= 6 && file3 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file3 - 1;
            let newRank = rank3 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file3 = newFile;
                rank3 = newRank;
            }
        }
        while (rank4 <= 6 && file4 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file4 + 1;
            let newRank = rank4 + 1;
            if (boardPos[newFile][newRank] != 0) {
                if (boardPos[newFile][newRank] <= "Z") {
                    newBoardPos[newFile][newRank] = "b";
                    newBoardPos[file][rank] = 0;
                    let move = "b" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][newRank] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][newRank] = "b";
                newBoardPos[file][rank] = 0;
                let move = "b" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file4 = newFile;
                rank4 = newRank;
            }
        }
    }
    return moves;
}

function generateValidRookMoves(rank, file, boardPos) {
    let moves = [];
    let file1 = file;
    let file2 = file;
    let rank1 = rank;
    let rank2 = rank;

    if (boardPos[file][rank] == "R") {
        while (file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
            }
        }
        while (file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] >= "a") {
                    newBoardPos[newFile][rank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
            }
        }
        while (rank1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank1 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank1 = newRank;
            }
        }
        while (rank2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank2 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] >= "a") {
                    newBoardPos[file][newRank] = "R";
                    newBoardPos[file][rank] = 0;
                    let move = "R" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "R";
                newBoardPos[file][rank] = 0;
                let move = "R" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank2 = newRank;
            }
        }
    } else if (boardPos[file][rank] == "r") {
        while (file1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file1 - 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file1 = newFile;
            }
        }
        while (file2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newFile = file2 + 1;
            if (boardPos[newFile][rank] != 0) {
                if (newBoardPos[newFile][rank] <= "Z") {
                    newBoardPos[newFile][rank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[newFile][rank] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[newFile][rank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                file2 = newFile;
            }
        }
        while (rank1 >= 1) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank1 - 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank1 = newRank;
            }
        }
        while (rank2 <= 6) {
            let newBoardPos = boardPos.map(function (arr) {
                return arr.slice();
            });
            let newRank = rank2 + 1;
            if (boardPos[file][newRank] != 0) {
                if (newBoardPos[file][newRank] <= "Z") {
                    newBoardPos[file][newRank] = "r";
                    newBoardPos[file][rank] = 0;
                    let move = "r" + boardRank[rank] + boardFile[file] + "x" + boardPos[file][newRank] + boardRank[newRank] + boardFile[file];
                    if (isMoveValid(move)) moves.push(move);
                }
                break;
            } else {
                newBoardPos[file][newRank] = "r";
                newBoardPos[file][rank] = 0;
                let move = "r" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[file];
                if (isMoveValid(move)) moves.push(move);
                rank2 = newRank;
            }
        }
    }
    return moves;
}

function generateValidPawnMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "P") {
        if (file == 6) {
            if (boardPos[file - 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                newBoardPos[newFile][rank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                if (boardPos[file - 2][rank] == 0) {
                    let newBoardPos2 = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let newFile2 = file - 2;
                    newBoardPos2[newFile2][rank] = "P";
                    newBoardPos2[file][rank] = 0;
                    let move = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile2];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file - 1][rank - 1] != 0 && boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
            }
            if (boardPos[file - 1][rank + 1] != 0 && boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
            }
        } else {
            if (boardPos[file - 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                newBoardPos[newFile][rank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tR";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file - 1][rank - 1] != 0 && boardPos[file - 1][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tR";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file - 1][rank + 1] != 0 && boardPos[file - 1][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "P";
                newBoardPos[file][rank] = 0;
                if (newFile == 0) {
                    let move1 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tQ";
                    let move2 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tN";
                    let move3 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tB";
                    let move4 = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tR";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "P" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (file == 3) {
                if (LastMove[0] == "p" && LastMove[1] == boardRank[rank + 1] && LastMove[3] == boardRank[rank + 1] && LastMove[2] - LastMove[4] == 2 && boardFile[file] == LastMove[4]) {
                    let move = "P" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
                if (LastMove[0] == "p" && LastMove[1] == boardRank[rank - 1] && LastMove[3] == boardRank[rank - 1] && LastMove[2] - LastMove[4] == 2 && boardFile[file] == LastMove[4]) {
                    let move = "P" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
            }
        }
    } else if (boardPos[file][rank] == "p") {
        if (file == 1) {
            if (boardPos[file + 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                newBoardPos[newFile][rank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
                if (boardPos[file + 2][rank] == 0) {
                    let newBoardPos2 = boardPos.map(function (arr) {
                        return arr.slice();
                    });
                    let newFile2 = file + 2;
                    newBoardPos2[newFile2][rank] = "p";
                    newBoardPos2[file][rank] = 0;
                    let move = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile2];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file + 1][rank + 1] != 0 && boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
            }
            if (boardPos[file + 1][rank - 1] != 0 && boardPos[file + 1][rank - 1] <= "Z" && file <= 6 && rank >= 1) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                if (isMoveValid(move)) moves.push(move);
            }
        } else {
            if (boardPos[file + 1][rank] == 0) {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                newBoardPos[newFile][rank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move1 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tq";
                    let move2 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tn";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile] + "tr";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + boardRank[rank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file + 1][rank + 1] != 0 && boardPos[file + 1][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move1 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tq";
                    let move2 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tn";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile] + "tr";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 1] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (boardPos[file + 1][rank - 1] != 0 && boardPos[file + 1][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "p";
                newBoardPos[file][rank] = 0;
                if (newFile == 7) {
                    let move2 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tq";
                    let move3 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tn";
                    let move1 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tb";
                    let move4 = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile] + "tr";
                    if (isMoveValid(move1)) moves.push(move1);
                    if (isMoveValid(move2)) moves.push(move2);
                    if (isMoveValid(move3)) moves.push(move3);
                    if (isMoveValid(move4)) moves.push(move4);
                } else {
                    let move = "p" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 1] + boardRank[newRank] + boardFile[newFile];
                    if (isMoveValid(move)) moves.push(move);
                }
            }
            if (file == 4) {
                if (LastMove[0] == "P" && LastMove[1] == boardRank[rank + 1] && LastMove[3] == boardRank[rank + 1] && LastMove[2] - LastMove[4] == -2 && boardFile[file] == LastMove[4]) {
                    let move = "p" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
                if (LastMove[0] == "P" && LastMove[1] == boardRank[rank - 1] && LastMove[3] == boardRank[rank - 1] && LastMove[2] - LastMove[4] == -2 && boardFile[file] == LastMove[4]) {
                    let move = "p" + boardRank[rank] + boardFile[file] + "xp" + LastMove[3] + LastMove[4] + "enp";
                    if (isMoveValid(move)) moves.push(move);
                }
            }
        }
    }
    return moves;
}

function generateValidKnightMoves(rank, file, boardPos) {
    let moves = [];
    if (boardPos[file][rank] == "N") {
        if (file <= 6 && rank <= 5)
            if (boardPos[file + 1][rank + 2] == 0 || boardPos[file + 1][rank + 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 1 && rank <= 5)
            if (boardPos[file - 1][rank + 2] == 0 || boardPos[file - 1][rank + 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 6 && rank >= 2)
            if (boardPos[file + 1][rank - 2] == 0 || boardPos[file + 1][rank - 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 1 && rank >= 2)
            if (boardPos[file - 1][rank - 2] == 0 || boardPos[file - 1][rank - 2] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 2] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 5 && rank <= 6)
            if (boardPos[file + 2][rank + 1] == 0 || boardPos[file + 2][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank + 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 5 && rank >= 1)
            if (boardPos[file + 2][rank - 1] == 0 || boardPos[file + 2][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank - 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 2 && rank <= 6)
            if (boardPos[file - 2][rank + 1] == 0 || boardPos[file - 2][rank + 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank + 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 2 && rank >= 1)
            if (boardPos[file - 2][rank - 1] == 0 || boardPos[file - 2][rank - 1] >= "a") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "N";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank - 1] != 0) {
                    move = "N" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "N" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
    } else if (boardPos[file][rank] == "n") {
        if (file <= 6 && rank <= 5)
            if (boardPos[file + 1][rank + 2] == 0 || boardPos[file + 1][rank + 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank + 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 1 && rank <= 5)
            if (boardPos[file - 1][rank + 2] == 0 || boardPos[file - 1][rank + 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank + 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank + 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank + 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 6 && rank >= 2)
            if (boardPos[file + 1][rank - 2] == 0 || boardPos[file + 1][rank - 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 1][rank - 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 1 && rank >= 2)
            if (boardPos[file - 1][rank - 2] == 0 || boardPos[file - 1][rank - 2] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 1;
                let newRank = rank - 2;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 1][rank - 2] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 1][rank - 2] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 5 && rank <= 6)
            if (boardPos[file + 2][rank + 1] == 0 || boardPos[file + 2][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank + 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file <= 5 && rank >= 1)
            if (boardPos[file + 2][rank - 1] == 0 || boardPos[file + 2][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file + 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file + 2][rank - 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file + 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 2 && rank <= 6)
            if (boardPos[file - 2][rank + 1] == 0 || boardPos[file - 2][rank + 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank + 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank + 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank + 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
        if (file >= 2 && rank >= 1)
            if (boardPos[file - 2][rank - 1] == 0 || boardPos[file - 2][rank - 1] <= "Z") {
                let newBoardPos = boardPos.map(function (arr) {
                    return arr.slice();
                });
                let newFile = file - 2;
                let newRank = rank - 1;
                newBoardPos[newFile][newRank] = "n";
                newBoardPos[file][rank] = 0;
                let move;
                if (boardPos[file - 2][rank - 1] != 0) {
                    move = "n" + boardRank[rank] + boardFile[file] + "x" + boardPos[file - 2][rank - 1] + boardRank[newRank] + boardFile[newFile];
                } else {
                    move = "n" + boardRank[rank] + boardFile[file] + boardRank[newRank] + boardFile[newFile];
                }
                if (isMoveValid(move)) moves.push(move);
            }
    }
    return moves;
}

//#endregion

//#region Generate All Moves

function generateMovesBlack(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "p") {
                let moveList = generatePawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "n") {
                let moveList = generateKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "q") {
                let moveList = generateQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "k") {
                let moveList = generateKingMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "e") {
                let moveList = generateRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "b") {
                let moveList = generateBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateMovesWhite(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "P") {
                let moveList = generatePawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "N") {
                let moveList = generateKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "Q") {
                let moveList = generateQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "K") {
                let moveList = generateKingMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "R") {
                let moveList = generateRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "B") {
                let moveList = generateBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateMovesBlackNoCastle(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "p") {
                let moveList = generatePawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "n") {
                let moveList = generateKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "q") {
                let moveList = generateQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "k") {
                let moveList = generateKingMovesNoCastle(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "e") {
                let moveList = generateRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "b") {
                let moveList = generateBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateMovesWhiteNoCastle(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "P") {
                let moveList = generatePawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "N") {
                let moveList = generateKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "Q") {
                let moveList = generateQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "K") {
                let moveList = generateKingMovesNoCastle(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "R") {
                let moveList = generateRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "B") {
                let moveList = generateBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateValidMovesWhite(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "P") {
                let moveList = generateValidPawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "N") {
                let moveList = generateValidKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "Q") {
                let moveList = generateValidQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "K") {
                let moveList = generateValidKingMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "R") {
                let moveList = generateValidRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "B") {
                let moveList = generateValidBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    // console.log(moves);
    return moves;
}

function generateValidMovesBlack(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "p") {
                let moveList = generateValidPawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "n") {
                let moveList = generateValidKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "q") {
                let moveList = generateValidQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "k") {
                let moveList = generateValidKingMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "e") {
                let moveList = generateValidRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "b") {
                let moveList = generateValidBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateValidMovesWhiteWithoutCastle(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "P") {
                let moveList = generateValidPawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "N") {
                let moveList = generateValidKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "Q") {
                let moveList = generateValidQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "K") {
                let moveList = generateValidKingMovesWithoutCastle(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "R") {
                let moveList = generateValidRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "B") {
                let moveList = generateValidBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

function generateValidMovesBlackWithoutCastle(boardPos) {
    let moves = [];
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            if (boardPos[file][rank] == "p") {
                let moveList = generateValidPawnMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "n") {
                let moveList = generateValidKnightMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "q") {
                let moveList = generateValidQueenMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "k") {
                let moveList = generateValidKingMovesWithoutCastle(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "e") {
                let moveList = generateValidRookMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            } else if (boardPos[file][rank] == "b") {
                let moveList = generateValidBishopMoves(rank, file, boardPos);
                moves = moves.concat(moveList);
            }
        }
    }
    return moves;
}

//#endregion

//#region Move Functions

async function movePiece(move) {
    console.log(move);
    if (move.includes("x") || move.includes("t")) {
        moveCntr = 0;
    } else {
        moveCntr++;
    }
    if (whiteToMove) {
        whiteToMove = false;
    } else {
        whiteToMove = true;
    }
    LastMove = move;
    let fileTo;
    let fileTo2;
    let rankTo;
    let file;
    let rank;
    let tile;
    let tileTo;
    let tileTo2;
    if (move.includes("--")) {
        if (move[0] == "O") {
            boardPosition[7][0] = 0;
            boardPosition[7][2] = "K";
            boardPosition[7][3] = "R";
            boardPosition[7][4] = 0;
            let tile1 = document.getElementById("7_0");
            let tile2 = document.getElementById("7_2");
            let tile3 = document.getElementById("7_3");
            let tile4 = document.getElementById("7_4");
            tile2.classList.add("LightKing");
            tile3.classList.add("LightRook");
            tile1.classList.remove("LightRook");
            tile4.classList.remove("LightKing");
            tile2.setAttribute("piece", "K");
            tile3.setAttribute("piece", "R");
            tile1.removeAttribute("piece");
            tile4.removeAttribute("piece");
        } else {
            boardPosition[0][0] = 0;
            boardPosition[0][2] = "k";
            boardPosition[0][3] = "r";
            boardPosition[0][4] = 0;
            let tile1 = document.getElementById("0_0");
            let tile2 = document.getElementById("0_2");
            let tile3 = document.getElementById("0_3");
            let tile4 = document.getElementById("0_4");
            tile2.classList.add("DarkKing");
            tile3.classList.add("DarkRook");
            tile1.classList.remove("DarkRook");
            tile4.classList.remove("DarkKing");
            tile2.setAttribute("piece", "k");
            tile3.setAttribute("piece", "r");
            tile1.removeAttribute("piece");
            tile4.removeAttribute("piece");
        }
    } else if (move.includes("-")) {
        if (move[0] == "O") {
            boardPosition[7][7] = 0;
            boardPosition[7][6] = "K";
            boardPosition[7][5] = "R";
            boardPosition[7][4] = 0;
            let tile1 = document.getElementById("7_7");
            let tile2 = document.getElementById("7_6");
            let tile3 = document.getElementById("7_5");
            let tile4 = document.getElementById("7_4");
            tile2.classList.add("LightKing");
            tile3.classList.add("LightRook");
            tile1.classList.remove("LightRook");
            tile4.classList.remove("LightKing");
            tile2.setAttribute("piece", "K");
            tile3.setAttribute("piece", "R");
            tile1.removeAttribute("piece");
            tile4.removeAttribute("piece");
        } else {
            boardPosition[0][7] = 0;
            boardPosition[0][6] = "k";
            boardPosition[0][5] = "r";
            boardPosition[0][4] = 0;
            let tile1 = document.getElementById("0_7");
            let tile2 = document.getElementById("0_6");
            let tile3 = document.getElementById("0_5");
            let tile4 = document.getElementById("0_4");
            tile2.classList.add("DarkKing");
            tile3.classList.add("DarkRook");
            tile1.classList.remove("DarkRook");
            tile4.classList.remove("DarkKing");
            tile2.setAttribute("piece", "k");
            tile3.setAttribute("piece", "r");
            tile1.removeAttribute("piece");
            tile4.removeAttribute("piece");
        }
    } else {
        if (move.includes("enp")) {
            if (move[0] == "P") {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1) - 1;
                fileTo2 = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                tileTo2 = document.getElementById(fileTo2 + "_" + rankTo);
                boardPosition[fileTo][rankTo] = "P";
                boardPosition[file][rank] = 0;
                boardPosition[file][rankTo] = 0;
            } else {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1) + 1;
                fileTo2 = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                tileTo2 = document.getElementById(fileTo2 + "_" + rankTo);
                boardPosition[fileTo][rankTo] = "p";
                boardPosition[file][rank] = 0;
                boardPosition[file][rankTo] = 0;
            }
            tileTo2.classList.remove("DarkPawn");
            tileTo2.classList.remove("LightPawn");
            tile.classList.remove("DarkPawn");
            tile.classList.remove("LightPawn");
            if (move[0] == "P") {
                tileTo.classList.add("LightPawn");
            } else {
                tileTo.classList.add("DarkPawn");
            }
        } else if (move.includes("t")) {
            if (move.length == 7) {
                rankTo = move[3].charCodeAt(0) - 65;
                fileTo = 7 - (move[4] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                boardPosition[fileTo][rankTo] = move[move.length - 1];
                boardPosition[file][rank] = 0;
            } else {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                boardPosition[fileTo][rankTo] = move[move.length - 1];
                boardPosition[file][rank] = 0;
            }
            tileTo.classList.remove("DarkRook");
            tileTo.classList.remove("DarkKnight");
            tileTo.classList.remove("DarkBishop");
            tileTo.classList.remove("DarkQueen");
            tileTo.classList.remove("DarkKing");
            tileTo.classList.remove("DarkPawn");
            tileTo.classList.remove("LightRook");
            tileTo.classList.remove("LightKnight");
            tileTo.classList.remove("LightBishop");
            tileTo.classList.remove("LightQueen");
            tileTo.classList.remove("LightKing");
            tileTo.classList.remove("LightPawn");
            if (move[move.length - 1] == "r") {
                tileTo.classList.add("DarkRook");
                tileTo.setAttribute("piece", "r");
                tile.classList.remove("DarkPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "n") {
                tileTo.classList.add("DarkKnight");
                tileTo.setAttribute("piece", "n");
                tile.classList.remove("DarkPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "b") {
                tileTo.classList.add("DarkBishop");
                tileTo.setAttribute("piece", "b");
                tile.classList.remove("DarkPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "q") {
                tileTo.classList.add("DarkQueen");
                tileTo.setAttribute("piece", "q");
                tile.classList.remove("DarkPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "R") {
                tileTo.classList.add("LightRook");
                tileTo.setAttribute("piece", "R");
                tile.classList.remove("LightPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "N") {
                tileTo.classList.add("LightKnight");
                tileTo.setAttribute("piece", "N");
                tile.classList.remove("LightPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "B") {
                tileTo.classList.add("LightBishop");
                tileTo.setAttribute("piece", "B");
                tile.classList.remove("LightPawn");
                tile.removeAttribute("piece");
            } else if (move[move.length - 1] == "Q") {
                tileTo.classList.add("LightQueen");
                tileTo.setAttribute("piece", "Q");
                tile.classList.remove("LightPawn");
                tile.removeAttribute("piece");
            }
        } else {
            if (move.length == 5) {
                rankTo = move[3].charCodeAt(0) - 65;
                fileTo = 7 - (move[4] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                boardPosition[fileTo][rankTo] = move[0];
                boardPosition[file][rank] = 0;
            } else {
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1);
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                tile = document.getElementById(file + "_" + rank);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
                boardPosition[fileTo][rankTo] = move[0];
                boardPosition[file][rank] = 0;
            }
            tileTo.classList.remove("DarkRook");
            tileTo.classList.remove("DarkKnight");
            tileTo.classList.remove("DarkBishop");
            tileTo.classList.remove("DarkQueen");
            tileTo.classList.remove("DarkKing");
            tileTo.classList.remove("DarkPawn");
            tileTo.classList.remove("LightRook");
            tileTo.classList.remove("LightKnight");
            tileTo.classList.remove("LightBishop");
            tileTo.classList.remove("LightQueen");
            tileTo.classList.remove("LightKing");
            tileTo.classList.remove("LightPawn");
            if (move[0] == "r") {
                tileTo.classList.add("DarkRook");
                tileTo.setAttribute("piece", "r");
                tile.classList.remove("DarkRook");
                tile.removeAttribute("piece");
            } else if (move[0] == "n") {
                tileTo.classList.add("DarkKnight");
                tileTo.setAttribute("piece", "n");
                tile.classList.remove("DarkKnight");
                tile.removeAttribute("piece");
            } else if (move[0] == "b") {
                tileTo.classList.add("DarkBishop");
                tileTo.setAttribute("piece", "b");
                tile.classList.remove("DarkBishop");
                tile.removeAttribute("piece");
            } else if (move[0] == "q") {
                tileTo.classList.add("DarkQueen");
                tileTo.setAttribute("piece", "q");
                tile.classList.remove("DarkQueen");
                tile.removeAttribute("piece");
            } else if (move[0] == "k") {
                tileTo.classList.add("DarkKing");
                tileTo.setAttribute("piece", "k");
                tile.classList.remove("DarkKing");
                tile.removeAttribute("piece");
            } else if (move[0] == "p") {
                tileTo.classList.add("DarkPawn");
                tileTo.setAttribute("piece", "p");
                tile.classList.remove("DarkPawn");
                tile.removeAttribute("piece");
            } else if (move[0] == "R") {
                tileTo.classList.add("LightRook");
                tileTo.setAttribute("piece", "R");
                tile.classList.remove("LightRook");
                tile.removeAttribute("piece");
            } else if (move[0] == "N") {
                tileTo.classList.add("LightKnight");
                tileTo.setAttribute("piece", "N");
                tile.classList.remove("LightKnight");
                tile.removeAttribute("piece");
            } else if (move[0] == "B") {
                tileTo.classList.add("LightBishop");
                tileTo.setAttribute("piece", "B");
                tile.classList.remove("LightBishop");
                tile.removeAttribute("piece");
            } else if (move[0] == "Q") {
                tileTo.classList.add("LightQueen");
                tileTo.setAttribute("piece", "Q");
                tile.classList.remove("LightQueen");
                tile.removeAttribute("piece");
            } else if (move[0] == "K") {
                tileTo.classList.add("LightKing");
                tileTo.setAttribute("piece", "K");
                tile.classList.remove("LightKing");
                tile.removeAttribute("piece");
            } else if (move[0] == "P") {
                tileTo.classList.add("LightPawn");
                tileTo.setAttribute("piece", "P");
                tile.classList.remove("LightPawn");
                tile.removeAttribute("piece");
            }
        }
    }
    // if (!whiteToMove) {
    await sleep(200);
    console.log(moveCntr);
    let nextMove = bestMove(boardPosition);
    // console.log(whiteToMove);

    if (isPlayable(boardPosition)) {
        if (nextMove) movePiece(nextMove);
    } else {
        console.log("DRAW");
    }
    // }
    removeEventListener();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function moveListClicked(e) {
    if (e.button == 0) {
        let move = this.getAttribute("value");
        // console.log(move);
        // if (move.includes("enp")) {
        //     if (move[0] == "P") {
        //         rankTo = move[5].charCodeAt(0) - 65;
        //         fileTo = 7 - (move[6] - "0" - 1) - 1;
        //         rank = move[1].charCodeAt(0) - 65;
        //         file = 7 - (move[2] - "0" - 1);
        //         tile = document.getElementById(file + "_" + rank);
        //         tileTo = document.getElementById(fileTo + "_" + rankTo);
        //     } else {
        //         rankTo = move[5].charCodeAt(0) - 65;
        //         fileTo = 7 - (move[6] - "0" - 1) + 1;
        //         rank = move[1].charCodeAt(0) - 65;
        //         file = 7 - (move[2] - "0" - 1);
        //         tile = document.getElementById(file + "_" + rank);
        //         tileTo = document.getElementById(fileTo + "_" + rankTo);
        //     }
        // } else
        if (move.includes("t")) {
            let rank, file, fileTo, rankTo, tileTo;
            if (move.length == 7) {
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                rankTo = move[3].charCodeAt(0) - 65;
                fileTo = 7 - (move[4] - "0" - 1);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
            } else {
                rank = move[1].charCodeAt(0) - 65;
                file = 7 - (move[2] - "0" - 1);
                rankTo = move[5].charCodeAt(0) - 65;
                fileTo = 7 - (move[6] - "0" - 1);
                tileTo = document.getElementById(fileTo + "_" + rankTo);
            }
            if (fileTo == 0) {
                let menu = document.createElement("div");
                let btnQueen = document.createElement("div");
                btnQueen.classList.add("LightQueenMenu");
                btnQueen.style.width = "100px";
                btnQueen.style.height = "100px";
                btnQueen.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "Q";
                        movePiece(mv);
                    }
                });
                let btnKnight = document.createElement("div");
                btnKnight.classList.add("LightKnightMenu");
                btnKnight.style.width = "100px";
                btnKnight.style.height = "100px";
                btnKnight.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "N";
                        movePiece(mv);
                    }
                });
                let btnBishop = document.createElement("div");
                btnBishop.classList.add("LightBishopMenu");
                btnBishop.style.width = "100px";
                btnBishop.style.height = "100px";
                btnBishop.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "B";
                        movePiece(mv);
                    }
                });
                let btnRook = document.createElement("div");
                btnRook.classList.add("LightRookMenu");
                btnRook.style.width = "100px";
                btnRook.style.height = "100px";
                btnRook.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "R";
                        movePiece(mv);
                    }
                });
                let btnClose = document.createElement("div");
                btnClose.style.width = "100px";
                btnClose.style.height = "50px";
                btnClose.style.display = "flex";
                btnClose.style.background = "#fff";
                btnClose.style.fontSize = "30px";
                btnClose.style.justifyContent = "center";
                btnClose.style.alignItems = "center";
                btnClose.style.cursor = "pointer";
                btnClose.innerHTML = "&#10006;";
                btnClose.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        while (tileTo.hasChildNodes()) {
                            tileTo.removeChild(tileTo.children[0]);
                        }
                    }
                });
                menu.style.width = "100px";
                menu.style.height = "450px";
                menu.style.display = "flex";
                menu.style.flexWrap = "wrap";
                menu.style.justifyContent = "center";
                menu.style.background = "#fff";
                menu.style.position = "absolute";
                menu.style.zIndex = "1";
                menu.style.top = "0";
                menu.appendChild(btnQueen);
                menu.appendChild(btnKnight);
                menu.appendChild(btnRook);
                menu.appendChild(btnBishop);
                menu.appendChild(btnClose);
                tileTo.appendChild(menu);
            } else if (fileTo == 7) {
                let menu = document.createElement("div");
                let btnQueen = document.createElement("div");
                btnQueen.classList.add("DarkQueenMenu");
                btnQueen.style.width = "100px";
                btnQueen.style.height = "100px";
                btnQueen.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "q";
                        movePiece(mv);
                    }
                });
                let btnKnight = document.createElement("div");
                btnKnight.classList.add("DarkKnightMenu");
                btnKnight.style.width = "100px";
                btnKnight.style.height = "100px";
                btnKnight.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "n";
                        movePiece(mv);
                    }
                });
                let btnBishop = document.createElement("div");
                btnBishop.classList.add("DarkBishopMenu");
                btnBishop.style.width = "100px";
                btnBishop.style.height = "100px";
                btnBishop.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "b";
                        movePiece(mv);
                    }
                });
                let btnRook = document.createElement("div");
                btnRook.classList.add("DarkRookMenu");
                btnRook.style.width = "100px";
                btnRook.style.height = "100px";
                btnRook.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        let mv = move.substring(0, move.length - 1) + "r";
                        movePiece(mv);
                    }
                });
                let btnClose = document.createElement("div");
                btnClose.style.width = "100px";
                btnClose.style.height = "50px";
                btnClose.style.display = "flex";
                btnClose.style.background = "#fff";
                btnClose.style.fontSize = "30px";
                btnClose.style.justifyContent = "center";
                btnClose.style.alignItems = "center";
                btnClose.style.cursor = "pointer";
                btnClose.innerHTML = "&#10006;";
                btnClose.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        while (tileTo.hasChildNodes()) {
                            tileTo.removeChild(tileTo.children[0]);
                        }
                    }
                });
                menu.style.width = "100px";
                menu.style.height = "450px";
                menu.style.display = "flex";
                menu.style.flexWrap = "wrap";
                menu.style.justifyContent = "center";
                menu.style.background = "#fff";
                menu.style.position = "absolute";
                menu.style.zIndex = "1";
                menu.style.bottom = "0";
                menu.appendChild(btnClose);
                menu.appendChild(btnBishop);
                menu.appendChild(btnRook);
                menu.appendChild(btnKnight);
                menu.appendChild(btnQueen);
                tileTo.appendChild(menu);
            }
        } else {
            movePiece(move);
        }
        if (LastMove[0] == "K") {
            isWhiteKingMoved = true;
        }
        if (LastMove[0] == "R" && LastMove[2] == "1") {
            isWhiteRookMoved1 = true;
        }
        if (LastMove[0] == "R" && LastMove[2] == "8") {
            isWhiteRookMoved2 = true;
        }
        if (LastMove[0] == "k") {
            isBlackKingMoved = true;
        }
        if (LastMove[0] == "r" && LastMove[2] == "1") {
            isBlackRookMoved1 = true;
        }
        if (LastMove[0] == "r" && LastMove[2] == "8") {
            isBlackRookMoved2 = true;
        }
        if (LastMove[0] == "O") {
            isWhiteKingMoved = true;
        }
        if (LastMove[0] == "0") {
            isBlackKingMoved = true;
        }
        // console.log(LastMove);
        // console.log(isChecked());
        // console.log(isCheckMated());
        // console.log(boardPosition);
        // calculateBoardValue();
    }
}

function showMoveList(moveList) {
    moveList.forEach((move) => {
        let file;
        let rank;
        let tile;
        if (move.includes("--")) {
            if (move[0] == "O") {
                let tile = document.getElementById("7_2");
                tile.classList.add("moveList");
                tile.setAttribute("value", move);
                tile.addEventListener("mousedown", moveListClicked);
            } else {
                let tile = document.getElementById("0_2");
                tile.classList.add("moveList");
                tile.setAttribute("value", move);
                tile.addEventListener("mousedown", moveListClicked);
            }
        } else if (move.includes("-")) {
            if (move[0] == "O") {
                let tile = document.getElementById("7_6");
                tile.classList.add("moveList");
                tile.setAttribute("value", move);
                tile.addEventListener("mousedown", moveListClicked);
            } else {
                let tile = document.getElementById("0_6");
                tile.classList.add("moveList");
                tile.setAttribute("value", move);
                tile.addEventListener("mousedown", moveListClicked);
            }
        } else {
            if (move.includes("enp")) {
                if (move[0] == "P") {
                    rank = move[5].charCodeAt(0) - 65;
                    file = 7 - (move[6] - "0" - 1) - 1;
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveList");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                } else {
                    rank = move[5].charCodeAt(0) - 65;
                    file = 7 - (move[6] - "0" - 1) + 1;
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveList");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                }
            } else if (!move.includes("t")) {
                if (move.length == 5) {
                    rank = move[3].charCodeAt(0) - 65;
                    file = 7 - (move[4] - "0" - 1);
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveList");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                } else {
                    rank = move[5].charCodeAt(0) - 65;
                    file = 7 - (move[6] - "0" - 1);
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveListCapture");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                }
            } else {
                if (move.length == 7) {
                    rank = move[3].charCodeAt(0) - 65;
                    file = 7 - (move[4] - "0" - 1);
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveList");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                } else {
                    rank = move[5].charCodeAt(0) - 65;
                    file = 7 - (move[6] - "0" - 1);
                    tile = document.getElementById(file + "_" + rank);
                    tile.classList.add("moveListCapture");
                    tile.setAttribute("value", move);
                    tile.addEventListener("mousedown", moveListClicked);
                }
            }
        }
    });
}

function removeMoveList() {
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            tile = document.getElementById(file + "_" + rank);
            tile.classList.remove("moveList");
            tile.classList.remove("moveListCapture");
            tile.classList.remove("whiteClicked");
            tile.classList.remove("darkClicked");
            tile.classList.remove("clicked");
            while (tile.hasChildNodes()) {
                tile.removeChild(tile.children[0]);
            }
        }
    }
}

function removeEventListener() {
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            tile = document.getElementById(file + "_" + rank);
            tile.removeEventListener("mousedown", moveListClicked);
            tile.removeAttribute("value");
        }
    }
}

function showAvailableMoves() {
    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            const tile = document.getElementById(file + "_" + rank);
            // console.log(file, rank, tile, boardRank[rank], boardFile[file]);
            tile.addEventListener("mousedown", function (e) {
                if (e.button == 0) {
                    if (tile.classList.contains("clicked")) {
                        tile.classList.remove("clicked");
                        removeMoveList();
                        removeEventListener();
                    } else {
                        if (whiteToMove) {
                            if (tile.getAttribute("piece") == "P") {
                                let moveList = generateValidPawnMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "N") {
                                let moveList = generateValidKnightMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "Q") {
                                let moveList = generateValidQueenMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "K") {
                                let moveList = generateValidKingMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "R") {
                                let moveList = generateValidRookMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "B") {
                                let moveList = generateValidBishopMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (!tile.classList.contains("moveList") && !tile.classList.contains("moveListCapture")) {
                                removeMoveList();
                                removeEventListener();
                            } else {
                                removeMoveList();
                            }
                            if (tile.getAttribute("piece")) {
                                if (tile.getAttribute("color") == "light") {
                                    tile.classList.add("whiteClicked");
                                } else {
                                    tile.classList.add("darkClicked");
                                }
                                tile.classList.add("clicked");
                            }
                        } else {
                            if (tile.getAttribute("piece") == "p") {
                                let moveList = generateValidPawnMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "n") {
                                let moveList = generateValidKnightMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "q") {
                                let moveList = generateValidQueenMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "k") {
                                let moveList = generateValidKingMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "r") {
                                let moveList = generateValidRookMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (tile.getAttribute("piece") == "b") {
                                let moveList = generateValidBishopMoves(rank, file, boardPosition);
                                removeMoveList();
                                removeEventListener();
                                showMoveList(moveList);
                            } else if (!tile.classList.contains("moveList") && !tile.classList.contains("moveListCapture")) {
                                removeMoveList();
                                removeEventListener();
                            } else {
                                removeMoveList();
                            }
                        }
                        if (tile.getAttribute("piece")) {
                            if (tile.getAttribute("color") == "light") {
                                tile.classList.add("whiteClicked");
                            } else {
                                tile.classList.add("darkClicked");
                            }
                            tile.classList.add("clicked");
                        }
                    }
                }
            });
        }
    }
}

//#endregion

createBoard();
// generatePieces("r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1");
// generatePieces("r1b1k1nr/p2p1pNp/n4n2/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 b");
// generatePieces("r3k2r/8/8/8/8/8/8/R3K2R");
// generatePieces("2b5/3P4/8/7k/K7/8/4p3/8 w");
generatePieces(defaultFEN);
showAvailableMoves();
