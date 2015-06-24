/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Cast arrays to a different data type
	cast = require( 'compute-cast-arrays' ),

	// Module to be tested:
	eq = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-eq', function tests() {

	it( 'should export a function', function test() {
		expect( eq ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid accessor option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				eq( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should compare two primitives for equality', function test() {
		assert.strictEqual( eq( 1, '1', {
			'strict': false
		}), 1 );
		assert.strictEqual( eq( 1, '1', {
			'strict': true
		}), 0 );
	});

	it( 'should perform an element-wise equality check for a plain array', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = [
			0,
			0,
			1,
			0
		];

		actual = eq( data, 2 );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = eq( data, 2, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

	});

	it( 'should perform an element-wise equality check when provided a plain array and another array', function test() {
		var data, actual, expected, y;

		data = [ null, 2, 3, null ];
		y = [ null, 2, 1, 1 ];
		expected = [
			1,
			1,
			0,
			0
		];

		actual = eq( data, y );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = eq( data, y, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

	});

	it( 'should perform an element-wise equality check when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 1 ] );

		expected = new Uint8Array( [
			0,
			1,
			0,
			1
		]);

		actual = eq( data, 1 );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = eq( data, 1, {
			'copy': false
		});
		expected = new Int8Array( [ 0, 1, 0, 1 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should perform an element-wise equality check when provided two typed arrays', function test() {
		var data, actual, expected, y;

		data = new Int8Array( [ 2, 3, 4, 5 ] );
		y = new Int32Array( [ 2, 3, 4, 5 ] );

		expected = new Uint8Array( [
			1,
			1,
			1,
			1
		]);

		actual = eq( data, y );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:

		actual = eq( data, y, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 1, 1, 1 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should perform an element-wise equality check using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,true],
			[4,1],
			[5,'1'],
			[6,2]
		];

		expected = [
			1,
			1,
			1,
			0
		];

		actual = eq( data, 1, {
			'accessor': getValue,
			'strict': false
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = eq( data, 1, {
			'accessor': getValue,
			'strict': false,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should perform an element-wise equality check for two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = eq( data, y, {
			'accessor': getValue
		});

		expected = [
			1,
			1,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should perform an element-wise equality check when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Uint8Array( 100 );
		d3 = new Uint8Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = ( i === 50 ) ? 1 : 0;
			d3[ i ] = 1;
		}

		// element-wise equality of matrix and scalar
		mat = matrix( d1, [10,10], 'int32' );
		out = eq( mat, 50 );

		assert.deepEqual( out.data, d2 );

		// element-wise equality of two matrices
		mat = matrix( d1, [10,10], 'int32' );
		out = eq( mat, mat );

		assert.deepEqual( out.data, d3 );

		// eq matrix and scalar and mutate...
		out = eq( mat, 50, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, cast( d2, 'int32' ) );
	});


	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( eq( [], 1 ), [] );
		assert.deepEqual( eq( matrix( [0,0] ), 1 ).data, matrix( [0,0], 'uint8' ).data );
		assert.deepEqual( eq( new Int8Array(), 1 ), new Uint8Array() );
	});

});
