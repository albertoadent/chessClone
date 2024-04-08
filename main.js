var codeIsDebugging = false;

const squareToArr = (desiredSquare) =>{
    if(desiredSquare == null || desiredSquare.length != 2) return null;
    let arr = [0,0];
    switch(desiredSquare.toLowerCase()[0]){
        case 'a':
            arr[0] = 0;
            break;
        case 'b':
            arr[0] = 1;
            break;
        case 'c':
            arr[0] = 2;
            break;
        case 'd':
            arr[0] = 3;
            break;
        case 'e':
            arr[0] = 4;
            break;
        case 'f':
            arr[0] = 5;
            break;
        case 'g':
            arr[0] = 6;
            break;
        case 'h':
            arr[0] = 7;
            break;
        default:
            return null;
    }
    switch(desiredSquare[1]){
        case '1':
            arr[1] = 0;
            break;
        case '2':
            arr[1] = 1;
            break;
        case '3':
            arr[1] = 2;
            break;
        case '4':
            arr[1] = 3;
            break;
        case '5':
            arr[1] = 4;
            break;
        case '6':
            arr[1] = 5;
            break;
        case '7':
            arr[1] = 6;
            break;
        case '8':
            arr[1] = 7;
            break;
        default:
            return null;
    }
    if (codeIsDebugging)console.log("square to arr returning: " + arr);
    return arr;
}
const arrToSquare = (arrCoord) =>{
    output = '';
    if(arrCoord[0] < 0 || arrCoord[0] > 7) return null;
    if(arrCoord[1] < 0 || arrCoord[1] > 7) return null;
    switch(arrCoord[0]){
        case 0:
            output+= 'a';
            break;
        case 1:
            output+= 'b';
            break;
        case 2:
            output+= 'c';
            break;
        case 3:
            output+= 'd';
            break;
        case 4:
            output+= 'e';
            break;
        case 5:
            output+= 'f';
            break;
        case 6:
            output+= 'g';
            break;
        case 7:
            output+= 'h';
            break;
    }
    let temp = arrCoord[1] + 1;
    output+= temp;
    if (codeIsDebugging)console.log("arr to square returning " + output);
    return output;
}
const abbrevPieceToLetter = (piece) =>{
    switch(piece.toLowerCase()){
        case 'king':
            return 'K';
        case 'queen':
            return 'Q';
        case 'rook':
            return 'R';
        case 'bishop':
            return 'B'
        case 'knight':
            return 'N';
        case 'pawn':
            return 'P';
        default:
            return null;
    }
}
const letterToPieceName = (letter) =>{
    switch(letter.toUpperCase()){
        case 'K':
            return 'king';
        case 'Q':
            return 'queen';
        case 'R':
            return 'rook';
        case 'B':
            return 'bishop'
        case 'N':
            return 'knight';
        case 'P':
            return 'pawn';
        default:
            return null;
    }
}
const pieceAtSquare = (board, square) =>{
    let arr1 = squareToArr(square);
    if (arr1 === null) return null;
    return board.getBoard()[arr1[0]][arr1[1]];
}
const peiceAtRelativeSquare = (board,startSquare,dir,range) =>{
    if (codeIsDebugging) console.log("checking is starting square " + startSquare + " can got in the " + dir + " direction " + range + " steps")
    let arr1 = squareToArr(startSquare);
    if (arr1 == null) return null;
    if (codeIsDebugging) console.log(arr1);
    let letter = Number(arr1[0])+1-1;
    let number = Number(arr1[1])+1-1;
    switch(dir%8){
        case 0:
            if (letter - range < 0) return null;
            return board.getBoard()[letter-range][number];
        case 1:
            if (letter - range < 0 || number + range > 7) return null;
            return board.getBoard()[letter-range][number+range];
        case 2:
            if (number + range > 7) return null;
            return board.getBoard()[letter][number+range];
        case 3:
            if (letter + range > 7 || number + range > 7) return null;
            return board.getBoard()[letter+range][number+range];
        case 4:
            if (letter + range > 7) return null;
            return board.getBoard()[letter+range][number];
        case 5:
            if (letter + range > 7 || number - range < 0) return null;
            return board.getBoard()[letter+range][number-range];
        case 6:
            if (number - range < 0) return null;
            return board.getBoard()[letter][number-range];
        case 7:
            if (number - range < 0 || number + range >7) return null;
            return board.getBoard()[letter-range][number+range];
    }
    return null;
}
const findDistAndDirDiff = (startingSquare,endingSquare) =>{
    if(startingSquare == null || endingSquare == null) return null;
    let arrs = squareToArr(startingSquare);
    let arre = squareToArr(endingSquare);
    let ydiff = arrs[0] - arre[0];
    if (codeIsDebugging)console.log("delta y = " + ydiff);
    let xdiff = arrs[1] - arre[1];
    if (codeIsDebugging)console.log("delta x = " + xdiff);
    let distDiff = 0;
    let dir = 0;
    if (ydiff == 0){
        distDiff = xdiff;
        if(xdiff>0) dir = 6;
        else if(xdiff<0) dir = 2;
        else return null;
    }else if (xdiff == 0){
        distDiff = ydiff;
        if(ydiff>0) dir = 0;
        else if(ydiff<0) dir = 4;
        else return null;
    }else if (Math.abs(xdiff) == Math.abs(ydiff)){
        distDiff = xdiff;
        if(xdiff>0){
            dir = 6;
            if(ydiff>0) dir ++;
            else dir--;
        }else{
            dir =2;
            if(ydiff>0) dir --;
            else dir++;
        }
    }else if((Math.abs(Math.abs(xdiff) - Math.abs(ydiff)) == 1) && Math.abs(xdiff) <= 2 && Math.abs(ydiff) <= 2){
        return [2,-1];//this is a knight move
    }else{
        return [-1,-1];//this is an illegal move
    }
    return[distDiff,dir];
}
const nextSquare = (startSquare,dir) =>{
    if (codeIsDebugging)console.log("Next Square called");
    let arr = squareToArr(startSquare);
    switch(dir){
        case 0:
            if (codeIsDebugging)console.log("next square in 0 dir");
            return arrToSquare([arr[0]-1,arr[1]]);
        case 1:
            return arrToSquare([arr[0]-1,arr[1]+1]);
        case 2:
            return arrToSquare([arr[0],arr[1]+1]);
        case 3:
            return arrToSquare([arr[0]+1,arr[1]+1]);
        case 4:
            return arrToSquare([arr[0]+1,arr[1]]);
        case 5:
            return arrToSquare([arr[0]+1,arr[1]-1]);
        case 6:
            return arrToSquare([arr[0],arr[1]-1]);
        case 7:
            return arrToSquare([arr[0]-1,arr[1]+1]);
    }
}

