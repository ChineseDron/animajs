var animaHeadTag = document.getElementsByTagName( 'head' )[0];

//(function() {
function _(el) {

	this.self = this;
	this.animationEnd = '';
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
				break;
			}
		}

		switch (this.prfix) {
			case "Moz" :
				this.animationEnd = "animationend";
			break;

			case "Webkit" :

				this.animationEnd = "webkitAnimationEnd";
			break;

			case "O" :
				this.animationEnd = "transitionend";
			break;
		}

	},

	//@void Update the css after the animation
	updateCss : function (el,obj) {
		var temp = el.style.cssText;
		console.log(temp);
		el.style.cssText = temp + obj;
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

	//@void Prevent the bubble effect
	stopp : function () {
		if( this.addStyle === undefined ) return this; 
		var newStyles = '';
		//console.log(this.styles);
		//Edited cssToStr Method. Who get the actual position and transform it in css string
	
		var getStyles = window.getComputedStyle(this.el[0],null); 
		
		
		for(var key in this.styles) {
			newStyles += key + ':' + getStyles.getPropertyValue(key) + ';';
		}
		//console.log(this.addStyle);
		
		this.updateCss(this.el[0], newStyles);

		animaHeadTag.removeChild( this.addStyle );
	
		this.el[0].style[this.prfix + "Animation"] = '';
		
		

		//console.log(newStyles);
		this.addStyle = undefined;

		return this;
		
	},

	//This function decided how we should end the trans/anim, deleting his keyframes or styles
	transitionEnd : function (el, addStyle, styles) {
		var self = this.self;
		
		el.addEventListener( 
     			
 			self.animationEnd, 
 			
 			function( event ) { 

  				//if( self.addStyle !== undefined ) animaHeadTag.removeChild( self.addStyle );
 				if( self.addStyle !== undefined ) {
					animaHeadTag.removeChild( self.addStyle );
					self.addStyle = undefined;
				}
 				this.style[self.prfix + 'Animation'] = '';
 				
 				self.updateCss( this,self.cssToStr( styles,true ) );				
 				
 			}, true 

     	);
	},

	//@void - Prepare everything to do the animation part, This should work like jQuery Animations
	animate : function (styles,speed) {
		this.styles = styles;
		//console.log("hola");
		for( var n = 0 ;n < this.el.length ; n ++ ) {
			//this.element = this.el[n];
			
			var keyframes  = this.prfixKey + 'nextMove {' +
							 'to {' + this.cssToStr(styles) + '} }' ;
			
			this.addStyle = document.createElement("style");
			this.addStyle.innerHTML = keyframes;
			animaHeadTag.appendChild(this.addStyle );
			
			this.el[n].style[this.prfix + 'Animation'] = 
				"nextMove " + speed + "ms" +
				" linear 0s 1 normal forwards";

			this.transitionEnd( this.el[n],this.addStyle,this.styles );
			return this.self;
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

