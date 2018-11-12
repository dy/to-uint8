/* @module to-float32 */

'use strict'

var toab = require('to-array-buffer')
var isFloat = require('is-float-array')
var clamp = require('clamp')

module.exports = function tou8 (src, detectFloat) {
  if (detectFloat == null) detectFloat = true

  // convert float to int
	if (isFloat(src)) {
	  if (detectFloat) {
	    // if at least one pixel is more than 1, then does not convert input array
      for (var i = 0; i < src.length; i++) {
        if (src[i] > 1 || src[i] < 0) {
          return new Uint8Array(src)
        }
      }
    }

    var pixels = new Uint8Array(src.length)
    for (var i = 0; i < src.length; i++) {
      pixels[i] = clamp(src[i] * 255, 0, 255)
    }

    return pixels
	}

  // array-ish
  if (src.length != null && typeof src !== 'string') {
  	return new Uint8Array(src)
  }

  // non-array
  return new Uint8Array(toab(src))
}
