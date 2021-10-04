world.Note("加载helljs机器人")
onOpen=function (){

}

onClose=function (){

}

onConnected=function (){

}

onDisconnected=function (){

}

onAssist=function(){
    App.UIAssistantShow()
}

onBroadcast=function(msg,global,channel,global){
    
}
onBuffer=function(data){
    if (data.length>7 && data.substr(-8)=="[1;33m> "){
        return true
    }
    return false
}
function Include(file){
    return eval(world.ReadFile(file),file)
}
Include("util.js")
Include("app.js")
App.Start()