class Restrictions{
    //make a function that takes in board, starting sqaure and ending square and return true if allowed and false otherwise
    static canMove(board,startingSquare,endingSquare){
        //get peice stored in p
        const p = pieceAtSquare(board,startingSquare);
        
    }
    
    static canMovePawn(board, peice, startingSquare, endingSquare){
        if (codeIsDebugging)console.log("can peice at " + startingSquare + " move to " + endingSquare);
        let distDirDiff = findDistAndDirDiff(startingSquare,endingSquare);
        if(distDirDiff == null) return false;
        if(distDirDiff[0]>2)return false;//tries to move more than two spaces
        if (codeIsDebugging)console.log(distDirDiff);
        let isWhite = peice.getIsWhite();
        let hasOneUp = peiceAtRelativeSquare(board,startingSquare,0,1) == null;
        let hasTwoUp = peiceAtRelativeSquare(board,startingSquare,0,2) == null;
        let hasOneDown = peiceAtRelativeSquare(board,startingSquare,4,1) == null;
        let hasTwoDown = peiceAtRelativeSquare(board,startingSquare,4,2) == null;
        if(isWhite){//if is White
            if (codeIsDebugging)console.log("is white");
            if(squareToArr(startingSquare)[0] == 6 && distDirDiff[0] == 2){
                //if on starting line and is trying to go two spaces
                if (codeIsDebugging)console.log("is on starting line and trying to go two spaces");
                if(distDirDiff[1] != 0) return false;//if not going up return false
                if (codeIsDebugging)console.log("is going up");
                return hasOneUp&&hasTwoUp;//return the value of wether or not the next two spaces are available
            }else if(distDirDiff[1] == 0){//still trying to go up
                if (codeIsDebugging)console.log("checking ahead");
                if(distDirDiff[0] == 2 || distDirDiff[0] == -2) return false;//trying to move two squares
                if (codeIsDebugging)console.log("checking one step ahead");
                return hasOneUp;//return if it has the next step available
            }else if(distDirDiff[1] == 7 || distDirDiff[1] == 1){
                if (codeIsDebugging)console.log("distance being moved" + distDirDiff[0]);
                if(distDirDiff[0] == 2 || distDirDiff[0] == -2) return false;//trying to move two squares
                if (codeIsDebugging)console.log("checking diagonals");
                //if trying to go diagonal check to see if it is opposite color
                if (codeIsDebugging)console.log("let temp be the peice at " + endingSquare);
                let temp = pieceAtSquare(board,endingSquare);
                if(temp == null) return false;
                if (codeIsDebugging)console.log("not looking at null peice");
                if (codeIsDebugging)console.log(temp);
                return !temp.getIsWhite();
            }
            //find a way to do en passant
            //otherwise don't allow
            return false;
        }else{//if is Black
            if (codeIsDebugging)console.log("is black");
            if(squareToArr(startingSquare)[0] == 1 && distDirDiff[0] == 2){
                //if on starting line and is trying to go two spaces
                if(distDirDiff[1] != 4) return false;//if not going up return false
                return hasOneDown&&hasTwoDown;//return the value of wether or not the next two spaces are available
            }else if(distDirDiff[1] == 4){//still trying to go up
                if(distDirDiff[0] == 2) return false;//trying to move two squares
                return hasOneDown;//return if it has the next step available
            }else if(distDirDiff[1] == 3 || distDirDiff[1] == 5){
                if(distDirDiff[0] == 2) return false;//trying to move two squares
                //if trying to go diagonal check to see if it is opposite color
                let temp = pieceAtSquare(board,endingSquare);
                if(temp == null) return false;
                return temp.getIsWhite();
            }
            //find a way to do en passant
            //otherwise don't allow
            return false;
        }

    }
    static canMoveKnight(board, startingSquare, endingSquare){
        if(!findDistAndDirDiff(startingSquare,endingSquare)==[2,-1]){
            return false;
        }

    }
    static canMoveBishop(board, startingSquare, endingSquare){

    }
    static canMoveRook(board, startingSquare, endingSquare){

    }
    static canMoveQueen(board, startingSquare, endingSquare){

    }
    static canMoveKing(board, startingSquare, endingSquare){

    }
    
}

