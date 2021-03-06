# to-uint8 [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://travis-ci.org/dy/to-uint8.svg?branch=master)](https://travis-ci.org/dy/to-uint8)

Convert input array to uint8 array, detecting floats if required. Useful to ensure that an input array contains pixels/colors.

[![npm install to-uint8](https://nodei.co/npm/to-uint8.png?mini=true)](https://npmjs.org/package/to-uint8/)

```js
var u8 = require('to-uint8')

var pixels = u8([[0,0,0,1], [1,1,1,1]]) // <uint8 0,0,0,255, 255,255,255,255>
```

## `u8data = u8(data, detectFloat=true)`

Return Uint8Array `u8data` with input `data` values, possibly converted from floats, if required. `data` can be an Array, Array of Arrays, TypedArray, Buffer, ArrayBuffer, base64 string or any other container.

```js
u8(new Uint16Array([0, 1, 2])) // <uint8 0, 1, 2>
u8(new Float32Array([0, .5, 1])) // <uint8 0, 127, 255>
u8(new Float64Array([0, .5, 1])) // <uint8 0, 127, 255>
u8([0, .5, 1]) // <uint8 0, 127, 255>
u8([[0,0,0,0], [1,1,1,1]]) // <uint8 0,0,0,0, 255,255,255,255>

// untyped array with int-ish values doesn't get converted
u8([0, 1, 255]) // <uint8 0, 1, 255>

// unless passed a flag to force conversion
u8([0, 1, 255], false) // <uint8 0, 255, 255>

// bad data returns null
u8(/abc/) // null
```

## See also

* [to-array-buffer](https://ghub.io/to-array-buffer) − convert anything to ArrayBuffer
* [to-float32](https://ghub.io/to-float32) − convert anything to float32.

## License

(c) 2018 Dmitry Yv. MIT License
