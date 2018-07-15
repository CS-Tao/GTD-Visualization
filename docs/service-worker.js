/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a9af1bd92f71f861634a97edf3c48897"
  },
  {
    "url": "assets/css/0.styles.081b5ad4.css",
    "revision": "9a66de9b40cda8162949ed770d63a729"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.84530a1a.js",
    "revision": "43dc2ef023695aaf58ca52285856b7fd"
  },
  {
    "url": "assets/js/2.9be45cc7.js",
    "revision": "6a0337fbe1c5383747f25bd96b92215a"
  },
  {
    "url": "assets/js/3.4351d019.js",
    "revision": "fdf33912532110894dc98cad16f53213"
  },
  {
    "url": "assets/js/4.2224d40e.js",
    "revision": "4c45b0b6d052688fc307c5bb70fcf3e6"
  },
  {
    "url": "assets/js/5.6a2ab716.js",
    "revision": "6415f3ac220879787c5b05ae6b642fae"
  },
  {
    "url": "assets/js/6.304f3546.js",
    "revision": "fa152571770eb4658c0aab039b6e6bce"
  },
  {
    "url": "assets/js/app.4d1d5dbb.js",
    "revision": "3cc6949d90070a9a48bd35132c6d7077"
  },
  {
    "url": "framework/index.html",
    "revision": "ea303e73e2f17447020c46b00bc25d6f"
  },
  {
    "url": "hero.png",
    "revision": "9e03f90f1f2350c3d4fa27e0a5a10112"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "af07c5fbb109d70dbff414c0b3693344"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "preview/gif.html",
    "revision": "a75bd3a62635003e66afb5d9f9339b95"
  },
  {
    "url": "preview/index.html",
    "revision": "67b44994fb4d9bdab2615a6277e0eac1"
  },
  {
    "url": "tools/index.html",
    "revision": "5c8013ff52a42e023d5401713e0b8be5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
