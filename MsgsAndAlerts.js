
const colors={
    white:"Brancas",
    black:"Pretas"
}

const roomAndCode={
    roomWithOnePlayer:()=> "Esta sala já foi criada, conecta ao adversário",
    roomUnavailable:()=>"Nesta sala já está acontecendo um jogo, tente outro código",
    connectedRoom:(code)=>"Conectado a sala " + code,
    noExistRoom:()=>"Está sala não existe, cria esta sala.",
    waitAgain:()=>"Não é sua vez de jogar, aguarde." ,
    reconnectRoom:()=>"Sala reconectada",
    roomNotReconnected:()=>"Sala não reconectada",
    runningGame:()=>"Possivelmente existe uma aba de jogo aberta, feche e recarregue esta. Caso não estiver, recarregue a página após 5 segundos."
}

const connection={
    noConnection:()=>"Sem conexão com o servidor, aguarde ou jogue local.",
    errServer:()=>"Ocorreu um erro no servidor, por favor recarregue a página.",
    place:()=>"Jogo Local",
    waitAdv:()=>"Aguardando adversário",
    connected:(playerName)=>"Adversário(a) "+ playerName
}

const checksPiece={
    checkMate:(color)=> "Xeque-Mate nas Peças " + colors[color],
    check:(color)=>"Xeque nas Peças " + colors[color],
    noCheck:()=>""
}

const checksPlayers={
    checkMate:(playerName)=>"Xeque-Mate no(a) Jogador(a) " + playerName,
    check:(playerName)=>"Xeque no(a) Jogador(a) " + playerName,
    noCheck:()=>""
}
    
const endGame={
    winPiece:(color)=>"Vitória das Peças " + colors[color],
    winPlayer:(playerName)=>"Vitória do(a) Jogador(a) " + playerName,
    giveUpPlayer:(playerName)=>"Desistência do(a) Jogador(a) " + playerName,
    draw:()=>"Jogo empatado",
    timeOutToMovePiece:(color)=>"Tempo esgotado para mover Peças " + colors[color],
    timeOutToMovePlayer:(playerName)=>"Tempo esgotado para mover Jogador(a) " + playerName
}

const startGame={
    startGame:()=>"Jogo iniciado",
    colorPlayer:(color)=>"A cor da sua Peça é " + colors[color],
    noAdv:()=> "Sem adversario"
}

const movement={
    movementPiece:(color)=>"Movimento das Peças " + colors[color],
    movementPlayer:(color,name)=>"Movimento das Peças " + colors[color] + " Jodador(a) " + name,
    return:(color)=>"Retorno das Peças " + colors[color],
    nextColor:(color)=>"Vez das Peças " + colors[color],
    nextPlayer:(name)=>"Vez do Jogador(a) " + name,
    yourTurn:(name)=>name + " sua vez de jogar",
    nextColorAndPlayer:(color,name)=>"Vez das Peças " + colors[color]+" Vez do Jogador(a) " + name,
    incorrectMovement:(color)=>"Erro na jogada das Peças " + colors[color],
    cheatMovement:()=>"Movimento de trapaça",
    endTime:()=>"Tempo esgotado para adversário",
    moveAgain:()=>"Movimenta novamente",
    correctMovement:()=>"Movimento correto"
}
const log={
    connected:(playerName)=>"Conectado com " + playerName,
    gamelog:(msg)=>{
        const time = new Date()
        const hours = formatTime(time.getHours())
        const minutes = formatTime(time.getMinutes())
        const seconds = formatTime(time.getSeconds())
        return `${hours}:${minutes}:${seconds} - ${msg}`
    }
}

const formatTime=(number)=>{
    let stringNumber = number.toString()
    if(stringNumber.length===1){
        stringNumber = "0" + stringNumber
    }
    return stringNumber
}

export default {
    roomAndCode,
    connection,
    checksPiece,
    checksPlayers,
    endGame,
    startGame,
    movement,
    log
}
