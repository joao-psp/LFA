;(function(global){

	var Regex = function(JsonIn){
		return new Regex.init(JsonIn);
	};

	Regex.prototype = {
		outVar: function() {
			console.log(
				"E     = " + this.E +
				"\nSig   = " + this.Sig +
				"\nTrans = " + this.af +
				"\nI     = " + this.I +
				"\nF     = " + this.F +
				"\nR     = " + this.r
			);
		},
		regexOut: function(){

			var i, f;
			var transi;
		}
	};

	Regex.init = function(JsonIn){

		let self = this; 

		self.E = JsonIn["af"][0];
		self.Sig = JsonIn["af"][1];
		self.Delta =  0;
		self.I =  JsonIn["af"][(JsonIn["af"].length) -2];
		self.F =  JsonIn["af"][(JsonIn["af"].length)- 1];
		self.af = JsonIn["af"][2] || {};
		self.r = JsonIn["r"] || [];

	};

	Regex.init.prototype = Regex.prototype;

	global.Regex = global.$R = Regex;

}(window));


