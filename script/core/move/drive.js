(function (app) {
    let patrol = Include("include/patrol.js")
    let patrolmove = Include("core/move/patrol.js")
    let _drivepath=Include("include/drivepath.js")
    let Drive = function (mode, target, onFinish, options) {
        this.Command=""
        patrolmove.call(this, mode, target, onFinish, options)
        this.OnStart=function(){
            if (!app.Data.Room.ID) {
                this.Stop()
                app.Raise("MoveLost",this)
                return
            }
            var target = this.Target
            if (typeof (target) == "string") {
                target = [target]
            }
            Mapper.settag("drive",true)
            var path = App.API.GetPath(app.Data.Room.ID, target)
            Mapper.settag("drive",false)
            if (path == null) {
                this.Stop()
                world.Note("无法找到从[" + app.Data.Room.ID + "]到[" + target.join(",") + "]的路径")
                app.Raise("MoveNopath")
                return
            }
            this.Context = new patrol(path.Path)
            App.Send("l")
        }
        this.Send=function(command){
            let cmd=_drivepath[command]
            if (!cmd){
                throw "无效的drivepath"+command
            }
            cmd=cmd.replace("%1",this.Command)
            app.Send(cmd)
        }
        this.OnRoomObjEnd = function () {
            if (this.Ignore){
                this.Ignore=false
                return;
            }
            app.Raise("MoveArrive",this.Context.NextStep())
            app.CheckBusy("core.move.nobusy")            
        }
    }
    return Drive;
})(App)