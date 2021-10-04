(function(app){
    app.Data.Firstline=""
    app.Core.OnLine=function(name, output, wildcards){
        let ls = world.GetLinesInBufferCount ();
        let st = world.GetLineInfo(ls, 11);
        if (world.GetStyleInfo (ls, st, 1)=="> " && world.GetStyleInfo (ls, st, 14)==world.BoldColour(4)){
                return
        }
        if (app.Data.Firstline==""){
                app.Data.Firstline=output
        }
    }
})(App)