class Board{
    constructor(){
        this.isDebugging=false;
        this.squares =
    [[null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null]];
    }
    debugOn(){
        this.isDebugging = true;
    }
    debugOff(){
        this.isDebugging = false;
    }
    populate(){
        for(let i = 0; i<8; i++){
            this.squares[0][i] = new Piece(3,false);
            this.squares[1][i] = new Piece(0,false);
            this.squares[6][i] = new Piece(0);
            this.squares[7][i] = new Piece(3);
        }
        this.squares[0][0].turnRank('rook',this.isDebugging);
        this.squares[0][1].turnRank('knight',this.isDebugging);
        this.squares[0][2].turnRank('bishop',this.isDebugging);
        this.squares[0][3].turnRank('queen',this.isDebugging);
        this.squares[0][4].turnRank('king',this.isDebugging);
        this.squares[0][5].turnRank('bishop',this.isDebugging);
        this.squares[0][6].turnRank('knight',this.isDebugging);
        this.squares[0][7].turnRank('rook',this.isDebugging);

        this.squares[0][0].turnBlack();
        this.squares[0][1].turnBlack();
        this.squares[0][2].turnBlack();
        this.squares[0][3].turnBlack();
        this.squares[0][4].turnBlack();
        this.squares[0][5].turnBlack();
        this.squares[0][6].turnBlack();
        this.squares[0][7].turnBlack();
        this.squares[1][0].turnBlack();
        this.squares[1][1].turnBlack();
        this.squares[1][2].turnBlack();
        this.squares[1][3].turnBlack();
        this.squares[1][4].turnBlack();
        this.squares[1][5].turnBlack();
        this.squares[1][6].turnBlack();
        this.squares[1][7].turnBlack();

        this.squares[7][0].turnRank('rook',this.isDebugging);
        this.squares[7][1].turnRank('knight',this.isDebugging);
        this.squares[7][2].turnRank('bishop',this.isDebugging);
        this.squares[7][3].turnRank('queen',this.isDebugging);
        this.squares[7][4].turnRank('king',this.isDebugging);
        this.squares[7][5].turnRank('bishop',this.isDebugging);
        this.squares[7][6].turnRank('knight',this.isDebugging);
        this.squares[7][7].turnRank('rook',this.isDebugging);
    }
    display(){
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log('              BLACK');
        console.log();

        let temp = '| ';
        console.log('---------------------------------');
        for (let i = 0; i < 8; i++) {
            temp = '| ';
            for(let j = 0; j < 8; j++){
                if(this.squares[i][j] != null){
                    temp+= this.squares[i][j].getSymbol();
                    temp+= ' | ';
                    continue;
                }
                temp+= '  | ';
            }
            if (i == 0) temp+= 'a';
            if (i == 1) temp+= 'b';
            if (i == 2) temp+= 'c';
            if (i == 3) temp+= 'd';
            if (i == 4) temp+= 'e';
            if (i == 5) temp+= 'f';
            if (i == 6) temp+= 'g';
            if (i == 7) temp+= 'h';
            console.log(temp);
            console.log('---------------------------------');
        }
        console.log('  1   2   3   4   5   6   7   8')
        console.log();
        console.log('              WHITE');
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
    }
    getBoard(){
        return this.squares;
    }
    
    
}

