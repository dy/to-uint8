'use strict'

var a = require('assert')
var u8 = require('./')
// var NDArray = require('ndarray')

a.deepEqual(u8([0,0,0,1, 1,1,1,1]), [0,0,0,255, 255,255,255,255])

a.deepEqual(u8(new Uint16Array([0, 1, 2])), [0, 1, 2])
a.deepEqual(u8(new Float32Array([0, .5, 1])), [0, 127, 255])
a.deepEqual(u8(new Float64Array([0, .5, 1])), [0, 127, 255])
a.deepEqual(u8([0, .5, 1]), [0, 127, 255])

// untyped array with int-ish values doesn't get converted
a.deepEqual(u8([0, 1, 255]), [0, 1, 255])

// unless passed a flag to force conversion
a.deepEqual(u8([0, 1, 255], false), [0, 255, 255])

a.deepEqual(u8({data: [0, 1, 2]}), [0, 1, 2])

a.deepEqual(u8([[0,0,0,0], [1,1,1,1]]), [0,0,0,0, 255,255,255,255])
a.deepEqual(u8([[[0,0,0,0], [1,1,1,1]]]), [0,0,0,0, 255,255,255,255])

a.equal(u8(null), null)
a.equal(u8(/abc/), null)

var uint8 = new Uint8Array([1, 2, 3])
var uint8clamped = new Uint8ClampedArray(uint8.buffer)

a.equal(u8(uint8), uint8)
a.deepEqual(u8(uint8clamped), uint8)

// detect nested uints
a.deepEqual(u8({data: [0, 1, 1]}), [0, 255, 255])

// handle NaNs
a.deepEqual(u8([[null, undefined], [NaN, -0], [/abc/, Infinity, -Infinity]]), [0, 0, 0, 0, 0, 255, 0])
a.deepEqual(u8([null, undefined, NaN, -0, /abc/, Infinity, -Infinity]), [0, 0, 0, 0, 0, 255, 0])
