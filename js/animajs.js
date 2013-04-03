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
				return true;
			}
		}

	},

	//@void Update the css after the animation
	updateCss : function (el,obj) {
		el.style.cssText = this.cssToStr(obj,true);
	},

	//@ return just the element selector
	sel : function () { return this.el },

	//@ Transform an object with css data into a string
	cssToStr : function (obj,camel) {
		
		camel = (typeof camel !== 'undefined') ? camel : false;
		var cssTemp = "";
		
		for (var key in obj) {
			
			if (camel === false) cssTemp += key + ':' + obj[key] + ';' ;
				else cssTemp += cssCamel(key) + ':' + obj[key] + ';' ;
		
		}
		
		return cssTemp;

	},

	//This function decided how we should end the trans/anim, deleting his keyframes or styles
	transitionEnd : function (el, addStyle, style) {
		var self = this.self;
		var animationEnd = '';

		switch (this.prfix) {
			case "Moz" :
				animationEnd = "transitionend";
			break;

			case "Webkit" :
				animationEnd = "webkitAnimationEnd";
			break;

			case "O" :
				animationEnd = "transitionend";
			break;
		}

		el.addEventListener( 
     			
 			animationEnd, 
 			
 			function( event ) { 
 				this.style[self.prfix + 'Animation'] = '';
     			document.getElementsByTagName( 'head' )[ 0 ].removeChild( addStyle );
     			//alert( "Finished transition!" ); 
 				self.updateCss(this,style);
 			}, false 

     	);
	},

	//@void - Prepare everything to do the animation part, This should work like jQuery Animations
	animate : function (style,speed) {
		//this.self.cssToStr();
		for( var n = 0 ;n < this.el.length ; n ++ ) {
		
			self = this.self;

			this.el[n].style[this.prfix + 'Animation'] = 
				"nextMove " + speed + "ms" +
				" ease-in-out 0s 1 normal forwards";
			
			var keyframes  = this.prfixKey + 'nextMove {' +
							 'to {' + this.cssToStr(style) + '} }' ;
			
			var addStyle = document.createElement("style");
			addStyle.innerHTML = keyframes;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( addStyle );
			
			this.transitionEnd( this.el[n],addStyle,style );
							
		}

	},


}

//Private Methods	

function cssCamel(obj) {
	
	var index = obj.split('-');

	if (index.length > 1) {
		
		var temp = index[0];
	
		for( var n = 1; n < index.length ; n ++ ) {
			temp +=  index[n][0].toUpperCase() + index[n].slice(1);
		}

		return temp;
	}
	return obj;
}

//})(window);

