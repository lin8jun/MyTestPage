System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/_md.js", ['./utils.js'], function (exports) {
  var aexists, abytes, createView, aoutput, clean;
  return {
    setters: [function (module) {
      aexists = module.aexists;
      abytes = module.abytes;
      createView = module.createView;
      aoutput = module.aoutput;
      clean = module.clean;
    }],
    execute: function () {
      exports({
        Chi: Chi,
        Maj: Maj
      });

      /**
       * Internal Merkle-Damgard hash utils.
       * @module
       */
      /**
       * Shared 32-bit conditional boolean primitive reused by SHA-256, SHA-1, and MD5 `F`.
       * Returns bits from `b` when `a` is set, otherwise from `c`.
       * The XOR form is equivalent to MD5's `F(X,Y,Z) = XY v not(X)Z` because the masked terms never
       * set the same bit.
       * @param a - selector word
       * @param b - word chosen when selector bit is set
       * @param c - word chosen when selector bit is clear
       * @returns Mixed 32-bit word.
       * @example
       * Combine three words with the shared 32-bit choice primitive.
       * ```ts
       * Chi(0xffffffff, 0x12345678, 0x87654321);
       * ```
       */
      function Chi(a, b, c) {
        return a & b ^ ~a & c;
      }
      /**
       * Shared 32-bit majority primitive reused by SHA-256 and SHA-1.
       * Returns bits shared by at least two inputs.
       * @param a - first input word
       * @param b - second input word
       * @param c - third input word
       * @returns Mixed 32-bit word.
       * @example
       * Combine three words with the shared 32-bit majority primitive.
       * ```ts
       * Maj(0xffffffff, 0x12345678, 0x87654321);
       * ```
       */
      function Maj(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      /**
       * Merkle-Damgard hash construction base class.
       * Could be used to create MD5, RIPEMD, SHA1, SHA2.
       * Accepts only byte-aligned `Uint8Array` input, even when the underlying spec describes bit
       * strings with partial-byte tails.
       * @param blockLen - internal block size in bytes
       * @param outputLen - digest size in bytes
       * @param padOffset - trailing length field size in bytes
       * @param isLE - whether length and state words are encoded in little-endian
       * @example
       * Use a concrete subclass to get the shared Merkle-Damgard update/digest flow.
       * ```ts
       * import { _SHA1 } from '@noble/hashes/legacy.js';
       * const hash = new _SHA1();
       * hash.update(new Uint8Array([97, 98, 99]));
       * hash.digest();
       * ```
       */
      var HashMD = exports('HashMD', /*#__PURE__*/function () {
        function HashMD(blockLen, outputLen, padOffset, isLE) {
          this.blockLen = void 0;
          this.outputLen = void 0;
          this.canXOF = false;
          this.padOffset = void 0;
          this.isLE = void 0;
          // For partial updates less than block size
          this.buffer = void 0;
          this.view = void 0;
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.buffer = new Uint8Array(blockLen);
          this.view = createView(this.buffer);
        }
        var _proto = HashMD.prototype;
        _proto.update = function update(data) {
          aexists(this);
          abytes(data);
          var view = this.view,
            buffer = this.buffer,
            blockLen = this.blockLen;
          var len = data.length;
          for (var pos = 0; pos < len;) {
            var take = Math.min(blockLen - this.pos, len - pos);
            // Fast path only when there is no buffered partial block: `take === blockLen` implies
            // `this.pos === 0`, so we can process full blocks directly from the input view.
            if (take === blockLen) {
              var dataView = createView(data);
              for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        };
        _proto.digestInto = function digestInto(out) {
          aexists(this);
          aoutput(out, this);
          this.finished = true;
          // Padding
          // We can avoid allocation of buffer for padding completely if it
          // was previously not allocated here. But it won't change performance.
          var buffer = this.buffer,
            view = this.view,
            blockLen = this.blockLen,
            isLE = this.isLE;
          var pos = this.pos;
          // append the bit '1' to the message
          buffer[pos++] = 128;
          clean(this.buffer.subarray(pos));
          // we have less than padOffset left in buffer, so we cannot put length in
          // current block, need process it and pad again
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          // Pad until full block byte with zeros
          for (var i = pos; i < blockLen; i++) buffer[i] = 0;
          // `padOffset` reserves the whole length field. For SHA-384/512 the high 64 bits stay zero from
          // the padding fill above, and JS will overflow before user input can make that half non-zero.
          // So we only need to write the low 64 bits here.
          view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          var oview = createView(out);
          var len = this.outputLen;
          // NOTE: we do division by 4 later, which must be fused in single op with modulo by JIT
          if (len % 4) throw new Error('_sha2: outputLen must be aligned to 32bit');
          var outLen = len / 4;
          var state = this.get();
          if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
          for (var _i = 0; _i < outLen; _i++) oview.setUint32(4 * _i, state[_i], isLE);
        };
        _proto.digest = function digest() {
          var buffer = this.buffer,
            outputLen = this.outputLen;
          this.digestInto(buffer);
          // Copy before destroy(): subclasses wipe `buffer` during cleanup, but `digest()` must return
          // fresh bytes to the caller.
          var res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        };
        _proto._cloneInto = function _cloneInto(to) {
          var _to;
          to || (to = new this.constructor());
          (_to = to).set.apply(_to, this.get());
          var blockLen = this.blockLen,
            buffer = this.buffer,
            length = this.length,
            finished = this.finished,
            destroyed = this.destroyed,
            pos = this.pos;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          // Only partial-block bytes need copying: when `length % blockLen === 0`, `pos === 0` and
          // later `update()` / `digestInto()` overwrite `to.buffer` from the start before reading it.
          if (length % blockLen) to.buffer.set(buffer);
          return to;
        };
        _proto.clone = function clone() {
          return this._cloneInto();
        };
        return HashMD;
      }());
      /**
       * Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
       * Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
       */
      /** Initial SHA256 state from RFC 6234 §6.1: the first 32 bits of the fractional parts of the
       * square roots of the first eight prime numbers. Exported as a shared table; callers must treat
       * it as read-only because constructors copy words from it by index. */
      var SHA256_IV = exports('SHA256_IV', /* @__PURE__ */Uint32Array.from([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]));
    }
  };
});

System.register("chunks:///_virtual/cjs-loader.mjs", [], function (exports) {
  return {
    execute: function () {
      var CjsLoader = /*#__PURE__*/function () {
        function CjsLoader() {
          this._registry = {};
          this._moduleCache = {};
        }

        /**
         * Defines a CommonJS module.
         * @param id Module ID.
         * @param factory The factory.
         * @param resolveMap An object or a function returning object which records the module specifier resolve result.
         * The later is called as "deferred resolve map" and would be invocated right before CommonJS code execution.
         */
        var _proto = CjsLoader.prototype;
        _proto.define = function define(id, factory, resolveMap) {
          this._registry[id] = {
            factory: factory,
            resolveMap: resolveMap
          };
        }

        /**
         * Requires a CommonJS module.
         * @param id Module ID.
         * @returns The module's `module.exports`.
         */;
        _proto.require = function require(id) {
          return this._require(id);
        };
        _proto.throwInvalidWrapper = function throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        };
        _proto._require = function _require(id, parent) {
          var cachedModule = this._moduleCache[id];
          if (cachedModule) {
            return cachedModule.exports;
          }
          var module = {
            id: id,
            exports: {}
          };
          this._moduleCache[id] = module;
          this._tryModuleLoad(module, id);
          return module.exports;
        };
        _proto._resolve = function _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        };
        _proto._resolveFromInfos = function _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;
          if (specifier in cjsInfos) {
            return specifier;
          }
          if (!parent) {
            return;
          }
          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) == null ? void 0 : _cjsInfos$parent.resolveCache[specifier]) != null ? _cjsInfos$parent$reso : undefined;
        };
        _proto._tryModuleLoad = function _tryModuleLoad(module, id) {
          var threw = true;
          try {
            this._load(module, id);
            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        };
        _proto._load = function _load(module, id) {
          var _this$_loadWrapper = this._loadWrapper(id),
            factory = _this$_loadWrapper.factory,
            resolveMap = _this$_loadWrapper.resolveMap;
          var vendorRequire = this._createRequire(module);
          var require = resolveMap ? this._createRequireWithResolveMap(typeof resolveMap === 'function' ? resolveMap() : resolveMap, vendorRequire) : vendorRequire;
          factory(module.exports, require, module);
        };
        _proto._loadWrapper = function _loadWrapper(id) {
          if (id in this._registry) {
            return this._registry[id];
          } else {
            return this._loadHostProvidedModules(id);
          }
        };
        _proto._loadHostProvidedModules = function _loadHostProvidedModules(id) {
          return {
            factory: function factory(_exports, _require, module) {
              if (typeof require === 'undefined') {
                throw new Error("Current environment does not provide a require() for requiring '" + id + "'.");
              }
              try {
                module.exports = require(id);
              } catch (err) {
                throw new Error("Exception thrown when calling host defined require('" + id + "').", {
                  cause: err
                });
              }
            }
          };
        };
        _proto._createRequire = function _createRequire(module) {
          var _this = this;
          return function (specifier) {
            return _this._require(specifier, module);
          };
        };
        _proto._createRequireWithResolveMap = function _createRequireWithResolveMap(requireMap, originalRequire) {
          return function (specifier) {
            var resolved = requireMap[specifier];
            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        };
        _proto._throwUnresolved = function _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        };
        return CjsLoader;
      }();
      var loader = exports('default', new CjsLoader());
    }
  };
});

System.register("chunks:///_virtual/curve.js", ['./utils2.js', './modular.js'], function (exports) {
  var bitMask, FpInvertBatch, validateField, Field;
  return {
    setters: [function (module) {
      bitMask = module.bitMask;
    }, function (module) {
      FpInvertBatch = module.FpInvertBatch;
      validateField = module.validateField;
      Field = module.Field;
    }],
    execute: function () {
      exports({
        createCurveFields: createCurveFields,
        createKeygen: createKeygen,
        mulEndoUnsafe: mulEndoUnsafe,
        negateCt: negateCt,
        normalizeZ: normalizeZ
      });

      /**
       * Methods for elliptic curve multiplication by scalars.
       * Contains wNAF, pippenger.
       * @module
       */
      var _0n = /* @__PURE__ */BigInt(0);
      var _1n = /* @__PURE__ */BigInt(1);
      /**
       * Computes both candidates first, but the final selection still branches on `condition`, so this
       * is not a strict constant-time CMOV primitive.
       * @param condition - Whether to negate the point.
       * @param item - Point-like value.
       * @returns Original or negated value.
       * @example
       * Keep the point or return its negation based on one boolean branch.
       *
       * ```ts
       * import { negateCt } from '@noble/curves/abstract/curve.js';
       * import { p256 } from '@noble/curves/nist.js';
       * const maybeNegated = negateCt(true, p256.Point.BASE);
       * ```
       */
      function negateCt(condition, item) {
        var neg = item.negate();
        return condition ? neg : item;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       * Input points are left unchanged; the normalized points are returned as fresh instances.
       * @param c - Point constructor.
       * @param points - Projective points.
       * @returns Fresh projective points reconstructed from normalized affine coordinates.
       * @example
       * Batch-normalize projective points with a single shared inversion.
       *
       * ```ts
       * import { normalizeZ } from '@noble/curves/abstract/curve.js';
       * import { p256 } from '@noble/curves/nist.js';
       * const points = normalizeZ(p256.Point, [p256.Point.BASE, p256.Point.BASE.double()]);
       * ```
       */
      function normalizeZ(c, points) {
        var invertedZs = FpInvertBatch(c.Fp, points.map(function (p) {
          return p.Z;
        }));
        return points.map(function (p, i) {
          return c.fromAffine(p.toAffine(invertedZs[i]));
        });
      }
      function validateW(W, bits) {
        if (!Number.isSafeInteger(W) || W <= 0 || W > bits) throw new Error('invalid window size, expected [1..' + bits + '], got W=' + W);
      }
      function calcWOpts(W, scalarBits) {
        validateW(W, scalarBits);
        var windows = Math.ceil(scalarBits / W) + 1; // W=8 33. Not 32, because we skip zero
        var windowSize = Math.pow(2, W - 1); // W=8 128. Not 256, because we skip zero
        var maxNumber = Math.pow(2, W); // W=8 256
        var mask = bitMask(W); // W=8 255 == mask 0b11111111
        var shiftBy = BigInt(W); // W=8 8
        return {
          windows: windows,
          windowSize: windowSize,
          mask: mask,
          maxNumber: maxNumber,
          shiftBy: shiftBy
        };
      }
      function calcOffsets(n, window, wOpts) {
        var windowSize = wOpts.windowSize,
          mask = wOpts.mask,
          maxNumber = wOpts.maxNumber,
          shiftBy = wOpts.shiftBy;
        var wbits = Number(n & mask); // extract W bits.
        var nextN = n >> shiftBy; // shift number by W bits.
        // What actually happens here:
        // const highestBit = Number(mask ^ (mask >> 1n));
        // let wbits2 = wbits - 1; // skip zero
        // if (wbits2 & highestBit) { wbits2 ^= Number(mask); // (~);
        // split if bits > max: +224 => 256-32
        if (wbits > windowSize) {
          // we skip zero, which means instead of `>= size-1`, we do `> size`
          wbits -= maxNumber; // -32, can be maxNumber - wbits, but then we need to set isNeg here.
          nextN += _1n; // +256 (carry)
        }

        var offsetStart = window * windowSize;
        var offset = offsetStart + Math.abs(wbits) - 1; // -1 because we skip zero; ignore when isZero
        var isZero = wbits === 0; // is current window slice a 0?
        var isNeg = wbits < 0; // is current window slice negative?
        var isNegF = window % 2 !== 0; // fake branch noise only
        var offsetF = offsetStart; // fake branch noise only
        return {
          nextN: nextN,
          offset: offset,
          isZero: isZero,
          isNeg: isNeg,
          isNegF: isNegF,
          offsetF: offsetF
        };
      }
      // Since points in different groups cannot be equal (different object constructor),
      // we can have single place to store precomputes.
      // Allows to make points frozen / immutable.
      var pointPrecomputes = new WeakMap();
      var pointWindowSizes = new WeakMap();
      function getW(P) {
        // To disable precomputes:
        // return 1;
        // `1` is also the uncached sentinel: use the ladder / non-precomputed path.
        return pointWindowSizes.get(P) || 1;
      }
      function assert0(n) {
        // Internal invariant: a non-zero remainder here means the wNAF window decomposition or loop
        // count is inconsistent, not that the original caller provided a bad scalar.
        if (n !== _0n) throw new Error('invalid wNAF');
      }
      /**
       * Elliptic curve multiplication of Point by scalar. Fragile.
       * Table generation takes **30MB of ram and 10ms on high-end CPU**,
       * but may take much longer on slow devices. Actual generation will happen on
       * first call of `multiply()`. By default, `BASE` point is precomputed.
       *
       * Scalars should always be less than curve order: this should be checked inside of a curve itself.
       * Creates precomputation tables for fast multiplication:
       * - private scalar is split by fixed size windows of W bits
       * - every window point is collected from window's table & added to accumulator
       * - since windows are different, same point inside tables won't be accessed more than once per calc
       * - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
       * - +1 window is neccessary for wNAF
       * - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
       *
       * TODO: research returning a 2d JS array of windows instead of a single window.
       * This would allow windows to be in different memory locations.
       * @param Point - Point constructor.
       * @param bits - Scalar bit length.
       * @example
       * Elliptic curve multiplication of Point by scalar.
       *
       * ```ts
       * import { wNAF } from '@noble/curves/abstract/curve.js';
       * import { p256 } from '@noble/curves/nist.js';
       * const ladder = new wNAF(p256.Point, p256.Point.Fn.BITS);
       * ```
       */
      var wNAF = exports('wNAF', /*#__PURE__*/function () {
        // Parametrized with a given Point class (not individual point)
        function wNAF(Point, bits) {
          this.BASE = void 0;
          this.ZERO = void 0;
          this.Fn = void 0;
          this.bits = void 0;
          this.BASE = Point.BASE;
          this.ZERO = Point.ZERO;
          this.Fn = Point.Fn;
          this.bits = bits;
        }
        // non-const time multiplication ladder
        var _proto = wNAF.prototype;
        _proto._unsafeLadder = function _unsafeLadder(elm, n, p) {
          if (p === void 0) {
            p = this.ZERO;
          }
          var d = elm;
          while (n > _0n) {
            if (n & _1n) p = p.add(d);
            d = d["double"]();
            n >>= _1n;
          }
          return p;
        }
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @param point - Point instance
         * @param W - window size
         * @returns precomputed point tables flattened to a single array
         */;
        _proto.precomputeWindow = function precomputeWindow(point, W) {
          var _calcWOpts = calcWOpts(W, this.bits),
            windows = _calcWOpts.windows,
            windowSize = _calcWOpts.windowSize;
          var points = [];
          var p = point;
          var base = p;
          for (var window = 0; window < windows; window++) {
            base = p;
            points.push(base);
            // i=1, bc we skip 0
            for (var i = 1; i < windowSize; i++) {
              base = base.add(p);
              points.push(base);
            }
            p = base["double"]();
          }
          return points;
        }
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * More compact implementation:
         * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
         * @returns real and fake (for const-time) points
         */;
        _proto.wNAF = function wNAF(W, precomputes, n) {
          // Scalar should be smaller than field order
          if (!this.Fn.isValid(n)) throw new Error('invalid scalar');
          // Accumulators
          var p = this.ZERO;
          var f = this.BASE;
          // This code was first written with assumption that 'f' and 'p' will never be infinity point:
          // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
          // there is negate now: it is possible that negated element from low value
          // would be the same as high element, which will create carry into next window.
          // It's not obvious how this can fail, but still worth investigating later.
          var wo = calcWOpts(W, this.bits);
          for (var window = 0; window < wo.windows; window++) {
            // (n === _0n) is handled and not early-exited. isEven and offsetF are used for noise
            var _calcOffsets = calcOffsets(n, window, wo),
              nextN = _calcOffsets.nextN,
              offset = _calcOffsets.offset,
              isZero = _calcOffsets.isZero,
              isNeg = _calcOffsets.isNeg,
              isNegF = _calcOffsets.isNegF,
              offsetF = _calcOffsets.offsetF;
            n = nextN;
            if (isZero) {
              // bits are 0: add garbage to fake point
              // Important part for const-time getPublicKey: add random "noise" point to f.
              f = f.add(negateCt(isNegF, precomputes[offsetF]));
            } else {
              // bits are 1: add to result point
              p = p.add(negateCt(isNeg, precomputes[offset]));
            }
          }
          assert0(n);
          // Return both real and fake points so JIT keeps the noise path alive.
          // Known caveat: negate/carry interactions can still drive `f` to infinity even when `p` is not,
          // which weakens the noise path and leaves this only "less const-time" by about one bigint mul.
          return {
            p: p,
            f: f
          };
        }
        /**
         * Implements unsafe EC multiplication using precomputed tables
         * and w-ary non-adjacent form.
         * @param acc - accumulator point to add result of multiplication
         * @returns point
         */;
        _proto.wNAFUnsafe = function wNAFUnsafe(W, precomputes, n, acc) {
          if (acc === void 0) {
            acc = this.ZERO;
          }
          var wo = calcWOpts(W, this.bits);
          for (var window = 0; window < wo.windows; window++) {
            if (n === _0n) break; // Early-exit, skip 0 value
            var _calcOffsets2 = calcOffsets(n, window, wo),
              nextN = _calcOffsets2.nextN,
              offset = _calcOffsets2.offset,
              isZero = _calcOffsets2.isZero,
              isNeg = _calcOffsets2.isNeg;
            n = nextN;
            if (isZero) {
              // Window bits are 0: skip processing.
              // Move to next window.
              continue;
            } else {
              var item = precomputes[offset];
              acc = acc.add(isNeg ? item.negate() : item); // Re-using acc allows to save adds in MSM
            }
          }

          assert0(n);
          return acc;
        };
        _proto.getPrecomputes = function getPrecomputes(W, point, transform) {
          // Cache key is only point identity plus the remembered window size; callers must not reuse the
          // same point with incompatible `transform(...)` layouts and expect a separate cache entry.
          var comp = pointPrecomputes.get(point);
          if (!comp) {
            comp = this.precomputeWindow(point, W);
            if (W !== 1) {
              // Doing transform outside of if brings 15% perf hit
              if (typeof transform === 'function') comp = transform(comp);
              pointPrecomputes.set(point, comp);
            }
          }
          return comp;
        };
        _proto.cached = function cached(point, scalar, transform) {
          var W = getW(point);
          return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
        };
        _proto.unsafe = function unsafe(point, scalar, transform, prev) {
          var W = getW(point);
          if (W === 1) return this._unsafeLadder(point, scalar, prev); // For W=1 ladder is ~x2 faster
          return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
        }
        // We calculate precomputes for elliptic curve point multiplication
        // using windowed method. This specifies window size and
        // stores precomputed values. Usually only base point would be precomputed.
        ;

        _proto.createCache = function createCache(P, W) {
          validateW(W, this.bits);
          pointWindowSizes.set(P, W);
          pointPrecomputes["delete"](P);
        };
        _proto.hasCache = function hasCache(elm) {
          return getW(elm) !== 1;
        };
        return wNAF;
      }());
      /**
       * Endomorphism-specific multiplication for Koblitz curves.
       * Cost: 128 dbl, 0-256 adds.
       * @param Point - Point constructor.
       * @param point - Input point.
       * @param k1 - First non-negative absolute scalar chunk.
       * @param k2 - Second non-negative absolute scalar chunk.
       * @returns Partial multiplication results.
       * @example
       * Endomorphism-specific multiplication for Koblitz curves.
       *
       * ```ts
       * import { mulEndoUnsafe } from '@noble/curves/abstract/curve.js';
       * import { secp256k1 } from '@noble/curves/secp256k1.js';
       * const parts = mulEndoUnsafe(secp256k1.Point, secp256k1.Point.BASE, 3n, 5n);
       * ```
       */
      function mulEndoUnsafe(Point, point, k1, k2) {
        var acc = point;
        var p1 = Point.ZERO;
        var p2 = Point.ZERO;
        while (k1 > _0n || k2 > _0n) {
          if (k1 & _1n) p1 = p1.add(acc);
          if (k2 & _1n) p2 = p2.add(acc);
          acc = acc["double"]();
          k1 >>= _1n;
          k2 >>= _1n;
        }
        return {
          p1: p1,
          p2: p2
        };
      }
      function createField(order, field, isLE) {
        if (field) {
          // Reuse supplied field overrides as-is; `isLE` only affects freshly constructed fallback
          // fields, and validateField() below only checks the arithmetic subset, not full byte/cmov
          // behavior.
          if (field.ORDER !== order) throw new Error('Field.ORDER must match order: Fp == p, Fn == n');
          validateField(field);
          return field;
        } else {
          return Field(order, {
            isLE: isLE
          });
        }
      }
      /**
       * Validates basic CURVE shape and field membership, then creates fields.
       * This does not prove that the generator is on-curve, that subgroup/order data are consistent, or
       * that the curve equation itself is otherwise sane.
       * @param type - Curve family.
       * @param CURVE - Curve parameters.
       * @param curveOpts - Optional field overrides:
       *   - `Fp` (optional): Optional base-field override.
       *   - `Fn` (optional): Optional scalar-field override.
       * @param FpFnLE - Whether field encoding is little-endian.
       * @returns Frozen curve parameters and fields.
       * @throws If the curve parameters or field overrides are invalid. {@link Error}
       * @example
       * Build curve fields from raw constants before constructing a curve instance.
       *
       * ```ts
       * const curve = createCurveFields('weierstrass', {
       *   p: 17n,
       *   n: 19n,
       *   h: 1n,
       *   a: 2n,
       *   b: 2n,
       *   Gx: 5n,
       *   Gy: 1n,
       * });
       * ```
       */
      function createCurveFields(type, CURVE, curveOpts, FpFnLE) {
        if (curveOpts === void 0) {
          curveOpts = {};
        }
        if (FpFnLE === undefined) FpFnLE = type === 'edwards';
        if (!CURVE || typeof CURVE !== 'object') throw new Error("expected valid " + type + " CURVE object");
        for (var _i = 0, _arr = ['p', 'n', 'h']; _i < _arr.length; _i++) {
          var p = _arr[_i];
          var val = CURVE[p];
          if (!(typeof val === 'bigint' && val > _0n)) throw new Error("CURVE." + p + " must be positive bigint");
        }
        var Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
        var Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
        var _b = type === 'weierstrass' ? 'b' : 'd';
        var params = ['Gx', 'Gy', 'a', _b];
        for (var _i2 = 0, _params = params; _i2 < _params.length; _i2++) {
          var _p = _params[_i2];
          // @ts-ignore
          if (!Fp.isValid(CURVE[_p])) throw new Error("CURVE." + _p + " must be valid field element of CURVE.Fp");
        }
        CURVE = Object.freeze(Object.assign({}, CURVE));
        return {
          CURVE: CURVE,
          Fp: Fp,
          Fn: Fn
        };
      }
      /**
       * @param randomSecretKey - Secret-key generator.
       * @param getPublicKey - Public-key derivation helper.
       * @returns Keypair generator.
       * @example
       * Build a `keygen()` helper from existing secret-key and public-key primitives.
       *
       * ```ts
       * import { createKeygen } from '@noble/curves/abstract/curve.js';
       * import { p256 } from '@noble/curves/nist.js';
       * const keygen = createKeygen(p256.utils.randomSecretKey, p256.getPublicKey);
       * const pair = keygen();
       * ```
       */
      function createKeygen(randomSecretKey, getPublicKey) {
        return function keygen(seed) {
          var secretKey = randomSecretKey(seed);
          return {
            secretKey: secretKey,
            publicKey: getPublicKey(secretKey)
          };
        };
      }
    }
  };
});

System.register("chunks:///_virtual/env", [], function (exports) {
  return {
    execute: function () {
      var DEV = exports('DEV', false);
    }
  };
});

System.register("chunks:///_virtual/hkdf.js", ['./hmac.js', './utils.js'], function (exports) {
  var hmac, ahash, anumber, abytes, clean;
  return {
    setters: [function (module) {
      hmac = module.hmac;
    }, function (module) {
      ahash = module.ahash;
      anumber = module.anumber;
      abytes = module.abytes;
      clean = module.clean;
    }],
    execute: function () {
      exports({
        expand: expand,
        extract: extract
      });

      /**
       * HKDF (RFC 5869): extract + expand in one step.
       * See {@link https://soatok.blog/2021/11/17/understanding-hkdf/}.
       * @module
       */
      /**
       * HKDF-extract from spec. Less important part. `HKDF-Extract(IKM, salt) -> PRK`
       * Arguments position differs from spec (IKM is first one, since it is not optional)
       * Local validation only checks `hash`; `ikm` / `salt` byte validation is delegated to `hmac()`.
       * @param hash - hash function that would be used (e.g. sha256)
       * @param ikm - input keying material, the initial key
       * @param salt - optional salt value (a non-secret random value)
       * @returns Pseudorandom key derived from input keying material.
       * @example
       * Run the HKDF extract step.
       * ```ts
       * import { extract } from '@noble/hashes/hkdf.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * extract(sha256, new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]));
       * ```
       */
      function extract(hash, ikm, salt) {
        ahash(hash);
        // NOTE: some libraries treat zero-length array as 'not provided';
        // we don't, since we have undefined as 'not provided'
        // https://github.com/RustCrypto/KDFs/issues/15
        if (salt === undefined) salt = new Uint8Array(hash.outputLen);
        return hmac(hash, salt, ikm);
      }
      // Shared mutable scratch byte for the RFC 5869 block counter `N`.
      // Safe to reuse because `expand()` is synchronous and resets it with `clean(...)` before returning.
      var HKDF_COUNTER = /* @__PURE__ */Uint8Array.of(0);
      // Shared RFC 5869 empty string for both `info === undefined` and the first-block `T(0)` input.
      var EMPTY_BUFFER = /* @__PURE__ */Uint8Array.of();
      /**
       * HKDF-expand from the spec. The most important part. `HKDF-Expand(PRK, info, L) -> OKM`
       * @param hash - hash function that would be used (e.g. sha256)
       * @param prk - a pseudorandom key of at least HashLen octets
       *   (usually, the output from the extract step)
       * @param info - optional context and application specific information (can be a zero-length string)
       * @param length - length of output keying material in bytes.
       *   RFC 5869 §2.3 allows `0..255*HashLen`, so `0` returns an empty OKM.
       * @returns Output keying material with the requested length.
       * @throws If the requested output length exceeds the HKDF limit
       *   for the selected hash. {@link Error}
       * @example
       * Run the HKDF expand step.
       * ```ts
       * import { expand } from '@noble/hashes/hkdf.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * expand(sha256, new Uint8Array(32), new Uint8Array([1, 2, 3]), 16);
       * ```
       */
      function expand(hash, prk, info, length) {
        if (length === void 0) {
          length = 32;
        }
        ahash(hash);
        anumber(length, 'length');
        abytes(prk, undefined, 'prk');
        var olen = hash.outputLen;
        // RFC 5869 §2.3: PRK is "a pseudorandom key of at least HashLen octets".
        if (prk.length < olen) throw new Error('"prk" must be at least HashLen octets');
        // RFC 5869 §2.3 only bounds `L` by `<= 255*HashLen`; `L=0` is valid and yields empty OKM.
        if (length > 255 * olen) throw new Error('Length must be <= 255*HashLen');
        var blocks = Math.ceil(length / olen);
        if (info === undefined) info = EMPTY_BUFFER;else abytes(info, undefined, 'info');
        // first L(ength) octets of T
        var okm = new Uint8Array(blocks * olen);
        // Re-use HMAC instance between blocks
        var HMAC = hmac.create(hash, prk);
        var HMACTmp = HMAC._cloneInto();
        var T = new Uint8Array(HMAC.outputLen);
        for (var counter = 0; counter < blocks; counter++) {
          HKDF_COUNTER[0] = counter + 1;
          // T(0) = empty string (zero length)
          // T(N) = HMAC-Hash(PRK, T(N-1) | info | N)
          HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
          okm.set(T, olen * counter);
          HMAC._cloneInto(HMACTmp);
        }
        HMAC.destroy();
        HMACTmp.destroy();
        clean(T, HKDF_COUNTER);
        return okm.slice(0, length);
      }
      /**
       * HKDF (RFC 5869): derive keys from an initial input.
       * Combines hkdf_extract + hkdf_expand in one step
       * @param hash - hash function that would be used (e.g. sha256)
       * @param ikm - input keying material, the initial key
       * @param salt - optional salt value (a non-secret random value)
       * @param info - optional context and application specific information bytes
       * @param length - length of output keying material in bytes.
       *   RFC 5869 §2.3 allows `0..255*HashLen`, so `0` returns an empty OKM.
       * @returns Output keying material derived from the input key.
       * @throws If the requested output length exceeds the HKDF limit
       *   for the selected hash. {@link Error}
       * @example
       * HKDF (RFC 5869): derive keys from an initial input.
       * ```ts
       * import { hkdf } from '@noble/hashes/hkdf.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * import { randomBytes, utf8ToBytes } from '@noble/hashes/utils.js';
       * const inputKey = randomBytes(32);
       * const salt = randomBytes(32);
       * const info = utf8ToBytes('application-key');
       * const okm = hkdf(sha256, inputKey, salt, info, 32);
       * ```
       */
      var hkdf = exports('hkdf', function hkdf(hash, ikm, salt, info, length) {
        return expand(hash, extract(hash, ikm, salt), info, length);
      });
    }
  };
});

System.register("chunks:///_virtual/hmac.js", ['./utils.js'], function (exports) {
  var ahash, abytes, clean, aexists, aoutput;
  return {
    setters: [function (module) {
      ahash = module.ahash;
      abytes = module.abytes;
      clean = module.clean;
      aexists = module.aexists;
      aoutput = module.aoutput;
    }],
    execute: function () {
      /**
       * HMAC: RFC2104 message authentication code.
       * @module
       */
      /**
       * Internal class for HMAC.
       * Accepts any byte key, although RFC 2104 §3 recommends keys at least
       * `HashLen` bytes long.
       */
      var _HMAC = exports('_HMAC', /*#__PURE__*/function () {
        function _HMAC(hash, key) {
          this.oHash = void 0;
          this.iHash = void 0;
          this.blockLen = void 0;
          this.outputLen = void 0;
          this.canXOF = false;
          this.finished = false;
          this.destroyed = false;
          ahash(hash);
          abytes(key, undefined, 'key');
          this.iHash = hash.create();
          if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          var blockLen = this.blockLen;
          var pad = new Uint8Array(blockLen);
          // blockLen can be bigger than outputLen
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (var i = 0; i < pad.length; i++) pad[i] ^= 0x36;
          this.iHash.update(pad);
          // By doing update (processing of the first block) of the outer hash here,
          // we can re-use it between multiple calls via clone.
          this.oHash = hash.create();
          // Undo internal XOR && apply outer XOR
          for (var _i = 0; _i < pad.length; _i++) pad[_i] ^= 0x36 ^ 0x5c;
          this.oHash.update(pad);
          clean(pad);
        }
        var _proto = _HMAC.prototype;
        _proto.update = function update(buf) {
          aexists(this);
          this.iHash.update(buf);
          return this;
        };
        _proto.digestInto = function digestInto(out) {
          aexists(this);
          aoutput(out, this);
          this.finished = true;
          var buf = out.subarray(0, this.outputLen);
          // Reuse the first outputLen bytes for the inner digest; the outer hash consumes them before
          // overwriting that same prefix with the final tag, leaving any oversized tail untouched.
          this.iHash.digestInto(buf);
          this.oHash.update(buf);
          this.oHash.digestInto(buf);
          this.destroy();
        };
        _proto.digest = function digest() {
          var out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        };
        _proto._cloneInto = function _cloneInto(to) {
          // Create new instance without calling constructor since the key
          // is already in state and we don't know it.
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          var oHash = this.oHash,
            iHash = this.iHash,
            finished = this.finished,
            destroyed = this.destroyed,
            blockLen = this.blockLen,
            outputLen = this.outputLen;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        };
        _proto.clone = function clone() {
          return this._cloneInto();
        };
        _proto.destroy = function destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        };
        return _HMAC;
      }());
      var hmac = exports('hmac', /* @__PURE__ */function () {
        var hmac_ = function hmac_(hash, key, message) {
          return new _HMAC(hash, key).update(message).digest();
        };
        hmac_.create = function (hash, key) {
          return new _HMAC(hash, key);
        };
        return hmac_;
      }());
    }
  };
});

