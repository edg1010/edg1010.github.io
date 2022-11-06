function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function test2(depth, WTM, boardPos, lm, WKPos, BKPos) {
    if (depth == 0) {
        return 1;
    }
    let moveList = JSON.parse(JSON.stringify(getAllMoves(WTM, boardPos, lm, WKPos, BKPos)));
    if (WTM) {
        WTM = false;
    } else {
        WTM = true;
    }

    let a = rank[rankAt(lm.pos) - 1];
    let b = fileAt(lm.pos);
    let c = rank[rankAt(lm.posTo) - 1];
    let d = fileAt(lm.posTo);
    let numPos = 0;

    // console.log(boardPos);
    for (let i = 0; i < moveList.length; i++) {
        let newBoardPos = moveToBoard(moveList[i], boardPos);
        lm = moveList[i];
        let num;
        if (moveList[i].piece.type == King) {
            if (moveList[i].piece.color == Black) {
                num = test2(depth - 1, WTM, newBoardPos, lm, WKPos, moveList[i].posTo);
            } else {
                num = test2(depth - 1, WTM, newBoardPos, lm, moveList[i].posTo, BKPos);
            }
        } else {
            num = test2(depth - 1, WTM, newBoardPos, lm, WKPos, BKPos);
        }

        numPos += num;
    }

    return numPos;
}

let pawnMap = [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0];
let knightMap = [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50];
let bishopMap = [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20];
let rookMap = [0, -10, 0, 0, 0, 0, -10, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0];
let queenMap = [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20];
let kingMapMiddle = [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20];
let kingMapEnd = [-50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50];
let pawnMapBlack = pawnMap.reverse();
let knightMapBlack = knightMap.reverse();
let bishopMapBlack = bishopMap.reverse();
let rookMapBlack = rookMap.reverse();
let queenMapBlack = queenMap.reverse();
let kingMapBlackMiddle = kingMapMiddle.reverse();
let kingMapBlackEnd = kingMapEnd.reverse();

let rank = ["a", "b", "c", "d", "e", "f", "g", "h"];

let reachedPosition = new Map();

async function test(depth, WTM, boardPos, lm, WKPos, BKPos) {
    if (depth == 0) {
        return 1;
    }
    let moveList = getAllMoves(WTM, boardPos, lm, WKPos, BKPos);
    if (WTM) {
        WTM = false;
    } else {
        WTM = true;
    }

    let numPos = 0;

    for (let i = 0; i < moveList.length; i++) {
        const newBoardPos = JSON.parse(JSON.stringify(moveToBoard(moveList[i], boardPos)));
        lm = moveList[i];
        if (moveList[i].piece.type == King) {
            if (moveList[i].piece.color == Black) {
                BKPos = moveList[i].posTo;
            } else {
                WKPos = moveList[i].posTo;
            }
        }
        showPiece(newBoardPos);
        await sleep(1000);
        numPos += await test(depth - 1, WTM, newBoardPos, lm, WKPos, BKPos);
    }
    return numPos;
}

function Evaluate(WTM, boardPos) {
    let evalWhite = 0;
    let evalBlack = 0;
    for (let i = 0; i < 64; i++) {
        if (boardPos[i].color == Black) {
            if (boardPos[i].type == King) {
                if (pieceCount >= 10) {
                    evalBlack += kingMapBlackMiddle[i] / 10;
                } else {
                    evalBlack += kingMapBlackEnd[i] / 10;
                }
            } else if (boardPos[i].type == Queen) {
                evalBlack += 900;
                evalBlack += queenMapBlack[i] / 10;
            } else if (boardPos[i].type == Rook) {
                evalBlack += 500;
                evalBlack += rookMapBlack[i] / 10;
            } else if (boardPos[i].type == Knight) {
                evalBlack += 300;
                evalBlack += knightMapBlack[i] / 10;
            } else if (boardPos[i].type == Bishop) {
                evalBlack += 300;
                evalBlack += bishopMapBlack[i] / 10;
            } else if (boardPos[i].type == Pawn) {
                evalBlack += 100;
                evalBlack += pawnMapBlack[i] / 10;
            }
        } else {
            if (boardPos[i].type == King) {
                if (pieceCount >= 10) {
                    evalWhite += kingMapMiddle[i] / 10;
                } else {
                    evalWhite += kingMapEnd[i] / 10;
                }
            } else if (boardPos[i].type == Queen) {
                evalWhite += 900;
                evalWhite += queenMap[i] / 10;
            } else if (boardPos[i].type == Rook) {
                evalWhite += 500;
                evalWhite += rookMap[i] / 10;
            } else if (boardPos[i].type == Knight) {
                evalWhite += 300;
                evalWhite += knightMap[i] / 10;
            } else if (boardPos[i].type == Bishop) {
                evalWhite += 300;
                evalWhite += bishopMap[i] / 10;
            } else if (boardPos[i].type == Pawn) {
                evalWhite += 100;
                if (pieceCount >= 6) {
                    evalWhite += pawnMap[i] / 10;
                } else {
                    evalWhite += pawnMap[i];
                }
            }
        }
    }
    let eval = evalWhite - evalBlack;
    eval /= 100;
    if (WTM) {
        return eval;
    } else {
        return eval * -1;
    }
}
let asdsa = 0;

