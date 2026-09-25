(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 87610, e => {
    "use strict";
    e.i(43517);
    var t = e.i(94119),
        i = e.i(73077),
        o = e.i(99836);
    e.i(52077);
    var r = e.i(70887),
        n = e.i(37561),
        l = e.i(21367),
        a = e.i(2368),
        s = e.i(32611),
        c = e.i(53196),
        u = e.i(20665),
        h = e.i(95937),
        f = e.i(12769),
        d = e.i(75609),
        p = e.i(69577);
    let m = new r.Vector3(0, 1, 0),
        g = (e, t, i, o, r) => e.set(i.x, 0, i.y).addScaledVector(o, t.right).addScaledVector(r, t.up),
        v = e => {
            let {
                configRef: t,
                scrollYProgress: i,
                authoringRef: n
            } = e, l = (0, f.useThree)(e => e.camera), a = (0, f.useThree)(e => e.events.connected), s = (0, f.useThree)(e => e.gl.domElement), c = (0, p.useIsPointerInsideRef)(a instanceof HTMLElement ? a : s), u = (0, o.useMemo)(() => ({
                target: new r.Vector3,
                offset: new r.Vector3,
                right: new r.Vector3,
                up: new r.Vector3,
                keyframe: new r.Vector3,
                pointer: new r.Vector2
            }), []);
            return (0, h.useFrame)((e, o) => {
                var a, s, h, f, p, v, C;
                let x, M;
                if (!(l instanceof r.PerspectiveCamera)) return;
                let w = n.current;
                if (w && w.isFreeCamera) return;
                let y = t.current,
                    S = y.camera,
                    T = r.MathUtils.clamp(i.get(), 0, 1),
                    L = T * (y.models.length - 1),
                    A = r.MathUtils.clamp(Math.floor(L), 0, Math.max(y.models.length - 2, 0)),
                    R = y.models[A];
                if (!R) return;
                let O = R.camera,
                    P = null != (a = y.models[A + 1]) ? a : R,
                    F = P.camera,
                    b = r.MathUtils.smoothstep(L - A, 0, 1);
                s = u.offset, h = S.heading + S.headingDrift * (T - .5), f = S.pitch, x = r.MathUtils.degToRad(h), M = r.MathUtils.degToRad(f), s.set(Math.cos(M) * Math.sin(x), Math.sin(M), Math.cos(M) * Math.cos(x)).negate(), p = u.right, v = u.up, C = u.offset, p.crossVectors(m, C).normalize(), v.crossVectors(C, p);
                let V = g(u.target, O.offset, R.position, u.right, u.up),
                    j = g(u.keyframe, F.offset, P.position, u.right, u.up);
                V.lerp(j, b);
                let I = r.MathUtils.lerp(O.viewHeight, F.viewHeight, b);
                u.offset.multiplyScalar((0, d.cameraDistance)(I, S.fieldOfView)), l.fov !== S.fieldOfView && (l.fov = S.fieldOfView, l.updateProjectionMatrix());
                let _ = c.current;
                u.pointer.set(r.MathUtils.damp(u.pointer.x, _ ? e.pointer.x : 0, S.pointer.ease, o), r.MathUtils.damp(u.pointer.y, _ ? e.pointer.y : 0, S.pointer.ease, o)), u.offset.applyAxisAngle(m, -u.pointer.x * r.MathUtils.degToRad(S.pointer.yaw)), u.offset.applyAxisAngle(u.right, -u.pointer.y * r.MathUtils.degToRad(S.pointer.pitch)), l.position.copy(u.target).add(u.offset), l.lookAt(u.target), w && (w.cameraView.target.copy(u.target), w.cameraView.viewHeight = I)
            }), null
        };
    var C = e.i(65675);
    let x = /#([0-9a-f]{6})([0-9a-f]{2})?\b/i,
        M = /\bnoline\b/i,
        w = e => {
            let {
                material: t
            } = e;
            return Array.isArray(t) ? t.some(e => M.test(e.name)) : M.test(t.name)
        },
        y = new r.Plane(new r.Vector3(0, 1, 0), 0),
        S = C.FLOOR_SIZE / 2,
        T = {
            frustum: new r.Frustum,
            matrix: new r.Matrix4,
            sphere: new r.Sphere,
            builtAt: -1
        },
        L = new r.Vector3,
        A = new r.Vector3,
        R = new r.Quaternion,
        O = e => {
            e.decompose(A, R, L);
            let t = Math.abs(L.x * L.y * L.z);
            return t < Number.EPSILON || Math.abs(e.determinant()) / t < 1e-6
        },
        P = new r.Vector3,
        F = "\n  #define MAX_TRAIL ".concat(C.MAX_TRAIL, "\n\n  uniform float uTileSize;\n  uniform float uLineWidth;\n  uniform float uPixelRatio;\n  uniform vec3 uFloorColor;\n  uniform vec3 uLineColor;\n  uniform vec3 uHighlightLineColor;\n  uniform vec2 uTrailCells[MAX_TRAIL];\n  uniform float uTrailStrengths[MAX_TRAIL];\n\n  varying vec2 vWorldPosition;\n\n  void main() {\n    vec2 cell = vWorldPosition / uTileSize;\n    vec2 perPixel = fwidth(cell);\n\n    // Derivatives are per device pixel, so scale the width back into CSS pixels\n    float width = uLineWidth * 0.5 * uPixelRatio;\n\n    // Distance to the nearest gridline of each family, in device pixels\n    vec2 distanceToLine = abs(fract(cell - 0.5) - 0.5) / perPixel;\n    float line = 1.0 - min(min(distanceToLine.x, distanceToLine.y) / width, 1.0);\n\n    // Each recently-crossed tile keeps its own outline, drawn heavier than the\n    // lattice and decaying with age. Clamped to the cell's four sides, and\n    // combined with max() so shared edges don't double-darken\n    float highlight = 0.0;\n\n    for (int i = 0; i < MAX_TRAIL; i++) {\n      float strength = uTrailStrengths[i];\n      if (strength <= 0.001) continue;\n\n      // Cheap reject — most fragments miss every cell\n      vec2 local = cell - uTrailCells[i];\n      if (local.x < -0.5 || local.x > 1.5 || local.y < -0.5 || local.y > 1.5) {\n        continue;\n      }\n\n      vec2 toSide = min(abs(local), abs(local - 1.0)) / perPixel;\n      vec2 within = step(0.0, local) * step(local, vec2(1.0));\n      float borderDistance = min(\n        mix(1e6, toSide.x, within.y),\n        mix(1e6, toSide.y, within.x)\n      );\n\n      highlight = max(highlight, (1.0 - min(borderDistance / width, 1.0)) * strength);\n    }\n\n    vec3 color = mix(uFloorColor, uLineColor, line);\n    color = mix(color, uHighlightLineColor, highlight);\n\n    gl_FragColor = vec4(color, 1.0);\n\n    // Linear to output space. Built-in materials get this chunk for free; a raw\n    // 'ShaderMaterial' does not, and renders darker than the hex it was given\n    #include <colorspace_fragment>\n  }\n"),
        b = e => {
            let {
                configRef: i
            } = e, n = (0, o.useRef)(!1), l = (0, o.useMemo)(() => {
                let {
                    floor: e
                } = i.current;
                return {
                    uTileSize: {
                        value: e.tileSize
                    },
                    uLineWidth: {
                        value: e.lineWidth
                    },
                    uHighlightLineColor: {
                        value: new r.Color(e.highlightLineColor)
                    },
                    uPixelRatio: {
                        value: 1
                    },
                    uFloorColor: {
                        value: new r.Color(e.floorColor)
                    },
                    uLineColor: {
                        value: new r.Color(e.lineColor)
                    },
                    uTrailCells: {
                        value: new Float32Array(2 * C.MAX_TRAIL)
                    },
                    uTrailStrengths: {
                        value: new Float32Array(C.MAX_TRAIL)
                    }
                }
            }, [i]), a = (0, o.useMemo)(() => new r.ShaderMaterial({
                uniforms: l,
                vertexShader: "\n  varying vec2 vWorldPosition;\n\n  void main() {\n    vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n    vWorldPosition = worldPosition.xz;\n    gl_Position = projectionMatrix * viewMatrix * worldPosition;\n  }\n",
                fragmentShader: F,
                transparent: !0,
                polygonOffset: !0,
                polygonOffsetFactor: 2,
                polygonOffsetUnits: 2
            }), [l]);
            (0, u.useCleanupEffect)(() => a.dispose(), [a]);
            let s = (0, o.useRef)({
                floorColor: "",
                lineColor: "",
                highlightLineColor: ""
            });
            return (0, h.useFrame)((e, t) => {
                n.current && (e => {
                    let t = (e.raycaster.setFromCamera(e.pointer, e.camera), !e.raycaster.ray.intersectPlane(y, P) || Math.abs(P.x) > S || Math.abs(P.z) > S) ? null : P;
                    if (!t) return;
                    let {
                        floor: o
                    } = i.current, n = Math.floor(t.x / o.tileSize), a = Math.floor(t.z / o.tileSize), s = l.uTrailCells.value, c = l.uTrailStrengths.value;
                    if (s[0] === n && s[1] === a) return;
                    let u = r.MathUtils.clamp(Math.round(o.trailLength), 1, C.MAX_TRAIL);
                    s.copyWithin(2, 0, (u - 1) * 2), c.copyWithin(1, 0, u - 1), s[0] = n, s[1] = a, c[0] = 0, c[1] = 1, c.fill(0, u)
                })(e);
                let {
                    floor: o
                } = i.current;
                l.uTileSize.value = o.tileSize, l.uLineWidth.value = o.lineWidth, l.uPixelRatio.value = e.viewport.dpr;
                let a = s.current;
                a.floorColor !== o.floorColor && (a.floorColor = o.floorColor, l.uFloorColor.value.set(o.floorColor)), a.lineColor !== o.lineColor && (a.lineColor = o.lineColor, l.uLineColor.value.set(o.lineColor)), a.highlightLineColor !== o.highlightLineColor && (a.highlightLineColor = o.highlightLineColor, l.uHighlightLineColor.value.set(o.highlightLineColor));
                let c = l.uTrailStrengths.value;
                for (let e = 0; e < C.MAX_TRAIL; e++) {
                    var u;
                    let i = 0 === e && n.current ? 1 : 0,
                        l = null != (u = c[e]) ? u : 0,
                        a = r.MathUtils.damp(l, i, o.highlightEase, t);
                    c[e] = a
                }
            }), (0, t.jsxs)("mesh", {
                "rotation-x": -Math.PI / 2,
                onPointerEnter: () => {
                    n.current = !0
                },
                onPointerLeave: () => {
                    n.current = !1
                },
                children: [(0, t.jsx)("planeGeometry", {
                    args: [C.FLOOR_SIZE, C.FLOOR_SIZE]
                }), (0, t.jsx)("primitive", {
                    object: a,
                    attach: "material"
                })]
            })
        };
    var V = e.i(70225),
        j = e.i(50061),
        I = e.i(84458),
        _ = e.i(88976);
    let U = e => {
            let {
                url: i,
                index: n,
                configRef: a,
                shading: c
            } = e, {
                scene: f,
                animations: d
            } = (0, j.useGLTF)(i), p = (0, o.useMemo)(() => {
                let e = (0, I.clone)(f);
                return (0, s.applyToonShadingMaterial)(e, c, e => {
                    let {
                        color: t,
                        opacity: i
                    } = (e => {
                        var t;
                        let [, i, o] = null != (t = e.match(x)) ? t : [];
                        return {
                            color: i ? "#".concat(i) : null,
                            opacity: o ? parseInt(o, 16) / 255 : 1
                        }
                    })(e.name);
                    return {
                        name: e.name,
                        color: null != t ? t : e.color,
                        opacity: i,
                        transparent: i < 1,
                        depthWrite: i >= 1,
                        polygonOffset: !0,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1
                    }
                }), (0, _.mergeModel)(e, {
                    clips: d,
                    groupBy: e => w(e) ? "noline" : "line",
                    skip: (e, t) => O(t)
                }), (0, l.assignOutlineScreenSpaceIds)(e, w), e
            }, [f, d, c]);
            (0, u.useCleanupEffect)(() => {
                (0, s.disposeToonShadingMaterial)(p), (0, _.disposeMergedGeometry)(p)
            }, [p]);
            let {
                actions: m
            } = (0, V.useAnimations)(d, p);
            (0, o.useEffect)(() => {
                let [e] = Object.values(m);
                e && e.reset().play()
            }, [m]);
            let g = (0, o.useMemo)(() => {
                let e;
                return p.updateMatrixWorld(!0), e = new r.Box3, p.traverse(t => {
                    !(t instanceof r.Mesh) || O(t.matrixWorld) || e.expandByObject(t)
                }), e.isEmpty() ? 0 : -e.min.y
            }, [p]);
            return (0, h.useFrame)(e => {
                let t = a.current.models[n];
                if (!t) return;
                p.position.set(t.position.x, g, t.position.y);
                let i = ((e, t) => {
                    let {
                        sphere: i
                    } = T;
                    return i.center.copy(t), i.radius = C.CULL_RADIUS, (T.builtAt !== e.clock.elapsedTime && (T.builtAt = e.clock.elapsedTime, T.matrix.multiplyMatrices(e.camera.projectionMatrix, e.camera.matrixWorldInverse), T.frustum.setFromProjectionMatrix(T.matrix)), T.frustum).intersectsSphere(i)
                })(e, p.position);
                for (let e in p.visible = i, m) {
                    let t = m[e];
                    t && (t.paused = !i)
                }
            }), (0, t.jsx)("primitive", {
                object: p
            })
        },
        E = e => {
            let {
                viewport: i,
                scrollYProgress: r
            } = e, n = (0, o.useRef)((0, C.resolveFactoryConfigBasedOnViewport)(i)), c = (0, o.useRef)(i), h = (0, o.useRef)(null), f = (0, o.useMemo)(() => (0, l.createOutlineScreenSpace)((0, C.toOutlinePassConfig)(n.current.outline)), []), d = (0, o.useMemo)(() => (0, s.createToonShading)(C.FACTORY_CONFIG.shading), []);
            return c.current !== i && (c.current = i, n.current = (0, C.resolveFactoryConfigBasedOnViewport)(i), (0, l.updateOutlineScreenSpaceViaConfig)(f, (0, C.toOutlinePassConfig)(n.current.outline))), (0, u.useCleanupEffect)(() => (0, l.disposeOutlineScreenSpace)(f), [f]), (0, t.jsxs)(t.Fragment, {
                children: [null, (0, t.jsx)(b, {
                    configRef: n
                }), (0, t.jsx)(a.OutlineScreenSpacePass, {
                    outline: f
                }), (0, t.jsx)("primitive", {
                    object: d.light
                }), C.FACTORY_CONFIG.models.map((e, i) => (0, t.jsx)(U, {
                    url: e.url,
                    index: i,
                    configRef: n,
                    shading: d
                }, i)), (0, t.jsx)(v, {
                    configRef: n,
                    scrollYProgress: r,
                    authoringRef: h
                })]
            })
        };
    e.s(["Scene", 0, e => {
        let o, l, a, s, u = (0, i.c)(8),
            {
                containerRef: h,
                scrollYProgress: f
            } = e,
            d = (0, c.useViewport)();
        return null === d ? null : (u[0] === Symbol.for("react.memo_cache_sentinel") ? (o = {
            fov: C.FACTORY_CONFIG.camera.fieldOfView,
            near: C.NEAR_PLANE,
            far: C.FAR_PLANE
        }, l = {
            toneMapping: r.NoToneMapping,
            alpha: !0,
            antialias: !1
        }, u[0] = o, u[1] = l) : (o = u[0], l = u[1]), u[2] !== f || u[3] !== d ? (a = (0, t.jsx)(E, {
            viewport: d,
            scrollYProgress: f
        }), u[2] = f, u[3] = d, u[4] = a) : a = u[4], u[5] !== h || u[6] !== a ? (s = (0, t.jsx)(n.SceneCanvas, {
            containerRef: h,
            camera: o,
            gl: l,
            children: a
        }), u[5] = h, u[6] = a, u[7] = s) : s = u[7], s)
    }], 87610)
}, 86338, e => {
    e.n(e.i(87610))
}]);