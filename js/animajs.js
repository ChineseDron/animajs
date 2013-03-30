//(function() {
function _(el) {

	this.self = this;

	if (window === this) {
    	return new _(el);
	}
	var prfix = '' , 
		prfixKey = '';

	this.selector = el;
	this.el = document.querySelectorAll(el);
	

	this.browserPrefix();

	//Private Methods
	
	return this;
}


_.prototype = {
	
	//@return Browser Prefix
	browserPrefix : function () {
	
		var prefixList = ["Moz" , "Webkit", "O"];

		for( var n = 0 ;n < prefixList.length; n ++ ) {
			var prefixTemp = prefixList[n] + "AnimationName";
		
			if( this.el[0].style[prefixTemp] !== undefined ) {
				this.prfix = prefixList[n];
				this.prfixKey = '@-' + this.prfix.toLowerCase() + '-keyframes ';
			}
		}

	},

	//@ return just the element selector
	sel : function () { return this.el },

	cssToStr : function (obj) {
		var cssTemp = "";
		for (var key in obj) {
			cssTemp += key + ':' + obj[key] + ';'
		}
		
		return cssTemp;

	},

	//@void - Prepare everything to do the animation part
	animate : function (obj,speed) {
		//this.self.cssToStr();
		for( var n = 0 ;n < this.el.length ; n ++ ) {
			//console.log( this.self.cssToStr(obj) );
			//console.log(this.el[n].getAttribute("id"));

			this.el[n].style[this.prfix + 'Animation'] = 
				"nextMove " + speed + "ms" +
				" ease-in-out 0s 1 normal forwards";
			
			var keyframes  = this.prfixKey + 'nextMove {' +
							 'to {' + this.cssToStr(obj) + '} }' ;
			
			var addStyle = document.createElement("style");
			addStyle.innerHTML = keyframes;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( addStyle );
			
		}

	},


}

//})(window);

