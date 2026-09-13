import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drop the `x-powered-by: Next.js` response header. It advertises the stack
  // to scanners and buys nothing in return.
  poweredByHeader: false,

  images: {
    // The site serves large local photographs from `public/`. WebP alone keeps
    // the optimizer's work (and the build cache) small; adding AVIF would
    // roughly double encode time for a modest extra saving on these files.
    formats: ["image/webp"],

    // As of Next 16 `qualities` defaults to `[75]` and is an allowlist: any
    // `quality` passed to `next/image` that is not listed here is coerced to
    // the nearest allowed value. 75 is the everyday default; 90 exists for the
    // photographs, where compression artefacts are actually visible.
    qualities: [75, 90],

    // Stated explicitly rather than inherited: 14400 (4 hours) is the Next 16
    // default, lowered from the 60-day default of earlier versions. There is no
    // way to invalidate the optimizer cache, so keeping it short is deliberate.
    minimumCacheTTL: 14400,

    // `deviceSizes` / `imageSizes` are left at their defaults. Note that the
    // Next 16 `imageSizes` default no longer includes 16 (it now starts at 32);
    // nothing here renders images that small, so the default is fine.
    //
    // Not set: `unoptimized`. Optimization stays on so that when the plain
    // `<img>` tags are migrated to `next/image` they benefit immediately.
    // Also note `priority` is deprecated in Next 16 in favour of `preload`.
  },

  // Baseline security headers on every response.
  //
  // Deliberately no Content-Security-Policy: this site loads Vercel Analytics
  // and Speed Insights plus Google Fonts, and a CSP that has not been tested
  // against all of them breaks the page silently in production.
  //
  // Note: Next.js sets `Cache-Control: public, max-age=31536000, immutable` on
  // its own hashed build assets and that header cannot be overridden here.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Stop browsers from MIME-sniffing a response into something other
            // than the declared Content-Type.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Send the full URL to same-origin requests, origin-only when
            // crossing origins, and nothing at all when downgrading to HTTP.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Legacy clickjacking defence for browsers without CSP
            // `frame-ancestors`. Same-origin framing stays allowed.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // A static personal site needs none of these capabilities, so deny
            // them outright rather than leaving them to the browser default.
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