class Moves{
    static moveRange(board, startingSquare, dir){
        if (codeIsDebugging)console.log("cheking move range from " + startingSquare + " in the " + dir + " direction");
        /*
        0 up
        1 up and right
        2 right
        3 right and down
        4 down
        5 down and left
        6 left
        7 left and up
        */
        //get peice stored in p
        const p = pieceAtSquare(board,startingSquare);
        //function that gets peice with direction and range inputs
        const getPeiceAtSquare = (dir,range) => peiceAtRelativeSquare(board,startingSquare,dir,range);
        //function that checks there is no peice and returns true if empty
        const isSquareEmpty = (dir,range) => getPeiceAtSquare(dir,range) == null;
        //function that checks if peice is opposite color
        const isOpponent = (dir,range) => p.getIsWhite() == getPeiceAtSquare(board,startingSquare,dir,range).getIsWhite();
        /*
        knights return value of -1 because it's range will always be the same
        for pawns check to see if they are on their starting line based on their color if direction is even
        check for opposite color if pawn direction is odd
        white pawn can only move in directions 0 1 and 7
        black pawns can only move in direction 3 4 and 5
        */
       let range = 0;
        
       if (p === null) return null;//we are not attempting to move a null piece
       switch(p.getRank()){   
        case 1://Knight
            return -1;
        case 0://Pawn
        if (codeIsDebugging)console.log("checking pawn range");
        let checkSq = startingSquare;
        while(Restrictions.canMovePawn(board,p,startingSquare,nextSquare(checkSq,dir))){
            checkSq = nextSquare(checkSq,dir);
            range++;
        }
            return range;
        case 2://Bishop
            return 1;
        case 3://Rook
            return 1;
        case 4://Queen
            return 1;
        case 5: //King
            return 1; 
       }

        /*
        for bishops make sure thier direction is odd
        for rooks make sure thier direction is even
        for kings just make sure they aren't going after their own piece
        then with bishops rooks and queens we iterate in the chosen direction until we run into our own peice in which case we iterate backwards, or simply stop if we ruin into another peice
        return the number of iterations
        */
    }
    static straightMove(board, startingSquare, range){
    }
    static diagonalMove(board, startingSquare, range){
    }
    static move(board, startingSquare,destinationSquare){
        /*
        if starting square null return false
        if destination square occupied by same color team return false
        otherwise set starting sqare to null and set destination square to pice that was on starting square
        then return true
        */
       let startArr=squareToArr(startingSquare);
       let startSq = board.getBoard()[startArr[0]][startArr[1]];
       let endArr=squareToArr(destinationSquare);
       let endSq = board.getBoard()[endArr[0]][endArr[1]];
       endSq = startSq;
       board.getBoard()[endArr[0]][endArr[1]] = endSq;
       board.getBoard()[startArr[0]][startArr[1]] = null; 
       startSq = null;
    }
    static canMove(board, startingSquare,destinationSquare){
       let startArr=squareToArr(startingSquare);
       let startSq = board.getBoard()[startArr[0]][startArr[1]];
       let endArr=squareToArr(destinationSquare);
       let endSq = board.getBoard()[endArr[0]][endArr[1]];
       if (startSq === null) return false;
       if (endSq === null); else if (startSq.getIsWhite() == endSq.getIsWhite()) return false;
       return true;
    }
}

