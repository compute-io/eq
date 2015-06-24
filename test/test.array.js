/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	eq = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array eq', function tests() {

	it( 'should export a function', function test() {
		expect( eq ).to.be.a( 'function' );
	});

	it( 'should correctly compare values (non-strict)', function test() {
		var data, expected, actual, tmp;

		tmp = [ 1, 2 ];
		data = [ 0, false, true, null, 5, 'a', tmp ];

		// Single comparison value:
		actual = new Array( data.length );
		actual = eq( actual, data, false, false );
		expected = [ 1, 1, 0, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

		// Array of comparison values:
		actual = new Array( data.length );
		actual = eq( actual, data, [ false, 0, 1, undefined, '5', 4, tmp ], false );
		expected = [ 1, 1, 1, 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly compare values (strict)', function test() {
		var data, expected, actual, tmp;

		tmp = [ 1, 2 ];
		data = [ 0, false, true, null, 5, 'a', tmp ];

		// Single comparison value:
		actual = new Array( data.length );
		actual = eq( actual, data, false, true );
		expected = [ 0, 1, 0, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

		// Array of comparison values:
		actual = new Array( data.length );
		actual = eq( actual, data, [ false, 0, 1, undefined, '5', 4, tmp ], true );
		expected = [ 0, 0, 0, 0, 0, 0, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should treat an equal length comparison array as a single comparison element when the array option is true', function test() {
		var data, expected, actual, tmp;

		tmp = [ 1, 2 ];
		data = [ tmp, 'foo' ];

		// Strict mode:
		actual = new Array( data.length );
		actual = eq( actual, data, tmp, true, true);
		expected = [ 1, 0 ];

		assert.deepEqual( actual, expected );

		// Non-strict mode:
		actual = new Array( data.length );
		actual = eq( actual, data, tmp, false, true );
		expected = [ 1, 0 ];

		assert.deepEqual( actual, expected );
	});


	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( eq( [], [] ), [] );
		assert.deepEqual( eq( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
