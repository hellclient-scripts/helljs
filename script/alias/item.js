(function(app) {
    app.Core.OnAliasItem = function (name, line, wildcards) {
        app.Produce(wildcards[0])
    }    
})(App)

