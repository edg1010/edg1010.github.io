var lightColor = "#EEEED2";
var darkColor = "#769656";
var defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var container = document.getElementById("container");
var boardPosition = [];
var whiteToMove = true;
var nextMoves = [];
var isWhiteRookMoved1 = false;
var isWhiteRookMoved2 = false;
var isWhiteKingMoved = false;
var isBlackRookMoved1 = false;
var isBlackRookMoved2 = false;
var isBlackKingMoved = false;
var moveCntr = 0;
var attackedPosition = [];
let WhiteKingPos;
let BlackKingPos;
let pieceCount = 0;
var playAsW = false;
var playAsB = false;

const None = 0;
const Pawn = 1;
const Knight = 2;
const Bishop = 3;
const Rook = 4;
const Queen = 5;
const King = 6;

const White = 8;
const Black = 16;

class Move {
    constructor(piece, pos, posTo, attPiece, isCastle, castleType, isPromoted, promotedTo, isEnp, enpTo) {
        this.piece = piece;
        this.pos = pos;
        this.posTo = posTo;
        this.attPiece = attPiece;
        this.isCastle = isCastle;
        this.isPromoted = isPromoted;
        this.castleType = castleType;
        this.promotedTo = promotedTo;
        this.isEnp = isEnp;
        this.enpTo = enpTo;
        this.moveScoreGuess = 0;
    }
}
class Piece {
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.isMoved = false;
    }
}
var lastMove = new Move(new Piece(None, None), 0, 0, 0, false, null, false, null, false, null);

function createBoard() {
    var board = document.createElement("div");
    board.style.width = "600px";
    board.style.height = "600px";
    board.style.display = "flex";
    board.style.margin = "0 auto";
    board.style.flexWrap = "wrap";

    let pos = 56;

    for (let file = 0; file < 8; file++) {
        for (let rank = 0; rank < 8; rank++) {
            var tile = document.createElement("div");
            tile.setAttribute("id", pos);
            tile.style.width = "75px";
            tile.style.height = "75px";
            tile.style.display = "flex";
            tile.style.justifyContent = "center";
            tile.style.alignItems = "center";
            tile.style.position = "relative";
            var isLight = (file + rank) % 2 == 0;

            if (isLight) {
                tile.style.background = lightColor;
                tile.setAttribute("tileColor", "light");
            } else {
                tile.style.background = darkColor;
                tile.setAttribute("tileColor", "dark");
            }
            board.appendChild(tile);
            pos += 1;
            boardPosition.push(new Piece(None, None));
            attackedPosition.push(None);
        }
        pos -= 16;
    }
    container.appendChild(board);
}

