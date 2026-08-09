module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHADER_VARIANT_DEFAULT",
    ()=>SHADER_VARIANT_DEFAULT,
    "features",
    ()=>features
]);
const features = {
    smoothScroll: true
};
const SHADER_VARIANT_DEFAULT = "candy";
}),
"[project]/lib/shader-variants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHADER_VARIANTS",
    ()=>SHADER_VARIANTS,
    "getVariantById",
    ()=>getVariantById
]);
const rgb = (r, g, b)=>[
        r,
        g,
        b
    ];
const SHADER_VARIANTS = [
    {
        id: "warm",
        label: "Warm",
        description: "Coral, peach, golden",
        swatch: "#ff945e",
        hero: {
            base: rgb(0.10, 0.00, 0.00),
            warm: rgb(0.90, 0.10, 0.10),
            mid: rgb(0.60, 0.50, 0.10),
            cool: rgb(0.10, 0.35, 0.45),
            cursor: rgb(0.18, 0.06, 0.02),
            rgScale: rgb(0.825, 0.825, 1.0),
            brightness: 2.5
        },
        wave: [
            rgb(1.00, 0.32, 0.42),
            rgb(1.00, 0.58, 0.38),
            rgb(1.00, 0.82, 0.38),
            rgb(0.70, 0.62, 1.00),
            rgb(0.45, 0.72, 1.00)
        ]
    },
    {
        id: "mono",
        label: "Mono",
        description: "Charcoal to silver, no hue",
        swatch: "#8a8a8a",
        hero: {
            base: rgb(0.02, 0.02, 0.03),
            warm: rgb(0.38, 0.38, 0.42),
            mid: rgb(0.18, 0.18, 0.22),
            cool: rgb(0.55, 0.55, 0.60),
            cursor: rgb(0.06, 0.06, 0.08),
            rgScale: rgb(1.0, 1.0, 1.0),
            brightness: 1.5
        },
        wave: [
            rgb(0.06, 0.06, 0.08),
            rgb(0.20, 0.20, 0.24),
            rgb(0.38, 0.38, 0.42),
            rgb(0.58, 0.58, 0.62),
            rgb(0.76, 0.76, 0.80)
        ]
    },
    {
        id: "twilight",
        label: "Twilight",
        description: "Cyan, magenta, and violet",
        swatch: "#7d4dff",
        hero: {
            base: rgb(0.02, 0.02, 0.10),
            warm: rgb(0.10, 0.85, 0.80),
            mid: rgb(0.85, 0.20, 0.65),
            cool: rgb(0.35, 0.20, 0.75),
            cursor: rgb(0.16, 0.04, 0.14),
            rgScale: rgb(1.0, 1.0, 1.0),
            brightness: 1.9
        },
        wave: [
            rgb(0.20, 0.85, 0.85),
            rgb(0.45, 0.95, 0.70),
            rgb(0.95, 0.40, 0.80),
            rgb(0.65, 0.30, 0.95),
            rgb(0.30, 0.45, 0.95)
        ]
    },
    {
        id: "coffee",
        label: "Coffee",
        description: "Espresso, caramel, milk",
        swatch: "#7a4a22",
        hero: {
            base: rgb(0.025, 0.015, 0.005),
            warm: rgb(0.15, 0.085, 0.04),
            mid: rgb(0.22, 0.13, 0.06),
            cool: rgb(0.27, 0.18, 0.10),
            cursor: rgb(0.08, 0.04, 0.015),
            rgScale: rgb(1.0, 1.0, 1.0),
            brightness: 2.5
        },
        wave: [
            rgb(0.165, 0.078, 0.031),
            rgb(0.290, 0.157, 0.094),
            rgb(0.431, 0.247, 0.118),
            rgb(0.541, 0.333, 0.188),
            rgb(0.659, 0.416, 0.243)
        ]
    },
    {
        id: "royal",
        label: "Royal",
        description: "Royal blue, petrol, and teal",
        swatch: "#2960e0",
        hero: {
            base: rgb(0.005, 0.012, 0.030),
            warm: rgb(0.064, 0.152, 0.352),
            mid: rgb(0.040, 0.220, 0.248),
            cool: rgb(0.024, 0.140, 0.116),
            cursor: rgb(0.008, 0.028, 0.045),
            rgScale: rgb(1.0, 1.0, 1.0),
            brightness: 2.5
        },
        wave: [
            rgb(0.040, 0.080, 0.220),
            rgb(0.140, 0.300, 0.620),
            rgb(0.080, 0.480, 0.620),
            rgb(0.060, 0.500, 0.420),
            rgb(0.080, 0.420, 0.300)
        ]
    },
    {
        id: "candy",
        label: "Candy",
        description: "Mauve, lilac, and soft pink",
        swatch: "#cc66cc",
        hero: {
            base: rgb(0.10, 0.04, 0.10),
            warm: rgb(0.80, 0.40, 0.80),
            mid: rgb(0.42, 0.18, 0.42),
            cool: rgb(0.95, 0.72, 0.95),
            cursor: rgb(0.10, 0.04, 0.10),
            rgScale: rgb(1.0, 0.85, 1.0),
            brightness: 2.0
        },
        wave: [
            rgb(0.102, 0.039, 0.102),
            rgb(0.420, 0.176, 0.420),
            rgb(0.800, 0.400, 0.800),
            rgb(0.949, 0.722, 0.949),
            rgb(1.000, 0.839, 1.000)
        ]
    }
];
const VARIANT_MAP = new Map(SHADER_VARIANTS.map((v)=>[
        v.id,
        v
    ]));
