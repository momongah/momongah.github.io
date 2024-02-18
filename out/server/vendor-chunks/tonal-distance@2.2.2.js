"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/tonal-distance@2.2.2";
exports.ids = ["vendor-chunks/tonal-distance@2.2.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/tonal-distance@2.2.2/node_modules/tonal-distance/build/es5.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/tonal-distance@2.2.2/node_modules/tonal-distance/build/es5.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar tonalNote = __webpack_require__(/*! tonal-note */ \"(ssr)/./node_modules/.pnpm/tonal-note@2.2.2/node_modules/tonal-note/build/es5.js\");\nvar tonalInterval = __webpack_require__(/*! tonal-interval */ \"(ssr)/./node_modules/.pnpm/tonal-interval@2.2.2/node_modules/tonal-interval/build/es5.js\");\n\n/**\n * [![npm version](https://img.shields.io/npm/v/tonal-distance.svg)](https://www.npmjs.com/package/tonal-distance)\n * [![tonal](https://img.shields.io/badge/tonal-distance-yellow.svg)](https://github.com/danigb/tonal/tree/master/packages/tonal/distance)\n *\n * Transpose notes by intervals and find distances between notes\n *\n * @example\n * // es6\n * import * as Distance from \"tonal-distance\"\n * Distance.interval(\"C3\", \"C4\") // => \"1P\"\n *\n * @example\n * // es6 import selected functions\n * import { interval, semitones, transpose } from \"tonal-distance\"\n *\n * semitones(\"C\" ,\"D\") // => 2\n * interval(\"C4\", \"G4\") // => \"5P\"\n * transpose(\"C4\", \"P5\") // => \"G4\"\n *\n * @example\n * // included in tonal facade\n * const Tonal = require(\"tonal\");\n * Tonal.Distance.transpose(\"C4\", \"P5\")\n * Tonal.Distance.transposeBy(\"P5\", \"C4\")\n *\n * @module Distance\n */\n\n// Map from letter step to number of fifths starting from \"C\":\n// { C: 0, D: 2, E: 4, F: -1, G: 1, A: 3, B: 5 }\nvar FIFTHS = [0, 2, 4, -1, 1, 3, 5];\n\n// Given a number of fifths, return the octaves they span\nvar fOcts = function (f) { return Math.floor((f * 7) / 12); };\n\n// Get the number of octaves it span each step\nvar FIFTH_OCTS = FIFTHS.map(fOcts);\n\nvar encode = function (ref) {\n  var step = ref.step;\n  var alt = ref.alt;\n  var oct = ref.oct;\n  var dir = ref.dir; if ( dir === void 0 ) dir = 1;\n\n  var f = FIFTHS[step] + 7 * alt;\n  if (oct === null) { return [dir * f]; }\n  var o = oct - FIFTH_OCTS[step] - 4 * alt;\n  return [dir * f, dir * o];\n};\n\n// We need to get the steps from fifths\n// Fifths for CDEFGAB are [ 0, 2, 4, -1, 1, 3, 5 ]\n// We add 1 to fifths to avoid negative numbers, so:\n// for [\"F\", \"C\", \"G\", \"D\", \"A\", \"E\", \"B\"] we have:\nvar STEPS = [3, 0, 4, 1, 5, 2, 6];\n\n// Return the number of fifths as if it were unaltered\nfunction unaltered(f) {\n  var i = (f + 1) % 7;\n  return i < 0 ? 7 + i : i;\n}\n\nvar decode = function (f, o, dir) {\n  var step = STEPS[unaltered(f)];\n  var alt = Math.floor((f + 1) / 7);\n  if (o === undefined) { return { step: step, alt: alt, dir: dir }; }\n  var oct = o + 4 * alt + FIFTH_OCTS[step];\n  return { step: step, alt: alt, oct: oct, dir: dir };\n};\n\nvar memo = function (fn, cache) {\n  if ( cache === void 0 ) cache = {};\n\n  return function (str) { return cache[str] || (cache[str] = fn(str)); };\n};\n\nvar encoder = function (props) { return memo(function (str) {\n    var p = props(str);\n    return p.name === null ? null : encode(p);\n  }); };\n\nvar encodeNote = encoder(tonalNote.props);\nvar encodeIvl = encoder(tonalInterval.props);\n\n/**\n * Transpose a note by an interval. The note can be a pitch class.\n *\n * This function can be partially applied.\n *\n * @param {string} note\n * @param {string} interval\n * @return {string} the transposed note\n * @example\n * import { tranpose } from \"tonal-distance\"\n * transpose(\"d3\", \"3M\") // => \"F#3\"\n * // it works with pitch classes\n * transpose(\"D\", \"3M\") // => \"F#\"\n * // can be partially applied\n * [\"C\", \"D\", \"E\", \"F\", \"G\"].map(transpose(\"M3)) // => [\"E\", \"F#\", \"G#\", \"A\", \"B\"]\n */\nfunction transpose(note, interval) {\n  if (arguments.length === 1) { return function (i) { return transpose(note, i); }; }\n  var n = encodeNote(note);\n  var i = encodeIvl(interval);\n  if (n === null || i === null) { return null; }\n  var tr = n.length === 1 ? [n[0] + i[0]] : [n[0] + i[0], n[1] + i[1]];\n  return tonalNote.build(decode(tr[0], tr[1]));\n}\n\n/**\n * Transpose a pitch class by a number of perfect fifths.\n *\n * It can be partially applied.\n *\n * @function\n * @param {string} pitchClass - the pitch class\n * @param {Integer} fifhts - the number of fifths\n * @return {string} the transposed pitch class\n *\n * @example\n * import { trFifths } from \"tonal-transpose\"\n * [0, 1, 2, 3, 4].map(trFifths(\"C\")) // => [\"C\", \"G\", \"D\", \"A\", \"E\"]\n * // or using tonal\n * Distance.trFifths(\"G4\", 1) // => \"D\"\n */\n\nfunction trFifths(note, fifths) {\n  if (arguments.length === 1) { return function (f) { return trFifths(note, f); }; }\n  var n = encodeNote(note);\n  if (n === null) { return null; }\n  return tonalNote.build(decode(n[0] + fifths));\n}\n\n/**\n * Get the distance in fifths between pitch classes\n *\n * Can be partially applied.\n *\n * @param {string} to - note or pitch class\n * @param {string} from - note or pitch class\n */\nfunction fifths(from, to) {\n  if (arguments.length === 1) { return function (to) { return fifths(from, to); }; }\n  var f = encodeNote(from);\n  var t = encodeNote(to);\n  if (t === null || f === null) { return null; }\n  return t[0] - f[0];\n}\n\n/**\n * The same as transpose with the arguments inverted.\n *\n * Can be partially applied.\n *\n * @param {string} note\n * @param {string} interval\n * @return {string} the transposed note\n * @example\n * import { tranposeBy } from \"tonal-distance\"\n * transposeBy(\"3m\", \"5P\") // => \"7m\"\n */\nfunction transposeBy(interval, note) {\n  if (arguments.length === 1) { return function (n) { return transpose(n, interval); }; }\n  return transpose(note, interval);\n}\n\nvar isDescending = function (e) { return e[0] * 7 + e[1] * 12 < 0; };\nvar decodeIvl = function (i) { return isDescending(i) ? decode(-i[0], -i[1], -1) : decode(i[0], i[1], 1); };\n\nfunction addIntervals(ivl1, ivl2, dir) {\n  var i1 = encodeIvl(ivl1);\n  var i2 = encodeIvl(ivl2);\n  if (i1 === null || i2 === null) { return null; }\n  var i = [i1[0] + dir * i2[0], i1[1] + dir * i2[1]];\n  return tonalInterval.build(decodeIvl(i));\n}\n\n/**\n * Add two intervals\n *\n * Can be partially applied.\n *\n * @param {string} interval1\n * @param {string} interval2\n * @return {string} the resulting interval\n * @example\n * import { add } from \"tonal-distance\"\n * add(\"3m\", \"5P\") // => \"7m\"\n */\nfunction add(ivl1, ivl2) {\n  if (arguments.length === 1) { return function (i2) { return add(ivl1, i2); }; }\n  return addIntervals(ivl1, ivl2, 1);\n}\n\n/**\n * Subtract two intervals\n *\n * Can be partially applied\n *\n * @param {string} minuend\n * @param {string} subtrahend\n * @return {string} interval diference\n */\nfunction subtract(ivl1, ivl2) {\n  if (arguments.length === 1) { return function (i2) { return add(ivl1, i2); }; }\n  return addIntervals(ivl1, ivl2, -1);\n}\n\n/**\n * Find the interval between two pitches. It works with pitch classes\n * (both must be pitch classes and the interval is always ascending)\n *\n * Can be partially applied\n *\n * @param {string} from - distance from\n * @param {string} to - distance to\n * @return {string} the interval distance\n *\n * @example\n * import { interval } from \"tonal-distance\"\n * interval(\"C2\", \"C3\") // => \"P8\"\n * interval(\"G\", \"B\") // => \"M3\"\n *\n * @example\n * import * as Distance from \"tonal-distance\"\n * Distance.interval(\"M2\", \"P5\") // => \"P4\"\n */\nfunction interval(from, to) {\n  if (arguments.length === 1) { return function (t) { return interval(from, t); }; }\n  var f = encodeNote(from);\n  var t = encodeNote(to);\n  if (f === null || t === null || f.length !== t.length) { return null; }\n  var d =\n    f.length === 1\n      ? [t[0] - f[0], -Math.floor(((t[0] - f[0]) * 7) / 12)]\n      : [t[0] - f[0], t[1] - f[1]];\n  return tonalInterval.build(decodeIvl(d));\n}\n\n/**\n * Get the distance between two notes in semitones\n *\n * @param {String|Pitch} from - first note\n * @param {String|Pitch} to - last note\n * @return {Integer} the distance in semitones or null if not valid notes\n * @example\n * import { semitones } from \"tonal-distance\"\n * semitones(\"C3\", \"A2\") // => -3\n * // or use tonal\n * Tonal.Distance.semitones(\"C3\", \"G3\") // => 7\n */\nfunction semitones(from, to) {\n  if (arguments.length === 1) { return function (t) { return semitones(from, t); }; }\n  var f = tonalNote.props(from);\n  var t = tonalNote.props(to);\n  return f.midi !== null && t.midi !== null\n    ? t.midi - f.midi\n    : f.chroma !== null && t.chroma !== null\n      ? (t.chroma - f.chroma + 12) % 12\n      : null;\n}\n\nexports.transpose = transpose;\nexports.trFifths = trFifths;\nexports.fifths = fifths;\nexports.transposeBy = transposeBy;\nexports.addIntervals = addIntervals;\nexports.add = add;\nexports.subtract = subtract;\nexports.interval = interval;\nexports.semitones = semitones;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vdG9uYWwtZGlzdGFuY2VAMi4yLjIvbm9kZV9tb2R1bGVzL3RvbmFsLWRpc3RhbmNlL2J1aWxkL2VzNS5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7O0FBRTdELGdCQUFnQixtQkFBTyxDQUFDLG9HQUFZO0FBQ3BDLG9CQUFvQixtQkFBTyxDQUFDLGdIQUFnQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQjs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBLGdDQUFnQyx1QkFBdUI7QUFDdkQ7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixZQUFZLFNBQVM7QUFDckI7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWCxnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL21vbW9uZ2FoLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy8ucG5wbS90b25hbC1kaXN0YW5jZUAyLjIuMi9ub2RlX21vZHVsZXMvdG9uYWwtZGlzdGFuY2UvYnVpbGQvZXM1LmpzPzgzM2UiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgdG9uYWxOb3RlID0gcmVxdWlyZSgndG9uYWwtbm90ZScpO1xudmFyIHRvbmFsSW50ZXJ2YWwgPSByZXF1aXJlKCd0b25hbC1pbnRlcnZhbCcpO1xuXG4vKipcbiAqIFshW25wbSB2ZXJzaW9uXShodHRwczovL2ltZy5zaGllbGRzLmlvL25wbS92L3RvbmFsLWRpc3RhbmNlLnN2ZyldKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3RvbmFsLWRpc3RhbmNlKVxuICogWyFbdG9uYWxdKGh0dHBzOi8vaW1nLnNoaWVsZHMuaW8vYmFkZ2UvdG9uYWwtZGlzdGFuY2UteWVsbG93LnN2ZyldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZ2IvdG9uYWwvdHJlZS9tYXN0ZXIvcGFja2FnZXMvdG9uYWwvZGlzdGFuY2UpXG4gKlxuICogVHJhbnNwb3NlIG5vdGVzIGJ5IGludGVydmFscyBhbmQgZmluZCBkaXN0YW5jZXMgYmV0d2VlbiBub3Rlc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBlczZcbiAqIGltcG9ydCAqIGFzIERpc3RhbmNlIGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiBEaXN0YW5jZS5pbnRlcnZhbChcIkMzXCIsIFwiQzRcIikgLy8gPT4gXCIxUFwiXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIGVzNiBpbXBvcnQgc2VsZWN0ZWQgZnVuY3Rpb25zXG4gKiBpbXBvcnQgeyBpbnRlcnZhbCwgc2VtaXRvbmVzLCB0cmFuc3Bvc2UgfSBmcm9tIFwidG9uYWwtZGlzdGFuY2VcIlxuICpcbiAqIHNlbWl0b25lcyhcIkNcIiAsXCJEXCIpIC8vID0+IDJcbiAqIGludGVydmFsKFwiQzRcIiwgXCJHNFwiKSAvLyA9PiBcIjVQXCJcbiAqIHRyYW5zcG9zZShcIkM0XCIsIFwiUDVcIikgLy8gPT4gXCJHNFwiXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIGluY2x1ZGVkIGluIHRvbmFsIGZhY2FkZVxuICogY29uc3QgVG9uYWwgPSByZXF1aXJlKFwidG9uYWxcIik7XG4gKiBUb25hbC5EaXN0YW5jZS50cmFuc3Bvc2UoXCJDNFwiLCBcIlA1XCIpXG4gKiBUb25hbC5EaXN0YW5jZS50cmFuc3Bvc2VCeShcIlA1XCIsIFwiQzRcIilcbiAqXG4gKiBAbW9kdWxlIERpc3RhbmNlXG4gKi9cblxuLy8gTWFwIGZyb20gbGV0dGVyIHN0ZXAgdG8gbnVtYmVyIG9mIGZpZnRocyBzdGFydGluZyBmcm9tIFwiQ1wiOlxuLy8geyBDOiAwLCBEOiAyLCBFOiA0LCBGOiAtMSwgRzogMSwgQTogMywgQjogNSB9XG52YXIgRklGVEhTID0gWzAsIDIsIDQsIC0xLCAxLCAzLCA1XTtcblxuLy8gR2l2ZW4gYSBudW1iZXIgb2YgZmlmdGhzLCByZXR1cm4gdGhlIG9jdGF2ZXMgdGhleSBzcGFuXG52YXIgZk9jdHMgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gTWF0aC5mbG9vcigoZiAqIDcpIC8gMTIpOyB9O1xuXG4vLyBHZXQgdGhlIG51bWJlciBvZiBvY3RhdmVzIGl0IHNwYW4gZWFjaCBzdGVwXG52YXIgRklGVEhfT0NUUyA9IEZJRlRIUy5tYXAoZk9jdHMpO1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKHJlZikge1xuICB2YXIgc3RlcCA9IHJlZi5zdGVwO1xuICB2YXIgYWx0ID0gcmVmLmFsdDtcbiAgdmFyIG9jdCA9IHJlZi5vY3Q7XG4gIHZhciBkaXIgPSByZWYuZGlyOyBpZiAoIGRpciA9PT0gdm9pZCAwICkgZGlyID0gMTtcblxuICB2YXIgZiA9IEZJRlRIU1tzdGVwXSArIDcgKiBhbHQ7XG4gIGlmIChvY3QgPT09IG51bGwpIHsgcmV0dXJuIFtkaXIgKiBmXTsgfVxuICB2YXIgbyA9IG9jdCAtIEZJRlRIX09DVFNbc3RlcF0gLSA0ICogYWx0O1xuICByZXR1cm4gW2RpciAqIGYsIGRpciAqIG9dO1xufTtcblxuLy8gV2UgbmVlZCB0byBnZXQgdGhlIHN0ZXBzIGZyb20gZmlmdGhzXG4vLyBGaWZ0aHMgZm9yIENERUZHQUIgYXJlIFsgMCwgMiwgNCwgLTEsIDEsIDMsIDUgXVxuLy8gV2UgYWRkIDEgdG8gZmlmdGhzIHRvIGF2b2lkIG5lZ2F0aXZlIG51bWJlcnMsIHNvOlxuLy8gZm9yIFtcIkZcIiwgXCJDXCIsIFwiR1wiLCBcIkRcIiwgXCJBXCIsIFwiRVwiLCBcIkJcIl0gd2UgaGF2ZTpcbnZhciBTVEVQUyA9IFszLCAwLCA0LCAxLCA1LCAyLCA2XTtcblxuLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZmlmdGhzIGFzIGlmIGl0IHdlcmUgdW5hbHRlcmVkXG5mdW5jdGlvbiB1bmFsdGVyZWQoZikge1xuICB2YXIgaSA9IChmICsgMSkgJSA3O1xuICByZXR1cm4gaSA8IDAgPyA3ICsgaSA6IGk7XG59XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoZiwgbywgZGlyKSB7XG4gIHZhciBzdGVwID0gU1RFUFNbdW5hbHRlcmVkKGYpXTtcbiAgdmFyIGFsdCA9IE1hdGguZmxvb3IoKGYgKyAxKSAvIDcpO1xuICBpZiAobyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB7IHN0ZXA6IHN0ZXAsIGFsdDogYWx0LCBkaXI6IGRpciB9OyB9XG4gIHZhciBvY3QgPSBvICsgNCAqIGFsdCArIEZJRlRIX09DVFNbc3RlcF07XG4gIHJldHVybiB7IHN0ZXA6IHN0ZXAsIGFsdDogYWx0LCBvY3Q6IG9jdCwgZGlyOiBkaXIgfTtcbn07XG5cbnZhciBtZW1vID0gZnVuY3Rpb24gKGZuLCBjYWNoZSkge1xuICBpZiAoIGNhY2hlID09PSB2b2lkIDAgKSBjYWNoZSA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSk7IH07XG59O1xuXG52YXIgZW5jb2RlciA9IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbWVtbyhmdW5jdGlvbiAoc3RyKSB7XG4gICAgdmFyIHAgPSBwcm9wcyhzdHIpO1xuICAgIHJldHVybiBwLm5hbWUgPT09IG51bGwgPyBudWxsIDogZW5jb2RlKHApO1xuICB9KTsgfTtcblxudmFyIGVuY29kZU5vdGUgPSBlbmNvZGVyKHRvbmFsTm90ZS5wcm9wcyk7XG52YXIgZW5jb2RlSXZsID0gZW5jb2Rlcih0b25hbEludGVydmFsLnByb3BzKTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgYSBub3RlIGJ5IGFuIGludGVydmFsLiBUaGUgbm90ZSBjYW4gYmUgYSBwaXRjaCBjbGFzcy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90ZVxuICogQHBhcmFtIHtzdHJpbmd9IGludGVydmFsXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB0cmFuc3Bvc2VkIG5vdGVcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyB0cmFucG9zZSB9IGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiB0cmFuc3Bvc2UoXCJkM1wiLCBcIjNNXCIpIC8vID0+IFwiRiMzXCJcbiAqIC8vIGl0IHdvcmtzIHdpdGggcGl0Y2ggY2xhc3Nlc1xuICogdHJhbnNwb3NlKFwiRFwiLCBcIjNNXCIpIC8vID0+IFwiRiNcIlxuICogLy8gY2FuIGJlIHBhcnRpYWxseSBhcHBsaWVkXG4gKiBbXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiXS5tYXAodHJhbnNwb3NlKFwiTTMpKSAvLyA9PiBbXCJFXCIsIFwiRiNcIiwgXCJHI1wiLCBcIkFcIiwgXCJCXCJdXG4gKi9cbmZ1bmN0aW9uIHRyYW5zcG9zZShub3RlLCBpbnRlcnZhbCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHRyYW5zcG9zZShub3RlLCBpKTsgfTsgfVxuICB2YXIgbiA9IGVuY29kZU5vdGUobm90ZSk7XG4gIHZhciBpID0gZW5jb2RlSXZsKGludGVydmFsKTtcbiAgaWYgKG4gPT09IG51bGwgfHwgaSA9PT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICB2YXIgdHIgPSBuLmxlbmd0aCA9PT0gMSA/IFtuWzBdICsgaVswXV0gOiBbblswXSArIGlbMF0sIG5bMV0gKyBpWzFdXTtcbiAgcmV0dXJuIHRvbmFsTm90ZS5idWlsZChkZWNvZGUodHJbMF0sIHRyWzFdKSk7XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGEgcGl0Y2ggY2xhc3MgYnkgYSBudW1iZXIgb2YgcGVyZmVjdCBmaWZ0aHMuXG4gKlxuICogSXQgY2FuIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSB0aGUgcGl0Y2ggY2xhc3NcbiAqIEBwYXJhbSB7SW50ZWdlcn0gZmlmaHRzIC0gdGhlIG51bWJlciBvZiBmaWZ0aHNcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHRyYW5zcG9zZWQgcGl0Y2ggY2xhc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgdHJGaWZ0aHMgfSBmcm9tIFwidG9uYWwtdHJhbnNwb3NlXCJcbiAqIFswLCAxLCAyLCAzLCA0XS5tYXAodHJGaWZ0aHMoXCJDXCIpKSAvLyA9PiBbXCJDXCIsIFwiR1wiLCBcIkRcIiwgXCJBXCIsIFwiRVwiXVxuICogLy8gb3IgdXNpbmcgdG9uYWxcbiAqIERpc3RhbmNlLnRyRmlmdGhzKFwiRzRcIiwgMSkgLy8gPT4gXCJEXCJcbiAqL1xuXG5mdW5jdGlvbiB0ckZpZnRocyhub3RlLCBmaWZ0aHMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB0ckZpZnRocyhub3RlLCBmKTsgfTsgfVxuICB2YXIgbiA9IGVuY29kZU5vdGUobm90ZSk7XG4gIGlmIChuID09PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gIHJldHVybiB0b25hbE5vdGUuYnVpbGQoZGVjb2RlKG5bMF0gKyBmaWZ0aHMpKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRpc3RhbmNlIGluIGZpZnRocyBiZXR3ZWVuIHBpdGNoIGNsYXNzZXNcbiAqXG4gKiBDYW4gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gbm90ZSBvciBwaXRjaCBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBub3RlIG9yIHBpdGNoIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIGZpZnRocyhmcm9tLCB0bykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gZnVuY3Rpb24gKHRvKSB7IHJldHVybiBmaWZ0aHMoZnJvbSwgdG8pOyB9OyB9XG4gIHZhciBmID0gZW5jb2RlTm90ZShmcm9tKTtcbiAgdmFyIHQgPSBlbmNvZGVOb3RlKHRvKTtcbiAgaWYgKHQgPT09IG51bGwgfHwgZiA9PT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICByZXR1cm4gdFswXSAtIGZbMF07XG59XG5cbi8qKlxuICogVGhlIHNhbWUgYXMgdHJhbnNwb3NlIHdpdGggdGhlIGFyZ3VtZW50cyBpbnZlcnRlZC5cbiAqXG4gKiBDYW4gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnRlcnZhbFxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdHJhbnNwb3NlZCBub3RlXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgdHJhbnBvc2VCeSB9IGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiB0cmFuc3Bvc2VCeShcIjNtXCIsIFwiNVBcIikgLy8gPT4gXCI3bVwiXG4gKi9cbmZ1bmN0aW9uIHRyYW5zcG9zZUJ5KGludGVydmFsLCBub3RlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7IHJldHVybiBmdW5jdGlvbiAobikgeyByZXR1cm4gdHJhbnNwb3NlKG4sIGludGVydmFsKTsgfTsgfVxuICByZXR1cm4gdHJhbnNwb3NlKG5vdGUsIGludGVydmFsKTtcbn1cblxudmFyIGlzRGVzY2VuZGluZyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlWzBdICogNyArIGVbMV0gKiAxMiA8IDA7IH07XG52YXIgZGVjb2RlSXZsID0gZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGlzRGVzY2VuZGluZyhpKSA/IGRlY29kZSgtaVswXSwgLWlbMV0sIC0xKSA6IGRlY29kZShpWzBdLCBpWzFdLCAxKTsgfTtcblxuZnVuY3Rpb24gYWRkSW50ZXJ2YWxzKGl2bDEsIGl2bDIsIGRpcikge1xuICB2YXIgaTEgPSBlbmNvZGVJdmwoaXZsMSk7XG4gIHZhciBpMiA9IGVuY29kZUl2bChpdmwyKTtcbiAgaWYgKGkxID09PSBudWxsIHx8IGkyID09PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gIHZhciBpID0gW2kxWzBdICsgZGlyICogaTJbMF0sIGkxWzFdICsgZGlyICogaTJbMV1dO1xuICByZXR1cm4gdG9uYWxJbnRlcnZhbC5idWlsZChkZWNvZGVJdmwoaSkpO1xufVxuXG4vKipcbiAqIEFkZCB0d28gaW50ZXJ2YWxzXG4gKlxuICogQ2FuIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnRlcnZhbDFcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnRlcnZhbDJcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHJlc3VsdGluZyBpbnRlcnZhbFxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGFkZCB9IGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiBhZGQoXCIzbVwiLCBcIjVQXCIpIC8vID0+IFwiN21cIlxuICovXG5mdW5jdGlvbiBhZGQoaXZsMSwgaXZsMikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gZnVuY3Rpb24gKGkyKSB7IHJldHVybiBhZGQoaXZsMSwgaTIpOyB9OyB9XG4gIHJldHVybiBhZGRJbnRlcnZhbHMoaXZsMSwgaXZsMiwgMSk7XG59XG5cbi8qKlxuICogU3VidHJhY3QgdHdvIGludGVydmFsc1xuICpcbiAqIENhbiBiZSBwYXJ0aWFsbHkgYXBwbGllZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW51ZW5kXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VidHJhaGVuZFxuICogQHJldHVybiB7c3RyaW5nfSBpbnRlcnZhbCBkaWZlcmVuY2VcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3QoaXZsMSwgaXZsMikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gZnVuY3Rpb24gKGkyKSB7IHJldHVybiBhZGQoaXZsMSwgaTIpOyB9OyB9XG4gIHJldHVybiBhZGRJbnRlcnZhbHMoaXZsMSwgaXZsMiwgLTEpO1xufVxuXG4vKipcbiAqIEZpbmQgdGhlIGludGVydmFsIGJldHdlZW4gdHdvIHBpdGNoZXMuIEl0IHdvcmtzIHdpdGggcGl0Y2ggY2xhc3Nlc1xuICogKGJvdGggbXVzdCBiZSBwaXRjaCBjbGFzc2VzIGFuZCB0aGUgaW50ZXJ2YWwgaXMgYWx3YXlzIGFzY2VuZGluZylcbiAqXG4gKiBDYW4gYmUgcGFydGlhbGx5IGFwcGxpZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJvbSAtIGRpc3RhbmNlIGZyb21cbiAqIEBwYXJhbSB7c3RyaW5nfSB0byAtIGRpc3RhbmNlIHRvXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBpbnRlcnZhbCBkaXN0YW5jZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiBpbnRlcnZhbChcIkMyXCIsIFwiQzNcIikgLy8gPT4gXCJQOFwiXG4gKiBpbnRlcnZhbChcIkdcIiwgXCJCXCIpIC8vID0+IFwiTTNcIlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBEaXN0YW5jZSBmcm9tIFwidG9uYWwtZGlzdGFuY2VcIlxuICogRGlzdGFuY2UuaW50ZXJ2YWwoXCJNMlwiLCBcIlA1XCIpIC8vID0+IFwiUDRcIlxuICovXG5mdW5jdGlvbiBpbnRlcnZhbChmcm9tLCB0bykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGludGVydmFsKGZyb20sIHQpOyB9OyB9XG4gIHZhciBmID0gZW5jb2RlTm90ZShmcm9tKTtcbiAgdmFyIHQgPSBlbmNvZGVOb3RlKHRvKTtcbiAgaWYgKGYgPT09IG51bGwgfHwgdCA9PT0gbnVsbCB8fCBmLmxlbmd0aCAhPT0gdC5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cbiAgdmFyIGQgPVxuICAgIGYubGVuZ3RoID09PSAxXG4gICAgICA/IFt0WzBdIC0gZlswXSwgLU1hdGguZmxvb3IoKCh0WzBdIC0gZlswXSkgKiA3KSAvIDEyKV1cbiAgICAgIDogW3RbMF0gLSBmWzBdLCB0WzFdIC0gZlsxXV07XG4gIHJldHVybiB0b25hbEludGVydmFsLmJ1aWxkKGRlY29kZUl2bChkKSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBub3RlcyBpbiBzZW1pdG9uZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xQaXRjaH0gZnJvbSAtIGZpcnN0IG5vdGVcbiAqIEBwYXJhbSB7U3RyaW5nfFBpdGNofSB0byAtIGxhc3Qgbm90ZVxuICogQHJldHVybiB7SW50ZWdlcn0gdGhlIGRpc3RhbmNlIGluIHNlbWl0b25lcyBvciBudWxsIGlmIG5vdCB2YWxpZCBub3Rlc1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IHNlbWl0b25lcyB9IGZyb20gXCJ0b25hbC1kaXN0YW5jZVwiXG4gKiBzZW1pdG9uZXMoXCJDM1wiLCBcIkEyXCIpIC8vID0+IC0zXG4gKiAvLyBvciB1c2UgdG9uYWxcbiAqIFRvbmFsLkRpc3RhbmNlLnNlbWl0b25lcyhcIkMzXCIsIFwiRzNcIikgLy8gPT4gN1xuICovXG5mdW5jdGlvbiBzZW1pdG9uZXMoZnJvbSwgdG8pIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiBzZW1pdG9uZXMoZnJvbSwgdCk7IH07IH1cbiAgdmFyIGYgPSB0b25hbE5vdGUucHJvcHMoZnJvbSk7XG4gIHZhciB0ID0gdG9uYWxOb3RlLnByb3BzKHRvKTtcbiAgcmV0dXJuIGYubWlkaSAhPT0gbnVsbCAmJiB0Lm1pZGkgIT09IG51bGxcbiAgICA/IHQubWlkaSAtIGYubWlkaVxuICAgIDogZi5jaHJvbWEgIT09IG51bGwgJiYgdC5jaHJvbWEgIT09IG51bGxcbiAgICAgID8gKHQuY2hyb21hIC0gZi5jaHJvbWEgKyAxMikgJSAxMlxuICAgICAgOiBudWxsO1xufVxuXG5leHBvcnRzLnRyYW5zcG9zZSA9IHRyYW5zcG9zZTtcbmV4cG9ydHMudHJGaWZ0aHMgPSB0ckZpZnRocztcbmV4cG9ydHMuZmlmdGhzID0gZmlmdGhzO1xuZXhwb3J0cy50cmFuc3Bvc2VCeSA9IHRyYW5zcG9zZUJ5O1xuZXhwb3J0cy5hZGRJbnRlcnZhbHMgPSBhZGRJbnRlcnZhbHM7XG5leHBvcnRzLmFkZCA9IGFkZDtcbmV4cG9ydHMuc3VidHJhY3QgPSBzdWJ0cmFjdDtcbmV4cG9ydHMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbmV4cG9ydHMuc2VtaXRvbmVzID0gc2VtaXRvbmVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/tonal-distance@2.2.2/node_modules/tonal-distance/build/es5.js\n");

/***/ })

};
;