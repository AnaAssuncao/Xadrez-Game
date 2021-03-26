import msgsAndAlerts from "../MsgsAndAlerts.js"
import networkFlows from "./NetworkUtils.js"
import methodsHTTP from "./MethodsHTTP.js"
const httpMethods = new methodsHTTP()

class router{
    constructor(){
        this.pref="http://localhost:3030/api/v1"
        this.query=null
        this.startNewRoom= this.pref +"/startGame/startNewRoom"
        this.connectInARoom= this.pref + "/startGame/connectInARoom"
        this.updateMovement= this.pref + "/movementGame/updateMovement"
        this.movementIncorret= this.pref +"/movementGame/movementIncorret"
        this.giveUpGame= this.pref +"/giveUpGame"
        this.endGame= this.pref +"/endGame"
        this.prefGetmovement= this.pref +"/movementGame/getMovement?"
        this.prefStatusGame= this.pref +"/statusGame?"
        this.getMovement = null
        this.statusGame = null
    }

    updateQuery(params){this.query=Object.keys(params)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
        .join("&")
        this.getMovement = this.prefGetmovement+this.query
        this.statusGame = this.prefStatusGame+this.query
    }
}

class setup{
    constructor(){
        this.codes={
            room:null,
            player:null
        }
        this.routerUrl= new router()
    }
    updateCodes(statusCodes){
        this.codes.room=statusCodes.roomCode
        this.codes.player=statusCodes.playerCode
    }
}

