(function(app){
    Metronome.settick(app.GetNumberParam("tick"))
    Metronome.setinterval(app.GetNumberParam("cmdinterval"))
    var _linesre = new RegExp("[^;\n]+", "g");
    var _groupre=new RegExp("[;\n]", "g");
    var _cmdsre = re=/(?:、|·|。)/
    app.Commands={}
    //注册回调为命令
    app.RegisterCommand=function(name,callback){
        app.Commands[name]=callback
    }
    //将命令转换为命令组形式
    app.GroupCmds=function(str){
        if (str == "" || str == null){
            return "";
        }
        return str.replace(_groupre, "、")
    }
    app.RegisterCallback("core.send.send", function (data) {
        if (data) {
            app.Send(data)
        }
    })
    //发送命令
    app.Send=function(str,grouped){
        if (!str){
            return
        }
        if (grouped){
            str=app.GroupCmds(str)
        }
        Metronome.setbeats(app.GetNumberParam("cmdlimit"))
        var echo=app.GetBoolParam("echo")
        //本组命令
        var buf=[]
        //切分命令组
        var groups=str.match(_linesre)
        for (var i=0;i<groups.length;i++){
            var cmds=groups[i].split(_cmdsre)
            for( var j=0;j<cmds.length;j++){
                var cmd=cmds[j]
                if (cmd.length==0){
                    continue
                }
                var prefix=cmd[0]
                //判断是不是命令
                if (prefix=="#"){
                    //命令不能并在分组内
                    if (buf.length){
                        Metronome.push(buf, true, echo)
                        buf=[]
                    }
                    //切分命令，#之后第一个空格之前的为指令，第一个空格后的为数据
                    let directive=new Directive(cmd.substr(1))
                    if (app.Commands[directive.Command]){
                        app.Callbacks[app.Commands[directive.Command]](directive.Data)
                        continue
                    }
                    //未注册命令，检测是否为#20 xxx格式
                    if(!isNaN(directive)){
                        var times=directive-0
                        if (times>0){
                            for(var t=0;t<times;t++){
                                Metronome.push([data], true, echo)
                            }
                            continue
                        }
                    }
                    world.Note("未知的命令: "+directive.Command)
                    continue
                }
                buf.push(cmd)
            }
            //按组发送缓存
            if (buf.length){
                Metronome.push(buf, true, echo)
                buf=[]
            }
        }
    }

})(App)