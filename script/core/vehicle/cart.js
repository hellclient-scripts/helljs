(function (app) {
    let Vehicle = Include("core/vehicle/vehicle.js")
    let Cart = function () {
        Vehicle.call(this)
        this.TagDrive=true
        this.ID="cart"
        this.Sender=function(cmd){
            app.Send(this.ConvertDrivePath("drive cart ",cmd))
        }
    }
    Cart.prototype = Object.create(Vehicle.prototype)
    return Cart
})(App)