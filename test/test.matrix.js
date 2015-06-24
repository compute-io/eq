/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	eq = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix eq', function tests() {

	var out1, out2,
		mat,
		d1,
		d2,
		d3,
		i;

	d1 = new Uint8Array( 25 );
	d2 = new Uint8Array( 25 );
	d3 = new Uint8Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = ( i === 5 ) ? 1 : 0;
		d3[ i ] = 1;
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'uint8' );
		out1 = matrix( d2, [5,5], 'uint8' );
		out2 = matrix( d3, [5,5], 'uint8' );
	});

	it( 'should export a function', function test() {
		expect( eq ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			eq( matrix( [10,10] ), mat, 1 );
		}
	});

	it( 'should throw an error if provided a matrix to be compared which is not of equal length to the input matrix', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			eq( matrix( [5,5] ), mat, matrix( [10,10] ) );
		}
	});

	it( 'should compare each matrix element with a scalar', function test() {
		var actual;

		actual = matrix( [5,5], 'uint8' );
		actual = eq( actual, mat, 5 );

		assert.deepEqual( actual.data, out1.data );
	});

	it( 'should compare two matrices with each other element-wise', function test() {
		var actual;

		actual = matrix( [5,5], 'uint8' );
		actual = eq( actual, mat, mat );

		assert.deepEqual( actual.data, out2.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( eq( out, mat, 1 ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( eq( out, mat, 1 ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( eq( out, mat, 1 ).data, expected );
	});

});
