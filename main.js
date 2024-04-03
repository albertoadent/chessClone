function squareToArr(desiredSquare){
    if(desiredSquare.length != 2) return null;
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
    return arr;
}
function abbrevPieceToLetter(piece){
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
function letterToPieceName(letter){
    switch(piece.toUpperCase()){
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
    move(startingSquare,destinationSquare){
        /*
        if starting square null return false
        if destination square occupied by same color team return false
        otherwise set starting sqare to null and set destination square to pice that was on starting square
        then return true
        */
       if(this.isDebugging) console.log('moving ' + startingSquare + ' to ' + destinationSquare);
       let startArr=squareToArr(startingSquare);
       let startSq = this.squares[startArr[0]][startArr[1]];
       let endArr=squareToArr(destinationSquare);
       let endSq = this.squares[endArr[0]][endArr[1]];
       if(this.isDebugging) if(endSq != null) console.log(endSq.getSymbol()); else if(endSq === null) console.log('null');
       endSq = startSq;
       if(this.isDebugging) console.log(endSq.getSymbol());
       this.squares[endArr[0]][endArr[1]] = endSq;
       this.squares[startArr[0]][startArr[1]] = null; 
       startSq = null;
    }
    canMove(startingSquare,destinationSquare){
       let startArr=squareToArr(startingSquare);
       let startSq = this.squares[startArr[0]][startArr[1]];
       let endArr=squareToArr(destinationSquare);
       let endSq = this.squares[endArr[0]][endArr[1]];
       if (startSq === null) return false;
       if (endSq === null); else if (startSq.getIsWhite() == endSq.getIsWhite()) return false;
       return true;
    }
    moveRange(dir){
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

        /*
        for pawns check to see if they are on their starting line based on their color if direction is even
        check for opposite color if pawn direction is odd
        for bishops make sure thier direction is odd
        for rooks make sure thier direction is even
        for kings just make sure they aren't going after their own piece
        then with bishops rooks and queens we iterate in the chosen direction until we run into our own peice in which case we iterate backwards, or simply stop if we ruin into another peice
        return the number of iterations
        */
    }
    straightMove(){

    }
    diagonalMove(){

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

let board = new Board();
board.populate();
board.display();
board.move('h2','f3');
board.display();