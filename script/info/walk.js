(function(app){
    app.RegisterCallback("info.walk.lost",function(move){
        app.NewMove("locate",5,"info.walk.walkagain",{Data:move}).Start()
    })
    app.RegisterCallback("info.walk.walkagain",function(move){
        world.Note("walkagain")
        if (move){
            move.Start()
        }
    })
    app.Bind("MoveLost","info.walk.lost")
})(App)