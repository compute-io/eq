'use strict';

// MODULES //'

var isArrayLike = require( 'validate.io-array-like' );

// FUNCTIONS //

var EQUAL = require( './element.js' );


// EQUAL //

/**
* FUNCTION: eq( out, x, y, strict[, array ] )
*	Computes an element-wise comparison (equality) of an array.
*
* @param {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - input array
* @param {*} y - comparator
* @param {Boolean} strict - boolean indicating whether to enforce type equality
* @param {Boolean} [array=false] - boolean indicating whether to not perform element-by-element comparison when provided arrays of equal length
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} array of 1s and 0s, where a `1` indicates that an input array element is equal to a compared value and `0` indicates that an input array element is not equal to a compared value
*/
function eq( out, x, y, strict, array ) {
	var len = x.length,
		i;

	if ( !isArrayLike( y) || y.length !== len || array ) {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = EQUAL( x[ i ], y, strict );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = EQUAL( x[ i ], y[ i ], strict );
		}
	}

	return out;
} // end FUNCTION eq()


// EXPORTS //

module.exports = eq;
