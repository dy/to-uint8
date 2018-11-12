/* @module to-float32 */

'use strict'

var toab = require('to-array-buffer')
var isFloat = require('is-float-array')
var clamp = require('clamp')
var flat = require('arr-flatten')
var isBase64 = require('is-base64')

module.exports = function tou8 (src, detectFloat) {
  if (!src) return null

  // shortcut uint8s
  if (src instanceof Uint8Array) return src
  if (src instanceof Uint8ClampedArray) return new Uint8Array(src.buffer)

  if (detectFloat == null) detectFloat = true

  // if at least one component is an array - flatten data
  if (Array.isArray(src)) {
    for (var i = 0; i < src.length; i++) {
      if (src[i].length != null) {
        src = flat(src)
        break
      }
    }
  }

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
  var buf = toab(src)
  if (!buf) return null
  return new Uint8Array(buf)
}