System.register("chunks:///_virtual/index-minimal.js", ['./cjs-loader.mjs', './writer.js', './writer_buffer.js', './reader.js', './reader_buffer.js', './minimal2.js', './rpc.js', './roots.js'], function (exports, module) {
  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        var protobuf = exports;

        /**
         * Build type, one of `"full"`, `"light"` or `"minimal"`.
         * @name build
         * @type {string}
         * @const
         */
        protobuf.build = "minimal";

        // Serialization
        protobuf.Writer = require("./writer");
        protobuf.BufferWriter = require("./writer_buffer");
        protobuf.Reader = require("./reader");
        protobuf.BufferReader = require("./reader_buffer");

        // Utility
        protobuf.util = require("./util/minimal");
        protobuf.rpc = require("./rpc");
        protobuf.roots = require("./roots");
        protobuf.configure = configure;

        /* istanbul ignore next */
        /**
         * Reconfigures the library according to the environment.
         * @returns {undefined}
         */
        function configure() {
          protobuf.util._configure();
          protobuf.Writer._configure(protobuf.BufferWriter);
          protobuf.Reader._configure(protobuf.BufferReader);
        }

        // Set up buffer utility according to the environment
        configure();

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './writer': __cjsMetaURL$1,
          './writer_buffer': __cjsMetaURL$2,
          './reader': __cjsMetaURL$3,
          './reader_buffer': __cjsMetaURL$4,
          './util/minimal': __cjsMetaURL$5,
          './rpc': __cjsMetaURL$6,
          './roots': __cjsMetaURL$7
        };
      });
    }
  };
});

System.register("chunks:///_virtual/index.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);
      var _cjsExports;
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        /*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
        (function (root) {
          function checkInt(value) {
            return parseInt(value) === value;
          }
          function checkInts(arrayish) {
            if (!checkInt(arrayish.length)) {
              return false;
            }
            for (var i = 0; i < arrayish.length; i++) {
              if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
              }
            }
            return true;
          }
          function coerceArray(arg, copy) {
            // ArrayBuffer view
            if (arg.buffer && arg.name === 'Uint8Array') {
              if (copy) {
                if (arg.slice) {
                  arg = arg.slice();
                } else {
                  arg = Array.prototype.slice.call(arg);
                }
              }
              return arg;
            }

            // It's an array; check it is a valid representation of a byte
            if (Array.isArray(arg)) {
              if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
              }
              return new Uint8Array(arg);
            }

            // Something else, but behaves like an array (maybe a Buffer? Arguments?)
            if (checkInt(arg.length) && checkInts(arg)) {
              return new Uint8Array(arg);
            }
            throw new Error('unsupported array-like object');
          }
          function createArray(length) {
            return new Uint8Array(length);
          }
          function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
            if (sourceStart != null || sourceEnd != null) {
              if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
              } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
              }
            }
            targetArray.set(sourceArray, targetStart);
          }
          var convertUtf8 = function () {
            function toBytes(text) {
              var result = [],
                i = 0;
              text = encodeURI(text);
              while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                  result.push(parseInt(text.substr(i, 2), 16));
                  i += 2;

                  // otherwise, just the actual byte
                } else {
                  result.push(c);
                }
              }
              return coerceArray(result);
            }
            function fromBytes(bytes) {
              var result = [],
                i = 0;
              while (i < bytes.length) {
                var c = bytes[i];
                if (c < 128) {
                  result.push(String.fromCharCode(c));
                  i++;
                } else if (c > 191 && c < 224) {
                  result.push(String.fromCharCode((c & 0x1f) << 6 | bytes[i + 1] & 0x3f));
                  i += 2;
                } else {
                  result.push(String.fromCharCode((c & 0x0f) << 12 | (bytes[i + 1] & 0x3f) << 6 | bytes[i + 2] & 0x3f));
                  i += 3;
                }
              }
              return result.join('');
            }
            return {
              toBytes: toBytes,
              fromBytes: fromBytes
            };
          }();
          var convertHex = function () {
            function toBytes(text) {
              var result = [];
              for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
              }
              return result;
            }

            // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
            var Hex = '0123456789abcdef';
            function fromBytes(bytes) {
              var result = [];
              for (var i = 0; i < bytes.length; i++) {
                var v = bytes[i];
                result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
              }
              return result.join('');
            }
            return {
              toBytes: toBytes,
              fromBytes: fromBytes
            };
          }();

          // Number of rounds by keysize
          var numberOfRounds = {
            16: 10,
            24: 12,
            32: 14
          };

          // Round constant words
          var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

          // S-box and Inverse S-box (S is for Substitution)
          var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
          var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

          // Transformations for encryption
          var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
          var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
          var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
          var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

          // Transformations for decryption
          var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
          var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
          var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
          var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

          // Transformations for decryption key expansion
          var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
          var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
          var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
          var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];
          function convertToInt32(bytes) {
            var result = [];
            for (var i = 0; i < bytes.length; i += 4) {
              result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
            }
            return result;
          }
          var AES = function AES(key) {
            if (!(this instanceof AES)) {
              throw Error('AES must be instanitated with `new`');
            }
            Object.defineProperty(this, 'key', {
              value: coerceArray(key, true)
            });
            this._prepare();
          };
          AES.prototype._prepare = function () {
            var rounds = numberOfRounds[this.key.length];
            if (rounds == null) {
              throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
            }

            // encryption round keys
            this._Ke = [];

            // decryption round keys
            this._Kd = [];
            for (var i = 0; i <= rounds; i++) {
              this._Ke.push([0, 0, 0, 0]);
              this._Kd.push([0, 0, 0, 0]);
            }
            var roundKeyCount = (rounds + 1) * 4;
            var KC = this.key.length / 4;

            // convert the key into ints
            var tk = convertToInt32(this.key);

            // copy values into round key arrays
            var index;
            for (var i = 0; i < KC; i++) {
              index = i >> 2;
              this._Ke[index][i % 4] = tk[i];
              this._Kd[rounds - index][i % 4] = tk[i];
            }

            // key expansion (fips-197 section 5.2)
            var rconpointer = 0;
            var t = KC,
              tt;
            while (t < roundKeyCount) {
              tt = tk[KC - 1];
              tk[0] ^= S[tt >> 16 & 0xFF] << 24 ^ S[tt >> 8 & 0xFF] << 16 ^ S[tt & 0xFF] << 8 ^ S[tt >> 24 & 0xFF] ^ rcon[rconpointer] << 24;
              rconpointer += 1;

              // key expansion (for non-256 bit)
              if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                  tk[i] ^= tk[i - 1];
                }

                // key expansion for 256-bit keys is "slightly different" (fips-197)
              } else {
                for (var i = 1; i < KC / 2; i++) {
                  tk[i] ^= tk[i - 1];
                }
                tt = tk[KC / 2 - 1];
                tk[KC / 2] ^= S[tt & 0xFF] ^ S[tt >> 8 & 0xFF] << 8 ^ S[tt >> 16 & 0xFF] << 16 ^ S[tt >> 24 & 0xFF] << 24;
                for (var i = KC / 2 + 1; i < KC; i++) {
                  tk[i] ^= tk[i - 1];
                }
              }

              // copy values into round key arrays
              var i = 0,
                r,
                c;
              while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
              }
            }

            // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
            for (var r = 1; r < rounds; r++) {
              for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = U1[tt >> 24 & 0xFF] ^ U2[tt >> 16 & 0xFF] ^ U3[tt >> 8 & 0xFF] ^ U4[tt & 0xFF];
              }
            }
          };
          AES.prototype.encrypt = function (plaintext) {
            if (plaintext.length != 16) {
              throw new Error('invalid plaintext size (must be 16 bytes)');
            }
            var rounds = this._Ke.length - 1;
            var a = [0, 0, 0, 0];

            // convert plaintext to (ints ^ key)
            var t = convertToInt32(plaintext);
            for (var i = 0; i < 4; i++) {
              t[i] ^= this._Ke[0][i];
            }

            // apply round transforms
            for (var r = 1; r < rounds; r++) {
              for (var i = 0; i < 4; i++) {
                a[i] = T1[t[i] >> 24 & 0xff] ^ T2[t[(i + 1) % 4] >> 16 & 0xff] ^ T3[t[(i + 2) % 4] >> 8 & 0xff] ^ T4[t[(i + 3) % 4] & 0xff] ^ this._Ke[r][i];
              }
              t = a.slice();
            }

            // the last round is special
            var result = createArray(16),
              tt;
            for (var i = 0; i < 4; i++) {
              tt = this._Ke[rounds][i];
              result[4 * i] = (S[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
              result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
              result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
              result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;
            }
            return result;
          };
          AES.prototype.decrypt = function (ciphertext) {
            if (ciphertext.length != 16) {
              throw new Error('invalid ciphertext size (must be 16 bytes)');
            }
            var rounds = this._Kd.length - 1;
            var a = [0, 0, 0, 0];

            // convert plaintext to (ints ^ key)
            var t = convertToInt32(ciphertext);
            for (var i = 0; i < 4; i++) {
              t[i] ^= this._Kd[0][i];
            }

            // apply round transforms
            for (var r = 1; r < rounds; r++) {
              for (var i = 0; i < 4; i++) {
                a[i] = T5[t[i] >> 24 & 0xff] ^ T6[t[(i + 3) % 4] >> 16 & 0xff] ^ T7[t[(i + 2) % 4] >> 8 & 0xff] ^ T8[t[(i + 1) % 4] & 0xff] ^ this._Kd[r][i];
              }
              t = a.slice();
            }

            // the last round is special
            var result = createArray(16),
              tt;
            for (var i = 0; i < 4; i++) {
              tt = this._Kd[rounds][i];
              result[4 * i] = (Si[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;
              result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;
              result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;
              result[4 * i + 3] = (Si[t[(i + 1) % 4] & 0xff] ^ tt) & 0xff;
            }
            return result;
          };

          /**
           *  Mode Of Operation - Electonic Codebook (ECB)
           */
          var ModeOfOperationECB = function ModeOfOperationECB(key) {
            if (!(this instanceof ModeOfOperationECB)) {
              throw Error('AES must be instanitated with `new`');
            }
            this.description = "Electronic Code Block";
            this.name = "ecb";
            this._aes = new AES(key);
          };
          ModeOfOperationECB.prototype.encrypt = function (plaintext) {
            plaintext = coerceArray(plaintext);
            if (plaintext.length % 16 !== 0) {
              throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
            }
            var ciphertext = createArray(plaintext.length);
            var block = createArray(16);
            for (var i = 0; i < plaintext.length; i += 16) {
              copyArray(plaintext, block, 0, i, i + 16);
              block = this._aes.encrypt(block);
              copyArray(block, ciphertext, i);
            }
            return ciphertext;
          };
          ModeOfOperationECB.prototype.decrypt = function (ciphertext) {
            ciphertext = coerceArray(ciphertext);
            if (ciphertext.length % 16 !== 0) {
              throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
            }
            var plaintext = createArray(ciphertext.length);
            var block = createArray(16);
            for (var i = 0; i < ciphertext.length; i += 16) {
              copyArray(ciphertext, block, 0, i, i + 16);
              block = this._aes.decrypt(block);
              copyArray(block, plaintext, i);
            }
            return plaintext;
          };

          /**
           *  Mode Of Operation - Cipher Block Chaining (CBC)
           */
          var ModeOfOperationCBC = function ModeOfOperationCBC(key, iv) {
            if (!(this instanceof ModeOfOperationCBC)) {
              throw Error('AES must be instanitated with `new`');
            }
            this.description = "Cipher Block Chaining";
            this.name = "cbc";
            if (!iv) {
              iv = createArray(16);
            } else if (iv.length != 16) {
              throw new Error('invalid initialation vector size (must be 16 bytes)');
            }
            this._lastCipherblock = coerceArray(iv, true);
            this._aes = new AES(key);
          };
          ModeOfOperationCBC.prototype.encrypt = function (plaintext) {
            plaintext = coerceArray(plaintext);
            if (plaintext.length % 16 !== 0) {
              throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
            }
            var ciphertext = createArray(plaintext.length);
            var block = createArray(16);
            for (var i = 0; i < plaintext.length; i += 16) {
              copyArray(plaintext, block, 0, i, i + 16);
              for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
              }
              this._lastCipherblock = this._aes.encrypt(block);
              copyArray(this._lastCipherblock, ciphertext, i);
            }
            return ciphertext;
          };
          ModeOfOperationCBC.prototype.decrypt = function (ciphertext) {
            ciphertext = coerceArray(ciphertext);
            if (ciphertext.length % 16 !== 0) {
              throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
            }
            var plaintext = createArray(ciphertext.length);
            var block = createArray(16);
            for (var i = 0; i < ciphertext.length; i += 16) {
              copyArray(ciphertext, block, 0, i, i + 16);
              block = this._aes.decrypt(block);
              for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
              }
              copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
            }
            return plaintext;
          };

          /**
           *  Mode Of Operation - Cipher Feedback (CFB)
           */
          var ModeOfOperationCFB = function ModeOfOperationCFB(key, iv, segmentSize) {
            if (!(this instanceof ModeOfOperationCFB)) {
              throw Error('AES must be instanitated with `new`');
            }
            this.description = "Cipher Feedback";
            this.name = "cfb";
            if (!iv) {
              iv = createArray(16);
            } else if (iv.length != 16) {
              throw new Error('invalid initialation vector size (must be 16 size)');
            }
            if (!segmentSize) {
              segmentSize = 1;
            }
            this.segmentSize = segmentSize;
            this._shiftRegister = coerceArray(iv, true);
            this._aes = new AES(key);
          };
          ModeOfOperationCFB.prototype.encrypt = function (plaintext) {
            if (plaintext.length % this.segmentSize != 0) {
              throw new Error('invalid plaintext size (must be segmentSize bytes)');
            }
            var encrypted = coerceArray(plaintext, true);
            var xorSegment;
            for (var i = 0; i < encrypted.length; i += this.segmentSize) {
              xorSegment = this._aes.encrypt(this._shiftRegister);
              for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
              }

              // Shift the register
              copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
              copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
            }
            return encrypted;
          };
          ModeOfOperationCFB.prototype.decrypt = function (ciphertext) {
            if (ciphertext.length % this.segmentSize != 0) {
              throw new Error('invalid ciphertext size (must be segmentSize bytes)');
            }
            var plaintext = coerceArray(ciphertext, true);
            var xorSegment;
            for (var i = 0; i < plaintext.length; i += this.segmentSize) {
              xorSegment = this._aes.encrypt(this._shiftRegister);
              for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
              }

              // Shift the register
              copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
              copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
            }
            return plaintext;
          };

          /**
           *  Mode Of Operation - Output Feedback (OFB)
           */
          var ModeOfOperationOFB = function ModeOfOperationOFB(key, iv) {
            if (!(this instanceof ModeOfOperationOFB)) {
              throw Error('AES must be instanitated with `new`');
            }
            this.description = "Output Feedback";
            this.name = "ofb";
            if (!iv) {
              iv = createArray(16);
            } else if (iv.length != 16) {
              throw new Error('invalid initialation vector size (must be 16 bytes)');
            }
            this._lastPrecipher = coerceArray(iv, true);
            this._lastPrecipherIndex = 16;
            this._aes = new AES(key);
          };
          ModeOfOperationOFB.prototype.encrypt = function (plaintext) {
            var encrypted = coerceArray(plaintext, true);
            for (var i = 0; i < encrypted.length; i++) {
              if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
              }
              encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
            }
            return encrypted;
          };

          // Decryption is symetric
          ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;

          /**
           *  Counter object for CTR common mode of operation
           */
          var Counter = function Counter(initialValue) {
            if (!(this instanceof Counter)) {
              throw Error('Counter must be instanitated with `new`');
            }

            // We allow 0, but anything false-ish uses the default 1
            if (initialValue !== 0 && !initialValue) {
              initialValue = 1;
            }
            if (typeof initialValue === 'number') {
              this._counter = createArray(16);
              this.setValue(initialValue);
            } else {
              this.setBytes(initialValue);
            }
          };
          Counter.prototype.setValue = function (value) {
            if (typeof value !== 'number' || parseInt(value) != value) {
              throw new Error('invalid counter value (must be an integer)');
            }

            // We cannot safely handle numbers beyond the safe range for integers
            if (value > Number.MAX_SAFE_INTEGER) {
              throw new Error('integer value out of safe range');
            }
            for (var index = 15; index >= 0; --index) {
              this._counter[index] = value % 256;
              value = parseInt(value / 256);
            }
          };
          Counter.prototype.setBytes = function (bytes) {
            bytes = coerceArray(bytes, true);
            if (bytes.length != 16) {
              throw new Error('invalid counter bytes size (must be 16 bytes)');
            }
            this._counter = bytes;
          };
          Counter.prototype.increment = function () {
            for (var i = 15; i >= 0; i--) {
              if (this._counter[i] === 255) {
                this._counter[i] = 0;
              } else {
                this._counter[i]++;
                break;
              }
            }
          };

          /**
           *  Mode Of Operation - Counter (CTR)
           */
          var ModeOfOperationCTR = function ModeOfOperationCTR(key, counter) {
            if (!(this instanceof ModeOfOperationCTR)) {
              throw Error('AES must be instanitated with `new`');
            }
            this.description = "Counter";
            this.name = "ctr";
            if (!(counter instanceof Counter)) {
              counter = new Counter(counter);
            }
            this._counter = counter;
            this._remainingCounter = null;
            this._remainingCounterIndex = 16;
            this._aes = new AES(key);
          };
          ModeOfOperationCTR.prototype.encrypt = function (plaintext) {
            var encrypted = coerceArray(plaintext, true);
            for (var i = 0; i < encrypted.length; i++) {
              if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
              }
              encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
            }
            return encrypted;
          };

          // Decryption is symetric
          ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;

          ///////////////////////
          // Padding

          // See:https://tools.ietf.org/html/rfc2315
          function pkcs7pad(data) {
            data = coerceArray(data, true);
            var padder = 16 - data.length % 16;
            var result = createArray(data.length + padder);
            copyArray(data, result);
            for (var i = data.length; i < result.length; i++) {
              result[i] = padder;
            }
            return result;
          }
          function pkcs7strip(data) {
            data = coerceArray(data, true);
            if (data.length < 16) {
              throw new Error('PKCS#7 invalid length');
            }
            var padder = data[data.length - 1];
            if (padder > 16) {
              throw new Error('PKCS#7 padding byte out of range');
            }
            var length = data.length - padder;
            for (var i = 0; i < padder; i++) {
              if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
              }
            }
            var result = createArray(length);
            copyArray(data, result, 0, 0, length);
            return result;
          }

          ///////////////////////
          // Exporting

          // The block cipher
          var aesjs = {
            AES: AES,
            Counter: Counter,
            ModeOfOperation: {
              ecb: ModeOfOperationECB,
              cbc: ModeOfOperationCBC,
              cfb: ModeOfOperationCFB,
              ofb: ModeOfOperationOFB,
              ctr: ModeOfOperationCTR
            },
            utils: {
              hex: convertHex,
              utf8: convertUtf8
            },
            padding: {
              pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
              }
            },
            _arrayTest: {
              coerceArray: coerceArray,
              createArray: createArray,
              copyArray: copyArray
            }
          };

          // node.js
          if (typeof exports$1 !== 'undefined') {
            module.exports = aesjs;

            // RequireJS/AMD
            // http://www.requirejs.org/docs/api.html
            // https://github.com/amdjs/amdjs-api/wiki/AMD
          } else if (typeof define === 'function' && define.amd) {
            define([], function () {
              return aesjs;
            });

            // Web Browsers
          } else {
            // If there was an existing library at "aesjs" make sure it's still available
            if (root.aesjs) {
              aesjs._aesjs = root.aesjs;
            }
            root.aesjs = aesjs;
          }
        })(this);

        // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index.mjs_cjs=&original=.js", ['./index.js', './cjs-loader.mjs'], function (exports, module) {
  var __cjsMetaURL, loader;
  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './index.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./index.js', module.meta.url);
      }
      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/index2.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = asPromise;

        /**
         * Callback as used by {@link util.asPromise}.
         * @typedef asPromiseCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {...*} params Additional arguments
         * @returns {undefined}
         */

        /**
         * Returns a promise from a node-style callback function.
         * @memberof util
         * @param {asPromiseCallback} fn Function to call
         * @param {*} ctx Function context
         * @param {...*} params Function arguments
         * @returns {Promise<*>} Promisified function
         */
        function asPromise(fn, ctx /*, varargs */) {
          var params = new Array(arguments.length - 1),
            offset = 0,
            index = 2,
            pending = true;
          while (index < arguments.length) params[offset++] = arguments[index++];
          return new Promise(function executor(resolve, reject) {
            params[offset] = function callback(err /*, varargs */) {
              if (pending) {
                pending = false;
                if (err) reject(err);else {
                  var params = new Array(arguments.length - 1),
                    offset = 0;
                  while (offset < params.length) params[offset++] = arguments[offset];
                  resolve.apply(null, params);
                }
              }
            };
            try {
              fn.apply(ctx || null, params);
            } catch (err) {
              if (pending) {
                pending = false;
                reject(err);
              }
            }
          });
        }

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index3.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        /**
         * A minimal base64 implementation for number arrays.
         * @memberof util
         * @namespace
         */
        var base64 = exports;

        /**
         * Calculates the byte length of a base64 encoded string.
         * @param {string} string Base64 encoded string
         * @returns {number} Byte length
         */
        base64.length = function length(string) {
          var p = string.length;
          if (!p) return 0;
          var n = 0;
          while (--p % 4 > 1 && string.charAt(p) === "=") ++n;
          return Math.ceil(string.length * 3) / 4 - n;
        };

        // Base64 encoding table
        var b64 = new Array(64);

        // Base64 decoding table
        var s64 = new Array(123);

        // 65..90, 97..122, 48..57, 43, 47
        for (var i = 0; i < 64;) s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

        /**
         * Encodes a buffer to a base64 encoded string.
         * @param {Uint8Array} buffer Source buffer
         * @param {number} start Source start
         * @param {number} end Source end
         * @returns {string} Base64 encoded string
         */
        base64.encode = function encode(buffer, start, end) {
          var parts = null,
            chunk = [];
          var i = 0,
            // output index
            j = 0,
            // goto index
            t; // temporary
          while (start < end) {
            var b = buffer[start++];
            switch (j) {
              case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
              case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
              case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
            }
            if (i > 8191) {
              (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
              i = 0;
            }
          }
          if (j) {
            chunk[i++] = b64[t];
            chunk[i++] = 61;
            if (j === 1) chunk[i++] = 61;
          }
          if (parts) {
            if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
          }
          return String.fromCharCode.apply(String, chunk.slice(0, i));
        };
        var invalidEncoding = "invalid encoding";

        /**
         * Decodes a base64 encoded string to a buffer.
         * @param {string} string Source string
         * @param {Uint8Array} buffer Destination buffer
         * @param {number} offset Destination offset
         * @returns {number} Number of bytes written
         * @throws {Error} If encoding is invalid
         */
        base64.decode = function decode(string, buffer, offset) {
          var start = offset;
          var j = 0,
            // goto index
            t; // temporary
          for (var i = 0; i < string.length;) {
            var c = string.charCodeAt(i++);
            if (c === 61 && j > 1) break;
            if ((c = s64[c]) === undefined) throw Error(invalidEncoding);
            switch (j) {
              case 0:
                t = c;
                j = 1;
                break;
              case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
              case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
              case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
            }
          }
          if (j === 1) throw Error(invalidEncoding);
          return offset - start;
        };

        /**
         * Tests if the specified string appears to be base64 encoded.
         * @param {string} string String to test
         * @returns {boolean} `true` if probably base64 encoded, otherwise false
         */
        base64.test = function test(string) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index4.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = EventEmitter;

        /**
         * Constructs a new event emitter instance.
         * @classdesc A minimal event emitter.
         * @memberof util
         * @constructor
         */
        function EventEmitter() {
          /**
           * Registered listeners.
           * @type {Object.<string,*>}
           * @private
           */
          this._listeners = {};
        }

        /**
         * Registers an event listener.
         * @param {string} evt Event name
         * @param {function} fn Listener
         * @param {*} [ctx] Listener context
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.on = function on(evt, fn, ctx) {
          (this._listeners[evt] || (this._listeners[evt] = [])).push({
            fn: fn,
            ctx: ctx || this
          });
          return this;
        };

        /**
         * Removes an event listener or any matching listeners if arguments are omitted.
         * @param {string} [evt] Event name. Removes all listeners if omitted.
         * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.off = function off(evt, fn) {
          if (evt === undefined) this._listeners = {};else {
            if (fn === undefined) this._listeners[evt] = [];else {
              var listeners = this._listeners[evt];
              for (var i = 0; i < listeners.length;) if (listeners[i].fn === fn) listeners.splice(i, 1);else ++i;
            }
          }
          return this;
        };

        /**
         * Emits an event by calling its listeners with the specified arguments.
         * @param {string} evt Event name
         * @param {...*} args Arguments
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.emit = function emit(evt) {
          var listeners = this._listeners[evt];
          if (listeners) {
            var args = [],
              i = 1;
            for (; i < arguments.length;) args.push(arguments[i++]);
            for (i = 0; i < listeners.length;) listeners[i].fn.apply(listeners[i++].ctx, args);
          }
          return this;
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index5.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = factory(factory);

        /**
         * Reads / writes floats / doubles from / to buffers.
         * @name util.float
         * @namespace
         */

        /**
         * Writes a 32 bit float to a buffer using little endian byte order.
         * @name util.float.writeFloatLE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Writes a 32 bit float to a buffer using big endian byte order.
         * @name util.float.writeFloatBE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Reads a 32 bit float from a buffer using little endian byte order.
         * @name util.float.readFloatLE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Reads a 32 bit float from a buffer using big endian byte order.
         * @name util.float.readFloatBE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Writes a 64 bit double to a buffer using little endian byte order.
         * @name util.float.writeDoubleLE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Writes a 64 bit double to a buffer using big endian byte order.
         * @name util.float.writeDoubleBE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Reads a 64 bit double from a buffer using little endian byte order.
         * @name util.float.readDoubleLE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Reads a 64 bit double from a buffer using big endian byte order.
         * @name util.float.readDoubleBE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        // Factory function for the purpose of node-based testing in modified global environments
        function factory(exports) {
          // float: typed array
          if (typeof Float32Array !== "undefined") (function () {
            var f32 = new Float32Array([-0]),
              f8b = new Uint8Array(f32.buffer),
              le = f8b[3] === 128;
            function writeFloat_f32_cpy(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
            }
            function writeFloat_f32_rev(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[3];
              buf[pos + 1] = f8b[2];
              buf[pos + 2] = f8b[1];
              buf[pos + 3] = f8b[0];
            }

            /* istanbul ignore next */
            exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
            /* istanbul ignore next */
            exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
            function readFloat_f32_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              return f32[0];
            }
            function readFloat_f32_rev(buf, pos) {
              f8b[3] = buf[pos];
              f8b[2] = buf[pos + 1];
              f8b[1] = buf[pos + 2];
              f8b[0] = buf[pos + 3];
              return f32[0];
            }

            /* istanbul ignore next */
            exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            /* istanbul ignore next */
            exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

            // float: ieee754
          })();else (function () {
            function writeFloat_ieee754(writeUint, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign) val = -val;
              if (val === 0) writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 3.4028234663852886e+38)
                // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 1.1754943508222875e-38)
                // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                  mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
              }
            }
            exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
            function readFloat_ieee754(readUint, buf, pos) {
              var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
              return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
              ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
            exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
          })();

          // double: typed array
          if (typeof Float64Array !== "undefined") (function () {
            var f64 = new Float64Array([-0]),
              f8b = new Uint8Array(f64.buffer),
              le = f8b[7] === 128;
            function writeDouble_f64_cpy(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
              buf[pos + 4] = f8b[4];
              buf[pos + 5] = f8b[5];
              buf[pos + 6] = f8b[6];
              buf[pos + 7] = f8b[7];
            }
            function writeDouble_f64_rev(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[7];
              buf[pos + 1] = f8b[6];
              buf[pos + 2] = f8b[5];
              buf[pos + 3] = f8b[4];
              buf[pos + 4] = f8b[3];
              buf[pos + 5] = f8b[2];
              buf[pos + 6] = f8b[1];
              buf[pos + 7] = f8b[0];
            }

            /* istanbul ignore next */
            exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
            /* istanbul ignore next */
            exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
            function readDouble_f64_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              f8b[4] = buf[pos + 4];
              f8b[5] = buf[pos + 5];
              f8b[6] = buf[pos + 6];
              f8b[7] = buf[pos + 7];
              return f64[0];
            }
            function readDouble_f64_rev(buf, pos) {
              f8b[7] = buf[pos];
              f8b[6] = buf[pos + 1];
              f8b[5] = buf[pos + 2];
              f8b[4] = buf[pos + 3];
              f8b[3] = buf[pos + 4];
              f8b[2] = buf[pos + 5];
              f8b[1] = buf[pos + 6];
              f8b[0] = buf[pos + 7];
              return f64[0];
            }

            /* istanbul ignore next */
            exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
            /* istanbul ignore next */
            exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

            // double: ieee754
          })();else (function () {
            function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign) val = -val;
              if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos + off1);
              } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
              } else if (val > 1.7976931348623157e+308) {
                // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
              } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) {
                  // denormal
                  mantissa = val / 5e-324;
                  writeUint(mantissa >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2);
                  if (exponent === 1024) exponent = 1023;
                  mantissa = val * Math.pow(2, -exponent);
                  writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
              }
            }
            exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
            exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
            function readDouble_ieee754(readUint, off0, off1, buf, pos) {
              var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
              var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
              return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
              ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
            }
            exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
            exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
          })();
          return exports;
        }

        // uint helpers

        function writeUintLE(val, buf, pos) {
          buf[pos] = val & 255;
          buf[pos + 1] = val >>> 8 & 255;
          buf[pos + 2] = val >>> 16 & 255;
          buf[pos + 3] = val >>> 24;
        }
        function writeUintBE(val, buf, pos) {
          buf[pos] = val >>> 24;
          buf[pos + 1] = val >>> 16 & 255;
          buf[pos + 2] = val >>> 8 & 255;
          buf[pos + 3] = val & 255;
        }
        function readUintLE(buf, pos) {
          return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
        }
        function readUintBE(buf, pos) {
          return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
        }

        // #endregion ORIGINAL CODE

        module.exports;
        module.exports.writeFloatLE;
        module.exports.writeFloatBE;
        module.exports.readFloatLE;
        module.exports.readFloatBE;
        module.exports.writeDoubleLE;
        module.exports.writeDoubleBE;
        module.exports.readDoubleLE;
        module.exports.readDoubleBE;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index6.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = inquire;

        /**
         * Requires a module only if available.
         * @memberof util
         * @param {string} moduleName Module to require
         * @returns {?Object} Required module if available and not empty, otherwise `null`
         */
        function inquire(moduleName) {
          try {
            var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval
            if (mod && (mod.length || Object.keys(mod).length)) return mod;
          } catch (e) {} // eslint-disable-line no-empty
          return null;
        }

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index7.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        /**
         * A minimal UTF8 implementation for number arrays.
         * @memberof util
         * @namespace
         */
        var utf8 = exports;

        /**
         * Calculates the UTF8 byte length of a string.
         * @param {string} string String
         * @returns {number} Byte length
         */
        utf8.length = function utf8_length(string) {
          var len = 0,
            c = 0;
          for (var i = 0; i < string.length; ++i) {
            c = string.charCodeAt(i);
            if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
              ++i;
              len += 4;
            } else len += 3;
          }
          return len;
        };

        /**
         * Reads UTF8 bytes as a string.
         * @param {Uint8Array} buffer Source buffer
         * @param {number} start Source start
         * @param {number} end Source end
         * @returns {string} String read
         */
        utf8.read = function utf8_read(buffer, start, end) {
          var len = end - start;
          if (len < 1) return "";
          var parts = null,
            chunk = [],
            i = 0,
            // char offset
            t; // temporary
          while (start < end) {
            t = buffer[start++];
            if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
              t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
              chunk[i++] = 0xD800 + (t >> 10);
              chunk[i++] = 0xDC00 + (t & 1023);
            } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
            if (i > 8191) {
              (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
              i = 0;
            }
          }
          if (parts) {
            if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
          }
          return String.fromCharCode.apply(String, chunk.slice(0, i));
        };

        /**
         * Writes a string as UTF8 bytes.
         * @param {string} string Source string
         * @param {Uint8Array} buffer Destination buffer
         * @param {number} offset Destination offset
         * @returns {number} Bytes written
         */
        utf8.write = function utf8_write(string, buffer, offset) {
          var start = offset,
            c1,
            // character 1
            c2; // character 2
          for (var i = 0; i < string.length; ++i) {
            c1 = string.charCodeAt(i);
            if (c1 < 128) {
              buffer[offset++] = c1;
            } else if (c1 < 2048) {
              buffer[offset++] = c1 >> 6 | 192;
              buffer[offset++] = c1 & 63 | 128;
            } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
              c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
              ++i;
              buffer[offset++] = c1 >> 18 | 240;
              buffer[offset++] = c1 >> 12 & 63 | 128;
              buffer[offset++] = c1 >> 6 & 63 | 128;
              buffer[offset++] = c1 & 63 | 128;
            } else {
              buffer[offset++] = c1 >> 12 | 224;
              buffer[offset++] = c1 >> 6 & 63 | 128;
              buffer[offset++] = c1 & 63 | 128;
            }
          }
          return offset - start;
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/index8.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = pool;

        /**
         * An allocator as used by {@link util.pool}.
         * @typedef PoolAllocator
         * @type {function}
         * @param {number} size Buffer size
         * @returns {Uint8Array} Buffer
         */

        /**
         * A slicer as used by {@link util.pool}.
         * @typedef PoolSlicer
         * @type {function}
         * @param {number} start Start offset
         * @param {number} end End offset
         * @returns {Uint8Array} Buffer slice
         * @this {Uint8Array}
         */

        /**
         * A general purpose buffer pool.
         * @memberof util
         * @function
         * @param {PoolAllocator} alloc Allocator
         * @param {PoolSlicer} slice Slicer
         * @param {number} [size=8192] Slab size
         * @returns {PoolAllocator} Pooled allocator
         */
        function pool(alloc, slice, size) {
          var SIZE = size || 8192;
          var MAX = SIZE >>> 1;
          var slab = null;
          var offset = SIZE;
          return function pool_alloc(size) {
            if (size < 1 || size > MAX) return alloc(size);
            if (offset + size > SIZE) {
              slab = alloc(SIZE);
              offset = 0;
            }
            var buf = slice.call(slab, offset, offset += size);
            if (offset & 7)
              // align to 32 bit
              offset = (offset | 7) + 1;
            return buf;
          };
        }

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/longbits.js", ['./cjs-loader.mjs', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = LongBits;
        var util = require("../util/minimal");

        /**
         * Constructs new long bits.
         * @classdesc Helper class for working with the low and high bits of a 64 bit value.
         * @memberof util
         * @constructor
         * @param {number} lo Low 32 bits, unsigned
         * @param {number} hi High 32 bits, unsigned
         */
        function LongBits(lo, hi) {
          // note that the casts below are theoretically unnecessary as of today, but older statically
          // generated converter code might still call the ctor with signed 32bits. kept for compat.

          /**
           * Low bits.
           * @type {number}
           */
          this.lo = lo >>> 0;

          /**
           * High bits.
           * @type {number}
           */
          this.hi = hi >>> 0;
        }

        /**
         * Zero bits.
         * @memberof util.LongBits
         * @type {util.LongBits}
         */
        var zero = LongBits.zero = new LongBits(0, 0);
        zero.toNumber = function () {
          return 0;
        };
        zero.zzEncode = zero.zzDecode = function () {
          return this;
        };
        zero.length = function () {
          return 1;
        };

        /**
         * Zero hash.
         * @memberof util.LongBits
         * @type {string}
         */
        var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

        /**
         * Constructs new long bits from the specified number.
         * @param {number} value Value
         * @returns {util.LongBits} Instance
         */
        LongBits.fromNumber = function fromNumber(value) {
          if (value === 0) return zero;
          var sign = value < 0;
          if (sign) value = -value;
          var lo = value >>> 0,
            hi = (value - lo) / 4294967296 >>> 0;
          if (sign) {
            hi = ~hi >>> 0;
            lo = ~lo >>> 0;
            if (++lo > 4294967295) {
              lo = 0;
              if (++hi > 4294967295) hi = 0;
            }
          }
          return new LongBits(lo, hi);
        };

        /**
         * Constructs new long bits from a number, long or string.
         * @param {Long|number|string} value Value
         * @returns {util.LongBits} Instance
         */
        LongBits.from = function from(value) {
          if (typeof value === "number") return LongBits.fromNumber(value);
          if (util.isString(value)) {
            /* istanbul ignore else */
            if (util.Long) value = util.Long.fromString(value);else return LongBits.fromNumber(parseInt(value, 10));
          }
          return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
        };

        /**
         * Converts this long bits to a possibly unsafe JavaScript number.
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {number} Possibly unsafe number
         */
        LongBits.prototype.toNumber = function toNumber(unsigned) {
          if (!unsigned && this.hi >>> 31) {
            var lo = ~this.lo + 1 >>> 0,
              hi = ~this.hi >>> 0;
            if (!lo) hi = hi + 1 >>> 0;
            return -(lo + hi * 4294967296);
          }
          return this.lo + this.hi * 4294967296;
        };

        /**
         * Converts this long bits to a long.
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {Long} Long
         */
        LongBits.prototype.toLong = function toLong(unsigned) {
          return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
          /* istanbul ignore next */ : {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: Boolean(unsigned)
          };
        };
        var charCodeAt = String.prototype.charCodeAt;

        /**
         * Constructs new long bits from the specified 8 characters long hash.
         * @param {string} hash Hash
         * @returns {util.LongBits} Bits
         */
        LongBits.fromHash = function fromHash(hash) {
          if (hash === zeroHash) return zero;
          return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
        };

        /**
         * Converts this long bits to a 8 characters long hash.
         * @returns {string} Hash
         */
        LongBits.prototype.toHash = function toHash() {
          return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
        };

        /**
         * Zig-zag encodes this long bits.
         * @returns {util.LongBits} `this`
         */
        LongBits.prototype.zzEncode = function zzEncode() {
          var mask = this.hi >> 31;
          this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
          this.lo = (this.lo << 1 ^ mask) >>> 0;
          return this;
        };

        /**
         * Zig-zag decodes this long bits.
         * @returns {util.LongBits} `this`
         */
        LongBits.prototype.zzDecode = function zzDecode() {
          var mask = -(this.lo & 1);
          this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
          this.hi = (this.hi >>> 1 ^ mask) >>> 0;
          return this;
        };

        /**
         * Calculates the length of this longbits when encoded as a varint.
         * @returns {number} Length
         */
        LongBits.prototype.length = function length() {
          var part0 = this.lo,
            part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
            part2 = this.hi >>> 24;
          return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          '../util/minimal': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/minimal.js", ['./cjs-loader.mjs', './index-minimal.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = require("./src/index-minimal");

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './src/index-minimal': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/minimal2.js", ['./cjs-loader.mjs', './index2.js', './index3.js', './index4.js', './index5.js', './index6.js', './index7.js', './index8.js', './longbits.js'], function (exports, module) {
  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$8;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        var util = exports;

        // used to return a Promise where callback is omitted
        util.asPromise = require("@protobufjs/aspromise");

        // converts to / from base64 encoded strings
        util.base64 = require("@protobufjs/base64");

        // base class of rpc.Service
        util.EventEmitter = require("@protobufjs/eventemitter");

        // float handling accross browsers
        util["float"] = require("@protobufjs/float");

        // requires modules optionally and hides the call from bundlers
        util.inquire = require("@protobufjs/inquire");

        // converts to / from utf8 encoded strings
        util.utf8 = require("@protobufjs/utf8");

        // provides a node-like buffer pool in the browser
        util.pool = require("@protobufjs/pool");

        // utility to work with the low and high bits of a 64 bit value
        util.LongBits = require("./longbits");

        /**
         * Whether running within node or not.
         * @memberof util
         * @type {boolean}
         */
        util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);

        /**
         * Global object reference.
         * @memberof util
         * @type {Object}
         */
        util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || this; // eslint-disable-line no-invalid-this

        /**
         * An immuable empty array.
         * @memberof util
         * @type {Array.<*>}
         * @const
         */
        util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */[]; // used on prototypes

        /**
         * An immutable empty object.
         * @type {Object}
         * @const
         */
        util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */{}; // used on prototypes

        /**
         * Tests if the specified value is an integer.
         * @function
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is an integer
         */
        util.isInteger = Number.isInteger || /* istanbul ignore next */function isInteger(value) {
          return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
        };

        /**
         * Tests if the specified value is a string.
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is a string
         */
        util.isString = function isString(value) {
          return typeof value === "string" || value instanceof String;
        };

        /**
         * Tests if the specified value is a non-null object.
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is a non-null object
         */
        util.isObject = function isObject(value) {
          return value && typeof value === "object";
        };

        /**
         * Checks if a property on a message is considered to be present.
         * This is an alias of {@link util.isSet}.
         * @function
         * @param {Object} obj Plain object or message instance
         * @param {string} prop Property name
         * @returns {boolean} `true` if considered to be present, otherwise `false`
         */
        util.isset =
        /**
         * Checks if a property on a message is considered to be present.
         * @param {Object} obj Plain object or message instance
         * @param {string} prop Property name
         * @returns {boolean} `true` if considered to be present, otherwise `false`
         */
        util.isSet = function isSet(obj, prop) {
          var value = obj[prop];
          if (value != null && obj.hasOwnProperty(prop))
            // eslint-disable-line eqeqeq, no-prototype-builtins
            return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
          return false;
        };

        /**
         * Any compatible Buffer instance.
         * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
         * @interface Buffer
         * @extends Uint8Array
         */

        /**
         * Node's Buffer class if available.
         * @type {Constructor<Buffer>}
         */
        util.Buffer = function () {
          try {
            var Buffer = util.inquire("buffer").Buffer;
            // refuse to use non-node buffers if not explicitly assigned (perf reasons):
            return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */null;
          } catch (e) {
            /* istanbul ignore next */
            return null;
          }
        }();

        // Internal alias of or polyfull for Buffer.from.
        util._Buffer_from = null;

        // Internal alias of or polyfill for Buffer.allocUnsafe.
        util._Buffer_allocUnsafe = null;

        /**
         * Creates a new buffer of whatever type supported by the environment.
         * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
         * @returns {Uint8Array|Buffer} Buffer
         */
        util.newBuffer = function newBuffer(sizeOrArray) {
          /* istanbul ignore next */
          return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
        };

        /**
         * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
         * @type {Constructor<Uint8Array>}
         */
        util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

        /**
         * Any compatible Long instance.
         * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
         * @interface Long
         * @property {number} low Low bits
         * @property {number} high High bits
         * @property {boolean} unsigned Whether unsigned or not
         */

        /**
         * Long.js's Long class if available.
         * @type {Constructor<Long>}
         */
        util.Long = /* istanbul ignore next */util.global.dcodeIO && /* istanbul ignore next */util.global.dcodeIO.Long || /* istanbul ignore next */util.global.Long || util.inquire("long");

        /**
         * Regular expression used to verify 2 bit (`bool`) map keys.
         * @type {RegExp}
         * @const
         */
        util.key2Re = /^true|false|0|1$/;

        /**
         * Regular expression used to verify 32 bit (`int32` etc.) map keys.
         * @type {RegExp}
         * @const
         */
        util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

        /**
         * Regular expression used to verify 64 bit (`int64` etc.) map keys.
         * @type {RegExp}
         * @const
         */
        util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

        /**
         * Converts a number or long to an 8 characters long hash string.
         * @param {Long|number} value Value to convert
         * @returns {string} Hash
         */
        util.longToHash = function longToHash(value) {
          return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
        };

        /**
         * Converts an 8 characters long hash string to a long or number.
         * @param {string} hash Hash
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {Long|number} Original value
         */
        util.longFromHash = function longFromHash(hash, unsigned) {
          var bits = util.LongBits.fromHash(hash);
          if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
          return bits.toNumber(Boolean(unsigned));
        };

        /**
         * Merges the properties of the source object into the destination object.
         * @memberof util
         * @param {Object.<string,*>} dst Destination object
         * @param {Object.<string,*>} src Source object
         * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
         * @returns {Object.<string,*>} Destination object
         */
        function merge(dst, src, ifNotSet) {
          // used by converters
          for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
          return dst;
        }
        util.merge = merge;

        /**
         * Converts the first character of a string to lower case.
         * @param {string} str String to convert
         * @returns {string} Converted string
         */
        util.lcFirst = function lcFirst(str) {
          return str.charAt(0).toLowerCase() + str.substring(1);
        };

        /**
         * Creates a custom error constructor.
         * @memberof util
         * @param {string} name Error name
         * @returns {Constructor<Error>} Custom error constructor
         */
        function newError(name) {
          function CustomError(message, properties) {
            if (!(this instanceof CustomError)) return new CustomError(message, properties);

            // Error.call(this, message);
            // ^ just returns a new error instance because the ctor can be called as a function

            Object.defineProperty(this, "message", {
              get: function get() {
                return message;
              }
            });

            /* istanbul ignore next */
            if (Error.captureStackTrace)
              // node
              Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", {
              value: new Error().stack || ""
            });
            if (properties) merge(this, properties);
          }
          CustomError.prototype = Object.create(Error.prototype, {
            constructor: {
              value: CustomError,
              writable: true,
              enumerable: false,
              configurable: true
            },
            name: {
              get: function get() {
                return name;
              },
              set: undefined,
              enumerable: false,
              // configurable: false would accurately preserve the behavior of
              // the original, but I'm guessing that was not intentional.
              // For an actual error subclass, this property would
              // be configurable.
              configurable: true
            },
            toString: {
              value: function value() {
                return this.name + ": " + this.message;
              },
              writable: true,
              enumerable: false,
              configurable: true
            }
          });
          return CustomError;
        }
        util.newError = newError;

        /**
         * Constructs a new protocol error.
         * @classdesc Error subclass indicating a protocol specifc error.
         * @memberof util
         * @extends Error
         * @template T extends Message<T>
         * @constructor
         * @param {string} message Error message
         * @param {Object.<string,*>} [properties] Additional properties
         * @example
         * try {
         *     MyMessage.decode(someBuffer); // throws if required fields are missing
         * } catch (e) {
         *     if (e instanceof ProtocolError && e.instance)
         *         console.log("decoded so far: " + JSON.stringify(e.instance));
         * }
         */
        util.ProtocolError = newError("ProtocolError");

        /**
         * So far decoded message instance.
         * @name util.ProtocolError#instance
         * @type {Message<T>}
         */

        /**
         * A OneOf getter as returned by {@link util.oneOfGetter}.
         * @typedef OneOfGetter
         * @type {function}
         * @returns {string|undefined} Set field name, if any
         */

        /**
         * Builds a getter for a oneof's present field name.
         * @param {string[]} fieldNames Field names
         * @returns {OneOfGetter} Unbound getter
         */
        util.oneOfGetter = function getOneOf(fieldNames) {
          var fieldMap = {};
          for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;

          /**
           * @returns {string|undefined} Set field name, if any
           * @this Object
           * @ignore
           */
          return function () {
            // eslint-disable-line consistent-return
            for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
          };
        };

        /**
         * A OneOf setter as returned by {@link util.oneOfSetter}.
         * @typedef OneOfSetter
         * @type {function}
         * @param {string|undefined} value Field name
         * @returns {undefined}
         */

        /**
         * Builds a setter for a oneof's present field name.
         * @param {string[]} fieldNames Field names
         * @returns {OneOfSetter} Unbound setter
         */
        util.oneOfSetter = function setOneOf(fieldNames) {
          /**
           * @param {string} name Field name
           * @returns {undefined}
           * @this Object
           * @ignore
           */
          return function (name) {
            for (var i = 0; i < fieldNames.length; ++i) if (fieldNames[i] !== name) delete this[fieldNames[i]];
          };
        };

        /**
         * Default conversion options used for {@link Message#toJSON} implementations.
         *
         * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
         *
         * - Longs become strings
         * - Enums become string keys
         * - Bytes become base64 encoded strings
         * - (Sub-)Messages become plain objects
         * - Maps become plain objects with all string keys
         * - Repeated fields become arrays
         * - NaN and Infinity for float and double fields become strings
         *
         * @type {IConversionOptions}
         * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
         */
        util.toJSONOptions = {
          longs: String,
          enums: String,
          bytes: String,
          json: true
        };

        // Sets up buffer utility according to the environment (called in index-minimal)
        util._configure = function () {
          var Buffer = util.Buffer;
          /* istanbul ignore if */
          if (!Buffer) {
            util._Buffer_from = util._Buffer_allocUnsafe = null;
            return;
          }
          // because node 4.x buffers are incompatible & immutable
          // see: https://github.com/dcodeIO/protobuf.js/pull/665
          util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || /* istanbul ignore next */
          function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
          };
          util._Buffer_allocUnsafe = Buffer.allocUnsafe || /* istanbul ignore next */
          function Buffer_allocUnsafe(size) {
            return new Buffer(size);
          };
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          '@protobufjs/aspromise': __cjsMetaURL$1,
          '@protobufjs/base64': __cjsMetaURL$2,
          '@protobufjs/eventemitter': __cjsMetaURL$3,
          '@protobufjs/float': __cjsMetaURL$4,
          '@protobufjs/inquire': __cjsMetaURL$5,
          '@protobufjs/utf8': __cjsMetaURL$6,
          '@protobufjs/pool': __cjsMetaURL$7,
          './longbits': __cjsMetaURL$8
        };
      });
    }
  };
});

