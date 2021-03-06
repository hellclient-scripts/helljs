(function (app) {
    let produce = Include("core/produce/produce.js")
    app.RegisterCallback("core.produce.goods.arrive",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.Send(app.CurrentTask.Item.Command)
            app.Send("i")
            app.CheckBusy("core.produce.goods.finish")
        }
    })
    app.RegisterCallback("core.produce.goods.finish",function(){
        if (app.GetTaskID() =="produce.goods"){
            app.CurrentTask.Finish(app.CurrentTask.Item)
        }
    })    
    let Goods=function(){
        produce.call(this, "produce.goods")
        this.Execute = function (data, onFinish, onFail) {
            produce.prototype.Execute.call(this, data, onFinish, onFail)
            let move=app.NewMove("walk",this.Item.Location,"core.produce.goods.arrive",{})
            move.onFail="core.task.fail"
            move.Start()
        }
    }
    Goods.prototype = Object.create(produce.prototype)
    app.RegisterTask(new Goods())
})(App)