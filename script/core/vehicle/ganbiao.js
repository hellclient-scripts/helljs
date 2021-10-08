(function (app) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Ganbiao = function () {
        Vehicle.call(this)
        this.ID="ganbiao"
        this.TagDrive=true
        this.Sender=function(cmd){
            app.Send(this.ConvertDrivePath("gan biao che to ",cmd))
        }
    }
    Ganbiao.prototype = Object.create(Vehicle.prototype)
    return Ganbiao
})(App)