System.register("chunks:///_virtual/modular.js", ['./utils2.js'], function (exports) {
  var numberToBytesLE, numberToBytesBE, abytes, bytesToNumberLE, bytesToNumberBE, abool, anumber, bitLen, validateObject, asafenumber;
  return {
    setters: [function (module) {
      numberToBytesLE = module.numberToBytesLE;
      numberToBytesBE = module.numberToBytesBE;
      abytes = module.abytes;
      bytesToNumberLE = module.bytesToNumberLE;
      bytesToNumberBE = module.bytesToNumberBE;
      abool = module.abool;
      anumber = module.anumber;
      bitLen = module.bitLen;
      validateObject = module.validateObject;
      asafenumber = module.asafenumber;
    }],
    execute: function () {
      exports({
        Field: Field,
        FpInvertBatch: FpInvertBatch,
        FpLegendre: FpLegendre,
        FpPow: FpPow,
        FpSqrt: FpSqrt,
        getFieldBytesLength: getFieldBytesLength,
        getMinHashLength: getMinHashLength,
        invert: invert,
        mapHashToField: mapHashToField,
        mod: mod,
        nLength: nLength,
        pow2: pow2,
        tonelliShanks: tonelliShanks,
        validateField: validateField
      });

      /**
       * Utils for modular division and fields.
       * Field over 11 is a finite (Galois) field is integer number operations `mod 11`.
       * There is no division: it is replaced by modular multiplicative inverse.
       * @module
       */
      // Numbers aren't used in x25519 / x448 builds
      // prettier-ignore
      var _0n = /* @__PURE__ */BigInt(0),
        _1n = /* @__PURE__ */BigInt(1),
        _2n = /* @__PURE__ */BigInt(2);
      // prettier-ignore
      var _3n = /* @__PURE__ */BigInt(3),
        _4n = /* @__PURE__ */BigInt(4),
        _5n = /* @__PURE__ */BigInt(5);
      // prettier-ignore
      var _7n = /* @__PURE__ */BigInt(7),
        _8n = /* @__PURE__ */BigInt(8),
        _9n = /* @__PURE__ */BigInt(9);
      var _16n = /* @__PURE__ */BigInt(16);
      /**
       * @param a - Dividend value.
       * @param b - Positive modulus.
       * @returns Reduced value in `[0, b)` only when `b` is positive.
       * @throws If the modulus is not positive. {@link Error}
       * @example
       * Normalize a bigint into one field residue.
       *
       * ```ts
       * mod(-1n, 5n);
       * ```
       */
      function mod(a, b) {
        if (b <= _0n) throw new Error('mod: expected positive modulus, got ' + b);
        var result = a % b;
        return result >= _0n ? result : b + result;
      }
      /**
       * Does `x^(2^power)` mod p. `pow2(30, 4)` == `30^(2^4)`.
       * Low-level helper: callers that need canonical residues must pass a valid `x` for the chosen
       * modulus; the `power===0` fast path intentionally returns the input unchanged.
       * @param x - Base value.
       * @param power - Number of squarings.
       * @param modulo - Reduction modulus.
       * @returns Repeated-squaring result.
       * @throws If the exponent is negative. {@link Error}
       * @example
       * Apply repeated squaring inside one field.
       *
       * ```ts
       * pow2(3n, 2n, 11n);
       * ```
       */
      function pow2(x, power, modulo) {
        if (power < _0n) throw new Error('pow2: expected non-negative exponent, got ' + power);
        var res = x;
        while (power-- > _0n) {
          res *= res;
          res %= modulo;
        }
        return res;
      }
      /**
       * Inverses number over modulo.
       * Implemented using the {@link https://brilliant.org/wiki/extended-euclidean-algorithm/ | extended Euclidean algorithm}.
       * @param number - Value to invert.
       * @param modulo - Positive modulus.
       * @returns Multiplicative inverse.
       * @throws If the modulus is invalid or the inverse does not exist. {@link Error}
       * @example
       * Compute one modular inverse with the extended Euclidean algorithm.
       *
       * ```ts
       * invert(3n, 11n);
       * ```
       */
      function invert(number, modulo) {
        if (number === _0n) throw new Error('invert: expected non-zero number');
        if (modulo <= _0n) throw new Error('invert: expected positive modulus, got ' + modulo);
        // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
        var a = mod(number, modulo);
        var b = modulo;
        // prettier-ignore
        var x = _0n,
          y = _1n,
          u = _1n,
          v = _0n;
        while (a !== _0n) {
          var q = b / a;
          var r = b - a * q;
          var m = x - u * q;
          var n = y - v * q;
          // prettier-ignore
          b = a, a = r, x = u, y = v, u = m, v = n;
        }
        var gcd = b;
        if (gcd !== _1n) throw new Error('invert: does not exist');
        return mod(x, modulo);
      }
      function assertIsSquare(Fp, root, n) {
        var F = Fp;
        if (!F.eql(F.sqr(root), n)) throw new Error('Cannot find square root');
      }
      // Not all roots are possible! Example which will throw:
      // const NUM =
      // n = 72057594037927816n;
      // Fp = Field(BigInt('0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab'));
      function sqrt3mod4(Fp, n) {
        var F = Fp;
        var p1div4 = (F.ORDER + _1n) / _4n;
        var root = F.pow(n, p1div4);
        assertIsSquare(F, root, n);
        return root;
      }
      // Equivalent `q = 5 (mod 8)` square-root formula (Atkin-style), not the RFC Appendix I.2 CMOV
      // pseudocode verbatim.
      function sqrt5mod8(Fp, n) {
        var F = Fp;
        var p5div8 = (F.ORDER - _5n) / _8n;
        var n2 = F.mul(n, _2n);
        var v = F.pow(n2, p5div8);
        var nv = F.mul(n, v);
        var i = F.mul(F.mul(nv, _2n), v);
        var root = F.mul(nv, F.sub(i, F.ONE));
        assertIsSquare(F, root, n);
        return root;
      }
      // Based on RFC9380, Kong algorithm
      // prettier-ignore
      function sqrt9mod16(P) {
        var Fp_ = Field(P);
        var tn = tonelliShanks(P);
        var c1 = tn(Fp_, Fp_.neg(Fp_.ONE)); //  1. c1 = sqrt(-1) in F, i.e., (c1^2) == -1 in F
        var c2 = tn(Fp_, c1); //  2. c2 = sqrt(c1) in F, i.e., (c2^2) == c1 in F
        var c3 = tn(Fp_, Fp_.neg(c1)); //  3. c3 = sqrt(-c1) in F, i.e., (c3^2) == -c1 in F
        var c4 = (P + _7n) / _16n; //  4. c4 = (q + 7) / 16        # Integer arithmetic
        return function (Fp, n) {
          var F = Fp;
          var tv1 = F.pow(n, c4); //  1. tv1 = x^c4
          var tv2 = F.mul(tv1, c1); //  2. tv2 = c1 * tv1
          var tv3 = F.mul(tv1, c2); //  3. tv3 = c2 * tv1
          var tv4 = F.mul(tv1, c3); //  4. tv4 = c3 * tv1
          var e1 = F.eql(F.sqr(tv2), n); //  5.  e1 = (tv2^2) == x
          var e2 = F.eql(F.sqr(tv3), n); //  6.  e2 = (tv3^2) == x
          tv1 = F.cmov(tv1, tv2, e1); //  7. tv1 = CMOV(tv1, tv2, e1)  # Select tv2 if (tv2^2) == x
          tv2 = F.cmov(tv4, tv3, e2); //  8. tv2 = CMOV(tv4, tv3, e2)  # Select tv3 if (tv3^2) == x
          var e3 = F.eql(F.sqr(tv2), n); //  9.  e3 = (tv2^2) == x
          var root = F.cmov(tv1, tv2, e3); // 10.  z = CMOV(tv1, tv2, e3)   # Select sqrt from tv1 & tv2
          assertIsSquare(F, root, n);
          return root;
        };
      }
      /**
       * Tonelli-Shanks square root search algorithm.
       * This implementation is variable-time: it searches data-dependently for the first non-residue `Z`
       * and for the smallest `i` in the main loop, unlike RFC 9380 Appendix I.4's constant-time shape.
       * 1. {@link https://eprint.iacr.org/2012/685.pdf | eprint 2012/685}, page 12
       * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
       * @param P - field order
       * @returns function that takes field Fp (created from P) and number n
       * @throws If the field is too small, non-prime, or the square root does not exist. {@link Error}
       * @example
       * Construct a square-root helper for primes that need Tonelli-Shanks.
       *
       * ```ts
       * import { Field, tonelliShanks } from '@noble/curves/abstract/modular.js';
       * const Fp = Field(17n);
       * const sqrt = tonelliShanks(17n)(Fp, 4n);
       * ```
       */
      function tonelliShanks(P) {
        // Initialization (precomputation).
        // Caching initialization could boost perf by 7%.
        if (P < _3n) throw new Error('sqrt is not defined for small field');
        // Factor P - 1 = Q * 2^S, where Q is odd
        var Q = P - _1n;
        var S = 0;
        while (Q % _2n === _0n) {
          Q /= _2n;
          S++;
        }
        // Find the first quadratic non-residue Z >= 2
        var Z = _2n;
        var _Fp = Field(P);
        while (FpLegendre(_Fp, Z) === 1) {
          // Basic primality test for P. After x iterations, chance of
          // not finding quadratic non-residue is 2^x, so 2^1000.
          if (Z++ > 1000) throw new Error('Cannot find square root: probably non-prime P');
        }
        // Fast-path; usually done before Z, but we do "primality test".
        if (S === 1) return sqrt3mod4;
        // Slow-path
        // TODO: test on Fp2 and others
        var cc = _Fp.pow(Z, Q); // c = z^Q
        var Q1div2 = (Q + _1n) / _2n;
        return function tonelliSlow(Fp, n) {
          var F = Fp;
          if (F.is0(n)) return n;
          // Check if n is a quadratic residue using Legendre symbol
          if (FpLegendre(F, n) !== 1) throw new Error('Cannot find square root');
          // Initialize variables for the main loop
          var M = S;
          var c = F.mul(F.ONE, cc); // c = z^Q, move cc from field _Fp into field Fp
          var t = F.pow(n, Q); // t = n^Q, first guess at the fudge factor
          var R = F.pow(n, Q1div2); // R = n^((Q+1)/2), first guess at the square root
          // Main loop
          // while t != 1
          while (!F.eql(t, F.ONE)) {
            if (F.is0(t)) return F.ZERO; // if t=0 return R=0
            var i = 1;
            // Find the smallest i >= 1 such that t^(2^i) ≡ 1 (mod P)
            var t_tmp = F.sqr(t); // t^(2^1)
            while (!F.eql(t_tmp, F.ONE)) {
              i++;
              t_tmp = F.sqr(t_tmp); // t^(2^2)...
              if (i === M) throw new Error('Cannot find square root');
            }
            // Calculate the exponent for b: 2^(M - i - 1)
            var exponent = _1n << BigInt(M - i - 1); // bigint is important
            var b = F.pow(c, exponent); // b = 2^(M - i - 1)
            // Update variables
            M = i;
            c = F.sqr(b); // c = b^2
            t = F.mul(t, c); // t = (t * b^2)
            R = F.mul(R, b); // R = R*b
          }

          return R;
        };
      }
      /**
       * Square root for a finite field. Will try optimized versions first:
       *
       * 1. P ≡ 3 (mod 4)
       * 2. P ≡ 5 (mod 8)
       * 3. P ≡ 9 (mod 16)
       * 4. Tonelli-Shanks algorithm
       *
       * Different algorithms can give different roots, it is up to user to decide which one they want.
       * For example there is FpSqrtOdd/FpSqrtEven to choose a root by oddness
       * (used for hash-to-curve).
       * @param P - Field order.
       * @returns Square-root helper. The generic fallback inherits Tonelli-Shanks' variable-time
       *   behavior and this selector assumes prime-field-style integer moduli.
       * @throws If the field is unsupported or the square root does not exist. {@link Error}
       * @example
       * Choose the square-root helper appropriate for one field modulus.
       *
       * ```ts
       * import { Field, FpSqrt } from '@noble/curves/abstract/modular.js';
       * const Fp = Field(17n);
       * const sqrt = FpSqrt(17n)(Fp, 4n);
       * ```
       */
      function FpSqrt(P) {
        // P ≡ 3 (mod 4) => √n = n^((P+1)/4)
        if (P % _4n === _3n) return sqrt3mod4;
        // P ≡ 5 (mod 8) => Atkin algorithm, page 10 of https://eprint.iacr.org/2012/685.pdf
        if (P % _8n === _5n) return sqrt5mod8;
        // P ≡ 9 (mod 16) => Kong algorithm, page 11 of https://eprint.iacr.org/2012/685.pdf (algorithm 4)
        if (P % _16n === _9n) return sqrt9mod16(P);
        // Tonelli-Shanks algorithm
        return tonelliShanks(P);
      }
      // prettier-ignore
      // Arithmetic-only subset checked by validateField(). This is intentionally not the full runtime
      // IField contract: helpers like `isValidNot0`, `invertBatch`, `toBytes`, `fromBytes`, `cmov`, and
      // field-specific extras like `isOdd` are left to the callers that actually need them.
      var FIELD_FIELDS = ['create', 'isValid', 'is0', 'neg', 'inv', 'sqrt', 'sqr', 'eql', 'add', 'sub', 'mul', 'pow', 'div', 'addN', 'subN', 'mulN', 'sqrN'];
      /**
       * @param field - Field implementation.
       * @returns Validated field. This only checks the arithmetic subset needed by generic helpers; it
       *   does not guarantee full runtime-method coverage for serialization, batching, `cmov`, or
       *   field-specific extras beyond positive `BYTES` / `BITS`.
       * @throws If the field shape or numeric metadata are invalid. {@link Error}
       * @example
       * Check that a field implementation exposes the operations curve code expects.
       *
       * ```ts
       * import { Field, validateField } from '@noble/curves/abstract/modular.js';
       * const Fp = validateField(Field(17n));
       * ```
       */
      function validateField(field) {
        var initial = {
          ORDER: 'bigint',
          BYTES: 'number',
          BITS: 'number'
        };
        var opts = FIELD_FIELDS.reduce(function (map, val) {
          map[val] = 'function';
          return map;
        }, initial);
        validateObject(field, opts);
        // Runtime field implementations must expose real integer byte/bit sizes; fractional / NaN /
        // infinite metadata leaks through validateObject(type='number') but breaks encoders and caches.
        asafenumber(field.BYTES, 'BYTES');
        asafenumber(field.BITS, 'BITS');
        // Runtime field implementations must expose positive byte/bit sizes; zero leaks through the
        // numeric shape checks above but still breaks encoding helpers and cached-length assumptions.
        if (field.BYTES < 1 || field.BITS < 1) throw new Error('invalid field: expected BYTES/BITS > 0');
        if (field.ORDER <= _1n) throw new Error('invalid field: expected ORDER > 1, got ' + field.ORDER);
        return field;
      }
      // Generic field functions
      /**
       * Same as `pow` but for Fp: non-constant-time.
       * Unsafe in some contexts: uses ladder, so can expose bigint bits.
       * @param Fp - Field implementation.
       * @param num - Base value.
       * @param power - Exponent value.
       * @returns Powered field element.
       * @throws If the exponent is negative. {@link Error}
       * @example
       * Raise one field element to a public exponent.
       *
       * ```ts
       * import { Field, FpPow } from '@noble/curves/abstract/modular.js';
       * const Fp = Field(17n);
       * const x = FpPow(Fp, 3n, 5n);
       * ```
       */
      function FpPow(Fp, num, power) {
        var F = Fp;
        if (power < _0n) throw new Error('invalid exponent, negatives unsupported');
        if (power === _0n) return F.ONE;
        if (power === _1n) return num;
        var p = F.ONE;
        var d = num;
        while (power > _0n) {
          if (power & _1n) p = F.mul(p, d);
          d = F.sqr(d);
          power >>= _1n;
        }
        return p;
      }
      /**
       * Efficiently invert an array of Field elements.
       * Exception-free. Zero-valued field elements stay `undefined` unless `passZero` is enabled.
       * @param Fp - Field implementation.
       * @param nums - Values to invert.
       * @param passZero - map 0 to 0 (instead of undefined)
       * @returns Inverted values.
       * @example
       * Invert several field elements with one shared inversion.
       *
       * ```ts
       * import { Field, FpInvertBatch } from '@noble/curves/abstract/modular.js';
       * const Fp = Field(17n);
       * const inv = FpInvertBatch(Fp, [1n, 2n, 4n]);
       * ```
       */
      function FpInvertBatch(Fp, nums, passZero) {
        if (passZero === void 0) {
          passZero = false;
        }
        var F = Fp;
        var inverted = new Array(nums.length).fill(passZero ? F.ZERO : undefined);
        // Walk from first to last, multiply them by each other MOD p
        var multipliedAcc = nums.reduce(function (acc, num, i) {
          if (F.is0(num)) return acc;
          inverted[i] = acc;
          return F.mul(acc, num);
        }, F.ONE);
        // Invert last element
        var invertedAcc = F.inv(multipliedAcc);
        // Walk from last to first, multiply them by inverted each other MOD p
        nums.reduceRight(function (acc, num, i) {
          if (F.is0(num)) return acc;
          inverted[i] = F.mul(acc, inverted[i]);
          return F.mul(acc, num);
        }, invertedAcc);
        return inverted;
      }
      /**
       * Legendre symbol.
       * Legendre constant is used to calculate Legendre symbol (a | p)
       * which denotes the value of a^((p-1)/2) (mod p).
       *
       * * (a | p) ≡ 1    if a is a square (mod p), quadratic residue
       * * (a | p) ≡ -1   if a is not a square (mod p), quadratic non residue
       * * (a | p) ≡ 0    if a ≡ 0 (mod p)
       * @param Fp - Field implementation.
       * @param n - Value to inspect.
       * @returns Legendre symbol.
       * @throws If the field returns an invalid Legendre symbol value. {@link Error}
       * @example
       * Compute the Legendre symbol of one field element.
       *
       * ```ts
       * import { Field, FpLegendre } from '@noble/curves/abstract/modular.js';
       * const Fp = Field(17n);
       * const symbol = FpLegendre(Fp, 4n);
       * ```
       */
      function FpLegendre(Fp, n) {
        var F = Fp;
        // We can use 3rd argument as optional cache of this value
        // but seems unneeded for now. The operation is very fast.
        var p1mod2 = (F.ORDER - _1n) / _2n;
        var powered = F.pow(n, p1mod2);
        var yes = F.eql(powered, F.ONE);
        var zero = F.eql(powered, F.ZERO);
        var no = F.eql(powered, F.neg(F.ONE));
        if (!yes && !zero && !no) throw new Error('invalid Legendre symbol result');
        return yes ? 1 : zero ? 0 : -1;
      }
      /**
       * @param n - Curve order. Callers are expected to pass a positive order.
       * @param nBitLength - Optional cached bit length. Callers are expected to pass a positive cached
       *   value when overriding the derived bit length.
       * @returns Byte and bit lengths.
       * @throws If the order or cached bit length is invalid. {@link Error}
       * @example
       * Measure the encoding sizes needed for one modulus.
       *
       * ```ts
       * nLength(255n);
       * ```
       */
      function nLength(n, nBitLength) {
        // Bit size, byte size of CURVE.n
        if (nBitLength !== undefined) anumber(nBitLength);
        if (n <= _0n) throw new Error('invalid n length: expected positive n, got ' + n);
        if (nBitLength !== undefined && nBitLength < 1) throw new Error('invalid n length: expected positive bit length, got ' + nBitLength);
        var bits = bitLen(n);
        // Cached bit lengths smaller than ORDER would truncate serialized scalars/elements and poison
        // any math that relies on the derived field metadata.
        if (nBitLength !== undefined && nBitLength < bits) throw new Error("invalid n length: expected bit length (" + bits + ") >= n.length (" + nBitLength + ")");
        var _nBitLength = nBitLength !== undefined ? nBitLength : bits;
        var nByteLength = Math.ceil(_nBitLength / 8);
        return {
          nBitLength: _nBitLength,
          nByteLength: nByteLength
        };
      }
      // Keep the lazy sqrt cache off-instance so Field(...) can return a frozen object. Otherwise the
      // cached helper write would keep the field surface externally mutable.
      var FIELD_SQRT = new WeakMap();
      var _Field = /*#__PURE__*/function () {
        function _Field(ORDER, opts) {
          if (opts === void 0) {
            opts = {};
          }
          this.ORDER = void 0;
          this.BITS = void 0;
          this.BYTES = void 0;
          this.isLE = void 0;
          this.ZERO = _0n;
          this.ONE = _1n;
          this._lengths = void 0;
          this._mod = void 0;
          // ORDER <= 1 is degenerate: ONE would not be a valid field element and helpers like pow/inv
          // would stop modeling field arithmetic.
          if (ORDER <= _1n) throw new Error('invalid field: expected ORDER > 1, got ' + ORDER);
          var _nbitLength = undefined;
          this.isLE = false;
          if (opts != null && typeof opts === 'object') {
            // Cached bit lengths are trusted here and should already be positive / consistent with ORDER.
            if (typeof opts.BITS === 'number') _nbitLength = opts.BITS;
            if (typeof opts.sqrt === 'function')
              // `_Field.prototype` is frozen below, so custom sqrt hooks must become own properties
              // explicitly instead of relying on writable prototype shadowing via assignment.
              Object.defineProperty(this, 'sqrt', {
                value: opts.sqrt,
                enumerable: true
              });
            if (typeof opts.isLE === 'boolean') this.isLE = opts.isLE;
            if (opts.allowedLengths) this._lengths = Object.freeze(opts.allowedLengths.slice());
            if (typeof opts.modFromBytes === 'boolean') this._mod = opts.modFromBytes;
          }
          var _nLength = nLength(ORDER, _nbitLength),
            nBitLength = _nLength.nBitLength,
            nByteLength = _nLength.nByteLength;
          if (nByteLength > 2048) throw new Error('invalid field: expected ORDER of <= 2048 bytes');
          this.ORDER = ORDER;
          this.BITS = nBitLength;
          this.BYTES = nByteLength;
          Object.freeze(this);
        }
        var _proto = _Field.prototype;
        _proto.create = function create(num) {
          return mod(num, this.ORDER);
        };
        _proto.isValid = function isValid(num) {
          if (typeof num !== 'bigint') throw new TypeError('invalid field element: expected bigint, got ' + typeof num);
          return _0n <= num && num < this.ORDER; // 0 is valid element, but it's not invertible
        };

        _proto.is0 = function is0(num) {
          return num === _0n;
        }
        // is valid and invertible
        ;

        _proto.isValidNot0 = function isValidNot0(num) {
          return !this.is0(num) && this.isValid(num);
        };
        _proto.isOdd = function isOdd(num) {
          return (num & _1n) === _1n;
        };
        _proto.neg = function neg(num) {
          return mod(-num, this.ORDER);
        };
        _proto.eql = function eql(lhs, rhs) {
          return lhs === rhs;
        };
        _proto.sqr = function sqr(num) {
          return mod(num * num, this.ORDER);
        };
        _proto.add = function add(lhs, rhs) {
          return mod(lhs + rhs, this.ORDER);
        };
        _proto.sub = function sub(lhs, rhs) {
          return mod(lhs - rhs, this.ORDER);
        };
        _proto.mul = function mul(lhs, rhs) {
          return mod(lhs * rhs, this.ORDER);
        };
        _proto.pow = function pow(num, power) {
          return FpPow(this, num, power);
        };
        _proto.div = function div(lhs, rhs) {
          return mod(lhs * invert(rhs, this.ORDER), this.ORDER);
        }
        // Same as above, but doesn't normalize
        ;

        _proto.sqrN = function sqrN(num) {
          return num * num;
        };
        _proto.addN = function addN(lhs, rhs) {
          return lhs + rhs;
        };
        _proto.subN = function subN(lhs, rhs) {
          return lhs - rhs;
        };
        _proto.mulN = function mulN(lhs, rhs) {
          return lhs * rhs;
        };
        _proto.inv = function inv(num) {
          return invert(num, this.ORDER);
        };
        _proto.sqrt = function sqrt(num) {
          // Caching sqrt helpers speeds up sqrt9mod16 by 5x and Tonelli-Shanks by about 10% without keeping
          // the field instance itself mutable.
          var sqrt = FIELD_SQRT.get(this);
          if (!sqrt) FIELD_SQRT.set(this, sqrt = FpSqrt(this.ORDER));
          return sqrt(this, num);
        };
        _proto.toBytes = function toBytes(num) {
          // Serialize fixed-width limbs without re-validating the field range. Callers that need a
          // canonical encoding must pass a valid element; some protocols intentionally serialize raw
          // residues here and reduce or validate them elsewhere.
          return this.isLE ? numberToBytesLE(num, this.BYTES) : numberToBytesBE(num, this.BYTES);
        };
        _proto.fromBytes = function fromBytes(bytes, skipValidation) {
          if (skipValidation === void 0) {
            skipValidation = false;
          }
          abytes(bytes);
          var allowedLengths = this._lengths,
            BYTES = this.BYTES,
            isLE = this.isLE,
            ORDER = this.ORDER,
            modFromBytes = this._mod;
          if (allowedLengths) {
            // `allowedLengths` must list real positive byte lengths; otherwise empty input would get
            // padded into zero and silently decode as a field element.
            if (bytes.length < 1 || !allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
              throw new Error('Field.fromBytes: expected ' + allowedLengths + ' bytes, got ' + bytes.length);
            }
            var padded = new Uint8Array(BYTES);
            // isLE add 0 to right, !isLE to the left.
            padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
            bytes = padded;
          }
          if (bytes.length !== BYTES) throw new Error('Field.fromBytes: expected ' + BYTES + ' bytes, got ' + bytes.length);
          var scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
          if (modFromBytes) scalar = mod(scalar, ORDER);
          if (!skipValidation) if (!this.isValid(scalar)) throw new Error('invalid field element: outside of range 0..ORDER');
          // Range validation is optional here because some protocols intentionally decode raw residues
          // and reduce or validate them elsewhere.
          return scalar;
        }
        // TODO: we don't need it here, move out to separate fn
        ;

        _proto.invertBatch = function invertBatch(lst) {
          return FpInvertBatch(this, lst);
        }
        // We can't move this out because Fp6, Fp12 implement it
        // and it's unclear what to return in there.
        ;

        _proto.cmov = function cmov(a, b, condition) {
          // Field elements have `isValid(...)`; the CMOV branch bit is a direct runtime input, so reject
          // non-boolean selectors here instead of letting JS truthiness silently change arithmetic.
          abool(condition, 'condition');
          return condition ? b : a;
        };
        return _Field;
      }(); // Freeze the shared method surface too; otherwise callers can still poison every Field instance by
      // monkey-patching `_Field.prototype` even if each instance is frozen.
      Object.freeze(_Field.prototype);
      /**
       * Creates a finite field. Major performance optimizations:
       * * 1. Denormalized operations like mulN instead of mul.
       * * 2. Identical object shape: never add or remove keys.
       * * 3. Frozen stable object shape; the lazy sqrt cache lives in a module-level `WeakMap`.
       * Fragile: always run a benchmark on a change.
       * Security note: operations and low-level serializers like `toBytes` don't check `isValid` for
       * all elements for performance and protocol-flexibility reasons; callers are responsible for
       * supplying valid elements when they need canonical field behavior.
       * This is low-level code, please make sure you know what you're doing.
       *
       * Note about field properties:
       * * CHARACTERISTIC p = prime number, number of elements in main subgroup.
       * * ORDER q = similar to cofactor in curves, may be composite `q = p^m`.
       *
       * @param ORDER - field order, probably prime, or could be composite
       * @param opts - Field options such as bit length or endianness. See {@link FieldOpts}.
       * @returns Frozen field instance with a stable object shape. This wrapper forwards `opts` straight
       *   into `_Field`, so it inherits `_Field`'s assumptions about cached sizes and `allowedLengths`.
       * @example
       * Construct one prime field with optional overrides.
       *
       * ```ts
       * Field(11n);
       * ```
       */
      function Field(ORDER, opts) {
        if (opts === void 0) {
          opts = {};
        }
        return new _Field(ORDER, opts);
      }
      /**
       * Returns total number of bytes consumed by the field element.
       * For example, 32 bytes for usual 256-bit weierstrass curve.
       * @param fieldOrder - number of field elements, usually CURVE.n. Callers are expected to pass an
       *   order greater than 1.
       * @returns byte length of field
       * @throws If the field order is not a bigint. {@link Error}
       * @example
       * Read the fixed-width byte length of one field.
       *
       * ```ts
       * getFieldBytesLength(255n);
       * ```
       */
      function getFieldBytesLength(fieldOrder) {
        if (typeof fieldOrder !== 'bigint') throw new Error('field order must be bigint');
        // Valid field elements are in 0..ORDER-1, so ORDER <= 1 would make the encoded range degenerate.
        if (fieldOrder <= _1n) throw new Error('field order must be greater than 1');
        // Valid field elements are < ORDER, so the maximal encoded element is ORDER - 1.
        var bitLength = bitLen(fieldOrder - _1n);
        return Math.ceil(bitLength / 8);
      }
      /**
       * Returns minimal amount of bytes that can be safely reduced
       * by field order.
       * Should be 2^-128 for 128-bit curve such as P256.
       * This is the reduction / modulo-bias lower bound; higher-level helpers may still impose a larger
       * absolute floor for policy reasons.
       * @param fieldOrder - number of field elements greater than 1, usually CURVE.n.
       * @returns byte length of target hash
       * @throws If the field order is invalid. {@link Error}
       * @example
       * Compute the minimum hash length needed for field reduction.
       *
       * ```ts
       * getMinHashLength(255n);
       * ```
       */
      function getMinHashLength(fieldOrder) {
        var length = getFieldBytesLength(fieldOrder);
        return length + Math.ceil(length / 2);
      }
      /**
       * "Constant-time" private key generation utility.
       * Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
       * and convert them into private scalar, with the modulo bias being negligible.
       * Needs at least 48 bytes of input for 32-byte private key. The implementation also keeps a hard
       * 16-byte minimum even when `getMinHashLength(...)` is smaller, so toy-small inputs do not look
       * accidentally acceptable for real scalar derivation.
       * See {@link https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/ | Kudelski's modulo-bias guide},
       * {@link https://csrc.nist.gov/publications/detail/fips/186/5/final | FIPS 186-5 appendix A.2}, and
       * {@link https://www.rfc-editor.org/rfc/rfc9380#section-5 | RFC 9380 section 5}. Unlike RFC 9380
       * `hash_to_field`, this helper intentionally maps into the non-zero private-scalar range `1..n-1`.
       * @param key - Uniform input bytes.
       * @param fieldOrder - Size of subgroup.
       * @param isLE - interpret hash bytes as LE num
       * @returns valid private scalar
       * @throws If the hash length or field order is invalid for scalar reduction. {@link Error}
       * @example
       * Map hash output into a private scalar range.
       *
       * ```ts
       * mapHashToField(new Uint8Array(48).fill(1), 255n);
       * ```
       */
      function mapHashToField(key, fieldOrder, isLE) {
        if (isLE === void 0) {
          isLE = false;
        }
        abytes(key);
        var len = key.length;
        var fieldLen = getFieldBytesLength(fieldOrder);
        var minLen = Math.max(getMinHashLength(fieldOrder), 16);
        // No toy-small inputs: the helper is for real scalar derivation, not tiny test curves. No huge
        // inputs: easier to reason about JS timing / allocation behavior.
        if (len < minLen || len > 1024) throw new Error('expected ' + minLen + '-1024 bytes of input, got ' + len);
        var num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
        // `mod(x, 11)` can sometimes produce 0. `mod(x, 10) + 1` is the same, but no 0
        var reduced = mod(num, fieldOrder - _1n) + _1n;
        return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
      }
    }
  };
});

