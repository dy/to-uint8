'use strict'

var a = require('assert')
var u8 = require('./')

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