let evaluation = [];

function Search(depth, WTM, boardPos, lm, WKPos, BKPos, alpha, beta) {
    asdsa++;
    if (depth == 0) {
        return SearchAllCapture(WTM, boardPos, lm, WKPos, BKPos, alpha, beta);
    }
    let color;
    let kingPos;
    if (lm.piece.color == White) {
        color = White;
        kingPos = BKPos;
    } else {
        color = Black;
        kingPos = WKPos;
    }
    let attackedPos = getAttackedPosition(boardPos, color);
    let moveList = sortMoves(getAllMoves(WTM, boardPos, lm, WKPos, BKPos), attackedPos);
    if (WTM) {
        WTM = false;
    } else {
        WTM = true;
    }
    if (moveList.length == 0) {
        if (attackedPos[kingPos] != 0) {
            if (depth == 3) {
                console.log("apasi");
            }
            return -999999;
        } else {
            return 0;
        }
    }
    if (depth == 3) {
        beta += 0.0001;
    }
    for (let i = 0; i < moveList.length; i++) {
        let newBoardPos = moveToBoard(moveList[i], boardPos);
        let eval;
        if (moveList[i].piece.type == King) {
            if (moveList[i].piece.color == Black) {
                eval = -Search(depth - 1, WTM, newBoardPos, moveList[i], WKPos, moveList[i].posTo, -beta, -alpha);
            } else {
                eval = -Search(depth - 1, WTM, newBoardPos, moveList[i], moveList[i].posTo, BKPos, -beta, -alpha);
            }
        } else {
            eval = -Search(depth - 1, WTM, newBoardPos, moveList[i], WKPos, BKPos, -beta, -alpha);
        }

        if (depth != 4) {
            if (eval >= beta) {
                return beta;
            }
        } else {
            if (eval >= beta) {
                evaluation = [];
                evaluation.push([moveList[i], eval]);
                return beta;
            }
        }

        let x = 0;
        if (depth != 4) {
            alpha = Math.max(alpha, eval);
        } else {
            evaluation.push([moveList[i], eval]);
            alpha = Math.max(alpha, eval);
        }
    }
    return alpha;
}

function boardToText(boardPos) {
    let str = "";
    for (let i = 0; i < 64; i++) {
        if (boardPos[i].color == Black) {
            if (boardPos[i].type == King) {
                str += "k";
            } else if (boardPos[i].type == Queen) {
                str += "q";
            } else if (boardPos[i].type == Rook) {
                str += "r";
            } else if (boardPos[i].type == Knight) {
                str += "n";
            } else if (boardPos[i].type == Bishop) {
                str += "b";
            } else if (boardPos[i].type == Pawn) {
                str += "p";
            }
        } else if (boardPos[i].color == White) {
            if (boardPos[i].type == King) {
                str += "K";
            } else if (boardPos[i].type == Queen) {
                str += "Q";
            } else if (boardPos[i].type == Rook) {
                str += "R";
            } else if (boardPos[i].type == Knight) {
                str += "N";
            } else if (boardPos[i].type == Bishop) {
                str += "B";
            } else if (boardPos[i].type == Pawn) {
                str += "P";
            }
        } else {
            str += "0";
        }
    }
    return str;
}

function SearchAllCapture(WTM, boardPos, lm, WKPos, BKPos, alpha, beta) {
    asdsa++;
    let eval = Evaluate(WTM, boardPos);
    if (eval >= beta) {
        return beta;
    }
    alpha = Math.max(alpha, eval);
    let color;
    let kingPos;
    if (lm.piece.color == White) {
        color = Black;
        kingPos = BKPos;
    } else {
        color = White;
        kingPos = WKPos;
    }
    let attackedPos = getAttackedPosition(boardPos, color);
    let moveList = sortMoves(getAllCaptureMoves(WTM, boardPos, lm, WKPos, BKPos), attackedPos);
    if (WTM) {
        kingPos = WKPos;
        WTM = false;
    } else {
        kingPos = BKPos;
        WTM = true;
    }

    for (let i = 0; i < moveList.length; i++) {
        let newBoardPos = moveToBoard(moveList[i], boardPos);
        lm = moveList[i];
        let eval;
        if (moveList[i].piece.type == King) {
            if (moveList[i].piece.color == Black) {
                eval = -SearchAllCapture(WTM, newBoardPos, lm, WKPos, moveList[i].posTo, -beta, -alpha);
            } else {
                eval = -SearchAllCapture(WTM, newBoardPos, lm, moveList[i].posTo, BKPos, -beta, -alpha);
            }
        } else {
            eval = -SearchAllCapture(WTM, newBoardPos, lm, WKPos, BKPos, -beta, -alpha);
        }
        if (eval >= beta) {
            return beta;
        }
    }

    return alpha;
}