System.register("chunks:///_virtual/reader_buffer.js", ['./cjs-loader.mjs', './reader.js', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1, __cjsMetaURL$2;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = BufferReader;

        // extends Reader
        var Reader = require("./reader");
        (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
        var util = require("./util/minimal");

        /**
         * Constructs a new buffer reader instance.
         * @classdesc Wire format reader using node buffers.
         * @extends Reader
         * @constructor
         * @param {Buffer} buffer Buffer to read from
         */
        function BufferReader(buffer) {
          Reader.call(this, buffer);

          /**
           * Read buffer.
           * @name BufferReader#buf
           * @type {Buffer}
           */
        }

        BufferReader._configure = function () {
          /* istanbul ignore else */
          if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
        };

        /**
         * @override
         */
        BufferReader.prototype.string = function read_string_buffer() {
          var len = this.uint32(); // modifies pos
          return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
        };

        /**
         * Reads a sequence of bytes preceeded by its length as a varint.
         * @name BufferReader#bytes
         * @function
         * @returns {Buffer} Value read
         */

        BufferReader._configure();

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './reader': __cjsMetaURL$1,
          './util/minimal': __cjsMetaURL$2
        };
      });
    }
  };
});

System.register("chunks:///_virtual/reader.js", ['./cjs-loader.mjs', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = Reader;
        var util = require("./util/minimal");
        var BufferReader; // cyclic

        var LongBits = util.LongBits,
          utf8 = util.utf8;

        /* istanbul ignore next */
        function indexOutOfRange(reader, writeLength) {
          return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
        }

        /**
         * Constructs a new reader instance using the specified buffer.
         * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
         * @constructor
         * @param {Uint8Array} buffer Buffer to read from
         */
        function Reader(buffer) {
          /**
           * Read buffer.
           * @type {Uint8Array}
           */
          this.buf = buffer;

          /**
           * Read buffer position.
           * @type {number}
           */
          this.pos = 0;

          /**
           * Read buffer length.
           * @type {number}
           */
          this.len = buffer.length;
        }
        var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
          if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
          throw Error("illegal buffer");
        }
        /* istanbul ignore next */ : function create_array(buffer) {
          if (Array.isArray(buffer)) return new Reader(buffer);
          throw Error("illegal buffer");
        };
        var create = function create() {
          return util.Buffer ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
              return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer)
              /* istanbul ignore next */ : create_array(buffer);
            })(buffer);
          }
          /* istanbul ignore next */ : create_array;
        };

        /**
         * Creates a new reader using the specified buffer.
         * @function
         * @param {Uint8Array|Buffer} buffer Buffer to read from
         * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
         * @throws {Error} If `buffer` is not a valid buffer
         */
        Reader.create = create();
        Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */util.Array.prototype.slice;

        /**
         * Reads a varint as an unsigned 32 bit value.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype.uint32 = function read_uint32_setup() {
          var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
          return function read_uint32() {
            value = (this.buf[this.pos] & 127) >>> 0;
            if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
            if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
            if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
            if (this.buf[this.pos++] < 128) return value;
            value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
            if (this.buf[this.pos++] < 128) return value;

            /* istanbul ignore if */
            if ((this.pos += 5) > this.len) {
              this.pos = this.len;
              throw indexOutOfRange(this, 10);
            }
            return value;
          };
        }();

        /**
         * Reads a varint as a signed 32 bit value.
         * @returns {number} Value read
         */
        Reader.prototype.int32 = function read_int32() {
          return this.uint32() | 0;
        };

        /**
         * Reads a zig-zag encoded varint as a signed 32 bit value.
         * @returns {number} Value read
         */
        Reader.prototype.sint32 = function read_sint32() {
          var value = this.uint32();
          return value >>> 1 ^ -(value & 1) | 0;
        };

        /* eslint-disable no-invalid-this */

        function readLongVarint() {
          // tends to deopt with local vars for octet etc.
          var bits = new LongBits(0, 0);
          var i = 0;
          if (this.len - this.pos > 4) {
            // fast route (lo)
            for (; i < 4; ++i) {
              // 1st..4th
              bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
              if (this.buf[this.pos++] < 128) return bits;
            }
            // 5th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
            i = 0;
          } else {
            for (; i < 3; ++i) {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this);
              // 1st..3th
              bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
              if (this.buf[this.pos++] < 128) return bits;
            }
            // 4th
            bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
            return bits;
          }
          if (this.len - this.pos > 4) {
            // fast route (hi)
            for (; i < 5; ++i) {
              // 6th..10th
              bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
              if (this.buf[this.pos++] < 128) return bits;
            }
          } else {
            for (; i < 5; ++i) {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this);
              // 6th..10th
              bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
              if (this.buf[this.pos++] < 128) return bits;
            }
          }
          /* istanbul ignore next */
          throw Error("invalid varint encoding");
        }

        /* eslint-enable no-invalid-this */

        /**
         * Reads a varint as a signed 64 bit value.
         * @name Reader#int64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a varint as an unsigned 64 bit value.
         * @name Reader#uint64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a zig-zag encoded varint as a signed 64 bit value.
         * @name Reader#sint64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a varint as a boolean.
         * @returns {boolean} Value read
         */
        Reader.prototype.bool = function read_bool() {
          return this.uint32() !== 0;
        };
        function readFixed32_end(buf, end) {
          // note that this uses `end`, not `pos`
          return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
        }

        /**
         * Reads fixed 32 bits as an unsigned 32 bit integer.
         * @returns {number} Value read
         */
        Reader.prototype.fixed32 = function read_fixed32() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
          return readFixed32_end(this.buf, this.pos += 4);
        };

        /**
         * Reads fixed 32 bits as a signed 32 bit integer.
         * @returns {number} Value read
         */
        Reader.prototype.sfixed32 = function read_sfixed32() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
          return readFixed32_end(this.buf, this.pos += 4) | 0;
        };

        /* eslint-disable no-invalid-this */

        function readFixed64( /* this: Reader */
        ) {
          /* istanbul ignore if */
          if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
          return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
        }

        /* eslint-enable no-invalid-this */

        /**
         * Reads fixed 64 bits.
         * @name Reader#fixed64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads zig-zag encoded fixed 64 bits.
         * @name Reader#sfixed64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a float (32 bit) as a number.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype["float"] = function read_float() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
          var value = util["float"].readFloatLE(this.buf, this.pos);
          this.pos += 4;
          return value;
        };

        /**
         * Reads a double (64 bit float) as a number.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype["double"] = function read_double() {
          /* istanbul ignore if */
          if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
          var value = util["float"].readDoubleLE(this.buf, this.pos);
          this.pos += 8;
          return value;
        };

        /**
         * Reads a sequence of bytes preceeded by its length as a varint.
         * @returns {Uint8Array} Value read
         */
        Reader.prototype.bytes = function read_bytes() {
          var length = this.uint32(),
            start = this.pos,
            end = this.pos + length;

          /* istanbul ignore if */
          if (end > this.len) throw indexOutOfRange(this, length);
          this.pos += length;
          if (Array.isArray(this.buf))
            // plain array
            return this.buf.slice(start, end);
          if (start === end) {
            // fix for IE 10/Win8 and others' subarray returning array of size 1
            var nativeBuffer = util.Buffer;
            return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
          }
          return this._slice.call(this.buf, start, end);
        };

        /**
         * Reads a string preceeded by its byte length as a varint.
         * @returns {string} Value read
         */
        Reader.prototype.string = function read_string() {
          var bytes = this.bytes();
          return utf8.read(bytes, 0, bytes.length);
        };

        /**
         * Skips the specified number of bytes if specified, otherwise skips a varint.
         * @param {number} [length] Length if known, otherwise a varint is assumed
         * @returns {Reader} `this`
         */
        Reader.prototype.skip = function skip(length) {
          if (typeof length === "number") {
            /* istanbul ignore if */
            if (this.pos + length > this.len) throw indexOutOfRange(this, length);
            this.pos += length;
          } else {
            do {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this);
            } while (this.buf[this.pos++] & 128);
          }
          return this;
        };

        /**
         * Skips the next element of the specified wire type.
         * @param {number} wireType Wire type received
         * @returns {Reader} `this`
         */
        Reader.prototype.skipType = function (wireType) {
          switch (wireType) {
            case 0:
              this.skip();
              break;
            case 1:
              this.skip(8);
              break;
            case 2:
              this.skip(this.uint32());
              break;
            case 3:
              while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
              }
              break;
            case 5:
              this.skip(4);
              break;

            /* istanbul ignore next */
            default:
              throw Error("invalid wire type " + wireType + " at offset " + this.pos);
          }
          return this;
        };
        Reader._configure = function (BufferReader_) {
          BufferReader = BufferReader_;
          Reader.create = create();
          BufferReader._configure();
          var fn = util.Long ? "toLong" : /* istanbul ignore next */"toNumber";
          util.merge(Reader.prototype, {
            int64: function read_int64() {
              return readLongVarint.call(this)[fn](false);
            },
            uint64: function read_uint64() {
              return readLongVarint.call(this)[fn](true);
            },
            sint64: function read_sint64() {
              return readLongVarint.call(this).zzDecode()[fn](false);
            },
            fixed64: function read_fixed64() {
              return readFixed64.call(this)[fn](true);
            },
            sfixed64: function read_sfixed64() {
              return readFixed64.call(this)[fn](false);
            }
          });
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './util/minimal': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        arrayLikeToArray: _arrayLikeToArray,
        assertThisInitialized: _assertThisInitialized,
        asyncToGenerator: _asyncToGenerator,
        construct: _construct,
        createClass: _createClass,
        createForOfIteratorHelperLoose: _createForOfIteratorHelperLoose,
        extends: _extends,
        getPrototypeOf: _getPrototypeOf,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        isNativeFunction: _isNativeFunction,
        isNativeReflectConstruct: _isNativeReflectConstruct,
        regeneratorRuntime: _regeneratorRuntime,
        setPrototypeOf: _setPrototypeOf,
        toPrimitive: _toPrimitive,
        toPropertyKey: _toPropertyKey,
        unsupportedIterableToArray: _unsupportedIterableToArray,
        wrapNativeSuper: _wrapNativeSuper
      });
      function _regeneratorRuntime() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
        _regeneratorRuntime = exports('regeneratorRuntime', function () {
          return e;
        });
        var t,
          e = {},
          r = Object.prototype,
          n = r.hasOwnProperty,
          o = Object.defineProperty || function (t, e, r) {
            t[e] = r.value;
          },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function define(t, e, r) {
          return Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }), t[e];
        }
        try {
          define({}, "");
        } catch (t) {
          define = function (t, e, r) {
            return t[e] = r;
          };
        }
        function wrap(t, e, r, n) {
          var i = e && e.prototype instanceof Generator ? e : Generator,
            a = Object.create(i.prototype),
            c = new Context(n || []);
          return o(a, "_invoke", {
            value: makeInvokeMethod(t, r, c)
          }), a;
        }
        function tryCatch(t, e, r) {
          try {
            return {
              type: "normal",
              arg: t.call(e, r)
            };
          } catch (t) {
            return {
              type: "throw",
              arg: t
            };
          }
        }
        e.wrap = wrap;
        var h = "suspendedStart",
          l = "suspendedYield",
          f = "executing",
          s = "completed",
          y = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var p = {};
        define(p, a, function () {
          return this;
        });
        var d = Object.getPrototypeOf,
          v = d && d(d(values([])));
        v && v !== r && n.call(v, a) && (p = v);
        var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
        function defineIteratorMethods(t) {
          ["next", "throw", "return"].forEach(function (e) {
            define(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function AsyncIterator(t, e) {
          function invoke(r, o, i, a) {
            var c = tryCatch(t[r], t, o);
            if ("throw" !== c.type) {
              var u = c.arg,
                h = u.value;
              return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
                invoke("next", t, i, a);
              }, function (t) {
                invoke("throw", t, i, a);
              }) : e.resolve(h).then(function (t) {
                u.value = t, i(u);
              }, function (t) {
                return invoke("throw", t, i, a);
              });
            }
            a(c.arg);
          }
          var r;
          o(this, "_invoke", {
            value: function (t, n) {
              function callInvokeWithMethodAndArg() {
                return new e(function (e, r) {
                  invoke(t, n, e, r);
                });
              }
              return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
          });
        }
        function makeInvokeMethod(e, r, n) {
          var o = h;
          return function (i, a) {
            if (o === f) throw new Error("Generator is already running");
            if (o === s) {
              if ("throw" === i) throw a;
              return {
                value: t,
                done: !0
              };
            }
            for (n.method = i, n.arg = a;;) {
              var c = n.delegate;
              if (c) {
                var u = maybeInvokeDelegate(c, n);
                if (u) {
                  if (u === y) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
                if (o === h) throw o = s, n.arg;
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = f;
              var p = tryCatch(e, r, n);
              if ("normal" === p.type) {
                if (o = n.done ? s : l, p.arg === y) continue;
                return {
                  value: p.arg,
                  done: n.done
                };
              }
              "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
            }
          };
        }
        function maybeInvokeDelegate(e, r) {
          var n = r.method,
            o = e.iterator[n];
          if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
          var i = tryCatch(o, e.iterator, r.arg);
          if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
          var a = i.arg;
          return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
        }
        function pushTryEntry(t) {
          var e = {
            tryLoc: t[0]
          };
          1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
        }
        function resetTryEntry(t) {
          var e = t.completion || {};
          e.type = "normal", delete e.arg, t.completion = e;
        }
        function Context(t) {
          this.tryEntries = [{
            tryLoc: "root"
          }], t.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(e) {
          if (e || "" === e) {
            var r = e[a];
            if (r) return r.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var o = -1,
                i = function next() {
                  for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                  return next.value = t, next.done = !0, next;
                };
              return i.next = i;
            }
          }
          throw new TypeError(typeof e + " is not iterable");
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
          value: GeneratorFunctionPrototype,
          configurable: !0
        }), o(GeneratorFunctionPrototype, "constructor", {
          value: GeneratorFunction,
          configurable: !0
        }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
        }, e.mark = function (t) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
        }, e.awrap = function (t) {
          return {
            __await: t
          };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
          return this;
        }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new AsyncIterator(wrap(t, r, n, o), i);
          return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
        }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
          return this;
        }), define(g, "toString", function () {
          return "[object Generator]";
        }), e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return r.reverse(), function next() {
            for (; r.length;) {
              var t = r.pop();
              if (t in e) return next.value = t, next.done = !1, next;
            }
            return next.done = !0, next;
          };
        }, e.values = values, Context.prototype = {
          constructor: Context,
          reset: function (e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function handle(n, o) {
              return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var i = this.tryEntries[o],
                a = i.completion;
              if ("root" === i.tryLoc) return handle("end");
              if (i.tryLoc <= this.prev) {
                var c = n.call(i, "catchLoc"),
                  u = n.call(i, "finallyLoc");
                if (c && u) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                } else if (c) {
                  if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                } else {
                  if (!u) throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
              if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                var i = o;
                break;
              }
            }
            i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
            var a = i ? i.completion : {};
            return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  resetTryEntry(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return this.delegate = {
              iterator: values(e),
              resultName: r,
              nextLoc: n
            }, "next" === this.method && (this.arg = t), y;
          }
        }, e;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
          });
        };
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends() {
        _extends = exports('extends', Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        });
        return _extends.apply(this, arguments);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = exports('getPrototypeOf', Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        });
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = exports('construct', Reflect.construct.bind());
        } else {
          _construct = exports('construct', function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          });
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? new Map() : undefined;
        _wrapNativeSuper = exports('wrapNativeSuper', function _wrapNativeSuper(Class) {
          if (Class === null || !_isNativeFunction(Class)) return Class;
          if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
          }
          function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class);
        });
        return _wrapNativeSuper(Class);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (it) return (it = it.call(o)).next.bind(it);
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }
      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }
        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);
        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }
        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }
        return desc;
      }
    }
  };
});

