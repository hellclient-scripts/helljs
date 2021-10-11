(function (app) {
    let Npc = Include("core/npc/npc.js")
    let Patrolman = function () {
        Npc.call(this)
    }
    Patrolman.prototype = Object.create(Npc.prototype)
    return Patrolman
})(App)