function getVariantById(id) {
    if (id && VARIANT_MAP.has(id)) return VARIANT_MAP.get(id);
    return SHADER_VARIANTS[0];
}
}),
"[project]/components/shader-variant-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShaderVariantProvider",
    ()=>ShaderVariantProvider,
    "useShaderVariant",
    ()=>useShaderVariant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shader$2d$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shader-variants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ShaderVariantContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ShaderVariantProvider({ children }) {
    const [variantId, setVariantIdState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHADER_VARIANT_DEFAULT"]);
    const setVariantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setVariantIdState(id);
    }, []);
    const variant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shader$2d$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVariantById"])(variantId), [
        variantId
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            variant,
            variantId,
            setVariantId
        }), [
        variant,
        variantId,
        setVariantId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderVariantContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/shader-variant-context.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
function useShaderVariant() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ShaderVariantContext);
    if (ctx) return ctx;
    return {
        variant: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shader$2d$variants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVariantById"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHADER_VARIANT_DEFAULT"]),
        variantId: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHADER_VARIANT_DEFAULT"],
        setVariantId: ()=>{}
    };
}
}),
"[project]/components/smooth-scroll.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScroll",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const LENIS_OPTIONS = {
    // Framerate-unabhängiges Lerp fühlt sich direkter an als duration-basiert.
    // 0.08 = träge/floaty … 0.15 = sehr direkt. 0.1 ist ein guter Mittelwert.
    lerp: 0.075,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
};
const ANCHOR_OFFSET = -100;
function SmoothScroll({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["features"].smoothScroll) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](LENIS_OPTIONS);
        // Ein einziger rAF-Loop: GSAP-Ticker treibt Lenis, Lenis aktualisiert
        // ScrollTrigger. So bleiben gepinnte Sektionen (Value-Prop) synchron und
        // ruckelfrei, statt gegen einen zweiten rAF-Loop zu laufen.
        lenis.on("scroll", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
        const update = (time)=>{
            lenis.raf(time * 1000);
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(update);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.lagSmoothing(0);
        function handleAnchorClick(event) {
            const target = event.target;
            if (!(target instanceof Element)) return;
            const anchor = target.closest('a[href^="#"]');
            if (!anchor) return;
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const element = document.querySelector(href);
            if (!element || !(element instanceof HTMLElement)) return;
            event.preventDefault();
            lenis.scrollTo(element, {
                offset: ANCHOR_OFFSET
            });
        }
        document.addEventListener("click", handleAnchorClick);
        return ()=>{
            document.removeEventListener("click", handleAnchorClick);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(update);
            lenis.off("scroll", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
            lenis.destroy();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/lib/motion.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionDiv",
    ()=>MotionDiv,
    "MotionSection",
    ()=>MotionSection,
    "ReducedMotionProvider",
    ()=>ReducedMotionProvider,
    "StaggerContainer",
    ()=>StaggerContainer,
    "StaggerItem",
    ()=>StaggerItem,
    "defaultTransition",
    ()=>defaultTransition,
    "fadeIn",
    ()=>fadeIn,
    "fadeInDown",
    ()=>fadeInDown,
    "fadeInUp",
    ()=>fadeInUp,
    "reducedMotionVariants",
    ()=>reducedMotionVariants,
    "scaleIn",
    ()=>scaleIn,
    "springTransition",
    ()=>springTransition,
    "staggerContainer",
    ()=>staggerContainer,
    "useReducedMotion",
    ()=>useReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function subscribeToReducedMotion(callback) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    return ()=>mediaQuery.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
    return false;
}
const ReducedMotionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(false);
function useReducedMotion() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ReducedMotionContext);
}
function ReducedMotionProvider({ children }) {
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribeToReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReducedMotionContext.Provider, {
        value: prefersReducedMotion,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/motion.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
const fadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
};
const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0
    }
};
const fadeInDown = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible: {
        opacity: 1,
        y: 0
    }
};
const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        scale: 1
    }
};
const staggerContainer = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const reducedMotionVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
};
const defaultTransition = {
    duration: 0.3,
    ease: [
        0.4,
        0,
        0.2,
        1
    ]
};
const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
};
function MotionDiv({ variants = fadeInUp, children, className, ...props }) {
    const prefersReducedMotion = useReducedMotion();
    const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
    const activeTransition = prefersReducedMotion ? {
        duration: 0.01
    } : defaultTransition;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: "hidden",
        animate: "visible",
        variants: activeVariants,
        transition: activeTransition,
        className: className,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/motion.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
function MotionSection({ variants = fadeInUp, children, className, ...props }) {
    const prefersReducedMotion = useReducedMotion();
    const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
    const activeTransition = prefersReducedMotion ? {
        duration: 0.01
    } : defaultTransition;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
        initial: "hidden",
        animate: "visible",
        variants: activeVariants,
        transition: activeTransition,
        className: className,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/motion.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
function StaggerContainer({ children, className, ...props }) {
    const prefersReducedMotion = useReducedMotion();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: "hidden",
        animate: "visible",
        variants: prefersReducedMotion ? reducedMotionVariants : staggerContainer,
        className: className,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/motion.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
function StaggerItem({ children, className, ...props }) {
    const prefersReducedMotion = useReducedMotion();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: prefersReducedMotion ? reducedMotionVariants : fadeInUp,
        className: className,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/motion.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shader$2d$variant$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shader-variant-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$smooth$2d$scroll$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/smooth-scroll.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$motion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/motion.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$motion$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReducedMotionProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionConfig"], {
                reducedMotion: "user",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shader$2d$variant$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderVariantProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$smooth$2d$scroll$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SmoothScroll"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/providers.tsx",
                        lineNumber: 21,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/providers.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/providers.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/providers.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/providers.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/intro.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markIntroDone",
    ()=>markIntroDone,
    "useIntroDone",
    ()=>useIntroDone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
let done = false;
const listeners = new Set();
function markIntroDone() {
    if (done) return;
    done = true;
    listeners.forEach((listener)=>listener());
}
function subscribe(callback) {
    listeners.add(callback);
    return ()=>{
        listeners.delete(callback);
    };
}
function useIntroDone() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, ()=>done, ()=>false);
}
}),
"[project]/components/theme-switch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeSwitch",
    ()=>ThemeSwitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intro$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intro.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function useIsMounted() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(()=>()=>{}, ()=>true, ()=>false);
}
function ThemeSwitch() {
    const mounted = useIsMounted();
    const introDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intro$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIntroDone"])();
    const { setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    // Während des Ladens ausblenden
    if (!introDone) return null;
    const toggleTheme = ()=>{
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-6 right-6 z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "h-14 w-14 cursor-not-allowed rounded-full bg-foreground/10 opacity-30",
                "aria-label": "Toggle theme",
                disabled: true
            }, void 0, false, {
                fileName: "[project]/components/theme-switch.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/theme-switch.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    const isDark = resolvedTheme === "dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-6 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: toggleTheme,
            className: "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-background text-foreground opacity-80 shadow-lg ring-1 ring-border transition-opacity duration-300 hover:opacity-100 hover:shadow-xl",
            "aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
            "aria-pressed": isDark,
            type: "button",
            children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: "h-6 w-6",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/theme-switch.tsx",
                lineNumber: 52,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "h-6 w-6",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/theme-switch.tsx",
                lineNumber: 54,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/theme-switch.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/theme-switch.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1fc9e68d._.js.map