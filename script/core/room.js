(function(app){
    app.Data.Room={
        ID:-1,
        Name:"",
        Objs:[],
    }
    var exitsre = new RegExp("[a-z]*[^、 和]", "g");

    app.Core.OnRoomExits=function(name, output, wildcards){
        app.Data.Room.Name=app.Data.Firstline
        app.Data.Room.Objs=[]
        world.EnableTriggerGroup("roomobj",true)
        if (name!="room_noexit"){
            var exits=wildcards[1].match(exitsre).sort()
            app.Data.Room.Exits=exits
        }else{
            app.Data.Room.Exits=[]
        }
        app.Raise("OnRoomExits")
    }
    app.Core.OnRoomObj=function(name, output, wildcards){
        var obj={ID:wildcards[1],Name:wildcards[0]}
        app.Data.Room.Objs.push(obj)
        app.Raise("OnRoomObj",obj)
    }
    app.HasRoomObj=function(id){
        for(var i in app.Data.Room.Objs){
            if (app.Data.Room.Objs[i].ID===id){
                return true
            }
        }
        return false
    }
    app.Core.OnRoomObjEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("roomobj",false)
        app.Raise("OnRoomEnd")
        app.Data.Firstline=""
    }
})(App)