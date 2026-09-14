const CACHE='english-hub-v3-rebuild-3-1-0';
const ASSETS=[
 './','./index.html',
 './css/styles.css','./css/builder.css','./css/pilot.css','./css/rebuild.css',
 './js/foundation.js','./js/curriculum-a.js','./js/curriculum-b.js','./js/curriculum.js','./js/content.js',
 './js/config.js','./js/database.js','./js/validators.js','./js/metrics.js',
 './js/adaptive-engine.js','./js/practice-bank.js','./js/b2-extended.js',
 './js/mastery-engine.js','./js/content-rebuild.js','./js/session-engine.js',
 './js/exercise-renderer.js','./js/app.js',
 './manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