System.register("chunks:///_virtual/roots.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = {};

        /**
         * Named roots.
         * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
         * Can also be used manually to make roots available across modules.
         * @name roots
         * @type {Object.<string,Root>}
         * @example
         * // pbjs -r myroot -o compiled.js ...
         *
         * // in another module:
         * require("./compiled.js");
         *
         * // in any subsequent module:
         * var root = protobuf.roots["myroot"];
         */

        // #endregion ORIGINAL CODE

        module.exports;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/rpc.js", ['./cjs-loader.mjs', './service.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        /**
         * Streaming RPC helpers.
         * @namespace
         */
        var rpc = exports;

        /**
         * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
         * @typedef RPCImpl
         * @type {function}
         * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
         * @param {Uint8Array} requestData Request data
         * @param {RPCImplCallback} callback Callback function
         * @returns {undefined}
         * @example
         * function rpcImpl(method, requestData, callback) {
         *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
         *         throw Error("no such method");
         *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
         *         callback(err, responseData);
         *     });
         * }
         */

        /**
         * Node-style callback as used by {@link RPCImpl}.
         * @typedef RPCImplCallback
         * @type {function}
         * @param {Error|null} error Error, if any, otherwise `null`
         * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
         * @returns {undefined}
         */

        rpc.Service = require("./rpc/service");

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './rpc/service': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/secp256k1.js", ['./sha2.js', './modular.js', './weierstrass.js'], function (exports) {
  var sha256, Field, pow2, ecdsa, weierstrass;
  return {
    setters: [function (module) {
      sha256 = module.sha256;
    }, function (module) {
      Field = module.Field;
      pow2 = module.pow2;
    }, function (module) {
      ecdsa = module.ecdsa;
      weierstrass = module.weierstrass;
    }],
    execute: function () {
      // Seems like generator was produced from some seed:
      // `Pointk1.BASE.multiply(Pointk1.Fn.inv(2n, N)).toAffine().x`
      // // gives short x 0x3b78ce563f89a0ed9414f5aa28ad0d96d6795f9c63n
      var secp256k1_CURVE = {
        p: BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f'),
        n: BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141'),
        h: BigInt(1),
        a: BigInt(0),
        b: BigInt(7),
        Gx: BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'),
        Gy: BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8')
      };
      var secp256k1_ENDO = {
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee'),
        basises: [[BigInt('0x3086d221a7d46bcde86c90e49284eb15'), -BigInt('0xe4437ed6010e88286f547fa90abfe4c3')], [BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8'), BigInt('0x3086d221a7d46bcde86c90e49284eb15')]]
      };
      var _2n = /* @__PURE__ */BigInt(2);
      /**
       * √n = n^((p+1)/4) for fields p = 3 mod 4. We unwrap the loop and multiply bit-by-bit.
       * (P+1n/4n).toString(2) would produce bits [223x 1, 0, 22x 1, 4x 0, 11, 00]
       */
      function sqrtMod(y) {
        var P = secp256k1_CURVE.p;
        // prettier-ignore
        var _3n = BigInt(3),
          _6n = BigInt(6),
          _11n = BigInt(11),
          _22n = BigInt(22);
        // prettier-ignore
        var _23n = BigInt(23),
          _44n = BigInt(44),
          _88n = BigInt(88);
        var b2 = y * y * y % P; // x^3, 11
        var b3 = b2 * b2 * y % P; // x^7
        var b6 = pow2(b3, _3n, P) * b3 % P;
        var b9 = pow2(b6, _3n, P) * b3 % P;
        var b11 = pow2(b9, _2n, P) * b2 % P;
        var b22 = pow2(b11, _11n, P) * b11 % P;
        var b44 = pow2(b22, _22n, P) * b22 % P;
        var b88 = pow2(b44, _44n, P) * b44 % P;
        var b176 = pow2(b88, _88n, P) * b88 % P;
        var b220 = pow2(b176, _44n, P) * b44 % P;
        var b223 = pow2(b220, _3n, P) * b3 % P;
        var t1 = pow2(b223, _23n, P) * b22 % P;
        var t2 = pow2(t1, _6n, P) * b2 % P;
        var root = pow2(t2, _2n, P);
        if (!Fpk1.eql(Fpk1.sqr(root), y)) throw new Error('Cannot find square root');
        return root;
      }
      var Fpk1 = Field(secp256k1_CURVE.p, {
        sqrt: sqrtMod
      });
      var Pointk1 = /* @__PURE__ */weierstrass(secp256k1_CURVE, {
        Fp: Fpk1,
        endo: secp256k1_ENDO
      });
      /**
       * secp256k1 curve: ECDSA and ECDH methods.
       *
       * Uses sha256 to hash messages. To use a different hash,
       * pass `{ prehash: false }` to sign / verify.
       *
       * @example
       * Generate one secp256k1 keypair, sign a message, and verify it.
       *
       * ```js
       * import { secp256k1 } from '@noble/curves/secp256k1.js';
       * const { secretKey, publicKey } = secp256k1.keygen();
       * // const publicKey = secp256k1.getPublicKey(secretKey);
       * const msg = new TextEncoder().encode('hello noble');
       * const sig = secp256k1.sign(msg, secretKey);
       * const isValid = secp256k1.verify(sig, msg, publicKey);
       * // const sigKeccak = secp256k1.sign(keccak256(msg), secretKey, { prehash: false });
       * ```
       */
      var secp256k1 = exports('secp256k1', /* @__PURE__ */ecdsa(Pointk1, sha256));
    }
  };
});

System.register("chunks:///_virtual/service.js", ['./cjs-loader.mjs', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = Service;
        var util = require("../util/minimal");

        // Extends EventEmitter
        (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

        /**
         * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
         *
         * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
         * @typedef rpc.ServiceMethodCallback
         * @template TRes extends Message<TRes>
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {TRes} [response] Response message
         * @returns {undefined}
         */

        /**
         * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
         * @typedef rpc.ServiceMethod
         * @template TReq extends Message<TReq>
         * @template TRes extends Message<TRes>
         * @type {function}
         * @param {TReq|Properties<TReq>} request Request message or plain object
         * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
         * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
         */

        /**
         * Constructs a new RPC service instance.
         * @classdesc An RPC service as returned by {@link Service#create}.
         * @exports rpc.Service
         * @extends util.EventEmitter
         * @constructor
         * @param {RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Service(rpcImpl, requestDelimited, responseDelimited) {
          if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
          util.EventEmitter.call(this);

          /**
           * RPC implementation. Becomes `null` once the service is ended.
           * @type {RPCImpl|null}
           */
          this.rpcImpl = rpcImpl;

          /**
           * Whether requests are length-delimited.
           * @type {boolean}
           */
          this.requestDelimited = Boolean(requestDelimited);

          /**
           * Whether responses are length-delimited.
           * @type {boolean}
           */
          this.responseDelimited = Boolean(responseDelimited);
        }

        /**
         * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
         * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
         * @param {Constructor<TReq>} requestCtor Request constructor
         * @param {Constructor<TRes>} responseCtor Response constructor
         * @param {TReq|Properties<TReq>} request Request message or plain object
         * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
         * @returns {undefined}
         * @template TReq extends Message<TReq>
         * @template TRes extends Message<TRes>
         */
        Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
          if (!request) throw TypeError("request must be specified");
          var self = this;
          if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
          if (!self.rpcImpl) {
            setTimeout(function () {
              callback(Error("already ended"));
            }, 0);
            return undefined;
          }
          try {
            return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
              if (err) {
                self.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self.end( /* endedByRPC */true);
                return undefined;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err) {
                  self.emit("error", err, method);
                  return callback(err);
                }
              }
              self.emit("data", response, method);
              return callback(null, response);
            });
          } catch (err) {
            self.emit("error", err, method);
            setTimeout(function () {
              callback(err);
            }, 0);
            return undefined;
          }
        };

        /**
         * Ends this service and emits the `end` event.
         * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
         * @returns {rpc.Service} `this`
         */
        Service.prototype.end = function end(endedByRPC) {
          if (this.rpcImpl) {
            if (!endedByRPC)
              // signal end to rpcImpl
              this.rpcImpl(null, null, null);
            this.rpcImpl = null;
            this.emit("end").off();
          }
          return this;
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          '../util/minimal': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/sha2.js", ['./rollupPluginModLoBabelHelpers.js', './_md.js', './utils.js'], function (exports) {
  var _inheritsLoose, SHA256_IV, Chi, HashMD, Maj, createHasher, oidNist, clean, rotr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      SHA256_IV = module.SHA256_IV;
      Chi = module.Chi;
      HashMD = module.HashMD;
      Maj = module.Maj;
    }, function (module) {
      createHasher = module.createHasher;
      oidNist = module.oidNist;
      clean = module.clean;
      rotr = module.rotr;
    }],
    execute: function () {
      /**
       * SHA-224 / SHA-256 round constants from RFC 6234 §5.1: the first 32 bits
       * of the cube roots of the first 64 primes (2..311).
       */
      // prettier-ignore
      var SHA256_K = /* @__PURE__ */Uint32Array.from([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
      /** Reusable SHA-224 / SHA-256 message schedule buffer `W_t` from RFC 6234 §6.2 step 1. */
      var SHA256_W = /* @__PURE__ */new Uint32Array(64);
      /** Internal SHA-224 / SHA-256 compression engine from RFC 6234 §6.2. */
      var SHA2_32B = /*#__PURE__*/function (_HashMD) {
        _inheritsLoose(SHA2_32B, _HashMD);
        function SHA2_32B(outputLen) {
          return _HashMD.call(this, 64, outputLen, 8, false) || this;
        }
        var _proto = SHA2_32B.prototype;
        _proto.get = function get() {
          var A = this.A,
            B = this.B,
            C = this.C,
            D = this.D,
            E = this.E,
            F = this.F,
            G = this.G,
            H = this.H;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        ;

        _proto.set = function set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        };
        _proto.process = function process(view, offset) {
          // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
          for (var i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
          for (var _i = 16; _i < 64; _i++) {
            var W15 = SHA256_W[_i - 15];
            var W2 = SHA256_W[_i - 2];
            var s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
            var s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
            SHA256_W[_i] = s1 + SHA256_W[_i - 7] + s0 + SHA256_W[_i - 16] | 0;
          }
          // Compression function main loop, 64 rounds
          var A = this.A,
            B = this.B,
            C = this.C,
            D = this.D,
            E = this.E,
            F = this.F,
            G = this.G,
            H = this.H;
          for (var _i2 = 0; _i2 < 64; _i2++) {
            var sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            var T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[_i2] + SHA256_W[_i2] | 0;
            var sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            var T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          // Add the compressed chunk to the current hash value
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        };
        _proto.roundClean = function roundClean() {
          clean(SHA256_W);
        };
        _proto.destroy = function destroy() {
          // HashMD callers route post-destroy usability through `destroyed`; zeroizing alone still leaves
          // update()/digest() callable on reused instances.
          this.destroyed = true;
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          clean(this.buffer);
        };
        return SHA2_32B;
      }(HashMD);
      /** Internal SHA-256 hash class grounded in RFC 6234 §6.2. */
      var _SHA256 = exports('_SHA256', /*#__PURE__*/function (_SHA2_32B) {
        _inheritsLoose(_SHA256, _SHA2_32B);
        function _SHA256() {
          var _this;
          _this = _SHA2_32B.call(this, 32) || this;
          // We cannot use array here since array allows indexing by variable
          // which means optimizer/compiler cannot use registers.
          _this.A = SHA256_IV[0] | 0;
          _this.B = SHA256_IV[1] | 0;
          _this.C = SHA256_IV[2] | 0;
          _this.D = SHA256_IV[3] | 0;
          _this.E = SHA256_IV[4] | 0;
          _this.F = SHA256_IV[5] | 0;
          _this.G = SHA256_IV[6] | 0;
          _this.H = SHA256_IV[7] | 0;
          return _this;
        }
        return _SHA256;
      }(SHA2_32B));
      /**
       * SHA2-256 hash function from RFC 4634. In JS it's the fastest: even faster than Blake3. Some info:
       *
       * - Trying 2^128 hashes would get 50% chance of collision, using birthday attack.
       * - BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
       * - Each sha256 hash is executing 2^18 bit operations.
       * - Good 2024 ASICs can do 200Th/sec with 3500 watts of power, corresponding to 2^36 hashes/joule.
       * @param msg - message bytes to hash
       * @returns Digest bytes.
       * @example
       * Hash a message with SHA2-256.
       * ```ts
       * sha256(new Uint8Array([97, 98, 99]));
       * ```
       */
      var sha256 = exports('sha256', /* @__PURE__ */createHasher(function () {
        return new _SHA256();
      }, /* @__PURE__ */oidNist(0x01)));
    }
  };
});

System.register("chunks:///_virtual/TestPage2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseEntryView.ts', './Decorators.ts', './NGame.ts'], function (exports, module) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _decorator, Layout, Button, EditBox, instantiate, Label, BaseEntryView, inject, NGame;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      _decorator = module._decorator;
      Layout = module.Layout;
      Button = module.Button;
      EditBox = module.EditBox;
      instantiate = module.instantiate;
      Label = module.Label;
    }, function (module) {
      BaseEntryView = module.BaseEntryView;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      NGame = module.NGame;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TestPage2 = exports('default', (_dec = ccclass('TestPage2'), _dec2 = inject("btns", Layout), _dec3 = inject("btns/btn_tem", Button), _dec4 = inject("EditBox", EditBox), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseEntryView) {
        _inheritsLoose(TestPage2, _BaseEntryView);
        function TestPage2() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseEntryView.call.apply(_BaseEntryView, [this].concat(args)) || this;
          _this.bundleStr = "testBundle";
          _initializerDefineProperty(_this, "btnsLayout", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "temBtn", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EditBox", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TestPage2.prototype;
        _proto.create = function create() {
          // `TestPage2 create, bundle = ${NGame.uiManage.getEntyrNode(this.bundleStr)}`.logI(`ausbbda9sudbv91`)
          // NGame.bundle.bundleMap.get(`testBundle`).manage.open();
        };
        _proto.open = function open() {
          var _this2 = this;
          this.addBtn("ShowPageSk", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var pageTag, PageSkLoading;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  pageTag = _this2.EditBox.string;
                  if (!(pageTag && pageTag.length > 0)) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 4;
                  return module.import('./PageSkLoading.ts');
                case 4:
                  PageSkLoading = _context.sent;
                  _context.next = 7;
                  return NGame.uiManage.regis(PageSkLoading.PageSkLoading, "db://assets/resources/prefab/PageSkLoading", _this2);
                case 7:
                  NGame.uiManage.open(PageSkLoading.PageSkLoading, {
                    init: {
                      pageTag: pageTag
                    }
                  });
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }

        /**
             * 动态创建测试按钮
             * @param name 按钮名字
             * @param callback 
             * @returns 
             */;
        _proto.addBtn = function addBtn(name, callback) {
          if (name === void 0) {
            name = "Test";
          }
          if (!this.temBtn || !this.btnsLayout) {
            console.warn("Button template or layout not set");
            return;
          }

          // 1️⃣ 克隆模板节点
          var btnNode = instantiate(this.temBtn.node);

          // 2️⃣ 设置父节点（加入 Layout）
          btnNode.setParent(this.btnsLayout.node);

          // 3️⃣ 激活节点（模板通常是隐藏的）
          btnNode.active = true;

          // 4️⃣ 设置按钮文字
          var label = btnNode.getComponentInChildren(Label);
          if (label) {
            label.string = name;
          }

          // 5️⃣ 绑定按钮事件
          var btn = btnNode.getComponent(Button);
          if (btn) {
            this.onClicked(btn.node, callback);
          }

          // 6️⃣ 通知 Layout 重新布局（重要）
          this.btnsLayout.updateLayout();
        };
        return TestPage2;
      }(BaseEntryView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnsLayout", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "temBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EditBox", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
    }
  };
});

System.register("chunks:///_virtual/TestScrollView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Decorators.ts', './VScrollView.ts', './MKViewBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _decorator, inject, VirtualScrollView, MKViewBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      _decorator = module._decorator;
    }, function (module) {
      inject = module.inject;
    }, function (module) {
      VirtualScrollView = module.VirtualScrollView;
    }, function (module) {
      MKViewBase = module.MKViewBase;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TestScrollView = exports('default', (_dec = ccclass('TestScrollView'), _dec2 = inject("vScrollView", VirtualScrollView), _dec(_class = (_class2 = /*#__PURE__*/function (_MKViewBase) {
        _inheritsLoose(TestScrollView, _MKViewBase);
        function TestScrollView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _MKViewBase.call.apply(_MKViewBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "vlist", _descriptor, _assertThisInitialized(_this));
          _this.listData = [];
          return _this;
        }
        var _proto = TestScrollView.prototype;
        _proto.create = function create() {
          // 模拟数据
          // for (let i = 0; i < 40; i++) {
          //     this.listData.push({
          //         data1: `第${i + 1}条数据`,
          //         type: (i % 2) + 1, //你的数据中要能知道自己对应什么item的预制体
          //     });
          // }
        };
        _proto.open = function open() {
          var _this2 = this;
          // 设置虚拟列表数据
          if (this.vlist) {
            // 数据中的type对应预制体数组中的索引(第几个预制体)
            this.vlist.getItemTypeIndexFn = function (index) {
              var itemdata = _this2.listData[index];
              return itemdata.type - 1; // 返回 0, 1
            };

            this.vlist.renderItemFn = function (itemNode, index) {
              var itemdata = _this2.listData[index];
              if (itemdata.type === 1) {
                itemNode.child("text").setText('type1:' + _this2.listData[index].data1);
              } else if (itemdata.type === 2) {
                itemNode.child("text").setText('type2:' + _this2.listData[index].data1);
              }
            };
            this.vlist.refreshList(this.listData);
          }
        };
        return TestScrollView;
      }(MKViewBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "vlist", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
    }
  };
});

System.register("chunks:///_virtual/utils.js", [], function (exports) {
  return {
    execute: function () {
      exports({
        abytes: abytes,
        aexists: aexists,
        ahash: ahash,
        anumber: anumber,
        aoutput: aoutput,
        bytesToHex: bytesToHex,
        clean: clean,
        concatBytes: concatBytes,
        createHasher: createHasher,
        createView: createView,
        hexToBytes: hexToBytes,
        isBytes: isBytes,
        randomBytes: randomBytes,
        rotr: rotr,
        utf8ToBytes: utf8ToBytes
      });

      /**
       * Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
       * @param a - value to test
       * @returns `true` when the value is a Uint8Array-compatible view.
       * @example
       * Check whether a value is a Uint8Array-compatible view.
       * ```ts
       * isBytes(new Uint8Array([1, 2, 3]));
       * ```
       */
      function isBytes(a) {
        // Plain `instanceof Uint8Array` is too strict for some Buffer / proxy / cross-realm cases.
        // The fallback still requires a real ArrayBuffer view, so plain
        // JSON-deserialized `{ constructor: ... }` spoofing is rejected, and
        // `BYTES_PER_ELEMENT === 1` keeps the fallback on byte-oriented views.
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array' && 'BYTES_PER_ELEMENT' in a && a.BYTES_PER_ELEMENT === 1;
      }
      /**
       * Asserts something is a non-negative integer.
       * @param n - number to validate
       * @param title - label included in thrown errors
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Validate a non-negative integer option.
       * ```ts
       * anumber(32, 'length');
       * ```
       */
      function anumber(n, title) {
        if (title === void 0) {
          title = '';
        }
        if (typeof n !== 'number') {
          var prefix = title && "\"" + title + "\" ";
          throw new TypeError(prefix + "expected number, got " + typeof n);
        }
        if (!Number.isSafeInteger(n) || n < 0) {
          var _prefix = title && "\"" + title + "\" ";
          throw new RangeError(_prefix + "expected integer >= 0, got " + n);
        }
      }
      /**
       * Asserts something is Uint8Array.
       * @param value - value to validate
       * @param length - optional exact length constraint
       * @param title - label included in thrown errors
       * @returns The validated byte array.
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Validate that a value is a byte array.
       * ```ts
       * abytes(new Uint8Array([1, 2, 3]));
       * ```
       */
      function abytes(value, length, title) {
        if (title === void 0) {
          title = '';
        }
        var bytes = isBytes(value);
        var len = value == null ? void 0 : value.length;
        var needsLen = length !== undefined;
        if (!bytes || needsLen && len !== length) {
          var prefix = title && "\"" + title + "\" ";
          var ofLen = needsLen ? " of length " + length : '';
          var got = bytes ? "length=" + len : "type=" + typeof value;
          var message = prefix + 'expected Uint8Array' + ofLen + ', got ' + got;
          if (!bytes) throw new TypeError(message);
          throw new RangeError(message);
        }
        return value;
      }
      /**
       * Asserts something is a wrapped hash constructor.
       * @param h - hash constructor to validate
       * @throws On wrong argument types or invalid hash wrapper shape. {@link TypeError}
       * @throws On invalid hash metadata ranges or values. {@link RangeError}
       * @throws If the hash metadata allows empty outputs or block sizes. {@link Error}
       * @example
       * Validate a callable hash wrapper.
       * ```ts
       * import { ahash } from '@noble/hashes/utils.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * ahash(sha256);
       * ```
       */
      function ahash(h) {
        if (typeof h !== 'function' || typeof h.create !== 'function') throw new TypeError('Hash must wrapped by utils.createHasher');
        anumber(h.outputLen);
        anumber(h.blockLen);
        // HMAC and KDF callers treat these as real byte lengths; allowing zero lets fake wrappers pass
        // validation and can produce empty outputs instead of failing fast.
        if (h.outputLen < 1) throw new Error('"outputLen" must be >= 1');
        if (h.blockLen < 1) throw new Error('"blockLen" must be >= 1');
      }
      /**
       * Asserts a hash instance has not been destroyed or finished.
       * @param instance - hash instance to validate
       * @param checkFinished - whether to reject finalized instances
       * @throws If the hash instance has already been destroyed or finalized. {@link Error}
       * @example
       * Validate that a hash instance is still usable.
       * ```ts
       * import { aexists } from '@noble/hashes/utils.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * const hash = sha256.create();
       * aexists(hash);
       * ```
       */
      function aexists(instance, checkFinished) {
        if (checkFinished === void 0) {
          checkFinished = true;
        }
        if (instance.destroyed) throw new Error('Hash instance has been destroyed');
        if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
      }
      /**
       * Asserts output is a sufficiently-sized byte array.
       * @param out - destination buffer
       * @param instance - hash instance providing output length
       * Oversized buffers are allowed; downstream code only promises to fill the first `outputLen` bytes.
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Validate a caller-provided digest buffer.
       * ```ts
       * import { aoutput } from '@noble/hashes/utils.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * const hash = sha256.create();
       * aoutput(new Uint8Array(hash.outputLen), hash);
       * ```
       */
      function aoutput(out, instance) {
        abytes(out, undefined, 'digestInto() output');
        var min = instance.outputLen;
        if (out.length < min) {
          throw new RangeError('"digestInto() output" expected to be of length >=' + min);
        }
      }
      /**
       * Zeroizes typed arrays in place. Warning: JS provides no guarantees.
       * @param arrays - arrays to overwrite with zeros
       * @example
       * Zeroize sensitive buffers in place.
       * ```ts
       * clean(new Uint8Array([1, 2, 3]));
       * ```
       */
      function clean() {
        for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
          arrays[_key] = arguments[_key];
        }
        for (var i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      /**
       * Creates a DataView for byte-level manipulation.
       * @param arr - source typed array
       * @returns DataView over the same buffer region.
       * @example
       * Create a DataView over an existing buffer.
       * ```ts
       * createView(new Uint8Array(4));
       * ```
       */
      function createView(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      /**
       * Rotate-right operation for uint32 values.
       * @param word - source word
       * @param shift - shift amount in bits
       * @returns Rotated word.
       * @example
       * Rotate a 32-bit word to the right.
       * ```ts
       * rotr(0x12345678, 8);
       * ```
       */
      function rotr(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      // Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
      var hasHexBuiltin = /* @__PURE__ */function () {
        return (
          // @ts-ignore
          typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function'
        );
      }();
      // Array where index 0xf0 (240) is mapped to string 'f0'
      var hexes = /* @__PURE__ */Array.from({
        length: 256
      }, function (_, i) {
        return i.toString(16).padStart(2, '0');
      });
      /**
       * Convert byte array to hex string.
       * Uses the built-in function when available and assumes it matches the tested
       * fallback semantics.
       * @param bytes - bytes to encode
       * @returns Lowercase hexadecimal string.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Convert bytes to lowercase hexadecimal.
       * ```ts
       * bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])); // 'cafe0123'
       * ```
       */
      function bytesToHex(bytes) {
        abytes(bytes);
        // @ts-ignore
        if (hasHexBuiltin) return bytes.toHex();
        // pre-caching improves the speed 6x
        var hex = '';
        for (var i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      // We use optimized technique to convert hex string to byte array
      var asciis = {
        _0: 48,
        _9: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
      function asciiToBase16(ch) {
        if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
        if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
        if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
        return;
      }
      /**
       * Convert hex string to byte array. Uses built-in function, when available.
       * @param hex - hexadecimal string to decode
       * @returns Decoded bytes.
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Decode lowercase hexadecimal into bytes.
       * ```ts
       * hexToBytes('cafe0123'); // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
       * ```
       */
      function hexToBytes(hex) {
        if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
        if (hasHexBuiltin) {
          try {
            return Uint8Array.fromHex(hex);
          } catch (error) {
            if (error instanceof SyntaxError) throw new RangeError(error.message);
            throw error;
          }
        }
        var hl = hex.length;
        var al = hl / 2;
        if (hl % 2) throw new RangeError('hex string expected, got unpadded hex of length ' + hl);
        var array = new Uint8Array(al);
        for (var ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          var n1 = asciiToBase16(hex.charCodeAt(hi));
          var n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === undefined || n2 === undefined) {
            var _char = hex[hi] + hex[hi + 1];
            throw new RangeError('hex string expected, got non-hex character "' + _char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
        }

        return array;
      }
      function utf8ToBytes(str) {
        if (typeof str !== 'string') throw new TypeError('string expected');
        return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
      }
      /**
       * Copies several Uint8Arrays into one.
       * @param arrays - arrays to concatenate
       * @returns Concatenated byte array.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Concatenate multiple byte arrays.
       * ```ts
       * concatBytes(new Uint8Array([1]), new Uint8Array([2]));
       * ```
       */
      function concatBytes() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
          var a = i < 0 || arguments.length <= i ? undefined : arguments[i];
          abytes(a);
          sum += a.length;
        }
        var res = new Uint8Array(sum);
        for (var _i = 0, pad = 0; _i < arguments.length; _i++) {
          var _a = _i < 0 || arguments.length <= _i ? undefined : arguments[_i];
          res.set(_a, pad);
          pad += _a.length;
        }
        return res;
      }
      /**
       * Creates a callable hash function from a stateful class constructor.
       * @param hashCons - hash constructor or factory
       * @param info - optional metadata such as DER OID
       * @returns Frozen callable hash wrapper with `.create()`.
       *   Wrapper construction eagerly calls `hashCons(undefined)` once to read
       *   `outputLen` / `blockLen`, so constructor side effects happen at module
       *   init time.
       * @example
       * Wrap a stateful hash constructor into a callable helper.
       * ```ts
       * import { createHasher } from '@noble/hashes/utils.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * const wrapped = createHasher(sha256.create, { oid: sha256.oid });
       * wrapped(new Uint8Array([1]));
       * ```
       */
      function createHasher(hashCons, info) {
        if (info === void 0) {
          info = {};
        }
        var hashC = function hashC(msg, opts) {
          return hashCons(opts).update(msg).digest();
        };
        var tmp = hashCons(undefined);
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.canXOF = tmp.canXOF;
        hashC.create = function (opts) {
          return hashCons(opts);
        };
        Object.assign(hashC, info);
        return Object.freeze(hashC);
      }
      /**
       * Cryptographically secure PRNG backed by `crypto.getRandomValues`.
       * @param bytesLength - number of random bytes to generate
       * @returns Random bytes.
       * The platform `getRandomValues()` implementation still defines any
       * single-call length cap, and this helper rejects oversize requests
       * with a stable library `RangeError` instead of host-specific errors.
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @throws If the current runtime does not provide `crypto.getRandomValues`. {@link Error}
       * @example
       * Generate a fresh random key or nonce.
       * ```ts
       * const key = randomBytes(16);
       * ```
       */
      function randomBytes(bytesLength) {
        if (bytesLength === void 0) {
          bytesLength = 32;
        }
        // Match the repo's other length-taking helpers instead of relying on Uint8Array coercion.
        anumber(bytesLength, 'bytesLength');
        var cr = typeof globalThis === 'object' ? globalThis.crypto : null;
        if (typeof (cr == null ? void 0 : cr.getRandomValues) !== 'function') throw new Error('crypto.getRandomValues must be defined');
        // Web Cryptography API Level 2 §10.1.1:
        // if `byteLength > 65536`, throw `QuotaExceededError`.
        // Keep the guard explicit so callers can see the quota in code
        // instead of discovering it by reading the spec or host errors.
        // This wrapper surfaces the same quota as a stable library RangeError.
        if (bytesLength > 65536) throw new RangeError("\"bytesLength\" expected <= 65536, got " + bytesLength);
        return cr.getRandomValues(new Uint8Array(bytesLength));
      }
      /**
       * Creates OID metadata for NIST hashes with prefix `06 09 60 86 48 01 65 03 04 02`.
       * @param suffix - final OID byte for the selected hash.
       *   The helper accepts any byte even though only the documented NIST hash
       *   suffixes are meaningful downstream.
       * @returns Object containing the DER-encoded OID.
       * @example
       * Build OID metadata for a NIST hash.
       * ```ts
       * oidNist(0x01);
       * ```
       */
      var oidNist = exports('oidNist', function oidNist(suffix) {
        return {
          // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
          // Larger suffix values would need base-128 OID encoding and a different length byte.
          oid: Uint8Array.from([0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, suffix])
        };
      });
    }
  };
});

System.register("chunks:///_virtual/utils2.js", ['./utils.js'], function (exports) {
  var abytes$1, bytesToHex$1, hexToBytes$1, anumber$1, concatBytes$1, isBytes$1, randomBytes$1;
  return {
    setters: [function (module) {
      abytes$1 = module.abytes;
      bytesToHex$1 = module.bytesToHex;
      hexToBytes$1 = module.hexToBytes;
      anumber$1 = module.anumber;
      concatBytes$1 = module.concatBytes;
      isBytes$1 = module.isBytes;
      randomBytes$1 = module.randomBytes;
    }],
    execute: function () {
      exports({
        aInRange: aInRange,
        abignumber: abignumber,
        abool: abool,
        asafenumber: asafenumber,
        bitLen: bitLen,
        bytesToNumberBE: bytesToNumberBE,
        bytesToNumberLE: bytesToNumberLE,
        copyBytes: copyBytes,
        createHmacDrbg: createHmacDrbg,
        hexToNumber: hexToNumber,
        inRange: inRange,
        numberToBytesBE: numberToBytesBE,
        numberToBytesLE: numberToBytesLE,
        numberToHexUnpadded: numberToHexUnpadded,
        validateObject: validateObject
      });

      /**
       * Hex, bytes and number utilities.
       * @module
       */
      /**
       * Validates that a value is a byte array.
       * @param value - Value to validate.
       * @param length - Optional exact byte length.
       * @param title - Optional field name.
       * @returns Original byte array.
       * @example
       * Reject non-byte input before passing data into curve code.
       *
       * ```ts
       * abytes(new Uint8Array(1));
       * ```
       */
      var abytes = exports('abytes', function abytes(value, length, title) {
        return abytes$1(value, length, title);
      });
      /**
       * Validates that a value is a non-negative safe integer.
       * @param n - Value to validate.
       * @param title - Optional field name.
       * @example
       * Validate a numeric length before allocating buffers.
       *
       * ```ts
       * anumber(1);
       * ```
       */
      var anumber = exports('anumber', anumber$1);
      /**
       * Encodes bytes as lowercase hex.
       * @param bytes - Bytes to encode.
       * @returns Lowercase hex string.
       * @example
       * Serialize bytes as hex for logging or fixtures.
       *
       * ```ts
       * bytesToHex(Uint8Array.of(1, 2, 3));
       * ```
       */
      var bytesToHex = exports('bytesToHex', bytesToHex$1);
      /**
       * Concatenates byte arrays.
       * @param arrays - Byte arrays to join.
       * @returns Concatenated bytes.
       * @example
       * Join domain-separated chunks into one buffer.
       *
       * ```ts
       * concatBytes(Uint8Array.of(1), Uint8Array.of(2));
       * ```
       */
      var concatBytes = exports('concatBytes', function concatBytes() {
        return concatBytes$1.apply(void 0, arguments);
      });
      /**
       * Decodes lowercase or uppercase hex into bytes.
       * @param hex - Hex string to decode.
       * @returns Decoded bytes.
       * @example
       * Parse fixture hex into bytes before hashing.
       *
       * ```ts
       * hexToBytes('0102');
       * ```
       */
      var hexToBytes = exports('hexToBytes', function hexToBytes(hex) {
        return hexToBytes$1(hex);
      });
      /**
       * Checks whether a value is a Uint8Array.
       * @param a - Value to inspect.
       * @returns `true` when `a` is a Uint8Array.
       * @example
       * Branch on byte input before decoding it.
       *
       * ```ts
       * isBytes(new Uint8Array(1));
       * ```
       */
      var isBytes = exports('isBytes', isBytes$1);
      /**
       * Reads random bytes from the platform CSPRNG.
       * @param bytesLength - Number of random bytes to read.
       * @returns Fresh random bytes.
       * @example
       * Generate a random seed for a keypair.
       *
       * ```ts
       * randomBytes(2);
       * ```
       */
      var randomBytes = exports('randomBytes', function randomBytes(bytesLength) {
        return randomBytes$1(bytesLength);
      });
      var _0n = /* @__PURE__ */BigInt(0);
      var _1n = /* @__PURE__ */BigInt(1);
      /**
       * Validates that a flag is boolean.
       * @param value - Value to validate.
       * @param title - Optional field name.
       * @returns Original value.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Reject non-boolean option flags early.
       *
       * ```ts
       * abool(true);
       * ```
       */
      function abool(value, title) {
        if (title === void 0) {
          title = '';
        }
        if (typeof value !== 'boolean') {
          var prefix = title && "\"" + title + "\" ";
          throw new TypeError(prefix + 'expected boolean, got type=' + typeof value);
        }
        return value;
      }
      /**
       * Validates that a value is a non-negative bigint or safe integer.
       * @param n - Value to validate.
       * @returns The same validated value.
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Validate one integer-like value before serializing it.
       *
       * ```ts
       * abignumber(1n);
       * ```
       */
      function abignumber(n) {
        if (typeof n === 'bigint') {
          if (!isPosBig(n)) throw new RangeError('positive bigint expected, got ' + n);
        } else anumber(n);
        return n;
      }
      /**
       * Validates that a value is a safe integer.
       * @param value - Integer to validate.
       * @param title - Optional field name.
       * @throws On wrong argument types. {@link TypeError}
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Validate a window size before scalar arithmetic uses it.
       *
       * ```ts
       * asafenumber(1);
       * ```
       */
      function asafenumber(value, title) {
        if (title === void 0) {
          title = '';
        }
        if (typeof value !== 'number') {
          var prefix = title && "\"" + title + "\" ";
          throw new TypeError(prefix + 'expected number, got type=' + typeof value);
        }
        if (!Number.isSafeInteger(value)) {
          var _prefix = title && "\"" + title + "\" ";
          throw new RangeError(_prefix + 'expected safe integer, got ' + value);
        }
      }
      /**
       * Encodes a bigint into even-length big-endian hex.
       * The historical "unpadded" name only means "no fixed-width field padding"; odd-length hex still
       * gets one leading zero nibble so the result always represents whole bytes.
       * @param num - Number to encode.
       * @returns Big-endian hex string.
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Encode a scalar into hex without a `0x` prefix.
       *
       * ```ts
       * numberToHexUnpadded(255n);
       * ```
       */
      function numberToHexUnpadded(num) {
        var hex = abignumber(num).toString(16);
        return hex.length & 1 ? '0' + hex : hex;
      }
      /**
       * Parses a big-endian hex string into bigint.
       * Accepts odd-length hex through the native `BigInt('0x' + hex)` parser and currently surfaces the
       * same native `SyntaxError` for malformed hex instead of wrapping it in a library-specific error.
       * @param hex - Hex string without `0x`.
       * @returns Parsed bigint value.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Parse a scalar from fixture hex.
       *
       * ```ts
       * hexToNumber('ff');
       * ```
       */
      function hexToNumber(hex) {
        if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
        return hex === '' ? _0n : BigInt('0x' + hex); // Big Endian
      }
      // BE: Big Endian, LE: Little Endian
      /**
       * Parses big-endian bytes into bigint.
       * @param bytes - Bytes in big-endian order.
       * @returns Parsed bigint value.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Read a scalar encoded in network byte order.
       *
       * ```ts
       * bytesToNumberBE(Uint8Array.of(1, 0));
       * ```
       */
      function bytesToNumberBE(bytes) {
        return hexToNumber(bytesToHex$1(bytes));
      }
      /**
       * Parses little-endian bytes into bigint.
       * @param bytes - Bytes in little-endian order.
       * @returns Parsed bigint value.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Read a scalar encoded in little-endian form.
       *
       * ```ts
       * bytesToNumberLE(Uint8Array.of(1, 0));
       * ```
       */
      function bytesToNumberLE(bytes) {
        return hexToNumber(bytesToHex$1(copyBytes(abytes$1(bytes)).reverse()));
      }
      /**
       * Encodes a bigint into fixed-length big-endian bytes.
       * @param n - Number to encode.
       * @param len - Output length in bytes. Must be greater than zero.
       * @returns Big-endian byte array.
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Serialize a scalar into a 32-byte field element.
       *
       * ```ts
       * numberToBytesBE(255n, 2);
       * ```
       */
      function numberToBytesBE(n, len) {
        anumber$1(len);
        if (len === 0) throw new RangeError('zero length');
        n = abignumber(n);
        var hex = n.toString(16);
        // Detect overflow before hex parsing so oversized values don't leak the shared odd-hex error.
        if (hex.length > len * 2) throw new RangeError('number too large');
        return hexToBytes$1(hex.padStart(len * 2, '0'));
      }
      /**
       * Encodes a bigint into fixed-length little-endian bytes.
       * @param n - Number to encode.
       * @param len - Output length in bytes.
       * @returns Little-endian byte array.
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Serialize a scalar for little-endian protocols.
       *
       * ```ts
       * numberToBytesLE(255n, 2);
       * ```
       */
      function numberToBytesLE(n, len) {
        return numberToBytesBE(n, len).reverse();
      }
      /**
       * Copies Uint8Array. We can't use u8a.slice(), because u8a can be Buffer,
       * and Buffer#slice creates mutable copy. Never use Buffers!
       * @param bytes - Bytes to copy.
       * @returns Detached copy.
       * @example
       * Make an isolated copy before mutating serialized bytes.
       *
       * ```ts
       * copyBytes(Uint8Array.of(1, 2, 3));
       * ```
       */
      function copyBytes(bytes) {
        // `Uint8Array.from(...)` would also accept arrays / other typed arrays. Keep this helper strict
        // because callers use it at byte-validation boundaries before mutating the detached copy.
        return Uint8Array.from(abytes(bytes));
      }
      // Historical name: this accepts non-negative bigints, including zero.
      var isPosBig = function isPosBig(n) {
        return typeof n === 'bigint' && _0n <= n;
      };
      /**
       * Checks whether a bigint lies inside a half-open range.
       * @param n - Candidate value.
       * @param min - Inclusive lower bound.
       * @param max - Exclusive upper bound.
       * @returns `true` when the value is inside the range.
       * @example
       * Check whether a candidate scalar fits the field order.
       *
       * ```ts
       * inRange(2n, 1n, 3n);
       * ```
       */
      function inRange(n, min, max) {
        return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
      }
      /**
       * Asserts `min <= n < max`. NOTE: upper bound is exclusive.
       * @param title - Value label for error messages.
       * @param n - Candidate value.
       * @param min - Inclusive lower bound.
       * @param max - Exclusive upper bound.
       * Wrong-type inputs are not separated from out-of-range values here: they still flow through the
       * shared `RangeError` path because this is only a throwing wrapper around `inRange(...)`.
       * @throws On wrong argument ranges or values. {@link RangeError}
       * @example
       * Assert that a bigint stays within one half-open range.
       *
       * ```ts
       * aInRange('x', 2n, 1n, 256n);
       * ```
       */
      function aInRange(title, n, min, max) {
        // Why min <= n < max and not a (min < n < max) OR b (min <= n <= max)?
        // consider P=256n, min=0n, max=P
        // - a for min=0 would require -1:          `inRange('x', x, -1n, P)`
        // - b would commonly require subtraction:  `inRange('x', x, 0n, P - 1n)`
        // - our way is the cleanest:               `inRange('x', x, 0n, P)
        if (!inRange(n, min, max)) throw new RangeError('expected valid ' + title + ': ' + min + ' <= n < ' + max + ', got ' + n);
      }
      // Bit operations
      /**
       * Calculates amount of bits in a bigint.
       * Same as `n.toString(2).length`
       * TODO: merge with nLength in modular
       * @param n - Value to inspect.
       * @returns Bit length.
       * @throws If the value is negative. {@link Error}
       * @example
       * Measure the bit length of a scalar before serialization.
       *
       * ```ts
       * bitLen(8n);
       * ```
       */
      function bitLen(n) {
        // Size callers in this repo only use non-negative orders / scalars, so negative inputs are a
        // contract bug and must not silently collapse to zero bits.
        if (n < _0n) throw new Error('expected non-negative bigint, got ' + n);
        var len;
        for (len = 0; n > _0n; n >>= _1n, len += 1);
        return len;
      }
      /**
       * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
       * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
       * @param n - Number of bits. Negative widths are currently passed through to raw bigint shift
       *   semantics and therefore produce `-1n`.
       * @returns Bitmask value.
       * @example
       * Calculate mask for N bits.
       *
       * ```ts
       * bitMask(4);
       * ```
       */
      var bitMask = exports('bitMask', function bitMask(n) {
        return (_1n << BigInt(n)) - _1n;
      });
      /**
       * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
       * @param hashLen - Hash output size in bytes. Callers are expected to pass a positive length; `0`
       *   is not rejected here and would make the internal generate loop non-progressing.
       * @param qByteLen - Requested output size in bytes. Callers are expected to pass a positive length.
       * @param hmacFn - HMAC implementation.
       * @returns Function that will call DRBG until the predicate returns anything
       *   other than `undefined`.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Build a deterministic nonce generator for RFC6979-style signing.
       *
       * ```ts
       * import { createHmacDrbg } from '@noble/curves/utils.js';
       * import { hmac } from '@noble/hashes/hmac.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * const drbg = createHmacDrbg(32, 32, (key, msg) => hmac(sha256, key, msg));
       * const seed = new Uint8Array(32);
       * drbg(seed, (bytes) => bytes);
       * ```
       */
      function createHmacDrbg(hashLen, qByteLen, hmacFn) {
        anumber$1(hashLen, 'hashLen');
        anumber$1(qByteLen, 'qByteLen');
        if (typeof hmacFn !== 'function') throw new TypeError('hmacFn must be a function');
        // creates Uint8Array
        var u8n = function u8n(len) {
          return new Uint8Array(len);
        };
        var NULL = Uint8Array.of();
        var byte0 = Uint8Array.of(0x00);
        var byte1 = Uint8Array.of(0x01);
        var _maxDrbgIters = 1000;
        // Step B, Step C: set hashLen to 8*ceil(hlen/8).
        // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 signatures.
        var v = u8n(hashLen);
        // Steps B and C of RFC6979 3.2.
        var k = u8n(hashLen);
        var i = 0; // Iterations counter, will throw when over 1000
        var reset = function reset() {
          v.fill(1);
          k.fill(0);
          i = 0;
        };
        // hmac(k)(v, ...values)
        var h = function h() {
          for (var _len = arguments.length, msgs = new Array(_len), _key = 0; _key < _len; _key++) {
            msgs[_key] = arguments[_key];
          }
          return hmacFn(k, concatBytes.apply(void 0, [v].concat(msgs)));
        };
        var reseed = function reseed(seed) {
          if (seed === void 0) {
            seed = NULL;
          }
          // HMAC-DRBG reseed() function. Steps D-G
          k = h(byte0, seed); // k = hmac(k || v || 0x00 || seed)
          v = h(); // v = hmac(k || v)
          if (seed.length === 0) return;
          k = h(byte1, seed); // k = hmac(k || v || 0x01 || seed)
          v = h(); // v = hmac(k || v)
        };

        var gen = function gen() {
          // HMAC-DRBG generate() function
          if (i++ >= _maxDrbgIters) throw new Error('drbg: tried max amount of iterations');
          var len = 0;
          var out = [];
          while (len < qByteLen) {
            v = h();
            var sl = v.slice();
            out.push(sl);
            len += v.length;
          }
          return concatBytes.apply(void 0, out);
        };
        var genUntil = function genUntil(seed, pred) {
          reset();
          reseed(seed); // Steps D-G
          var res = undefined; // Step H: grind until the predicate accepts a candidate.
          // Falsy values like 0 are valid outputs.
          while ((res = pred(gen())) === undefined) reseed();
          reset();
          return res;
        };
        return genUntil;
      }
      /**
       * Validates declared required and optional field types on a plain object.
       * Extra keys are intentionally ignored because many callers validate only the subset they use from
       * richer option bags or runtime objects.
       * @param object - Object to validate.
       * @param fields - Required field types.
       * @param optFields - Optional field types.
       * @throws On wrong argument types. {@link TypeError}
       * @example
       * Check user options before building a curve helper.
       *
       * ```ts
       * validateObject({ flag: true }, { flag: 'boolean' });
       * ```
       */
      function validateObject(object, fields, optFields) {
        if (fields === void 0) {
          fields = {};
        }
        if (optFields === void 0) {
          optFields = {};
        }
        if (Object.prototype.toString.call(object) !== '[object Object]') throw new TypeError('expected valid options object');
        function checkField(fieldName, expectedType, isOpt) {
          // Config/data fields must be explicit own properties, but runtime objects such as Field
          // instances intentionally satisfy required method slots via their shared prototype.
          if (!isOpt && expectedType !== 'function' && !Object.hasOwn(object, fieldName)) throw new TypeError("param \"" + fieldName + "\" is invalid: expected own property");
          var val = object[fieldName];
          if (isOpt && val === undefined) return;
          var current = typeof val;
          if (current !== expectedType || val === null) throw new TypeError("param \"" + fieldName + "\" is invalid: expected " + expectedType + ", got " + current);
        }
        var iter = function iter(f, isOpt) {
          return Object.entries(f).forEach(function (_ref) {
            var k = _ref[0],
              v = _ref[1];
            return checkField(k, v, isOpt);
          });
        };
        iter(fields, false);
        iter(optFields, true);
      }
    }
  };
});

System.register("chunks:///_virtual/weierstrass.js", ['./rollupPluginModLoBabelHelpers.js', './hmac.js', './utils.js', './utils2.js', './curve.js', './modular.js'], function (exports) {
  var _createForOfIteratorHelperLoose, _inheritsLoose, _wrapNativeSuper, _createClass, hmac, ahash, asafenumber, numberToHexUnpadded, abytes, abignumber, bytesToNumberBE, validateObject, randomBytes, concatBytes, hexToBytes, bytesToHex, bitMask, createHmacDrbg, isBytes, abool, aInRange, bitLen, createKeygen, createCurveFields, normalizeZ, mulEndoUnsafe, wNAF, negateCt, getMinHashLength, mapHashToField;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _inheritsLoose = module.inheritsLoose;
      _wrapNativeSuper = module.wrapNativeSuper;
      _createClass = module.createClass;
    }, function (module) {
      hmac = module.hmac;
    }, function (module) {
      ahash = module.ahash;
    }, function (module) {
      asafenumber = module.asafenumber;
      numberToHexUnpadded = module.numberToHexUnpadded;
      abytes = module.abytes;
      abignumber = module.abignumber;
      bytesToNumberBE = module.bytesToNumberBE;
      validateObject = module.validateObject;
      randomBytes = module.randomBytes;
      concatBytes = module.concatBytes;
      hexToBytes = module.hexToBytes;
      bytesToHex = module.bytesToHex;
      bitMask = module.bitMask;
      createHmacDrbg = module.createHmacDrbg;
      isBytes = module.isBytes;
      abool = module.abool;
      aInRange = module.aInRange;
      bitLen = module.bitLen;
    }, function (module) {
      createKeygen = module.createKeygen;
      createCurveFields = module.createCurveFields;
      normalizeZ = module.normalizeZ;
      mulEndoUnsafe = module.mulEndoUnsafe;
      wNAF = module.wNAF;
      negateCt = module.negateCt;
    }, function (module) {
      getMinHashLength = module.getMinHashLength;
      mapHashToField = module.mapHashToField;
    }],
    execute: function () {
      exports({
        _splitEndoScalar: _splitEndoScalar,
        ecdh: ecdh,
        ecdsa: ecdsa,
        weierstrass: weierstrass
      });

      // We construct the basis so `den` is always positive and equals `n`,
      // but the `num` sign depends on the basis, not on the secret value.
      // Exact half-way cases round away from zero, which keeps the split symmetric
      // around the reduced-basis boundaries used by endomorphism decomposition.
      var divNearest = function divNearest(num, den) {
        return (num + (num >= 0 ? den : -den) / _2n) / den;
      };
      /** Splits scalar for GLV endomorphism. */
      function _splitEndoScalar(k, basis, n) {
        // Split scalar into two such that part is ~half bits: `abs(part) < sqrt(N)`
        // Since part can be negative, we need to do this on point.
        // Callers must provide a reduced GLV basis whose vectors satisfy
        // `a + b * lambda ≡ 0 (mod n)`; this helper only sees the basis and `n`.
        // Reject unreduced scalars instead of silently treating them mod n.
        aInRange('scalar', k, _0n, n);
        // TODO: verifyScalar function which consumes lambda
        var _basis$ = basis[0],
          a1 = _basis$[0],
          b1 = _basis$[1],
          _basis$2 = basis[1],
          a2 = _basis$2[0],
          b2 = _basis$2[1];
        var c1 = divNearest(b2 * k, n);
        var c2 = divNearest(-b1 * k, n);
        // |k1|/|k2| is < sqrt(N), but can be negative.
        // If we do `k1 mod N`, we'll get big scalar (`> sqrt(N)`): so, we do cheaper negation instead.
        var k1 = k - c1 * a1 - c2 * a2;
        var k2 = -c1 * b1 - c2 * b2;
        var k1neg = k1 < _0n;
        var k2neg = k2 < _0n;
        if (k1neg) k1 = -k1;
        if (k2neg) k2 = -k2;
        // Double check that resulting scalar less than half bits of N: otherwise wNAF will fail.
        // This should only happen on wrong bases.
        // Also, the math inside is complex enough that this guard is worth keeping.
        var MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n; // Half bits of N
        if (k1 < _0n || k1 >= MAX_NUM || k2 < _0n || k2 >= MAX_NUM) {
          throw new Error('splitScalar (endomorphism): failed for k');
        }
        return {
          k1neg: k1neg,
          k1: k1,
          k2neg: k2neg,
          k2: k2
        };
      }
      function validateSigFormat(format) {
        if (!['compact', 'recovered', 'der'].includes(format)) throw new Error('Signature format must be "compact", "recovered", or "der"');
        return format;
      }
      function validateSigOpts(opts, def) {
        validateObject(opts);
        var optsn = {};
        // Normalize only the declared option subset from `def`; unknown keys are
        // intentionally ignored so shared / superset option bags stay valid here too.
        // `extraEntropy` stays an opaque payload until the signing path consumes it.
        for (var _i = 0, _Object$keys = Object.keys(def); _i < _Object$keys.length; _i++) {
          var optName = _Object$keys[_i];
          // @ts-ignore
          optsn[optName] = opts[optName] === undefined ? def[optName] : opts[optName];
        }
        abool(optsn.lowS, 'lowS');
        abool(optsn.prehash, 'prehash');
        if (optsn.format !== undefined) validateSigFormat(optsn.format);
        return optsn;
      }
      /**
       * @param m - Error message.
       * @example
       * Throw a DER-specific error when signature parsing encounters invalid bytes.
       *
       * ```ts
       * new DERErr('bad der');
       * ```
       */
      var DERErr = exports('DERErr', /*#__PURE__*/function (_Error) {
        _inheritsLoose(DERErr, _Error);
        function DERErr(m) {
          if (m === void 0) {
            m = '';
          }
          return _Error.call(this, m) || this;
        }
        return DERErr;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));
      /**
       * ASN.1 DER encoding utilities. ASN is very complex & fragile. Format:
       *
       *     [0x30 (SEQUENCE), bytelength, 0x02 (INTEGER), intLength, R, 0x02 (INTEGER), intLength, S]
       *
       * Docs: {@link https://letsencrypt.org/docs/a-warm-welcome-to-asn1-and-der/ | Let's Encrypt ASN.1 guide} and
       * {@link https://luca.ntop.org/Teaching/Appunti/asn1.html | Luca Deri's ASN.1 notes}.
       * @example
       * ASN.1 DER encoding utilities.
       *
       * ```ts
       * const der = DER.hexFromSig({ r: 1n, s: 2n });
       * ```
       */
      var DER = exports('DER', {
        // asn.1 DER encoding utils
        Err: DERErr,
        // Basic building block is TLV (Tag-Length-Value)
        _tlv: {
          encode: function encode(tag, data) {
            var E = DER.Err;
            asafenumber(tag, 'tag');
            if (tag < 0 || tag > 255) throw new E('tlv.encode: wrong tag');
            if (typeof data !== 'string') throw new TypeError('"data" expected string, got type=' + typeof data);
            // Internal helper: callers hand this already-validated hex payload, so we only enforce
            // byte alignment here instead of re-validating every nibble.
            if (data.length & 1) throw new E('tlv.encode: unpadded data');
            var dataLen = data.length / 2;
            var len = numberToHexUnpadded(dataLen);
            if (len.length / 2 & 128) throw new E('tlv.encode: long form length too big');
            // length of length with long form flag
            var lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : '';
            var t = numberToHexUnpadded(tag);
            return t + lenLen + len + data;
          },
          // v - value, l - left bytes (unparsed)
          decode: function decode(tag, data) {
            var E = DER.Err;
            data = abytes(data, undefined, 'DER data');
            var pos = 0;
            if (tag < 0 || tag > 255) throw new E('tlv.encode: wrong tag');
            if (data.length < 2 || data[pos++] !== tag) throw new E('tlv.decode: wrong tlv');
            var first = data[pos++];
            // First bit of first length byte is the short/long form flag.
            var isLong = !!(first & 128);
            var length = 0;
            if (!isLong) length = first;else {
              // Long form: [longFlag(1bit), lengthLength(7bit), length (BE)]
              var lenLen = first & 127;
              if (!lenLen) throw new E('tlv.decode(long): indefinite length not supported');
              // This would overflow u32 in JS.
              if (lenLen > 4) throw new E('tlv.decode(long): byte length is too big');
              var lengthBytes = data.subarray(pos, pos + lenLen);
              if (lengthBytes.length !== lenLen) throw new E('tlv.decode: length bytes not complete');
              if (lengthBytes[0] === 0) throw new E('tlv.decode(long): zero leftmost byte');
              for (var _iterator = _createForOfIteratorHelperLoose(lengthBytes), _step; !(_step = _iterator()).done;) {
                var b = _step.value;
                length = length << 8 | b;
              }
              pos += lenLen;
              if (length < 128) throw new E('tlv.decode(long): not minimal encoding');
            }
            var v = data.subarray(pos, pos + length);
            if (v.length !== length) throw new E('tlv.decode: wrong value length');
            return {
              v: v,
              l: data.subarray(pos + length)
            };
          }
        },
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        _int: {
          encode: function encode(num) {
            var E = DER.Err;
            abignumber(num);
            if (num < _0n) throw new E('integer: negative integers are not allowed');
            var hex = numberToHexUnpadded(num);
            // Pad with zero byte if negative flag is present
            if (Number.parseInt(hex[0], 16) & 8) hex = '00' + hex;
            if (hex.length & 1) throw new E('unexpected DER parsing assertion: unpadded hex');
            return hex;
          },
          decode: function decode(data) {
            var E = DER.Err;
            if (data.length < 1) throw new E('invalid signature integer: empty');
            if (data[0] & 128) throw new E('invalid signature integer: negative');
            // Single-byte zero `00` is the canonical DER INTEGER encoding for zero.
            if (data.length > 1 && data[0] === 0x00 && !(data[1] & 128)) throw new E('invalid signature integer: unnecessary leading zero');
            return bytesToNumberBE(data);
          }
        },
        toSig: function toSig(bytes) {
          // parse DER signature
          var E = DER.Err,
            _int = DER._int,
            tlv = DER._tlv;
          var data = abytes(bytes, undefined, 'signature');
          var _tlv$decode = tlv.decode(0x30, data),
            seqBytes = _tlv$decode.v,
            seqLeftBytes = _tlv$decode.l;
          if (seqLeftBytes.length) throw new E('invalid signature: left bytes after parsing');
          var _tlv$decode2 = tlv.decode(0x02, seqBytes),
            rBytes = _tlv$decode2.v,
            rLeftBytes = _tlv$decode2.l;
          var _tlv$decode3 = tlv.decode(0x02, rLeftBytes),
            sBytes = _tlv$decode3.v,
            sLeftBytes = _tlv$decode3.l;
          if (sLeftBytes.length) throw new E('invalid signature: left bytes after parsing');
          return {
            r: _int.decode(rBytes),
            s: _int.decode(sBytes)
          };
        },
        hexFromSig: function hexFromSig(sig) {
          var tlv = DER._tlv,
            _int2 = DER._int;
          var rs = tlv.encode(0x02, _int2.encode(sig.r));
          var ss = tlv.encode(0x02, _int2.encode(sig.s));
          var seq = rs + ss;
          return tlv.encode(0x30, seq);
        }
      });
      Object.freeze(DER._tlv);
      Object.freeze(DER._int);
      Object.freeze(DER);
      // Be friendly to bad ECMAScript parsers by not using bigint literals
      // prettier-ignore
      var _0n = /* @__PURE__ */BigInt(0),
        _1n = /* @__PURE__ */BigInt(1),
        _2n = /* @__PURE__ */BigInt(2),
        _3n = /* @__PURE__ */BigInt(3),
        _4n = /* @__PURE__ */BigInt(4);
      /**
       * Creates weierstrass Point constructor, based on specified curve options.
       *
       * See {@link WeierstrassOpts}.
       * @param params - Curve parameters. See {@link WeierstrassOpts}.
       * @param extraOpts - Optional helpers and overrides. See {@link WeierstrassExtraOpts}.
       * @returns Weierstrass point constructor.
       * @throws If the curve parameters, overrides, or point codecs are invalid. {@link Error}
       *
       * @example
       * Construct a point type from explicit Weierstrass curve parameters.
       *
       * ```js
       * const opts = {
       *   p: 0xfffffffffffffffffffffffffffffffeffffac73n,
       *   n: 0x100000000000000000001b8fa16dfab9aca16b6b3n,
       *   h: 1n,
       *   a: 0n,
       *   b: 7n,
       *   Gx: 0x3b4c382ce37aa192a4019e763036f4f5dd4d7ebbn,
       *   Gy: 0x938cf935318fdced6bc28286531733c3f03c4feen,
       * };
       * const secp160k1_Point = weierstrass(opts);
       * ```
       */
      function weierstrass(params, extraOpts) {
        var _class;
        if (extraOpts === void 0) {
          extraOpts = {};
        }
        var validated = createCurveFields('weierstrass', params, extraOpts);
        var Fp = validated.Fp;
        var Fn = validated.Fn;
        var _CURVE = validated.CURVE;
        var cofactor = _CURVE.h,
          CURVE_ORDER = _CURVE.n;
        validateObject(extraOpts, {}, {
          allowInfinityPoint: 'boolean',
          clearCofactor: 'function',
          isTorsionFree: 'function',
          fromBytes: 'function',
          toBytes: 'function',
          endo: 'object'
        });
        // Snapshot constructor-time flags whose later mutation would otherwise change
        // validity semantics of an already-built point type.
        var _extraOpts = extraOpts,
          endo = _extraOpts.endo,
          allowInfinityPoint = _extraOpts.allowInfinityPoint;
        if (endo) {
          // validateObject(endo, { beta: 'bigint', splitScalar: 'function' });
          if (!Fp.is0(_CURVE.a) || typeof endo.beta !== 'bigint' || !Array.isArray(endo.basises)) {
            throw new Error('invalid endo: expected "beta": bigint and "basises": array');
          }
        }
        var lengths = getWLengths(Fp, Fn);
        function assertCompressionIsSupported() {
          if (!Fp.isOdd) throw new Error('compression is not supported: Field does not have .isOdd()');
        }
        // Implements IEEE P1363 point encoding
        function pointToBytes(_c, point, isCompressed) {
          // SEC 1 v2.0 §2.3.3 encodes infinity as the single octet 0x00. Only curves
          // that opt into infinity as a public point value should expose that byte form.
          if (allowInfinityPoint && point.is0()) return Uint8Array.of(0);
          var _point$toAffine = point.toAffine(),
            x = _point$toAffine.x,
            y = _point$toAffine.y;
          var bx = Fp.toBytes(x);
          abool(isCompressed, 'isCompressed');
          if (isCompressed) {
            assertCompressionIsSupported();
            var hasEvenY = !Fp.isOdd(y);
            return concatBytes(pprefix(hasEvenY), bx);
          } else {
            return concatBytes(Uint8Array.of(0x04), bx, Fp.toBytes(y));
          }
        }
        function pointFromBytes(bytes) {
          abytes(bytes, undefined, 'Point');
          var comp = lengths.publicKey,
            uncomp = lengths.publicKeyUncompressed; // e.g. for 32-byte: 33, 65
          var length = bytes.length;
          var head = bytes[0];
          var tail = bytes.subarray(1);
          if (allowInfinityPoint && length === 1 && head === 0x00) return {
            x: Fp.ZERO,
            y: Fp.ZERO
          };
          // SEC 1 v2.0 §2.3.4 decodes 0x00 as infinity, but §3.2.2 public-key validation
          // rejects infinity. We therefore keep 0x00 rejected by default because callers
          // reuse this parser as the strict public-key boundary, and only admit it when
          // the curve explicitly opts into infinity as a public point value. secp256k1
          // crosstests show OpenSSL raw point codecs accept 0x00 too.
          // No actual validation is done here: use .assertValidity()
          if (length === comp && (head === 0x02 || head === 0x03)) {
            var x = Fp.fromBytes(tail);
            if (!Fp.isValid(x)) throw new Error('bad point: is not on curve, wrong x');
            var y2 = weierstrassEquation(x); // y² = x³ + ax + b
            var y;
            try {
              y = Fp.sqrt(y2); // y = y² ^ (p+1)/4
            } catch (sqrtError) {
              var err = sqrtError instanceof Error ? ': ' + sqrtError.message : '';
              throw new Error('bad point: is not on curve, sqrt error' + err);
            }
            assertCompressionIsSupported();
            var evenY = Fp.isOdd(y);
            var evenH = (head & 1) === 1; // ECDSA-specific
            if (evenH !== evenY) y = Fp.neg(y);
            return {
              x: x,
              y: y
            };
          } else if (length === uncomp && head === 0x04) {
            // TODO: more checks
            var L = Fp.BYTES;
            var _x = Fp.fromBytes(tail.subarray(0, L));
            var _y = Fp.fromBytes(tail.subarray(L, L * 2));
            if (!isValidXY(_x, _y)) throw new Error('bad point: is not on curve');
            return {
              x: _x,
              y: _y
            };
          } else {
            throw new Error("bad point: got length " + length + ", expected compressed=" + comp + " or uncompressed=" + uncomp);
          }
        }
        var encodePoint = extraOpts.toBytes === undefined ? pointToBytes : extraOpts.toBytes;
        var decodePoint = extraOpts.fromBytes === undefined ? pointFromBytes : extraOpts.fromBytes;
        function weierstrassEquation(x) {
          var x2 = Fp.sqr(x); // x * x
          var x3 = Fp.mul(x2, x); // x² * x
          return Fp.add(Fp.add(x3, Fp.mul(x, _CURVE.a)), _CURVE.b); // x³ + a * x + b
        }
        // TODO: move top-level
        /** Checks whether equation holds for given x, y: y² == x³ + ax + b */
        function isValidXY(x, y) {
          var left = Fp.sqr(y); // y²
          var right = weierstrassEquation(x); // x³ + ax + b
          return Fp.eql(left, right);
        }
        // Keep constructor-time generator validation cheap: callers are responsible for supplying the
        // correct prime-order base point, while eager subgroup checks here would slow heavy module imports.
        // Test 1: equation y² = x³ + ax + b should work for generator point.
        if (!isValidXY(_CURVE.Gx, _CURVE.Gy)) throw new Error('bad curve params: generator point');
        // Test 2: discriminant Δ part should be non-zero: 4a³ + 27b² != 0.
        // Guarantees curve is genus-1, smooth (non-singular).
        var _4a3 = Fp.mul(Fp.pow(_CURVE.a, _3n), _4n);
        var _27b2 = Fp.mul(Fp.sqr(_CURVE.b), BigInt(27));
        if (Fp.is0(Fp.add(_4a3, _27b2))) throw new Error('bad curve params: a or b');
        /** Asserts coordinate is valid: 0 <= n < Fp.ORDER. */
        function acoord(title, n, banZero) {
          if (banZero === void 0) {
            banZero = false;
          }
          if (!Fp.isValid(n) || banZero && Fp.is0(n)) throw new Error("bad point coordinate " + title);
          return n;
        }
        function aprjpoint(other) {
          if (!(other instanceof Point)) throw new Error('Weierstrass Point expected');
        }
        function splitEndoScalarN(k) {
          if (!endo || !endo.basises) throw new Error('no endo');
          return _splitEndoScalar(k, endo.basises, Fn.ORDER);
        }
        function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
          k2p = new Point(Fp.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
          k1p = negateCt(k1neg, k1p);
          k2p = negateCt(k2neg, k2p);
          return k1p.add(k2p);
        }
        /**
         * Projective Point works in 3d / projective (homogeneous) coordinates:(X, Y, Z) ∋ (x=X/Z, y=Y/Z).
         * Default Point works in 2d / affine coordinates: (x, y).
         * We're doing calculations in projective, because its operations don't require costly inversion.
         */
        var Point = /*#__PURE__*/function () {
          /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
          function Point(X, Y, Z) {
            this.X = void 0;
            this.Y = void 0;
            this.Z = void 0;
            this.X = acoord('x', X);
            // This is not just about ZERO / infinity: ambient curves can have real
            // finite points with y=0. Those points are 2-torsion, so they cannot lie
            // in the odd prime-order subgroups this point type is meant to represent.
            this.Y = acoord('y', Y, true);
            this.Z = acoord('z', Z);
            Object.freeze(this);
          }
          Point.CURVE = function CURVE() {
            return _CURVE;
          }
          /** Does NOT validate if the point is valid. Use `.assertValidity()`. */;
          Point.fromAffine = function fromAffine(p) {
            var _ref = p || {},
              x = _ref.x,
              y = _ref.y;
            if (!p || !Fp.isValid(x) || !Fp.isValid(y)) throw new Error('invalid affine point');
            if (p instanceof Point) throw new Error('projective point not allowed');
            // (0, 0) would've produced (0, 0, 1) - instead, we need (0, 1, 0)
            if (Fp.is0(x) && Fp.is0(y)) return Point.ZERO;
            return new Point(x, y, Fp.ONE);
          };
          Point.fromBytes = function fromBytes(bytes) {
            var P = Point.fromAffine(decodePoint(abytes(bytes, undefined, 'point')));
            P.assertValidity();
            return P;
          };
          Point.fromHex = function fromHex(hex) {
            return Point.fromBytes(hexToBytes(hex));
          };
          var _proto = Point.prototype;
          /**
           *
           * @param windowSize
           * @param isLazy - true will defer table computation until the first multiplication
           * @returns
           */
          _proto.precompute = function precompute(windowSize, isLazy) {
            if (windowSize === void 0) {
              windowSize = 8;
            }
            if (isLazy === void 0) {
              isLazy = true;
            }
            wnaf.createCache(this, windowSize);
            if (!isLazy) this.multiply(_3n); // random number
            return this;
          }
          // TODO: return `this`
          /** A point on curve is valid if it conforms to equation. */;
          _proto.assertValidity = function assertValidity() {
            var p = this;
            if (p.is0()) {
              // (0, 1, 0) aka ZERO is invalid in most contexts.
              // In BLS, ZERO can be serialized, so we allow it.
              // Keep the accepted infinity encoding canonical: projective-equivalent (X, Y, 0) points
              // like (1, 1, 0) compare equal to ZERO, but only (0, 1, 0) should pass this guard.
              if (extraOpts.allowInfinityPoint && Fp.is0(p.X) && Fp.eql(p.Y, Fp.ONE) && Fp.is0(p.Z)) return;
              throw new Error('bad point: ZERO');
            }
            // Some 3rd-party test vectors require different wording between here & `fromCompressedHex`
            var _p$toAffine = p.toAffine(),
              x = _p$toAffine.x,
              y = _p$toAffine.y;
            if (!Fp.isValid(x) || !Fp.isValid(y)) throw new Error('bad point: x or y not field elements');
            if (!isValidXY(x, y)) throw new Error('bad point: equation left != right');
            if (!p.isTorsionFree()) throw new Error('bad point: not in prime-order subgroup');
          };
          _proto.hasEvenY = function hasEvenY() {
            var _this$toAffine = this.toAffine(),
              y = _this$toAffine.y;
            if (!Fp.isOdd) throw new Error("Field doesn't support isOdd");
            return !Fp.isOdd(y);
          }
          /** Compare one point to another. */;
          _proto.equals = function equals(other) {
            aprjpoint(other);
            var X1 = this.X,
              Y1 = this.Y,
              Z1 = this.Z;
            var X2 = other.X,
              Y2 = other.Y,
              Z2 = other.Z;
            var U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            var U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
          }
          /** Flips point to one corresponding to (x, -y) in Affine coordinates. */;
          _proto.negate = function negate() {
            return new Point(this.X, Fp.neg(this.Y), this.Z);
          }
          // Renes-Costello-Batina exception-free doubling formula.
          // There is 30% faster Jacobian formula, but it is not complete.
          // https://eprint.iacr.org/2015/1060, algorithm 3
          // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
          ;

          _proto["double"] = function double() {
            var a = _CURVE.a,
              b = _CURVE.b;
            var b3 = Fp.mul(b, _3n);
            var X1 = this.X,
              Y1 = this.Y,
              Z1 = this.Z;
            var X3 = Fp.ZERO,
              Y3 = Fp.ZERO,
              Z3 = Fp.ZERO; // prettier-ignore
            var t0 = Fp.mul(X1, X1); // step 1
            var t1 = Fp.mul(Y1, Y1);
            var t2 = Fp.mul(Z1, Z1);
            var t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3); // step 5
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3); // step 10
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3); // step 15
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0); // step 20
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1); // step 25
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3); // step 30
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
          }
          // Renes-Costello-Batina exception-free addition formula.
          // There is 30% faster Jacobian formula, but it is not complete.
          // https://eprint.iacr.org/2015/1060, algorithm 1
          // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
          ;

          _proto.add = function add(other) {
            aprjpoint(other);
            var X1 = this.X,
              Y1 = this.Y,
              Z1 = this.Z;
            var X2 = other.X,
              Y2 = other.Y,
              Z2 = other.Z;
            var X3 = Fp.ZERO,
              Y3 = Fp.ZERO,
              Z3 = Fp.ZERO; // prettier-ignore
            var a = _CURVE.a;
            var b3 = Fp.mul(_CURVE.b, _3n);
            var t0 = Fp.mul(X1, X2); // step 1
            var t1 = Fp.mul(Y1, Y2);
            var t2 = Fp.mul(Z1, Z2);
            var t3 = Fp.add(X1, Y1);
            var t4 = Fp.add(X2, Y2); // step 5
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            var t5 = Fp.add(X2, Z2); // step 10
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2); // step 15
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2); // step 20
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0); // step 25
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2); // step 30
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4); // step 35
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0); // step 40
            return new Point(X3, Y3, Z3);
          };
          _proto.subtract = function subtract(other) {
            // Validate before calling `negate()` so wrong inputs fail with the point guard
            // instead of leaking a foreign `negate()` error.
            aprjpoint(other);
            return this.add(other.negate());
          };
          _proto.is0 = function is0() {
            return this.equals(Point.ZERO);
          }
          /**
           * Constant time multiplication.
           * Uses wNAF method. Windowed method may be 10% faster,
           * but takes 2x longer to generate and consumes 2x memory.
           * Uses precomputes when available.
           * Uses endomorphism for Koblitz curves.
           * @param scalar - by which the point would be multiplied
           * @returns New point
           */;
          _proto.multiply = function multiply(scalar) {
            var _this = this;
            var _extraOpts2 = extraOpts,
              endo = _extraOpts2.endo;
            // Keep the subgroup-scalar contract strict instead of reducing 0 / n to ZERO.
            // In key/signature-style callers, those values usually mean broken hash/scalar plumbing,
            // and failing closed is safer than silently producing the identity point.
            if (!Fn.isValidNot0(scalar)) throw new RangeError('invalid scalar: out of range'); // 0 is invalid
            var point, fake; // Fake point is used to const-time mult
            var mul = function mul(n) {
              return wnaf.cached(_this, n, function (p) {
                return normalizeZ(Point, p);
              });
            };
            /** See docs for {@link EndomorphismOpts} */
            if (endo) {
              var _splitEndoScalarN = splitEndoScalarN(scalar),
                k1neg = _splitEndoScalarN.k1neg,
                k1 = _splitEndoScalarN.k1,
                k2neg = _splitEndoScalarN.k2neg,
                k2 = _splitEndoScalarN.k2;
              var _mul = mul(k1),
                k1p = _mul.p,
                k1f = _mul.f;
              var _mul2 = mul(k2),
                k2p = _mul2.p,
                k2f = _mul2.f;
              fake = k1f.add(k2f);
              point = finishEndo(endo.beta, k1p, k2p, k1neg, k2neg);
            } else {
              var _mul3 = mul(scalar),
                p = _mul3.p,
                f = _mul3.f;
              point = p;
              fake = f;
            }
            // Normalize `z` for both points, but return only real one
            return normalizeZ(Point, [point, fake])[0];
          }
          /**
           * Non-constant-time multiplication. Uses double-and-add algorithm.
           * It's faster, but should only be used when you don't care about
           * an exposed secret key e.g. sig verification, which works over *public* keys.
           */;
          _proto.multiplyUnsafe = function multiplyUnsafe(scalar) {
            var _extraOpts3 = extraOpts,
              endo = _extraOpts3.endo;
            var p = this;
            var sc = scalar;
            // Public-scalar callers may need 0, but n and larger values stay rejected here too.
            // Reducing them mod n would turn bad caller input into an accidental identity point.
            if (!Fn.isValid(sc)) throw new RangeError('invalid scalar: out of range'); // 0 is valid
            if (sc === _0n || p.is0()) return Point.ZERO; // 0
            if (sc === _1n) return p; // 1
            if (wnaf.hasCache(this)) return this.multiply(sc); // precomputes
            // We don't have method for double scalar multiplication (aP + bQ):
            // Even with using Strauss-Shamir trick, it's 35% slower than naïve mul+add.
            if (endo) {
              var _splitEndoScalarN2 = splitEndoScalarN(sc),
                k1neg = _splitEndoScalarN2.k1neg,
                k1 = _splitEndoScalarN2.k1,
                k2neg = _splitEndoScalarN2.k2neg,
                k2 = _splitEndoScalarN2.k2;
              var _mulEndoUnsafe = mulEndoUnsafe(Point, p, k1, k2),
                p1 = _mulEndoUnsafe.p1,
                p2 = _mulEndoUnsafe.p2; // 30% faster vs wnaf.unsafe
              return finishEndo(endo.beta, p1, p2, k1neg, k2neg);
            } else {
              return wnaf.unsafe(p, sc);
            }
          }
          /**
           * Converts Projective point to affine (x, y) coordinates.
           * (X, Y, Z) ∋ (x=X/Z, y=Y/Z).
           * @param invertedZ - Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
           */;
          _proto.toAffine = function toAffine(invertedZ) {
            var p = this;
            var iz = invertedZ;
            var X = p.X,
              Y = p.Y,
              Z = p.Z;
            // Fast-path for normalized points
            if (Fp.eql(Z, Fp.ONE)) return {
              x: X,
              y: Y
            };
            var is0 = p.is0();
            // If invZ was 0, we return zero point. However we still want to execute
            // all operations, so we replace invZ with a random number, 1.
            if (iz == null) iz = is0 ? Fp.ONE : Fp.inv(Z);
            var x = Fp.mul(X, iz);
            var y = Fp.mul(Y, iz);
            var zz = Fp.mul(Z, iz);
            if (is0) return {
              x: Fp.ZERO,
              y: Fp.ZERO
            };
            if (!Fp.eql(zz, Fp.ONE)) throw new Error('invZ was invalid');
            return {
              x: x,
              y: y
            };
          }
          /**
           * Checks whether Point is free of torsion elements (is in prime subgroup).
           * Always torsion-free for cofactor=1 curves.
           */;
          _proto.isTorsionFree = function isTorsionFree() {
            var _extraOpts4 = extraOpts,
              isTorsionFree = _extraOpts4.isTorsionFree;
            if (cofactor === _1n) return true;
            if (isTorsionFree) return isTorsionFree(Point, this);
            return wnaf.unsafe(this, CURVE_ORDER).is0();
          };
          _proto.clearCofactor = function clearCofactor() {
            var _extraOpts5 = extraOpts,
              clearCofactor = _extraOpts5.clearCofactor;
            if (cofactor === _1n) return this; // Fast-path
            if (clearCofactor) return clearCofactor(Point, this);
            // Default fallback assumes the cofactor fits the usual subgroup-scalar
            // multiplyUnsafe() contract. Curves with larger / structured cofactors
            // should define a clearCofactor override anyway (e.g. psi/Frobenius maps).
            return this.multiplyUnsafe(cofactor);
          };
          _proto.isSmallOrder = function isSmallOrder() {
            if (cofactor === _1n) return this.is0(); // Fast-path
            return this.clearCofactor().is0();
          };
          _proto.toBytes = function toBytes(isCompressed) {
            if (isCompressed === void 0) {
              isCompressed = true;
            }
            abool(isCompressed, 'isCompressed');
            // Same policy as pointFromBytes(): keep ZERO out of the default byte surface because
            // callers use these encodings as public keys, where SEC 1 validation rejects infinity.
            this.assertValidity();
            return encodePoint(Point, this, isCompressed);
          };
          _proto.toHex = function toHex(isCompressed) {
            if (isCompressed === void 0) {
              isCompressed = true;
            }
            return bytesToHex(this.toBytes(isCompressed));
          };
          _proto.toString = function toString() {
            return "<Point " + (this.is0() ? 'ZERO' : this.toHex()) + ">";
          };
          _createClass(Point, [{
            key: "x",
            get: function get() {
              return this.toAffine().x;
            }
          }, {
            key: "y",
            get: function get() {
              return this.toAffine().y;
            }
          }]);
          return Point;
        }();
        _class = Point;
        // base / generator point
        Point.BASE = new _class(_CURVE.Gx, _CURVE.Gy, Fp.ONE);
        // zero / infinity / identity point
        Point.ZERO = new _class(Fp.ZERO, Fp.ONE, Fp.ZERO);
        // 0, 1, 0
        // math field
        Point.Fp = Fp;
        // scalar field
        Point.Fn = Fn;
        var bits = Fn.BITS;
        var wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
        // Tiny toy curves can have scalar fields narrower than 8 bits. Skip the
        // eager W=8 cache there instead of rejecting an otherwise valid constructor.
        if (bits >= 8) Point.BASE.precompute(8); // Enable precomputes. Slows down first publicKey computation by 20ms.
        Object.freeze(Point.prototype);
        Object.freeze(Point);
        return Point;
      }
      // Points start with byte 0x02 when y is even; otherwise 0x03
      function pprefix(hasEvenY) {
        return Uint8Array.of(hasEvenY ? 0x02 : 0x03);
      }
      function getWLengths(Fp, Fn) {
        return {
          secretKey: Fn.BYTES,
          publicKey: 1 + Fp.BYTES,
          publicKeyUncompressed: 1 + 2 * Fp.BYTES,
          publicKeyHasPrefix: true,
          // Raw compact `(r || s)` signature width; DER and recovered signatures use
          // different lengths outside this helper.
          signature: 2 * Fn.BYTES
        };
      }
      /**
       * Sometimes users only need getPublicKey, getSharedSecret, and secret key handling.
       * This helper ensures no signature functionality is present. Less code, smaller bundle size.
       * @param Point - Weierstrass point constructor.
       * @param ecdhOpts - Optional randomness helpers:
       *   - `randomBytes` (optional): Optional RNG override.
       * @returns ECDH helper namespace.
       * @example
       * Sometimes users only need getPublicKey, getSharedSecret, and secret key handling.
       *
       * ```ts
       * import { ecdh } from '@noble/curves/abstract/weierstrass.js';
       * import { p256 } from '@noble/curves/nist.js';
       * const dh = ecdh(p256.Point);
       * const alice = dh.keygen();
       * const shared = dh.getSharedSecret(alice.secretKey, alice.publicKey);
       * ```
       */
      function ecdh(Point, ecdhOpts) {
        if (ecdhOpts === void 0) {
          ecdhOpts = {};
        }
        var Fn = Point.Fn;
        var randomBytes_ = ecdhOpts.randomBytes === undefined ? randomBytes : ecdhOpts.randomBytes;
        // Keep the advertised seed length aligned with mapHashToField(), which keeps a hard 16-byte
        // minimum even on toy curves.
        var lengths = Object.assign(getWLengths(Point.Fp, Fn), {
          seed: Math.max(getMinHashLength(Fn.ORDER), 16)
        });
        function isValidSecretKey(secretKey) {
          try {
            var num = Fn.fromBytes(secretKey);
            return Fn.isValidNot0(num);
          } catch (error) {
            return false;
          }
        }
        function isValidPublicKey(publicKey, isCompressed) {
          var comp = lengths.publicKey,
            publicKeyUncompressed = lengths.publicKeyUncompressed;
          try {
            var l = publicKey.length;
            if (isCompressed === true && l !== comp) return false;
            if (isCompressed === false && l !== publicKeyUncompressed) return false;
            return !!Point.fromBytes(publicKey);
          } catch (error) {
            return false;
          }
        }
        /**
         * Produces cryptographically secure secret key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */
        function randomSecretKey(seed) {
          seed = seed === undefined ? randomBytes_(lengths.seed) : seed;
          return mapHashToField(abytes(seed, lengths.seed, 'seed'), Fn.ORDER);
        }
        /**
         * Computes public key for a secret key. Checks for validity of the secret key.
         * @param isCompressed - whether to return compact (default), or full key
         * @returns Public key, full when isCompressed=false; short when isCompressed=true
         */
        function getPublicKey(secretKey, isCompressed) {
          if (isCompressed === void 0) {
            isCompressed = true;
          }
          return Point.BASE.multiply(Fn.fromBytes(secretKey)).toBytes(isCompressed);
        }
        /**
         * Quick and dirty check for item being public key. Does not validate hex, or being on-curve.
         */
        function isProbPub(item) {
          var secretKey = lengths.secretKey,
            publicKey = lengths.publicKey,
            publicKeyUncompressed = lengths.publicKeyUncompressed;
          var allowedLengths = Fn._lengths;
          if (!isBytes(item)) return undefined;
          var l = abytes(item, undefined, 'key').length;
          var isPub = l === publicKey || l === publicKeyUncompressed;
          var isSec = l === secretKey || !!(allowedLengths != null && allowedLengths.includes(l));
          // P-521 accepts both 65- and 66-byte secret keys, so overlapping lengths stay ambiguous.
          if (isPub && isSec) return undefined;
          return isPub;
        }
        /**
         * ECDH (Elliptic Curve Diffie Hellman).
         * Computes encoded shared point from secret key A and public key B.
         * Checks: 1) secret key validity 2) shared key is on-curve.
         * Does NOT hash the result or expose the SEC 1 x-coordinate-only `z`.
         * Returns the encoded shared point on purpose: callers that need `x_P`
         * can derive it from the encoded point, but `x_P` alone cannot recover the
         * point/parity back.
         * This helper only exposes the fully validated public-key path, not cofactor DH.
         * @param isCompressed - whether to return compact (default), or full key
         * @returns shared point encoding
         */
        function getSharedSecret(secretKeyA, publicKeyB, isCompressed) {
          if (isCompressed === void 0) {
            isCompressed = true;
          }
          if (isProbPub(secretKeyA) === true) throw new Error('first arg must be private key');
          if (isProbPub(publicKeyB) === false) throw new Error('second arg must be public key');
          var s = Fn.fromBytes(secretKeyA);
          var b = Point.fromBytes(publicKeyB); // checks for being on-curve
          return b.multiply(s).toBytes(isCompressed);
        }
        var utils = {
          isValidSecretKey: isValidSecretKey,
          isValidPublicKey: isValidPublicKey,
          randomSecretKey: randomSecretKey
        };
        var keygen = createKeygen(randomSecretKey, getPublicKey);
        Object.freeze(utils);
        Object.freeze(lengths);
        return Object.freeze({
          getPublicKey: getPublicKey,
          getSharedSecret: getSharedSecret,
          keygen: keygen,
          Point: Point,
          utils: utils,
          lengths: lengths
        });
      }
      /**
       * Creates ECDSA signing interface for given elliptic curve `Point` and `hash` function.
       *
       * @param Point - created using {@link weierstrass} function
       * @param hash - used for 1) message prehash-ing 2) k generation in `sign`, using hmac_drbg(hash)
       * @param ecdsaOpts - rarely needed, see {@link ECDSAOpts}:
       *   - `lowS`: Default low-S policy.
       *   - `hmac`: HMAC implementation used by RFC6979 DRBG.
       *   - `randomBytes`: Optional RNG override.
       *   - `bits2int`: Optional hash-to-int conversion override.
       *   - `bits2int_modN`: Optional hash-to-int-mod-n conversion override.
       *
       * @returns ECDSA helper namespace.
       * @example
       * Create an ECDSA signer/verifier bundle for one curve implementation.
       *
       * ```ts
       * import { ecdsa } from '@noble/curves/abstract/weierstrass.js';
       * import { p256 } from '@noble/curves/nist.js';
       * import { sha256 } from '@noble/hashes/sha2.js';
       * const p256ecdsa = ecdsa(p256.Point, sha256);
       * const { secretKey, publicKey } = p256ecdsa.keygen();
       * const msg = new TextEncoder().encode('hello noble');
       * const sig = p256ecdsa.sign(msg, secretKey);
       * const isValid = p256ecdsa.verify(sig, msg, publicKey);
       * ```
       */
      function ecdsa(Point, hash, ecdsaOpts) {
        if (ecdsaOpts === void 0) {
          ecdsaOpts = {};
        }
        // Custom hash / bits2int hooks are treated as pure functions over validated caller-owned bytes.
        var hash_ = hash;
        ahash(hash_);
        validateObject(ecdsaOpts, {}, {
          hmac: 'function',
          lowS: 'boolean',
          randomBytes: 'function',
          bits2int: 'function',
          bits2int_modN: 'function'
        });
        ecdsaOpts = Object.assign({}, ecdsaOpts);
        var randomBytes$1 = ecdsaOpts.randomBytes === undefined ? randomBytes : ecdsaOpts.randomBytes;
        var hmac$1 = ecdsaOpts.hmac === undefined ? function (key, msg) {
          return hmac(hash_, key, msg);
        } : ecdsaOpts.hmac;
        var Fp = Point.Fp,
          Fn = Point.Fn;
        var CURVE_ORDER = Fn.ORDER,
          fnBits = Fn.BITS;
        var _ecdh = ecdh(Point, ecdsaOpts),
          keygen = _ecdh.keygen,
          getPublicKey = _ecdh.getPublicKey,
          getSharedSecret = _ecdh.getSharedSecret,
          utils = _ecdh.utils,
          lengths = _ecdh.lengths;
        var defaultSigOpts = {
          prehash: true,
          lowS: typeof ecdsaOpts.lowS === 'boolean' ? ecdsaOpts.lowS : true,
          format: 'compact',
          extraEntropy: false
        };
        // SEC 1 4.1.6 public-key recovery tries x = r + jn for j = 0..h. Our recovered-signature
        // format only stores one overflow bit, so it can only distinguish q.x = r from q.x = r + n.
        // A third lift would have the form q.x = r + 2n. Since valid ECDSA r is in 1..n-1, the
        // smallest such lift is 1 + 2n, not 2n.
        var hasLargeRecoveryLifts = CURVE_ORDER * _2n + _1n < Fp.ORDER;
        function isBiggerThanHalfOrder(number) {
          var HALF = CURVE_ORDER >> _1n;
          return number > HALF;
        }
        function validateRS(title, num) {
          if (!Fn.isValidNot0(num)) throw new Error("invalid signature " + title + ": out of range 1..Point.Fn.ORDER");
          return num;
        }
        function assertRecoverableCurve() {
          // ECDSA recovery only supports curves where the current recovery id can distinguish
          // q.x = r and q.x = r + n; larger lifts may need additional `r + n*i` branches.
          // SEC 1 4.1.6 recovers candidates via x = r + jn, but this format only encodes j = 0 or 1.
          // The next possible candidate is q.x = r + 2n, and its smallest valid value is 1 + 2n.
          // To easily get i, we either need to:
          // a. increase amount of valid recid values (4, 5...); OR
          // b. prohibit recovered signatures for those curves.
          if (hasLargeRecoveryLifts) throw new Error('"recovered" sig type is not supported for cofactor >2 curves');
        }
        function validateSigLength(bytes, format) {
          validateSigFormat(format);
          var size = lengths.signature;
          var sizer = format === 'compact' ? size : format === 'recovered' ? size + 1 : undefined;
          return abytes(bytes, sizer);
        }
        /**
         * ECDSA signature with its (r, s) properties. Supports compact, recovered & DER representations.
         */
        var Signature = /*#__PURE__*/function () {
          function Signature(r, s, recovery) {
            this.r = void 0;
            this.s = void 0;
            this.recovery = void 0;
            this.r = validateRS('r', r); // r in [1..N-1];
            this.s = validateRS('s', s); // s in [1..N-1];
            if (recovery != null) {
              assertRecoverableCurve();
              if (![0, 1, 2, 3].includes(recovery)) throw new Error('invalid recovery id');
              this.recovery = recovery;
            }
            Object.freeze(this);
          }
          Signature.fromBytes = function fromBytes(bytes, format) {
            if (format === void 0) {
              format = defaultSigOpts.format;
            }
            validateSigLength(bytes, format);
            var recid;
            if (format === 'der') {
              var _DER$toSig = DER.toSig(abytes(bytes)),
                _r = _DER$toSig.r,
                _s = _DER$toSig.s;
              return new Signature(_r, _s);
            }
            if (format === 'recovered') {
              recid = bytes[0];
              format = 'compact';
              bytes = bytes.subarray(1);
            }
            var L = lengths.signature / 2;
            var r = bytes.subarray(0, L);
            var s = bytes.subarray(L, L * 2);
            return new Signature(Fn.fromBytes(r), Fn.fromBytes(s), recid);
          };
          Signature.fromHex = function fromHex(hex, format) {
            return this.fromBytes(hexToBytes(hex), format);
          };
          var _proto2 = Signature.prototype;
          _proto2.assertRecovery = function assertRecovery() {
            var recovery = this.recovery;
            if (recovery == null) throw new Error('invalid recovery id: must be present');
            return recovery;
          };
          _proto2.addRecoveryBit = function addRecoveryBit(recovery) {
            return new Signature(this.r, this.s, recovery);
          }
          // Unlike the top-level helper below, this method expects a digest that has
          // already been hashed to the curve's message representative.
          ;

          _proto2.recoverPublicKey = function recoverPublicKey(messageHash) {
            var r = this.r,
              s = this.s;
            var recovery = this.assertRecovery();
            var radj = recovery === 2 || recovery === 3 ? r + CURVE_ORDER : r;
            if (!Fp.isValid(radj)) throw new Error('invalid recovery id: sig.r+curve.n != R.x');
            var x = Fp.toBytes(radj);
            var R = Point.fromBytes(concatBytes(pprefix((recovery & 1) === 0), x));
            var ir = Fn.inv(radj); // r^-1
            var h = bits2int_modN(abytes(messageHash, undefined, 'msgHash')); // Truncate hash
            var u1 = Fn.create(-h * ir); // -hr^-1
            var u2 = Fn.create(s * ir); // sr^-1
            // (sr^-1)R-(hr^-1)G = -(hr^-1)G + (sr^-1). unsafe is fine: there is no private data.
            var Q = Point.BASE.multiplyUnsafe(u1).add(R.multiplyUnsafe(u2));
            if (Q.is0()) throw new Error('invalid recovery: point at infinify');
            Q.assertValidity();
            return Q;
          }
          // Signatures should be low-s, to prevent malleability.
          ;

          _proto2.hasHighS = function hasHighS() {
            return isBiggerThanHalfOrder(this.s);
          };
          _proto2.toBytes = function toBytes(format) {
            if (format === void 0) {
              format = defaultSigOpts.format;
            }
            validateSigFormat(format);
            if (format === 'der') return hexToBytes(DER.hexFromSig(this));
            var r = this.r,
              s = this.s;
            var rb = Fn.toBytes(r);
            var sb = Fn.toBytes(s);
            if (format === 'recovered') {
              assertRecoverableCurve();
              return concatBytes(Uint8Array.of(this.assertRecovery()), rb, sb);
            }
            return concatBytes(rb, sb);
          };
          _proto2.toHex = function toHex(format) {
            return bytesToHex(this.toBytes(format));
          };
          return Signature;
        }();
        Object.freeze(Signature.prototype);
        Object.freeze(Signature);
        // RFC6979: ensure ECDSA msg is X bytes and < N. RFC suggests optional truncating via bits2octets.
        // FIPS 186-4 4.6 suggests the leftmost min(nBitLen, outLen) bits, which matches bits2int.
        // bits2int can produce res>N, we can do mod(res, N) since the bitLen is the same.
        // int2octets can't be used; pads small msgs with 0: unacceptatble for trunc as per RFC vectors
        var bits2int = ecdsaOpts.bits2int === undefined ? function bits2int_def(bytes) {
          // Our custom check "just in case", for protection against DoS
          if (bytes.length > 8192) throw new Error('input is too large');
          // For curves with nBitLength % 8 !== 0: bits2octets(bits2octets(m)) !== bits2octets(m)
          // for some cases, since bytes.length * 8 is not actual bitLength.
          var num = bytesToNumberBE(bytes); // check for == u8 done here
          var delta = bytes.length * 8 - fnBits; // truncate to nBitLength leftmost bits
          return delta > 0 ? num >> BigInt(delta) : num;
        } : ecdsaOpts.bits2int;
        var bits2int_modN = ecdsaOpts.bits2int_modN === undefined ? function bits2int_modN_def(bytes) {
          return Fn.create(bits2int(bytes)); // can't use bytesToNumberBE here
        } : ecdsaOpts.bits2int_modN;
        var ORDER_MASK = bitMask(fnBits);
        // Pads output with zero as per spec.
        /** Converts to bytes. Checks if num in `[0..ORDER_MASK-1]` e.g.: `[0..2^256-1]`. */
        function int2octets(num) {
          aInRange('num < 2^' + fnBits, num, _0n, ORDER_MASK);
          return Fn.toBytes(num);
        }
        function validateMsgAndHash(message, prehash) {
          abytes(message, undefined, 'message');
          return prehash ? abytes(hash_(message), undefined, 'prehashed message') : message;
        }
        /**
         * Steps A, D of RFC6979 3.2.
         * Creates RFC6979 seed; converts msg/privKey to numbers.
         * Used only in sign, not in verify.
         *
         * Warning: we cannot assume here that message has same amount of bytes as curve order,
         * this will be invalid at least for P521. Also it can be bigger for P224 + SHA256.
         */
        function prepSig(message, secretKey, opts) {
          var _validateSigOpts = validateSigOpts(opts, defaultSigOpts),
            lowS = _validateSigOpts.lowS,
            prehash = _validateSigOpts.prehash,
            extraEntropy = _validateSigOpts.extraEntropy;
          message = validateMsgAndHash(message, prehash); // RFC6979 3.2 A: h1 = H(m)
          // We can't later call bits2octets, since nested bits2int is broken for curves
          // with fnBits % 8 !== 0. Because of that, we unwrap it here as int2octets call.
          // const bits2octets = (bits) => int2octets(bits2int_modN(bits))
          var h1int = bits2int_modN(message);
          var d = Fn.fromBytes(secretKey); // validate secret key, convert to bigint
          if (!Fn.isValidNot0(d)) throw new Error('invalid private key');
          var seedArgs = [int2octets(d), int2octets(h1int)];
          // extraEntropy. RFC6979 3.6: additional k' (optional).
          if (extraEntropy != null && extraEntropy !== false) {
            // K = HMAC_K(V || 0x00 || int2octets(x) || bits2octets(h1) || k')
            // gen random bytes OR pass as-is
            var e = extraEntropy === true ? randomBytes$1(lengths.secretKey) : extraEntropy;
            seedArgs.push(abytes(e, undefined, 'extraEntropy')); // check for being bytes
          }

          var seed = concatBytes.apply(void 0, seedArgs); // Step D of RFC6979 3.2
          var m = h1int; // no need to call bits2int second time here, it is inside truncateHash!
          // Converts signature params into point w r/s, checks result for validity.
          // To transform k => Signature:
          // q = k⋅G
          // r = q.x mod n
          // s = k^-1(m + rd) mod n
          // Can use scalar blinding b^-1(bm + bdr) where b ∈ [1,q−1] according to
          // https://tches.iacr.org/index.php/TCHES/article/view/7337/6509. We've decided against it:
          // a) dependency on CSPRNG b) 15% slowdown c) doesn't really help since bigints are not CT
          function k2sig(kBytes) {
            // RFC 6979 Section 3.2, step 3: k = bits2int(T)
            // Important: all mod() calls here must be done over N
            var k = bits2int(kBytes); // Cannot use fields methods, since it is group element
            if (!Fn.isValidNot0(k)) return; // Valid scalars (including k) must be in 1..N-1
            var ik = Fn.inv(k); // k^-1 mod n
            var q = Point.BASE.multiply(k).toAffine(); // q = k⋅G
            var r = Fn.create(q.x); // r = q.x mod n
            if (r === _0n) return;
            var s = Fn.create(ik * Fn.create(m + r * d)); // s = k^-1(m + rd) mod n
            if (s === _0n) return;
            var recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n); // recovery bit (2 or 3 when q.x>n)
            var normS = s;
            if (lowS && isBiggerThanHalfOrder(s)) {
              normS = Fn.neg(s); // if lowS was passed, ensure s is always in the bottom half of N
              recovery ^= 1;
            }
            return new Signature(r, normS, hasLargeRecoveryLifts ? undefined : recovery);
          }
          return {
            seed: seed,
            k2sig: k2sig
          };
        }
        /**
         * Signs a message or message hash with a secret key.
         * With the default `prehash: true`, raw message bytes are hashed internally;
         * only `{ prehash: false }` expects a caller-supplied digest.
         *
         * ```
         * sign(m, d) where
         *   k = rfc6979_hmac_drbg(m, d)
         *   (x, y) = G × k
         *   r = x mod n
         *   s = (m + dr) / k mod n
         * ```
         */
        function sign(message, secretKey, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _prepSig = prepSig(message, secretKey, opts),
            seed = _prepSig.seed,
            k2sig = _prepSig.k2sig; // Steps A, D of RFC6979 3.2.
          var drbg = createHmacDrbg(hash_.outputLen, Fn.BYTES, hmac$1);
          var sig = drbg(seed, k2sig); // Steps B, C, D, E, F, G
          return sig.toBytes(opts.format);
        }
        /**
         * Verifies a signature against message and public key.
         * Rejects lowS signatures by default: see {@link ECDSAVerifyOpts}.
         * Implements section 4.1.4 from https://www.secg.org/sec1-v2.pdf:
         *
         * ```
         * verify(r, s, h, P) where
         *   u1 = hs^-1 mod n
         *   u2 = rs^-1 mod n
         *   R = u1⋅G + u2⋅P
         *   mod(R.x, n) == r
         * ```
         */
        function verify(signature, message, publicKey, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _validateSigOpts2 = validateSigOpts(opts, defaultSigOpts),
            lowS = _validateSigOpts2.lowS,
            prehash = _validateSigOpts2.prehash,
            format = _validateSigOpts2.format;
          publicKey = abytes(publicKey, undefined, 'publicKey');
          message = validateMsgAndHash(message, prehash);
          if (!isBytes(signature)) {
            var end = signature instanceof Signature ? ', use sig.toBytes()' : '';
            throw new Error('verify expects Uint8Array signature' + end);
          }
          validateSigLength(signature, format); // execute this twice because we want loud error
          try {
            var sig = Signature.fromBytes(signature, format);
            var P = Point.fromBytes(publicKey);
            if (lowS && sig.hasHighS()) return false;
            var r = sig.r,
              s = sig.s;
            var h = bits2int_modN(message); // mod n, not mod p
            var is = Fn.inv(s); // s^-1 mod n
            var u1 = Fn.create(h * is); // u1 = hs^-1 mod n
            var u2 = Fn.create(r * is); // u2 = rs^-1 mod n
            var R = Point.BASE.multiplyUnsafe(u1).add(P.multiplyUnsafe(u2)); // u1⋅G + u2⋅P
            if (R.is0()) return false;
            var v = Fn.create(R.x); // v = r.x mod n
            return v === r;
          } catch (e) {
            return false;
          }
        }
        function recoverPublicKey(signature, message, opts) {
          if (opts === void 0) {
            opts = {};
          }
          // Top-level recovery mirrors `sign()` / `verify()`: it hashes raw message
          // bytes first unless the caller passes `{ prehash: false }`.
          var _validateSigOpts3 = validateSigOpts(opts, defaultSigOpts),
            prehash = _validateSigOpts3.prehash;
          message = validateMsgAndHash(message, prehash);
          return Signature.fromBytes(signature, 'recovered').recoverPublicKey(message).toBytes();
        }
        return Object.freeze({
          keygen: keygen,
          getPublicKey: getPublicKey,
          getSharedSecret: getSharedSecret,
          utils: utils,
          lengths: lengths,
          Point: Point,
          sign: sign,
          verify: verify,
          recoverPublicKey: recoverPublicKey,
          Signature: Signature,
          hash: hash_
        });
      }
    }
  };
});

