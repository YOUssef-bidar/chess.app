const C="owl-chess-v1";
const FILES=["./","index.html","manifest.json","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin&&u.hostname!=="cdnjs.cloudflare.com")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n;
  }).catch(()=>caches.match("index.html"))));
});
