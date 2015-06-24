/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	eq = require( './../lib/element.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'element eq', function tests() {

	it( 'should export a function', function test() {
		expect( eq ).to.be.a( 'function' );
	});

	it( 'should correctly compare values (non-strict)', function test() {
		assert.strictEqual( eq( null, undefined, false ), 1 );
		assert.strictEqual( eq( '3', 3, false ), 1 );
		assert.strictEqual( eq( 0, false, false ), 1 );
	});

	it( 'should correctly compare values (strict)', function test() {
		assert.strictEqual( eq( null, undefined, true ), 0 );
		assert.strictEqual( eq( '3', 3, true ), 0 );
		assert.strictEqual( eq( 0, false, true ), 0 );

		assert.strictEqual( eq( 2, 2, false ), 1 );
		assert.strictEqual( eq( '3', '3', false ), 1 );
		assert.strictEqual( eq( true, true, false ), 1 );
	});

});