function getAttackedPosition(boardPos, color) {
    let newAttPos = attackedPosition.slice();
    for (let i = 0; i < 64; i++) {
        let pos = i;
        if (boardPos[pos].color == color) {
            if (boardPos[i].type == King) {
                if (pos <= 55) {
                    let pos1 = pos + 8;
                    if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                }
                if (pos >= 8) {
                    let pos1 = pos - 8;
                    if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                }
                if (diff(fileAt(pos), fileAt(pos - 1)) == 0) {
                    let pos1 = pos - 1;
                    if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                }
                if (diff(fileAt(pos), fileAt(pos + 1)) == 0) {
                    let pos1 = pos + 1;
                    if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                }
                if (pos <= 56) {
                    if (diff(fileAt(pos), fileAt(pos + 7)) == 1) {
                        let pos1 = pos + 7;
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                    }
                }
                if (pos <= 54) {
                    if (diff(fileAt(pos), fileAt(pos + 9)) == 1) {
                        let pos1 = pos + 9;
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                    }
                }
                if (pos >= 7) {
                    if (diff(fileAt(pos), fileAt(pos - 7)) == 1) {
                        let pos1 = pos - 7;
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                    }
                }
                if (pos >= 9) {
                    if (diff(fileAt(pos), fileAt(pos - 9)) == 1) {
                        let pos1 = pos - 9;
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = King;
                    }
                }
            }
            if (boardPos[i].type == Queen) {
                let pos1 = pos;
                let pos2 = pos;
                let pos3 = pos;
                let pos4 = pos;
                let pos5 = pos;
                let pos6 = pos;
                let pos7 = pos;
                let pos8 = pos;
                while (pos1 <= 56) {
                    pos1 += 7;
                    if (diff(fileAt(pos1 - 7), fileAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Queen;
                        if (boardPos[pos1].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos2 <= 54) {
                    pos2 += 9;
                    if (diff(fileAt(pos2 - 9), fileAt(pos2)) == 1) {
                        if (newAttPos[pos2] != Pawn) newAttPos[pos2] = Queen;
                        if (boardPos[pos2].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos3 >= 7) {
                    pos3 -= 7;
                    if (diff(fileAt(pos3 + 7), fileAt(pos3)) == 1) {
                        if (newAttPos[pos3] != Pawn) newAttPos[pos3] = Queen;
                        if (boardPos[pos3].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos4 >= 9) {
                    pos4 -= 9;
                    if (diff(fileAt(pos4 + 9), fileAt(pos4)) == 1) {
                        if (newAttPos[pos4] != Pawn) newAttPos[pos4] = Queen;
                        if (boardPos[pos4].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos5 <= 55) {
                    pos5 += 8;
                    if (newAttPos[pos5] != Pawn) newAttPos[pos5] = Queen;
                    if (boardPos[pos5].type != None) {
                        break;
                    }
                }
                while (pos6 >= 8) {
                    pos6 -= 8;
                    if (newAttPos[pos6] != Pawn) newAttPos[pos6] = Queen;
                    if (boardPos[pos6].type != None) {
                        break;
                    }
                }
                while (diff(fileAt(pos), fileAt(pos7 - 1)) == 0) {
                    pos7 -= 1;
                    if (newAttPos[pos7] != Pawn) newAttPos[pos7] = Queen;
                    if (boardPos[pos7].type != None) {
                        break;
                    }
                }
                while (diff(fileAt(pos), fileAt(pos8 + 1)) == 0) {
                    pos8 += 1;
                    if (newAttPos[pos8] != Pawn) newAttPos[pos8] = Queen;
                    if (boardPos[pos8].type != None) {
                        break;
                    }
                }
            }
            if (boardPos[i].type == Bishop) {
                let pos1 = pos;
                let pos2 = pos;
                let pos3 = pos;
                let pos4 = pos;
                while (pos1 <= 56) {
                    pos1 += 7;
                    if (diff(fileAt(pos1 - 7), fileAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Bishop;
                        if (boardPos[pos1].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos2 <= 54) {
                    pos2 += 9;
                    if (diff(fileAt(pos2 - 9), fileAt(pos2)) == 1) {
                        if (newAttPos[pos2] != Pawn) newAttPos[pos2] = Bishop;
                        if (boardPos[pos2].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos3 >= 7) {
                    pos3 -= 7;
                    if (diff(fileAt(pos3 + 7), fileAt(pos3)) == 1) {
                        if (newAttPos[pos3] != Pawn) newAttPos[pos3] = Bishop;
                        if (boardPos[pos3].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                while (pos4 >= 9) {
                    pos4 -= 9;
                    if (diff(fileAt(pos4 + 9), fileAt(pos4)) == 1) {
                        if (newAttPos[pos4] != Pawn) newAttPos[pos4] = Bishop;
                        if (boardPos[pos4].type != None) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            if (boardPos[i].type == Rook) {
                let pos5 = pos;
                let pos6 = pos;
                let pos7 = pos;
                let pos8 = pos;
                while (pos5 <= 55) {
                    pos5 += 8;
                    if (newAttPos[pos5] != Pawn) newAttPos[pos5] = Rook;
                    if (boardPos[pos5].type != None) {
                        break;
                    }
                }
                while (pos6 >= 8) {
                    pos6 -= 8;
                    if (newAttPos[pos6] != Pawn) newAttPos[pos6] = Rook;
                    if (boardPos[pos6].type != None) {
                        break;
                    }
                }
                while (diff(fileAt(pos), fileAt(pos7 - 1)) == 0) {
                    pos7 -= 1;
                    if (newAttPos[pos7] != Pawn) newAttPos[pos7] = Rook;
                    if (boardPos[pos7].type != None) {
                        break;
                    }
                }
                while (diff(fileAt(pos), fileAt(pos8 + 1)) == 0) {
                    pos8 += 1;
                    if (newAttPos[pos8] != Pawn) newAttPos[pos8] = Rook;
                    if (boardPos[pos8].type != None) {
                        break;
                    }
                }
            }
            if (boardPos[i].type == Knight) {
                if (pos <= 63 - 15) {
                    let pos1 = pos + 15;
                    if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos <= 63 - 17) {
                    let pos1 = pos + 17;
                    if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos <= 63 - 6) {
                    let pos1 = pos + 6;
                    if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos <= 63 - 10) {
                    let pos1 = pos + 10;
                    if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos >= 0 + 15) {
                    let pos1 = pos - 15;
                    if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos >= 0 + 17) {
                    let pos1 = pos - 17;
                    if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos >= 0 + 6) {
                    let pos1 = pos - 6;
                    if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
                if (pos >= 0 + 10) {
                    let pos1 = pos - 10;
                    if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                        if (newAttPos[pos1] != Pawn) newAttPos[pos1] = Knight;
                    }
                }
            }
            if (boardPos[i].type == Pawn) {
                if (boardPos[i].color == White) {
                    if (pos + 7 <= 63) {
                        if (diff(rankAt(pos), rankAt(pos + 7)) == 1) {
                            newAttPos[pos + 7] = Pawn;
                        }
                    }
                    if (pos + 9 <= 63) {
                        if (diff(rankAt(pos), rankAt(pos + 9)) == 1) {
                            newAttPos[pos + 9] = Pawn;
                        }
                    }
                } else if (boardPos[i].color == Black) {
                    if (pos - 7 >= 0) {
                        if (diff(rankAt(pos), rankAt(pos - 7)) == 1) {
                            newAttPos[pos - 7] = Pawn;
                        }
                    }
                    if (pos - 9 >= 0) {
                        if (diff(rankAt(pos), rankAt(pos - 9)) == 1) {
                            newAttPos[pos - 9] = Pawn;
                        }
                    }
                }
            }
        }
    }
    return newAttPos;
}

function showAttackedPosition(attPos) {
    for (let i = 0; i < 64; i++) {
        let tileTo = document.getElementById(i);
        if (attPos[i] != None) {
            tileTo.classList.add("BGRED");
        } else {
            tileTo.classList.remove("BGRED");
        }
    }
}

function isMoveValidForCastle(move, WKPos, BKPos, Bpos) {
    let kingPos;
    let color;
    if (move.piece.color == White) {
        kingPos = WKPos;
        color = Black;
    } else {
        kingPos = BKPos;
        color = White;
    }
    let attPos = getAttackedPosition(Bpos, color);
    if (isChecked(kingPos, attPos)) {
        return false;
    } else {
        return isMoveValid(move, WKPos, BKPos, Bpos);
    }
}

function isMoveValid(move, WKPos, BKPos, Bpos) {
    let boardPos = moveToBoard(move, Bpos);
    // console.log(boardPos[59]);
    if (move.piece.type == King) {
        if (move.piece.color == Black) {
            BKPos = move.posTo;
        } else {
            WKPos = move.posTo;
        }
    }
    let color;
    let kingPos;
    if (move.piece.color == White) {
        color = Black;
        kingPos = WKPos;
    } else {
        color = White;
        kingPos = BKPos;
    }
    let attPos = getAttackedPosition(boardPos, color);
    // console.log(boardPos);
    if (isChecked(kingPos, attPos)) {
        return false;
    } else {
        return true;
    }
}

function isChecked(kingPos, attPos) {
    if (attPos[kingPos] != None) {
        return true;
    }
    return false;
}

function moveToBoard(move, boardPos) {
    let newBoardPos = JSON.parse(JSON.stringify(boardPos));
    if (!move.isCastle && !move.isPromoted && !move.isEnp) {
        newBoardPos[move.pos] = new Piece(None, None);
        newBoardPos[move.posTo] = move.piece;
    } else if (move.isEnp) {
        newBoardPos[move.pos] = new Piece(None, None);
        newBoardPos[move.posTo] = move.piece;
        newBoardPos[move.enpTo] = new Piece(None, None);
    } else if (move.isCastle) {
        if (move.castleType == "l") {
            newBoardPos[move.pos] = new Piece(None, None);
            newBoardPos[move.posTo] = move.piece;
            newBoardPos[move.posTo + 1] = newBoardPos[move.posTo - 2];
            newBoardPos[move.posTo - 2] = new Piece(None, None);
        } else if (move.castleType == "s") {
            newBoardPos[move.pos] = new Piece(None, None);
            newBoardPos[move.posTo] = move.piece;
            newBoardPos[move.posTo - 1] = newBoardPos[move.posTo + 1];
            newBoardPos[move.posTo + 1] = new Piece(None, None);
        }
    } else if (move.isPromoted == true) {
        newBoardPos[move.pos] = new Piece(None, None);
        newBoardPos[move.posTo] = move.promotedTo;
    }

    return newBoardPos;
}

function fileAt(pos) {
    if (pos >= 0 && pos <= 7) {
        return 1;
    } else if (pos >= 8 && pos <= 15) {
        return 2;
    } else if (pos >= 16 && pos <= 23) {
        return 3;
    } else if (pos >= 24 && pos <= 31) {
        return 4;
    } else if (pos >= 32 && pos <= 39) {
        return 5;
    } else if (pos >= 40 && pos <= 47) {
        return 6;
    } else if (pos >= 48 && pos <= 55) {
        return 7;
    } else if (pos >= 56 && pos <= 63) {
        return 8;
    }
}

function rankAt(pos) {
    return (pos % 8) + 1;
}

function diff(a, b) {
    return Math.abs(a - b);
}

function showPiece(boardPos) {
    for (let i = 0; i < boardPos.length; i++) {
        const pos = document.getElementById(i);
        pos.classList.remove("WhiteKing");
        pos.classList.remove("WhiteQueen");
        pos.classList.remove("WhiteRook");
        pos.classList.remove("WhiteKnight");
        pos.classList.remove("WhiteBishop");
        pos.classList.remove("WhitePawn");
        pos.classList.remove("BlackKing");
        pos.classList.remove("BlackQueen");
        pos.classList.remove("BlackRook");
        pos.classList.remove("BlackKnight");
        pos.classList.remove("BlackBishop");
        pos.classList.remove("BlackPawn");
        pos.removeAttribute("color");
        pos.removeAttribute("type");
        if (boardPos[i].color == White) {
            if (boardPos[i].type == King) {
                pos.classList.add("WhiteKing");
            } else if (boardPos[i].type == Queen) {
                pos.classList.add("WhiteQueen");
            } else if (boardPos[i].type == Rook) {
                pos.classList.add("WhiteRook");
            } else if (boardPos[i].type == Knight) {
                pos.classList.add("WhiteKnight");
            } else if (boardPos[i].type == Bishop) {
                pos.classList.add("WhiteBishop");
            } else if (boardPos[i].type == Pawn) {
                pos.classList.add("WhitePawn");
            }
        } else if (boardPos[i].color == Black) {
            if (boardPos[i].type == King) {
                pos.classList.add("BlackKing");
            } else if (boardPos[i].type == Queen) {
                pos.classList.add("BlackQueen");
            } else if (boardPos[i].type == Rook) {
                pos.classList.add("BlackRook");
            } else if (boardPos[i].type == Knight) {
                pos.classList.add("BlackKnight");
            } else if (boardPos[i].type == Bishop) {
                pos.classList.add("BlackBishop");
            } else if (boardPos[i].type == Pawn) {
                pos.classList.add("BlackPawn");
            }
        }
        pos.setAttribute("color", boardPos[i].color);
        pos.setAttribute("type", boardPos[i].type);
    }
}

function generatePieces(FEN) {
    let pos = 56;
    let flag = 0;
    for (i = 0; i < FEN.length; i++) {
        if (flag == 0) {
            if (FEN[i] == "K") {
                boardPosition[pos] = new Piece(White, King);
                WhiteKingPos = pos;
                pos++;
                pieceCount++;
            } else if (FEN[i] == "Q") {
                boardPosition[pos] = new Piece(White, Queen);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "R") {
                boardPosition[pos] = new Piece(White, Rook);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "N") {
                boardPosition[pos] = new Piece(White, Knight);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "B") {
                boardPosition[pos] = new Piece(White, Bishop);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "P") {
                boardPosition[pos] = new Piece(White, Pawn);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "k") {
                boardPosition[pos] = new Piece(Black, King);
                BlackKingPos = pos;
                pos++;
                pieceCount++;
            } else if (FEN[i] == "q") {
                boardPosition[pos] = new Piece(Black, Queen);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "r") {
                boardPosition[pos] = new Piece(Black, Rook);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "n") {
                boardPosition[pos] = new Piece(Black, Knight);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "b") {
                boardPosition[pos] = new Piece(Black, Bishop);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "p") {
                boardPosition[pos] = new Piece(Black, Pawn);
                pos++;
                pieceCount++;
            } else if (FEN[i] == "/") {
                pos -= 16;
            } else if (FEN[i] == " ") {
                flag = 1;
            } else {
                pos += FEN[i] - "0";
            }
        } else if (flag == 1) {
            if (FEN[i] == "w") {
                whiteToMove = true;
            } else if (FEN[i] == "b") {
                whiteToMove = false;
            } else if (FEN[i] == " ") {
                flag = 2;
            }
        }
    }
}

function getPawnMoves(pos, piece, color, boardPos, whiteKingPos, blackKingPos, lm) {
    let moveList = [];
    piece.isMoved = true;
    if (piece.color == White && color == White) {
        if (pos >= 8 && pos <= 15) {
            if (boardPos[pos + 8].type == None) {
                let move = new Move(piece, pos, pos + 8, boardPos[pos + 8], false, null, false, null, false, null);
                if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                if (boardPos[pos + 16].type == None) {
                    let move = new Move(piece, pos, pos + 16, boardPos[pos + 16], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        } else {
            if (pos + 8 <= 63) {
                if (boardPos[pos + 8].type == None) {
                    let move = new Move(piece, pos, pos + 8, boardPos[pos + 8], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos + 8) == 8) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(White, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(White, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(White, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(White, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos + 7 <= 63) {
            if (diff(rankAt(pos), rankAt(pos + 7)) == 1) {
                if (boardPos[pos + 7].type != None && boardPos[pos + 7].color == Black) {
                    let move = new Move(piece, pos, pos + 7, boardPos[pos + 7], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos + 7) == 8) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(White, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(White, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(White, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(White, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos + 9 <= 63) {
            if (diff(rankAt(pos), rankAt(pos + 9)) == 1) {
                if (boardPos[pos + 9].type != None && boardPos[pos + 9].color == Black) {
                    let move = new Move(piece, pos, pos + 9, boardPos[pos + 9], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos + 9) == 8) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(White, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(White, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(White, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(White, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos >= 32 && pos <= 39) {
            if (lm.piece.color == Black && lm.piece.type == Pawn && lm.pos - lm.posTo == 16) {
                if (diff(rankAt(pos), rankAt(pos - 1)) == 1) {
                    if (lm.posTo == pos - 1) {
                        let move = new Move(piece, pos, pos + 7, boardPos[pos - 1], false, null, false, null, true, pos - 1);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
                if (diff(rankAt(pos), rankAt(pos + 1)) == 1) {
                    if (lm.posTo == pos + 1) {
                        let move = new Move(piece, pos, pos + 9, boardPos[pos + 1], false, null, false, null, true, pos + 1);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
    } else if (piece.color == Black && color == Black) {
        if (pos >= 48 && pos <= 55) {
            if (boardPos[pos - 8].type == None) {
                let move = new Move(piece, pos, pos - 8, boardPos[pos - 8], false, null, false, null, false, null);
                if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                if (boardPos[pos - 16].type == None) {
                    let move = new Move(piece, pos, pos - 16, boardPos[pos - 16], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        } else {
            if (pos - 8 >= 0) {
                if (boardPos[pos - 8].type == None) {
                    let move = new Move(piece, pos, pos - 8, boardPos[pos - 8], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos - 8) == 1) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(Black, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos - 7 >= 0) {
            if (diff(rankAt(pos), rankAt(pos - 7)) == 1) {
                if (boardPos[pos - 7].type != None && boardPos[pos - 7].color == White) {
                    let move = new Move(piece, pos, pos - 7, boardPos[pos - 7], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos - 7) == 1) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(Black, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos - 9 >= 0) {
            if (diff(rankAt(pos), rankAt(pos - 9)) == 1) {
                if (boardPos[pos - 9].type != None && boardPos[pos - 9].color == White) {
                    let move = new Move(piece, pos, pos - 9, boardPos[pos - 9], false, null, false, null, false, null);
                    let move1;
                    let move2;
                    let move3;
                    let move4;
                    if (fileAt(pos - 9) == 1) {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) {
                            move.isPromoted = true;
                            move.promotedTo = new Piece(Black, Queen);
                            move1 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Rook);
                            move2 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Knight);
                            move3 = structuredClone(move);
                            move.promotedTo = new Piece(Black, Bishop);
                            move4 = structuredClone(move);
                            moveList.push(move1);
                            moveList.push(move2);
                            moveList.push(move3);
                            moveList.push(move4);
                        }
                    } else {
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos >= 24 && pos <= 31) {
            if (lm.piece.color == White && lm.piece.type == Pawn && lm.pos - lm.posTo == -16) {
                if (diff(rankAt(pos), rankAt(pos - 1)) == 1) {
                    if (lm.posTo == pos - 1) {
                        let move = new Move(piece, pos, pos - 9, boardPos[pos - 1], false, null, false, null, true, pos - 1);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
                if (diff(rankAt(pos), rankAt(pos + 1)) == 1) {
                    if (lm.posTo == pos + 1) {
                        let move = new Move(piece, pos, pos - 7, boardPos[pos + 1], false, null, false, null, true, pos + 1);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
    }
    return moveList;
}

function getKnightMoves(pos, piece, color, boardPos, whiteKingPos, blackKingPos) {
    let moveList = [];
    piece.isMoved = true;

    if (piece.color == color) {
        if (pos <= 63 - 15) {
            let pos1 = pos + 15;
            if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos <= 63 - 17) {
            let pos1 = pos + 17;
            if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos <= 63 - 6) {
            let pos1 = pos + 6;
            if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos <= 63 - 10) {
            let pos1 = pos + 10;
            if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 0 + 15) {
            let pos1 = pos - 15;
            if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 0 + 17) {
            let pos1 = pos - 17;
            if (diff(fileAt(pos), fileAt(pos1)) == 2 && diff(rankAt(pos), rankAt(pos1)) == 1) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 0 + 6) {
            let pos1 = pos - 6;
            if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 0 + 10) {
            let pos1 = pos - 10;
            if (diff(fileAt(pos), fileAt(pos1)) == 1 && diff(rankAt(pos), rankAt(pos1)) == 2) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            }
        }
    }

    return moveList;
}

function getBishopMoves(pos, piece, color, boardPos, whiteKingPos, blackKingPos) {
    let moveList = [];
    piece.isMoved = true;

    let pos1 = pos;
    let pos2 = pos;
    let pos3 = pos;
    let pos4 = pos;

    if (piece.color == color) {
        while (pos1 <= 56) {
            pos1 += 7;
            if (diff(fileAt(pos1), fileAt(pos1 - 7)) == 1) {
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos2 <= 54) {
            pos2 += 9;
            if (diff(fileAt(pos2), fileAt(pos2 - 9)) == 1) {
                if (boardPos[pos2].type != None) {
                    if (boardPos[pos2].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos3 >= 7) {
            pos3 -= 7;
            if (diff(fileAt(pos3), fileAt(pos3 + 7)) == 1) {
                if (boardPos[pos3].type != None) {
                    if (boardPos[pos3].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos4 >= 9) {
            pos4 -= 9;
            if (diff(fileAt(pos4), fileAt(pos4 + 9)) == 1) {
                if (boardPos[pos4].type != None) {
                    if (boardPos[pos4].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                        if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                    if (isMoveValid(move, whiteKingPos, blackKingPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
    }

    return moveList;
}

function getRookMoves(pos, piece, color, boardPos, WKPos, BKPos) {
    let moveList = [];
    piece.isMoved = true;

    let pos1 = pos;
    let pos2 = pos;
    let pos3 = pos;
    let pos4 = pos;
    if (piece.color == color) {
        while (pos1 <= 55) {
            pos1 += 8;
            if (boardPos[pos1].type != None) {
                if (boardPos[pos1].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (pos2 >= 8) {
            pos2 -= 8;
            if (boardPos[pos2].type != None) {
                if (boardPos[pos2].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (diff(fileAt(pos), fileAt(pos3 - 1)) == 0) {
            pos3 -= 1;
            if (boardPos[pos3].type != None) {
                if (boardPos[pos3].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (diff(fileAt(pos), fileAt(pos4 + 1)) == 0) {
            pos4 += 1;
            if (boardPos[pos4].type != None) {
                if (boardPos[pos4].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
    }

    return moveList;
}

function getQueenMoves(pos, piece, color, boardPos, WKPos, BKPos) {
    let moveList = [];
    piece.isMoved = true;

    let pos1 = pos;
    let pos2 = pos;
    let pos3 = pos;
    let pos4 = pos;
    let pos5 = pos;
    let pos6 = pos;
    let pos7 = pos;
    let pos8 = pos;

    if (piece.color == color) {
        while (pos1 <= 56) {
            pos1 += 7;
            if (diff(fileAt(pos1), fileAt(pos1 - 7)) == 1) {
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos2 <= 54) {
            pos2 += 9;
            if (diff(fileAt(pos2), fileAt(pos2 - 9)) == 1) {
                if (boardPos[pos2].type != None) {
                    if (boardPos[pos2].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos2, boardPos[pos2], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos3 >= 7) {
            pos3 -= 7;
            if (diff(fileAt(pos3), fileAt(pos3 + 7)) == 1) {
                if (boardPos[pos3].type != None) {
                    if (boardPos[pos3].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos3, boardPos[pos3], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos4 >= 9) {
            pos4 -= 9;
            if (diff(fileAt(pos4), fileAt(pos4 + 9)) == 1) {
                if (boardPos[pos4].type != None) {
                    if (boardPos[pos4].color == piece.color) {
                        break;
                    } else {
                        let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                        break;
                    }
                } else {
                    let move = new Move(piece, pos, pos4, boardPos[pos4], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                break;
            }
        }
        while (pos5 <= 55) {
            pos5 += 8;
            if (boardPos[pos5].type != None) {
                if (boardPos[pos5].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos5, boardPos[pos5], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos5, boardPos[pos5], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (pos6 >= 8) {
            pos6 -= 8;
            if (boardPos[pos6].type != None) {
                if (boardPos[pos6].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos6, boardPos[pos6], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos6, boardPos[pos6], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (diff(fileAt(pos), fileAt(pos7 - 1)) == 0) {
            pos7 -= 1;
            if (boardPos[pos7].type != None) {
                if (boardPos[pos7].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos7, boardPos[pos7], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos7, boardPos[pos7], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        while (diff(fileAt(pos), fileAt(pos8 + 1)) == 0) {
            pos8 += 1;
            if (boardPos[pos8].type != None) {
                if (boardPos[pos8].color == piece.color) {
                    break;
                } else {
                    let move = new Move(piece, pos, pos8, boardPos[pos8], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    break;
                }
            } else {
                let move = new Move(piece, pos, pos8, boardPos[pos8], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
    }
    return moveList;
}

function getKingMoves(pos, piece, color, boardPos, WKPos, BKPos) {
    let moveList = [];
    piece.isMoved = true;
    if (piece.color == color) {
        if (pos <= 55) {
            let pos1 = pos + 8;
            if (boardPos[pos1].type != None) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        if (pos >= 8) {
            let pos1 = pos - 8;
            if (boardPos[pos1].type != None) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        if (diff(fileAt(pos), fileAt(pos - 1)) == 0) {
            let pos1 = pos - 1;
            if (boardPos[pos1].type != None) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        if (diff(fileAt(pos), fileAt(pos + 1)) == 0) {
            let pos1 = pos + 1;
            if (boardPos[pos1].type != None) {
                if (boardPos[pos1].color != piece.color) {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            } else {
                let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
            }
        }
        if (pos <= 56) {
            if (diff(fileAt(pos), fileAt(pos + 7)) == 1) {
                let pos1 = pos + 7;
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color != piece.color) {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos <= 54) {
            if (diff(fileAt(pos), fileAt(pos + 9)) == 1) {
                let pos1 = pos + 9;
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color != piece.color) {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 7) {
            if (diff(fileAt(pos), fileAt(pos - 7)) == 1) {
                let pos1 = pos - 7;
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color != piece.color) {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos >= 9) {
            if (diff(fileAt(pos), fileAt(pos - 9)) == 1) {
                let pos1 = pos - 9;
                if (boardPos[pos1].type != None) {
                    if (boardPos[pos1].color != piece.color) {
                        let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                        if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                } else {
                    let move = new Move(piece, pos, pos1, boardPos[pos1], false, null, false, null, false, null);
                    if (isMoveValid(move, WKPos, BKPos, boardPos)) moveList.push(move);
                }
            }
        }
        if (pos == 4 && piece.color == White) {
            if (boardPos[0].type == Rook && boardPos[0].color == White) {
                if (boardPos[1].type == None && boardPos[2].type == None && boardPos[3].type == None) {
                    if (!boardPos[0].isMoved && !boardPos[pos].isMoved) {
                        let move = new Move(piece, pos, 2, new Piece(None, None), true, "l", false, null, false, null);
                        if (isMoveValidForCastle(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                }
            }
            if (boardPos[7].type == Rook && boardPos[7].color == White) {
                if (boardPos[5].type == None && boardPos[6].type == None) {
                    if (!boardPos[7].isMoved && !boardPos[pos].isMoved) {
                        let move = new Move(piece, pos, 6, new Piece(None, None), true, "s", false, null, false, null);
                        if (isMoveValidForCastle(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
        if (pos == 60 && piece.color == Black) {
            if (boardPos[56].type == Rook && boardPos[56].color == Black) {
                if (boardPos[57].type == None && boardPos[58].type == None && boardPos[59].type == None) {
                    if (!boardPos[56].isMoved && !boardPos[pos].isMoved) {
                        let move = new Move(piece, pos, 58, new Piece(None, None), true, "l", false, null, false, null);
                        if (isMoveValidForCastle(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                }
            }
            if (boardPos[63].type == Rook && boardPos[63].color == Black) {
                if (boardPos[61].type == None && boardPos[62].type == None) {
                    if (!boardPos[63].isMoved && !boardPos[pos].isMoved) {
                        let move = new Move(piece, pos, 62, new Piece(None, None), true, "s", false, null, false, null);
                        if (isMoveValidForCastle(move, WKPos, BKPos, boardPos)) moveList.push(move);
                    }
                }
            }
        }
    }

    return moveList;
}

function getMoves(pos, piece) {
    let color;
    if (whiteToMove) {
        color = White;
    } else {
        color = Black;
    }
    let moveList = [];
    if (piece.type == Pawn) {
        moveList = moveList.concat(getPawnMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos, lastMove));
    } else if (piece.type == Bishop) {
        moveList = moveList.concat(getBishopMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos));
    } else if (piece.type == Rook) {
        moveList = moveList.concat(getRookMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos));
    } else if (piece.type == Queen) {
        moveList = moveList.concat(getQueenMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos));
    } else if (piece.type == King) {
        moveList = moveList.concat(getKingMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos));
    } else if (piece.type == Knight) {
        moveList = moveList.concat(getKnightMoves(pos, piece, color, boardPosition, WhiteKingPos, BlackKingPos));
    }
    return moveList;
}

function removeShowedMove() {
    for (let i = 0; i < 64; i++) {
        tile = document.getElementById(i);
        tile.classList.remove("moveList");
        tile.classList.remove("moveListCapture");
        tile.classList.remove("lightClicked");
        tile.classList.remove("darkClicked");
        tile.classList.remove("clicked");
        while (tile.hasChildNodes()) {
            tile.removeChild(tile.children[0]);
        }
    }
}

function removeShowedMove2() {
    for (let i = 0; i < 64; i++) {
        tile = document.getElementById(i);
        tile.classList.remove("lightClicked2");
        tile.classList.remove("darkClicked2");
        while (tile.hasChildNodes()) {
            tile.removeChild(tile.children[0]);
        }
    }
}

function removeEventListener() {
    for (let i = 0; i < 64; i++) {
        tile = document.getElementById(i);
        tile.removeEventListener("mousedown", showedMoveClicked);
        tile.removeAttribute("moveIndex");
    }
}

async function movePiece(move) {
    if (!move.isCastle && !move.isPromoted && !move.isEnp) {
        boardPosition[move.pos] = new Piece(None, None);
        boardPosition[move.posTo] = move.piece;
    } else if (move.isEnp) {
        boardPosition[move.pos] = new Piece(None, None);
        boardPosition[move.posTo] = move.piece;
        boardPosition[move.enpTo] = new Piece(None, None);
    } else if (move.isCastle) {
        if (move.castleType == "l") {
            boardPosition[move.pos] = new Piece(None, None);
            boardPosition[move.posTo] = move.piece;
            boardPosition[move.posTo + 1] = boardPosition[move.posTo - 2];
            boardPosition[move.posTo - 2] = new Piece(None, None);
        } else if (move.castleType == "s") {
            boardPosition[move.pos] = new Piece(None, None);
            boardPosition[move.posTo] = move.piece;
            boardPosition[move.posTo - 1] = boardPosition[move.posTo + 1];
            boardPosition[move.posTo + 1] = new Piece(None, None);
        }
    } else if (move.isPromoted == true) {
        boardPosition[move.pos] = new Piece(None, None);
        boardPosition[move.posTo] = move.promotedTo;
    }
    if (move.attPiece.type != None) {
        pieceCount--;
    }
    if (whiteToMove) {
        whiteToMove = false;
    } else {
        whiteToMove = true;
    }
    lastMove = move;
    if (move.piece.type == King) {
        if (move.piece.color == Black) {
            BlackKingPos = move.posTo;
        } else {
            WhiteKingPos = move.posTo;
        }
    }
    removeShowedMove2();
    let tile = document.getElementById(move.pos);
    let tileTo = document.getElementById(move.posTo);
    if (tile.getAttribute("tilecolor") == "dark") {
        tile.classList.add("darkClicked2");
    } else {
        tile.classList.add("lightClicked2");
    }
    if (tileTo.getAttribute("tilecolor") == "dark") {
        tileTo.classList.add("darkClicked2");
    } else {
        tileTo.classList.add("lightClicked2");
    }
    showPiece(boardPosition);
    await sleep(10);
    moveCntr++;
    if (playAsW) {
        if (!whiteToMove) {
            movePiece(playAi2());
        }
    }
    if (playAsB) {
        if (whiteToMove) {
            movePiece(playAi2());
        }
    }
    removeEventListener();
}

function showedMoveClicked(e) {
    if (e.button == 0) {
        let moveIndex = this.getAttribute("moveindex");
        let move = nextMoves[moveIndex];
        if (move.isPromoted == true) {
            if (fileAt(move.posTo) == 8) {
                let tileTo = document.getElementById(move.posTo);
                let menu = document.createElement("div");
                let btnQueen = document.createElement("div");
                btnQueen.classList.add("WhiteQueenMenu");
                btnQueen.style.width = "75px";
                btnQueen.style.height = "75px";
                btnQueen.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(White, Queen);
                        movePiece(move);
                    }
                });
                let btnKnight = document.createElement("div");
                btnKnight.classList.add("WhiteKnightMenu");
                btnKnight.style.width = "75px";
                btnKnight.style.height = "75px";
                btnKnight.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(White, Knight);
                        movePiece(move);
                    }
                });
                let btnBishop = document.createElement("div");
                btnBishop.classList.add("WhiteBishopMenu");
                btnBishop.style.width = "75px";
                btnBishop.style.height = "75px";
                btnBishop.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(White, Bishop);
                        movePiece(move);
                    }
                });
                let btnRook = document.createElement("div");
                btnRook.classList.add("WhiteRookMenu");
                btnRook.style.width = "75px";
                btnRook.style.height = "75px";
                btnRook.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(White, Rook);
                        movePiece(move);
                    }
                });
                let btnClose = document.createElement("div");
                btnClose.style.width = "75px";
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
                menu.style.width = "75px";
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
            } else if (fileAt(move.posTo) == 1) {
                let tileTo = document.getElementById(move.posTo);
                let menu = document.createElement("div");
                let btnQueen = document.createElement("div");
                btnQueen.classList.add("BlackQueenMenu");
                btnQueen.style.width = "75px";
                btnQueen.style.height = "75px";
                btnQueen.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(Black, Queen);
                        movePiece(move);
                    }
                });
                let btnKnight = document.createElement("div");
                btnKnight.classList.add("BlackKnightMenu");
                btnKnight.style.width = "75px";
                btnKnight.style.height = "75px";
                btnKnight.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(Black, Knight);
                        movePiece(move);
                    }
                });
                let btnBishop = document.createElement("div");
                btnBishop.classList.add("BlackBishopMenu");
                btnBishop.style.width = "75px";
                btnBishop.style.height = "75px";
                btnBishop.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(Black, Bishop);
                        movePiece(move);
                    }
                });
                let btnRook = document.createElement("div");
                btnRook.classList.add("BlackRookMenu");
                btnRook.style.width = "75px";
                btnRook.style.height = "75px";
                btnRook.addEventListener("mousedown", function (e) {
                    if (e.button == 0) {
                        move.promotedTo = new Piece(Black, Rook);
                        movePiece(move);
                    }
                });
                let btnClose = document.createElement("div");
                btnClose.style.width = "75px";
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
                menu.style.width = "75px";
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
    }
}

function showMoveList(moveList) {
    let moveIndex = 0;
    moveList.forEach((move) => {
        let pos = document.getElementById(move.posTo);
        if (move.isEnp) {
            pos.classList.add("moveList");
        } else if (move.attPiece.type == None) {
            pos.classList.add("moveList");
        } else {
            pos.classList.add("moveListCapture");
        }
        pos.setAttribute("moveIndex", moveIndex);
        pos.addEventListener("mousedown", showedMoveClicked);
        moveIndex++;
    });
}

function showMove() {
    for (let i = 0; i < 64; i++) {
        let pcs = document.getElementById(i);
        pcs.addEventListener("mousedown", function (e) {
            if (e.button == 0) {
                if (pcs.classList.contains("moveList") || pcs.classList.contains("moveListCapture")) {
                    removeShowedMove();
                } else if (pcs.getAttribute("type") != None) {
                    if (pcs.classList.contains("clicked")) {
                        removeShowedMove();
                        removeEventListener();
                    } else {
                        removeShowedMove();
                        removeEventListener();
                        if (pcs.getAttribute("tileColor") == "light") {
                            pcs.classList.add("lightClicked");
                        } else {
                            pcs.classList.add("darkClicked");
                        }
                        pcs.classList.add("clicked");
                        let pieceType = pcs.getAttribute("type") - "0";
                        let pieceColor = pcs.getAttribute("color") - "0";
                        let piece = new Piece(pieceColor, pieceType);
                        moveList = getMoves(i, piece);
                        nextMoves = moveList;
                        showMoveList(moveList);
                    }
                } else {
                    removeShowedMove();
                    removeEventListener();
                }
            }
        });
    }
}

function getAllMoves(WTM, boardPos, lm, WKPos, BKPos) {
    let pos = 0;
    let moveList = [];
    let color;
    if (WTM) {
        color = White;
    } else {
        color = Black;
    }
    let newBoardPos = JSON.parse(JSON.stringify(boardPos));
    // let newBoardPos = boardPos.map(function (arr) {
    //     return arr.slice();
    // });
    // let newBoardPos = boardPos.slice(0);
    // console.log(color);
    newBoardPos.forEach((piece) => {
        // if (lm.pos == 59 && lm.posTo == 38) console.log(piece);
        if (piece.type == Pawn) {
            moveList = moveList.concat(getPawnMoves(pos, piece, color, boardPos, WKPos, BKPos, lm));
        } else if (piece.type == King) {
            moveList = moveList.concat(getKingMoves(pos, piece, color, boardPos, WKPos, BKPos));
        } else if (piece.type == Queen) {
            moveList = moveList.concat(getQueenMoves(pos, piece, color, boardPos, WKPos, BKPos));
        } else if (piece.type == Rook) {
            moveList = moveList.concat(getRookMoves(pos, piece, color, boardPos, WKPos, BKPos));
        } else if (piece.type == Knight) {
            moveList = moveList.concat(getKnightMoves(pos, piece, color, boardPos, WKPos, BKPos));
        } else if (piece.type == Bishop) {
            moveList = moveList.concat(getBishopMoves(pos, piece, color, boardPos, WKPos, BKPos));
        }
        pos++;
    });

    return moveList;
}

function getEval() {
    let evalWhite = 0;
    let evalBlack = 0;
    for (let i = 0; i < 64; i++) {
        if (boardPosition[i].color == Black) {
            if (boardPosition[i].type == King) {
                if (pieceCount >= 6) {
                    evalBlack += kingMapMiddle[i] / 10;
                } else {
                    evalBlack += kingMapEnd[i] / 10;
                }
            } else if (boardPosition[i].type == Queen) {
                evalBlack += 900;
                evalBlack += queenMap[i] / 10;
            } else if (boardPosition[i].type == Rook) {
                evalBlack += 500;
                evalBlack += rookMap[i] / 10;
            } else if (boardPosition[i].type == Knight) {
                evalBlack += 300;
                evalBlack += knightMap[i] / 10;
            } else if (boardPosition[i].type == Bishop) {
                evalBlack += 300;
                evalBlack += bishopMap[i] / 10;
            } else if (boardPosition[i].type == Pawn) {
                evalBlack += 100;
                evalBlack += pawnMap[i] / 10;
            }
        } else {
            if (boardPosition[i].type == King) {
                if (pieceCount >= 6) {
                    evalWhite += kingMapMiddle[i] / 10;
                } else {
                    evalWhite += kingMapEnd[i] / 10;
                }
            } else if (boardPosition[i].type == Queen) {
                evalWhite += 900;
                evalWhite += queenMap[i] / 10;
            } else if (boardPosition[i].type == Rook) {
                evalWhite += 500;
                evalWhite += rookMap[i] / 10;
            } else if (boardPosition[i].type == Knight) {
                evalWhite += 300;
                evalWhite += knightMap[i] / 10;
            } else if (boardPosition[i].type == Bishop) {
                evalWhite += 300;
                evalWhite += bishopMap[i] / 10;
            } else if (boardPosition[i].type == Pawn) {
                evalWhite += 100;
                evalWhite += pawnMap[i] / 10;
            }
        }
    }
    let eval = evalWhite - evalBlack;
    eval /= 100;
    return eval;
}

function playAsWhite() {
    playAsW = true;
}

function playAsBlack() {
    let move = playAi2();
    movePiece(move);
    playAsB = true;
}

// window.onload(function () {
// });

createBoard();
generatePieces(defaultFEN);
// generatePieces("r1b1kbr1/ppqnp2B/5p1n/2pPp1p1/8/2N1BN2/PPP2PPP/R2Q1RK1 w q - 0 1");
// generatePieces("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w");
// generatePieces("8/8/8/4Q3/8/8/8/8 w");
// generatePieces("r2q1rk1/pP1p2pp/Q4n2/bbp1p3/Np6/1B3NBn/pPPP1PPP/R3K2R b");
// whiteToMove = false;
// generatePieces("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w");
// generatePieces("r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w");
// generatePieces("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w - - 0 1");
showPiece(boardPosition);
// getAllMoves();
showMove();
