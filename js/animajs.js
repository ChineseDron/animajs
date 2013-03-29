//(function() {
function _(el) {

	if (window === this) {
    	return new _(el);
	}

	this.selector = el;
	this.el = document.querySelectorAll(el);
	return this;
}


_.prototype = {
	
	browserPrefix : function () {
		
		var prefixList = ["" , "moz" , "webkit", "o"];

	},

	sel : function () { return this.el },

	animate : function (obj,speed) {
		for( var n = 0 ;n < this.el.length ; n ++ ) {

			//console.log(this.el[n].getAttribute("id"));
			//this.el[n].style.WebkitAnimation="nextMove 2s ease-in-out 0s 1 alternate"
			var keyframes  = '@-webkit-keyframes nextMove {' +
							 'to { left : 300px; } }' ;
			
			var addStyle = document.createElement("style");
			addStyle.innerHTML = keyframes;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( addStyle );
			
		}

		return this;
	},


}

//})(window);

