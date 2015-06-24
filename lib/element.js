'use strict';

// EQUAL //

/**
* FUNCTION: eq( x, y, strict )
*	Checks whether input element x is equal to y
*
* @private
* @param {Number} x - input value
* @param {*} y - comparator
* @param {Boolean} strict - option indicating whether to enforce type equality
* @returns {Number} 1 if element is equal, 0 otherwise
*/
function eq( x, y, strict ) {
	if ( strict ) {
		return x === y ? 1 : 0;
	} else {
		/* jshint eqeqeq:false */
		return x == y ? 1 : 0;
	}
} // end FUNCTION eq()

// EXPORTS //

module.exports = eq;
