(function(app){
    let check=Include("core/check/check.js")
    app.Data.Items=[]
    app.Data.LastItem=0
    app.Data.Equipments=[]
    app.Data.Load=0
    app.Bind("Check","core.item.item")
    let checkItem=(new check("item")).WithLevel(app.CheckLevelBrief).WithCommand("i").WithIntervalParam("checkiteminterval").WithLastID("LastItem")
    app.RegisterCallback("core.item.item",checkItem.Callback())
    app.Core.OnItem=function(name, output, wildcards){
        app.Data.Items=[]
        app.Data.Equipments=[]
        app.Data.Load=wildcards[0]-0
        world.EnableTriggerGroup("item",true)
    }
    app.Core.OnItemNoItem=function(name, output, wildcards){
        app.Data.Items=[]
        app.Data.Equipments=[]
        app.Data.Load=0
    }
    app.Core.OnItemObj=function(name, output, wildcards){
        let item={ID:wildcards[2],Name:wildcards[1]}
        app.Data.Items.push(item)
        if (wildcards[0]=="□"){
            app.Data.Equipments.push(item)
        }
    }
    app.Core.OnItemObjEnd=function(name, output, wildcards){
        world.EnableTrigger("itemobj",false)
        world.EnableTrigger("itemobjend",false)
        world.EnableTriggerGroup("itemweapon",true)
    }
    app.RegisterCallback("core.item.inittags",function(){
        let cashname =app.GetItemObj("Cash")
        let cash=0
        let goldname =app.GetItemObj("Gold")
        let gold=0
        let silvername =app.GetItemObj("Silver")
        let silver=0
        if (cashname){
            cash=CNumber.Split(cashname).Count
        }
        if (goldname){
            gold=CNumber.Split(goldname).Count
        }
        if (silvername){
            silver=CNumber.Split(silvername).Count
        }
        Mapper.settag("rich",cash*1000+gold*100+silver>10)
    })
    app.Bind("PathInit","core.item.inittags")
    app.GetItemObj=function(id,lowercase){
        if (lowercase){
            id=id.toLowerCase()
        }
        for (var key in app.Data.Items){
            let itemid= app.Data.Items[key].ID
            if (lowercase){
                itemid=itemid.toLowerCase()
            }
            if (itemid==id){
                return app.Data.Items[key].Name
            }
        }
        return null
    }
})(App)