System.register("chunks:///_virtual/writer_buffer.js", ['./cjs-loader.mjs', './writer.js', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1, __cjsMetaURL$2;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = BufferWriter;

        // extends Writer
        var Writer = require("./writer");
        (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
        var util = require("./util/minimal");

        /**
         * Constructs a new buffer writer instance.
         * @classdesc Wire format writer using node buffers.
         * @extends Writer
         * @constructor
         */
        function BufferWriter() {
          Writer.call(this);
        }
        BufferWriter._configure = function () {
          /**
           * Allocates a buffer of the specified size.
           * @function
           * @param {number} size Buffer size
           * @returns {Buffer} Buffer
           */
          BufferWriter.alloc = util._Buffer_allocUnsafe;
          BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
            buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
            // also works for plain array values
          }
          /* istanbul ignore next */ : function writeBytesBuffer_copy(val, buf, pos) {
            if (val.copy)
              // Buffer values
              val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;)
            // plain array values
            buf[pos++] = val[i++];
          };
        };

        /**
         * @override
         */
        BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
          if (util.isString(value)) value = util._Buffer_from(value, "base64");
          var len = value.length >>> 0;
          this.uint32(len);
          if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
          return this;
        };
        function writeStringBuffer(val, buf, pos) {
          if (val.length < 40)
            // plain js is faster for short strings (probably due to redundant assertions)
            util.utf8.write(val, buf, pos);else if (buf.utf8Write) buf.utf8Write(val, pos);else buf.write(val, pos);
        }

        /**
         * @override
         */
        BufferWriter.prototype.string = function write_string_buffer(value) {
          var len = util.Buffer.byteLength(value);
          this.uint32(len);
          if (len) this._push(writeStringBuffer, len, value);
          return this;
        };

        /**
         * Finishes the write operation.
         * @name BufferWriter#finish
         * @function
         * @returns {Buffer} Finished buffer
         */

        BufferWriter._configure();

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './writer': __cjsMetaURL$1,
          './util/minimal': __cjsMetaURL$2
        };
      });
    }
  };
});

