//     RouteSwtch
//     (c) simonfan
//     RouteSwtch is licensed under the MIT terms.

define(["require","exports","module","lowercase-backbone","lodash","./__route-swtcher/route-swtch"],function(e,t,n){var r=e("lowercase-backbone"),i=e("lodash"),s=e("./__route-swtcher/route-swtch"),o=r.router.prototype._routeToRegExp,u=n.exports=r.router.extend({initialize:function(t){r.router.prototype.initialize.apply(this,arguments),this.swtches=[],this.route("*",this.execSwtches)},execSwtches:function(t){i.each(this.swtches,function(e){e.exec(t)},this)},swtch:function(t){var n=s();return this.swtches.push(n),i.each(t,function(e,t){if(t==="default")n.when("default",e);else{var r=o(t);n.when(r,e)}}),this}})});