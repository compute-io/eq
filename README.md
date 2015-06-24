Equal
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise comparison (equality).


## Installation

``` bash
$ npm install compute-eq
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var eq = require( 'compute-eq' );
```

#### eq( x, y[, opts] )

Computes an element-wise comparison (equality). `x` can be an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays),  [`matrix`](https://github.com/dstructs/matrix) or any single value. `y` has to be either an `array` or `matrix` of equal dimensions as `x` or any other value. Correspondingly, the function returns either an `array` with length equal to that of the input `array`, a `matrix` with equal dimensions as input `x` or a single value. Each output element is either `0` or `1`. A value of `1` means that an element is equal to the compared value  and `0` means that an element is __not__ equal to the compared value.

``` javascript
var matrix = require( 'dstructs-matrix' ),
    data,
    y,
    mat,
    out,
    i;

data = [ 5, 3, 8, 3, 2 ];

// Single comparison value:
out = eq( data, 3 );
// returns [ 0, 1, 0, 1, 0 ]

// Array of comparison values:
out = eq( data, [ 5, 2, 8, 7, 3 ] );
// returns [ 1, 0, 1, 0, 0 ]

// Matrices
data = new Int32Array( 9 );
y = new Int32Array( 9 )
for ( i = 0; i < 9; i++ ) {
	data[ i ] = 2;
	y[ i ] = ( i % 2 === 0 ) ? 2 : 1;
}
mat = matrix( data, [3,3], 'float64' );
/*
	[ 2 2 2
	  2 2 2
	  2 2 2 ]
*/

// Single comparison value:
out = eq( mat, 2 );
/*
	[ 1 1 1
	  1 1 1
	  1 1 1 ]
*/

// Matrix of comparison values:
out = eq( mat, y );
/*
	[ 1 0 1
	  0 1 0
	  1 0 1 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__strict__: `boolean` indicating if the `function` should enforce strict equality (`===`) or weak equality (`==`). Default: `true`.
*	__array__: `boolean` indicating whether to turn off element-by-element comparison when provided an `array` as comparator `y` with the same length as `x`. Default: `false`.

By default, the function enforces strict equality. To turn off type equality, set the `strict` options flag to `false`.

``` javascript
var arr = [ 1, 0, 3, null, undefined ],
	compare = [ true, false, 2, 0, 1 ],
	out;

out = eq( arr, compare );
// returns [ 0, 0, 0, 0, 0 ];

out = eq( arr, compare, {'strict': false} );
// returns [ 1, 1, 0, 0, 0 ] // 0 != null
```

By default, if provided a comparison `array` which has a length equal to the input `array` length, the function assumes an element-by-element comparison. To turn off element-by-element comparison for equal length `arrays`, set the `array` options flag to `true`.

``` javascript
var el = [ 1, 2 ],
	arr = [ el, null ],
	out;

out = eq( arr, el );
// returns [ 0, 0 ];

out = eq( arr, el, {'array': true} );
// returns [ 1, 0 ];
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = eq( data, 3, {
	'accessor': getValue
});
// returns [ 0, 1, 0, 1, 0 ]
```

When comparing values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 4},
	{'x': 5},
	{'x': 6},
	{'x': 3},
	{'x': 2}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = eq( data, arr, {
	'accessor': getValue
});
// returns [ 0, 0, 0, 1, 1 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To mutate an input `array` or `matrix` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	y,
	out;

data = [ 1, 2, 3 ];

out = eq( data, 2, {
	'copy': false
});
// returns [ 0, 1, 0 ]

bool = ( data === out );
// returns true

data = new Int32Array( 9 );

for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int32' );
/*
	[ 1 2 3
	  4 5 6
	  7 8 9 ]
*/

out = eq( mat, 2, {
	'copy': false
});
/*
	[ 0 1 0
	  0 0 0
	  0 0 0 ]
*/

bool = ( mat === out );
// returns true
```

## Notes

*	Currently, this function only computes shallow equality and does __not__ compute deep equality when comparing `arrays` or `objects`.


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	eq = require( 'compute-eq' ),
	sum = require( 'compute-sum' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
out = eq( data, 10 );

// Count the number of values equal to 10...
var count = sum( out );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = eq( data, 10, {
	'accessor': getValue
});

// Typed arrays...
data = new Float64Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
tmp = eq( data, 10 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'float64' );
out = eq( mat, 10 );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-eq.svg
[npm-url]: https://npmjs.org/package/compute-eq

[travis-image]: http://img.shields.io/travis/compute-io/eq/master.svg
[travis-url]: https://travis-ci.org/compute-io/eq

[coveralls-image]: https://img.shields.io/coveralls/compute-io/eq/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/eq?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/eq.svg
[dependencies-url]: https://david-dm.org/compute-io/eq

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/eq.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/eq

[github-issues-image]: http://img.shields.io/github/issues/compute-io/eq.svg
[github-issues-url]: https://github.com/compute-io/eq/issues
