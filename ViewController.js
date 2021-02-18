import viewScreen from "./ViewScreen.js"

export default function viewController(startBoard){
    const view = new viewScreen(startBoard)
    const pieceSelect= {
        name:null,
        refId:null,
        refMovements:[],
        color:null
    }

    const updateInput ={
        allInput:(board)=>{
            updateInput.inputColor(board)
            updateInput.inputPieces(board)
            updateInput.inputCoordinate(board)
        },
        inputColor: (board) => {
            // limpar tabuleiro e input
            view.colorInput.clearAll()
            // iniciar ou reiniciar tabuleiro e input
            view.colorInput.addPiecesColor([board.playerMove])  
        },
        inputPieces: (board) =>{
            view.pieceInput.clearAll()
            const arrayPieces = []
            for(let refId in board.chessBoard){ 
                if(board.chessBoard[refId]!==null){
                    if(board.chessBoard[refId].color==board.playerMove && board.chessBoard[refId].isAtive==true){
                        arrayPieces.push(board.chessBoard[refId].name)
                    }
                }
            }
            arrayPieces.sort()
            view.pieceInput.addPiecesName(arrayPieces)
            view.pieceInput.selectNamePiece("")
        },
        inputCoordinate: (board)=>{
            // Limpar coordenadas e destaque dos movimentos com a mudança de peça
            view.coordinateInput.clearAll()
            // renderizar novas coordenadas e destaque dos movimentos
            const arrayCoordinates = utilities.coordinateSelection(pieceSelect.refMovements)
            view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
            view.coordinateInput.selectNamePiece("")
            // view.chessBoard.highlighSquare.addHighlightSquares(pieceSelect)
        }
    }

    const functionToCallBack= {
        movePiece:[],
        startGameOffline:[],
        startGameOnline:[],
        underHistory:[],
        giveUp:[],
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    this.startGameOffline={
        subscribe(fn){
            functionToCallBack.startGameOffline.push(fn)
        },
        startGame(){
            utilities.clearAllBoard()
            notifyFunctions(functionToCallBack.startGameOffline)
        }
    }
    this.startGameOnline={
        subscribe(fn){
            functionToCallBack.startGameOnline.push(fn)
        },
        startGame(){
            utilities.clearAllBoard()
            // input para digitar a chave
            const key = ""
            notifyFunctions (functionToCallBack.startGameOffline,key)
        }
    }
    this.movePiece={
        subscribe(fn){
            functionToCallBack.movePiece.push(fn)
        }
    }
    this.underHistory={
        subscribe(fn){
            functionToCallBack.underHistory.push(fn)
        }
    }
    this.giveUp={
        subscribe(fn){
            functionToCallBack.giveUp.push(fn)
        }
    }

    view.buttomStart.subscribeToClick(this.startGameOffline.startGame)
    view.pieceInput.subscribeToChange(updateInput.inputCoordinate)
    // view.buttomMove.subscribeToClick(requiredPieceMovement)
    // view.chessBoard.subscribeToClick(updateChessBoard)
    // view.buttomBackMoviment.subscribeToClick(backPreviousMove)
    // view.piecesPromotion.subscribeToClick(changePiecePromotion)

    this.updateBoard=function(board){
        if(pieceSelect.refId){
            view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
        }
        view.chessBoard.renderBoard(board.chessBoard)
        updateInput.allInput(board)
    }

    this.updateHistory=function(history,number){
        view.playHitory.addPlay(number) 
        history.plays[history.number].piecesPlayed.forEach((piece,ind)=>{
            view.playHitory.addImgPiece(piece.img,number)
            view.playHitory.addRefId(utilities.refIdToCoordinate(piece.position),number,"last")
            view.playHitory.addRefId(utilities.refIdToCoordinate(history.plays[history.number].newRefId[ind]),number,"new")
            const imgPieceCaptured = (history.plays[history.number].pieceCaptured && ind!==1)?history.plays[history.number].pieceCaptured.img:null
            view.playHitory.addPieceCaptured(imgPieceCaptured,number)
        })
    }

    this.updateCapturedPieces=function(capturePieces, colorPlayer){
        const top = []
        const bottom=[]
        for(let capturePiece in capturePieces){ 
            if(colorPlayer.top==capturePieces[capturePiece].color){
                top.push(capturePieces[capturePiece].img)
            }
            else{
                bottom.push(capturePieces[capturePiece].img)
            }
        }
        view.capturePiece.colorTop(top) //renderColorTop nome
        view.capturePiece.colorBottom(bottom)
    }

    this.updateStatusGame=function(statusGame){
        if(statusGame.drawn){
            view.informationGame.addinformation("Jogo empatado")
        }
        else if(statusGame.checkMate===true){
            view.informationGame.addinformation(`Xeque-Mate no King ${board.playerMove} - Vitória das Peças ${statusGame.playerWin}`)
        }
        else if(statusGame.endGame===true){
            view.informationGame.addinformation(`Vitória das Peças ${statusGame.playerWin}`)
        }
        else if(statusGame.check===true){
            view.informationGame.addinformation(`Xeque no King ${board.playerMove}`)
        }
        else{
            view.informationGame.clearInformation()
        }
    }

    this.updateStatusConection=function(statusConection){
        // enviar para view renderizar o status do jogo
    }

    this.endGame=function(statusGame){
        if(statusGame.endGame===true){
            view.informationGame.addinformation(`Vitória das Peças ${statusGame.playerWin}`)
        }
        // demonstrar a cor vitoriosa
    }

    const utilities ={
        refIdToCoordinate: function (coordenadasClass){
            let result = coordenadasClass.substring(3)
            //Edita as coordenadas para renderização, trocando o número pela letra usando .charCodeAt
            result = (String.fromCharCode(result.charCodeAt(0)+16))+result.charAt(1)
            return result
            // const conversao = [["1","A"],["2","B"],["3","C"],["4","D"],["5","E"],["6","F"],["7","G"],["8","H"]]
        },
        coordinateSelection (positions){
            const arrayCoordinates = []
            if(positions.length==0){
                arrayCoordinates.push("Sem Movimento")
            }
            else{
                positions.forEach((possibleCoordinate)=>{ 
                    arrayCoordinates.push(utilities.refIdToCoordinate(possibleCoordinate))
                })
                positions.sort()
            }  
            return arrayCoordinates
        },
        clearAllBoard: function(){
            if(pieceSelect.refId){
                view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
            }
            pieceSelect.name=null
            pieceSelect.refId=null           
            pieceSelect.refMovements=[]
            pieceSelect.color=null 
        }
    }

}