System.register("chunks:///_virtual/writer.js", ['./cjs-loader.mjs', './minimal2.js'], function (exports, module) {
  var loader, __cjsMetaURL$1;
  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        module.exports = Writer;
        var util = require("./util/minimal");
        var BufferWriter; // cyclic

        var LongBits = util.LongBits,
          base64 = util.base64,
          utf8 = util.utf8;

        /**
         * Constructs a new writer operation instance.
         * @classdesc Scheduled writer operation.
         * @constructor
         * @param {function(*, Uint8Array, number)} fn Function to call
         * @param {number} len Value byte length
         * @param {*} val Value to write
         * @ignore
         */
        function Op(fn, len, val) {
          /**
           * Function to call.
           * @type {function(Uint8Array, number, *)}
           */
          this.fn = fn;

          /**
           * Value byte length.
           * @type {number}
           */
          this.len = len;

          /**
           * Next operation.
           * @type {Writer.Op|undefined}
           */
          this.next = undefined;

          /**
           * Value to write.
           * @type {*}
           */
          this.val = val; // type varies
        }

        /* istanbul ignore next */
        function noop() {} // eslint-disable-line no-empty-function

        /**
         * Constructs a new writer state instance.
         * @classdesc Copied writer state.
         * @memberof Writer
         * @constructor
         * @param {Writer} writer Writer to copy state from
         * @ignore
         */
        function State(writer) {
          /**
           * Current head.
           * @type {Writer.Op}
           */
          this.head = writer.head;

          /**
           * Current tail.
           * @type {Writer.Op}
           */
          this.tail = writer.tail;

          /**
           * Current buffer length.
           * @type {number}
           */
          this.len = writer.len;

          /**
           * Next state.
           * @type {State|null}
           */
          this.next = writer.states;
        }

        /**
         * Constructs a new writer instance.
         * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
         * @constructor
         */
        function Writer() {
          /**
           * Current length.
           * @type {number}
           */
          this.len = 0;

          /**
           * Operations head.
           * @type {Object}
           */
          this.head = new Op(noop, 0, 0);

          /**
           * Operations tail
           * @type {Object}
           */
          this.tail = this.head;

          /**
           * Linked forked states.
           * @type {Object|null}
           */
          this.states = null;

          // When a value is written, the writer calculates its byte length and puts it into a linked
          // list of operations to perform when finish() is called. This both allows us to allocate
          // buffers of the exact required size and reduces the amount of work we have to do compared
          // to first calculating over objects and then encoding over objects. In our case, the encoding
          // part is just a linked list walk calling operations with already prepared values.
        }

        var create = function create() {
          return util.Buffer ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
              return new BufferWriter();
            })();
          }
          /* istanbul ignore next */ : function create_array() {
            return new Writer();
          };
        };

        /**
         * Creates a new writer.
         * @function
         * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
         */
        Writer.create = create();

        /**
         * Allocates a buffer of the specified size.
         * @param {number} size Buffer size
         * @returns {Uint8Array} Buffer
         */
        Writer.alloc = function alloc(size) {
          return new util.Array(size);
        };

        // Use Uint8Array buffer pool in the browser, just like node does with buffers
        /* istanbul ignore else */
        if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

        /**
         * Pushes a new operation to the queue.
         * @param {function(Uint8Array, number, *)} fn Function to call
         * @param {number} len Value byte length
         * @param {number} val Value to write
         * @returns {Writer} `this`
         * @private
         */
        Writer.prototype._push = function push(fn, len, val) {
          this.tail = this.tail.next = new Op(fn, len, val);
          this.len += len;
          return this;
        };
        function writeByte(val, buf, pos) {
          buf[pos] = val & 255;
        }
        function writeVarint32(val, buf, pos) {
          while (val > 127) {
            buf[pos++] = val & 127 | 128;
            val >>>= 7;
          }
          buf[pos] = val;
        }

        /**
         * Constructs a new varint writer operation instance.
         * @classdesc Scheduled varint writer operation.
         * @extends Op
         * @constructor
         * @param {number} len Value byte length
         * @param {number} val Value to write
         * @ignore
         */
        function VarintOp(len, val) {
          this.len = len;
          this.next = undefined;
          this.val = val;
        }
        VarintOp.prototype = Object.create(Op.prototype);
        VarintOp.prototype.fn = writeVarint32;

        /**
         * Writes an unsigned 32 bit value as a varint.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.uint32 = function write_uint32(value) {
          // here, the call to this.push has been inlined and a varint specific Op subclass is used.
          // uint32 is by far the most frequently used operation and benefits significantly from this.
          this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
          return this;
        };

        /**
         * Writes a signed 32 bit value as a varint.
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.int32 = function write_int32(value) {
          return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
          : this.uint32(value);
        };

        /**
         * Writes a 32 bit value as a varint, zig-zag encoded.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.sint32 = function write_sint32(value) {
          return this.uint32((value << 1 ^ value >> 31) >>> 0);
        };
        function writeVarint64(val, buf, pos) {
          while (val.hi) {
            buf[pos++] = val.lo & 127 | 128;
            val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
            val.hi >>>= 7;
          }
          while (val.lo > 127) {
            buf[pos++] = val.lo & 127 | 128;
            val.lo = val.lo >>> 7;
          }
          buf[pos++] = val.lo;
        }

        /**
         * Writes an unsigned 64 bit value as a varint.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.uint64 = function write_uint64(value) {
          var bits = LongBits.from(value);
          return this._push(writeVarint64, bits.length(), bits);
        };

        /**
         * Writes a signed 64 bit value as a varint.
         * @function
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.int64 = Writer.prototype.uint64;

        /**
         * Writes a signed 64 bit value as a varint, zig-zag encoded.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.sint64 = function write_sint64(value) {
          var bits = LongBits.from(value).zzEncode();
          return this._push(writeVarint64, bits.length(), bits);
        };

        /**
         * Writes a boolish value as a varint.
         * @param {boolean} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.bool = function write_bool(value) {
          return this._push(writeByte, 1, value ? 1 : 0);
        };
        function writeFixed32(val, buf, pos) {
          buf[pos] = val & 255;
          buf[pos + 1] = val >>> 8 & 255;
          buf[pos + 2] = val >>> 16 & 255;
          buf[pos + 3] = val >>> 24;
        }

        /**
         * Writes an unsigned 32 bit value as fixed 32 bits.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.fixed32 = function write_fixed32(value) {
          return this._push(writeFixed32, 4, value >>> 0);
        };

        /**
         * Writes a signed 32 bit value as fixed 32 bits.
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.sfixed32 = Writer.prototype.fixed32;

        /**
         * Writes an unsigned 64 bit value as fixed 64 bits.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.fixed64 = function write_fixed64(value) {
          var bits = LongBits.from(value);
          return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
        };

        /**
         * Writes a signed 64 bit value as fixed 64 bits.
         * @function
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.sfixed64 = Writer.prototype.fixed64;

        /**
         * Writes a float (32 bit).
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype["float"] = function write_float(value) {
          return this._push(util["float"].writeFloatLE, 4, value);
        };

        /**
         * Writes a double (64 bit float).
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype["double"] = function write_double(value) {
          return this._push(util["float"].writeDoubleLE, 8, value);
        };
        var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
          buf.set(val, pos); // also works for plain array values
        }
        /* istanbul ignore next */ : function writeBytes_for(val, buf, pos) {
          for (var i = 0; i < val.length; ++i) buf[pos + i] = val[i];
        };

        /**
         * Writes a sequence of bytes.
         * @param {Uint8Array|string} value Buffer or base64 encoded string to write
         * @returns {Writer} `this`
         */
        Writer.prototype.bytes = function write_bytes(value) {
          var len = value.length >>> 0;
          if (!len) return this._push(writeByte, 1, 0);
          if (util.isString(value)) {
            var buf = Writer.alloc(len = base64.length(value));
            base64.decode(value, buf, 0);
            value = buf;
          }
          return this.uint32(len)._push(writeBytes, len, value);
        };

        /**
         * Writes a string.
         * @param {string} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.string = function write_string(value) {
          var len = utf8.length(value);
          return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
        };

        /**
         * Forks this writer's state by pushing it to a stack.
         * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
         * @returns {Writer} `this`
         */
        Writer.prototype.fork = function fork() {
          this.states = new State(this);
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
          return this;
        };

        /**
         * Resets this instance to the last state.
         * @returns {Writer} `this`
         */
        Writer.prototype.reset = function reset() {
          if (this.states) {
            this.head = this.states.head;
            this.tail = this.states.tail;
            this.len = this.states.len;
            this.states = this.states.next;
          } else {
            this.head = this.tail = new Op(noop, 0, 0);
            this.len = 0;
          }
          return this;
        };

        /**
         * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
         * @returns {Writer} `this`
         */
        Writer.prototype.ldelim = function ldelim() {
          var head = this.head,
            tail = this.tail,
            len = this.len;
          this.reset().uint32(len);
          if (len) {
            this.tail.next = head.next; // skip noop
            this.tail = tail;
            this.len += len;
          }
          return this;
        };

        /**
         * Finishes the write operation.
         * @returns {Uint8Array} Finished buffer
         */
        Writer.prototype.finish = function finish() {
          var head = this.head.next,
            // skip noop
            buf = this.constructor.alloc(this.len),
            pos = 0;
          while (head) {
            head.fn(head.val, buf, pos);
            pos += head.len;
            head = head.next;
          }
          // this.head = this.tail = null;
          return buf;
        };
        Writer._configure = function (BufferWriter_) {
          BufferWriter = BufferWriter_;
          Writer.create = create();
          BufferWriter._configure();
        };

        // #endregion ORIGINAL CODE

        module.exports;
      }, function () {
        return {
          './util/minimal': __cjsMetaURL$1
        };
      });
    }
  };
});

} }; });