function pieceValue(type) {
    if (type == Queen) {
        return 9;
    } else if (type == Rook) {
        return 5;
    } else if (type == Knight) {
        return 3;
    } else if (type == Bishop) {
        return 3;
    } else if (type == Pawn) {
        return 1;
    } else {
        return 0;
    }
}

function sortMoves(moveList, attackedPos) {
    moveList.forEach((move) => {
        let moveScoreGuess = 0;
        let movePieceType = move.piece.type;
        let attPieceType = move.attPiece.type;

        if (attPieceType != None) {
            moveScoreGuess = 10 * pieceValue(attPieceType) - pieceValue(movePieceType);
        }

        if (move.isPromoted) {
            moveScoreGuess += pieceValue(move.promotedTo);
        }

        if (attackedPos[move.posTo] == Pawn) {
            moveScoreGuess -= pieceValue(movePieceType);
        }

        move.moveScoreGuess = moveScoreGuess;
    });

    moveList.sort((a, b) => (a.moveScoreGuess < b.moveScoreGuess ? 1 : -1));

    return moveList;
}

function playAi() {
    // let val = Search(4, whiteToMove, boardPosition, lastMove, WhiteKingPos, BlackKingPos, -999999, 999999);
    reachedPosition.clear();
    let WTM;
    if (whiteToMove) {
        WTM = false;
    } else {
        WTM = true;
    }
    let minVal = -9999999;
    let color;
    if (whiteToMove) {
        color = Black;
    } else {
        color = White;
    }
    let attackedPos = getAttackedPosition(boardPosition, color);
    let moveList = sortMoves(getAllMoves(whiteToMove, boardPosition, lastMove, WhiteKingPos, BlackKingPos), attackedPos);
    // console.log(moveList);
    let mv;
    let depth = 3;
    if (pieceCount <= 5) {
        depth = 4;
    } else if (pieceCount <= 10) {
        depth = 3;
    }
    moveList.forEach((move) => {
        let newBoardPos = moveToBoard(move, boardPosition);
        let lm = move;
        let val;
        if (move.piece.type == King) {
            if (move.piece.color == Black) {
                val = -Search(depth, WTM, newBoardPos, lm, WhiteKingPos, move.posTo, -999999, 999999);
            } else {
                val = -Search(depth, WTM, newBoardPos, lm, move.posTo, BlackKingPos, -999999, 999999);
            }
        } else {
            val = -Search(depth, WTM, newBoardPos, lm, WhiteKingPos, BlackKingPos, -999999, 999999);
        }
        if (minVal < val) {
            minVal = val;
            mv = move;
        } else if (minVal == val) {
            let rand = Math.random();
            if (rand < 0.5) {
                mv = move;
            }
        }
    });
    // if (!whiteToMove) {
    //     minVal *= -1;
    // }
    console.log(minVal);
    console.log(asdsa);
    asdsa = 0;
    return mv;
}

function playAi2() {
    // let move = Search(4, whiteToMove, boardPosition, lastMove, WhiteKingPos, BlackKingPos, -999999, 999999);
    Search(4, whiteToMove, boardPosition, lastMove, WhiteKingPos, BlackKingPos, -999999, 999999);
    let high = -99999999;
    let moveList = [];
    for (let i = 0; i < evaluation.length; i++) {
        console.log();

        if (parseFloat(evaluation[i][1] * 1000).toPrecision(7) % 5 == 0) {
            if (evaluation[i][1] > high) {
                high = evaluation[i][1];
                moveList = [];
            }
            if (evaluation[i][1] == high) {
                moveList.push(evaluation[i][0]);
            }
        }
    }
    console.log(high, asdsa);
    asdsa = 0;
    let move = moveList[Math.floor(Math.random() * moveList.length)];
    evaluation = [];
    return move;
}

async function AivsAi() {
    while (1) {
        let move = playAi2();
        if (move) {
            movePiece(move);
            await sleep(10);
        } else {
            break;
        }
    }
}
