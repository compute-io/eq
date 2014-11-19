/**
*
*	COMPUTE: eq
*
*
*	DESCRIPTION:
*		- Computes an element-wise comparison (equality) of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );


// EQUAL //

/**
* FUNCTION: eq( arr, x[, opts] )
*	Computes an element-wise comparison (equality) of an array.
*
* @param {Array} arr - input array
* @param {*} x - comparator
* @param {Object} [opts] - function options
* @param {Boolean} [opts.strict] - option indicating whether to enforce type equality (default: true)
* @param {Boolean} [opts.array] - option indicating whether to not perform element-by-element comparison when provided arrays of equal length (default: false)
* @returns {Array} array of 1s and 0s, where a `1` indicates that an input array element is equal to a compared value and `0` indicates that an input array element is not equal to a compared value
*/
function eq( arr, x, opts ) {
	var isArray = Array.isArray( x ),
		strict = true,
		arrCompare = false,
		out,
		len,
		i;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'eq()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'eq()::invalid input argument. Options must be an object.' );
		}
		if ( opts.hasOwnProperty( 'strict' ) ) {
			strict = opts.strict;
			if ( typeof strict !== 'boolean' ) {
				throw new TypeError( 'eq()::invalid input argument. Strict option must be a boolean.' );
			}
		}
		if ( opts.hasOwnProperty( 'array' ) ) {
			arrCompare = opts.array;
			if ( typeof arrCompare !== 'boolean' ) {
				throw new TypeError( 'eq()::invalid input argument. Array option must be a boolean.' );
			}
		}
	}
	len = arr.length;
	out = new Array( len );
	if ( strict ) {
		if ( !isArray || x.length !== len || arrCompare ) {
			for ( i = 0; i < len; i++ ) {
				if ( arr[ i ] === x ) {
					out[ i ] = 1;
				} else {
					out[ i ] = 0;
				}
			}
			return out;
		}
		for ( i = 0; i < len; i++ ) {
			if ( arr[ i ] === x[ i ] ) {
				out[ i ] = 1;
			} else {
				out[ i ] = 0;
			}
		}
		return out;
	}
	if ( !isArray || x.length !== len || arrCompare ) {
		for ( i = 0; i < len; i++ ) {
			/* jshint eqeqeq:false */
			if ( arr[ i ] == x ) {
				out[ i ] = 1;
			} else {
				out[ i ] = 0;
			}
		}
		return out;
	}
	for ( i = 0; i < len; i++ ) {
		/* jshint eqeqeq:false */
		if ( arr[ i ] == x[ i ] ) {
			out[ i ] = 1;
		} else {
			out[ i ] = 0;
		}
	}
	return out;
} // end FUNCTION eq()


// EXPORTS //

module.exports = eq;