export default function interfaceNetwork(){
    let networkConf = {}

    const time={
        endConnection:false,
        timeLimit:1000
    }

    const typeStatus={
        errServer:"errServer",
        movementAvailable:"movementAvailable",
        waitAgain:"waitAgain",
        endTimeAdv:"endTimeAdv",
        endTimeMove:"endTimeMove",
        giveUp:"giveUpGame",
        advPlayer: "advPlayer"
    }


    this.sendServer={
        startNewRoom: async(nickAndCode) =>{
            networkConf = new setup()
            const url = networkConf.routerUrl.startNewRoom
            // nickAndCode = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:nickAndCode.name,
                roomCode:nickAndCode.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
            console.log(msgRes)
            if(typeStatus.errServer===msgRes){
                const err=networkFlows.callFunctionByStatusServer(msgRes)
                return err
            }
            else{
                const paramFunstionStatus={
                    statusPlayerAdv:msgRes.statusPlayerAdv,
                    statusCodes:msgRes.statusCodes
                }
                const status=networkFlows.callFunctionByStatusRoom(msgRes.typeStatus,paramFunstionStatus)
                return status
            }
        },

        async connectInARoom(nickAndCode){
            networkConf = new setup()
            const url = networkConf.routerUrl.connectInARoom
            // nickAndCode = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:nickAndCode.name,
                roomCode:nickAndCode.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
            if(typeStatus.errServer===msgRes){
                const err=networkFlows.callFunctionByStatusServer(msgRes)
                return err
            }
            else{
                const paramFunstionStatus={
                    statusPlayerAdv:msgRes.statusPlayerAdv,
                    statusCodes:msgRes.statusCodes
                }
                const status= networkFlows.callFunctionByStatusRoom(msgRes.typeStatus,paramFunstionStatus)
                return status
            }
        },

        moveGame: async(move) =>{
            const url = networkConf.routerUrl.updateMovement
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                movement:move
            }
            const msgRes = await httpMethods.post(objSend,url)
            if(typeStatus.errServer===msgRes){
                const status=networkFlows.callFunctionByStatusServer(msgRes)
                return status
            }
            else{
                const status=networkFlows.callFunctionByStatusMovement(msgRes.typeStatus)
                return status
            } 
        },

        movementIncorret:function(){
            const url = networkConf.routerUrl.movementIncorret
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                movementIncorret:true
            }
            const msgRes = httpMethods.post(objSend,url)
            if(typeStatus.errServer===msgRes){
                const err=networkFlows.callFunctionByStatusServer(msgRes)
                notifyFunctions(functionToCallBack.errConnection,err)
                return err
            }
        },

        giveUp: async() =>{
            const url = networkConf.routerUrl.giveUpGame
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                giveUp:true
            } 
            const msgRes = await httpMethods.post(objSend,url)
            if(typeStatus.errServer===msgRes){
                const err=networkFlows.callFunctionByStatusServer(msgRes)
                notifyFunctions(functionToCallBack.errConnection,err)
                return err
            }
            return msgRes
        },
        endGame: async() =>{
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                endGame:true
            } 
            const url = networkConf.routerUrl.endGame
            const msgRes = await httpMethods.post(objSend,url)
            if(typeStatus.errServer===msgRes){
                const err=networkFlows.callFunctionByStatusServer(msgRes)
                notifyFunctions(functionToCallBack.errConnection,err)
                return err
            }
            return msgRes
        }
    }
   
    this.enableCalls={
        moveAdversary: ()=>{
            const url = networkConf.routerUrl.getMovement
            setTimeMoveAdv(url)
        },
        playerConnection: ()=>{
            const url = networkConf.routerUrl.statusGame
            setTimePlayer(url)
        },
        statusGame: ()=>{ 
            const url = networkConf.routerUrl.statusGame
            setTimeStatusGame(url)
        }
    }

    function setTimeMoveAdv(url,timeCounter=0,timeLimit=6){
        setTimeout(
            async()=>{
                const msgRes = await httpMethods.get(url)
                if(typeStatus.errServer===msgRes){
                    const err=networkFlows.callFunctionByStatusServer(msgRes)
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.typeStatus===typeStatus.movementAvailable){
                    const paramFunstionStatus={
                        move:msgRes.move
                    }
                    const status = networkFlows.callFunctionByStatusMovement(msgRes.typeStatus,paramFunstionStatus)
                    notifyFunctions(functionToCallBack.moveAdversary,status)
                }
                else if(timeCounter===timeLimit){
                    const status = networkFlows.callFunctionByStatusGame(typeStatus.endTimeMove)
                    notifyFunctions(functionToCallBack.playerConnection,status)
                }
                else if(msgRes.statusGame.giveUp===false || msgRes.statusGame.endGame===false){
                    timeCounter++
                    setTimeMoveAdv(url,timeCounter)
                }
            },time.timeLimit)
    }

    function setTimePlayer(url,timeCounter=0,timeLimite=2){
        setTimeout(
            async()=>{
                const msgRes = await httpMethods.get(url)
                if(typeStatus.errServer===msgRes){
                    const err=networkFlows.callFunctionByStatusServer(msgRes)
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.statusPlayerAdv.namePlayer!==null){
                    const paramFunstionStatus={
                        statusPlayerAdv:msgRes.statusPlayerAdv
                    }
                    const statusPlayerAdv= networkFlows.callFunctionByStatusGame(typeStatus.advPlayer,paramFunstionStatus)
                    notifyFunctions(functionToCallBack.playerConnection,statusPlayerAdv)
                }
                else if(timeCounter===timeLimite){
                    const status = networkFlows.callFunctionByStatusGame(typeStatus.endTimeAdv)
                    notifyFunctions(functionToCallBack.playerConnection,status)
                }
                else{
                    timeCounter++
                    setTimePlayer(url,timeCounter)
                }
            },time.timeLimit)
    }

    function setTimeStatusGame(url){
        const waitInf = 
        setInterval(
            async()=>{
                const status = await httpMethods.get(url)
                if(typeStatus.errServer===status){
                    clearInterval(waitInf) 
                    const err=networkFlows.callFunctionByStatusServer(msgRes)
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(status.statusGame.giveUp===true || status.statusGame.endGame===true){
                    clearInterval(waitInf)
                    if(status.statusPlayerAdv.giveUp===true){
                        const statusGiveUp=networkFlows.callFunctionByStatusGame(typeStatus.giveUp)
                        notifyFunctions(functionToCallBack.giveUp,statusGiveUp)
                    }
                }
        },time.timeLimit)
    }

    const functionToCallBack= {
        moveAdversary:[],
        informationStart:[],
        giveUp:[],
        endGame:[],
        playerConnection:[], 
        errConnection:[]
    }

    this.subscribeMoveAdversary=function(fn){
        functionToCallBack.moveAdversary.push(fn)   
    }
    this.subscribeInformationStart=function(fn){
        functionToCallBack.informationStart.push(fn)
    }
    this.subscribeEndGame=function(fn){
        functionToCallBack.endGame.push(fn)
    }
    this.subscribeGiveUp=function(fn){
        functionToCallBack.giveUp.push(fn)
    }
    this.subscribePlayerConnection=function(fn){
        functionToCallBack.playerConnection.push(fn)
    }
    this.subscribeErrConnection=function(fn){
        functionToCallBack.errConnection.push(fn)
    }
    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    networkFlows.subscribeUpdateCode(updatesStartRoom)

    function updatesStartRoom(statusCode){
        networkConf.updateCodes(statusCode)
        networkConf.routerUrl.updateQuery(statusCode)
    }
}