class Piece{
    constructor(){
        /*
        Rank 0 = Pawn;
        Rank 1 = Knight;
        Rank 2 = Bishop;
        Rank 3 = Rook;
        Rank 4 = Queen;
        Rank 5 = King;
        %6
        */
        this.rank = 0;
        this.points = 1;
        this.isWhite = true;
        this.isDebugging=false;
        this.isPinned = false;
    }
    getIsPinned(){
        return this.isPinned;
    }
    setIsPinned(isPinned){
        this.isPinned = isPinned;
    }
    getPeice(){
        return this;
    }
    debugOn(){
        this.debugOn = true;
    }
    debugOff(){
        this.debugOn = false;
    }
    turnBlack(){
        this.isWhite = false;
    }
    turnRank(rank, isDebugging){
        if (isDebugging) console.log('requested promotion: ' + rank);
        this.rank = 0;
        switch(rank.toLowerCase()){
            case 'king':
                this.rank = 5;
                this.points = -1;
                if (isDebugging) console.log('king promotion');
                break;
            case 'queen':
                this.rank = 4;
                this.points = 9;
                if (isDebugging) console.log('queen promotion');
                break;
            case 'rook':
                this.rank = 3;
                this.points = 5;
                if (isDebugging) console.log('rook promotion');
                break;
            case 'bishop':
                this.rank = 2;
                this.points = 3;
                if (isDebugging) console.log('bishop promotion');
                break;
            case 'knight':
                this.rank = 1;
                this.points = 3;
                if (isDebugging) console.log('knight promotion');
                break;
            default:
                this.rank = 0;
                this.points = 1;
                if (isDebugging) console.log('pawn promotion');
        }
    }
    getRank(){
        return this.rank;
    }
    getIsWhite(){
        return this.isWhite;
    }
    getPoints(){
        return this.points;
    }
    isOpponent(opp){
        return this.getRank() != opp.getRank();
    }
    getSymbol(){
        switch(this.rank){
            case 0:
                return 'P';
            case 1:
                return 'N';
            case 2:
                return 'B';
            case 3:
                return 'R';
            case 4:
                return 'Q';
            case 5:
                return 'K';
        }
    }

}
codeIsDebugging = false;
let board = new Board();
board.populate();
board.display();
Moves.move(board,'h2','f3');
board.display();
console.log(Moves.moveRange(board,'g6',0));
Moves.move(board,'g6','e6');
board.display();
Moves.move(board,'e6','d6');
Moves.move(board,'d6','c6');
board.display();
console.log(Moves.moveRange(board,'c6',1));
Moves.move(board,'c6','b7');
board.display();