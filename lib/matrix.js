'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' );

// FUNCTIONS //

var EQUAL = require( './element.js' );


// EQUAL //

/**
* FUNCTION: eq( out, x, y, strict )
*	Computes an element-wise comparison (equality) of a matrix
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a scalar
* @param {Boolean} strict - boolean indicating whether to enforce type equality
* @returns {Matrix} output matrix of 1s and 0s, where a `1` indicates that an input element is equal to a compared value and `0` indicates that an input element is not equal to a compared value
*/
function eq( out, x, y, strict ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'eq()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( 'eq()::invalid input arguments. Matrix to be compared must have the same number of rows and columns as the input matrix.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, EQUAL( x.get( i, j ), y.get( i, j ), strict ) );
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = EQUAL( x.data[ i ], y, strict);
		}
	}
	return out;
} // end FUNCTION eq()


// EXPORTS //

module.exports = eq;
