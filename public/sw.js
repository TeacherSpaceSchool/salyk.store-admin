if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return a[s]||(e=new Promise((async e=>{if("document"in self){const a=document.createElement("script");a.src=s,document.head.appendChild(a),a.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!a[s])throw new Error(`Module ${s} didn’t register its module`);return a[s]}))},e=(e,a)=>{Promise.all(e.map(s)).then((s=>a(1===s.length?s[0]:s)))},a={require:Promise.resolve(e)};self.define=(e,i,n)=>{a[e]||(a[e]=Promise.resolve().then((()=>{let a={};const t={uri:location.origin+e.slice(1)};return Promise.all(i.map((e=>{switch(e){case"exports":return a;case"module":return t;default:return s(e)}}))).then((s=>{const e=n(...s);return a.default||(a.default=e),a}))})))}}define("./sw.js",["./workbox-46a6f152"],(function(s){"use strict";importScripts("/sw-push-listener.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/192x192.png",revision:"20a4794eaa47a97446f83f5f4b257bae"},{url:"/512x512.png",revision:"3e9a2c6cdebf8050ce76db16f871acd9"},{url:"/Robots.txt",revision:"04220ee36329258a88a8c9a045993637"},{url:"/_next/static/chunks/099eb732228f7ccd2db48bde0fb91de0a1028859.290486ed3a1e1a2762d9.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/13.39f2272f42173ee46c65.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/31ffd385128090e7ff3d11c017e4c34c908c2682.3cc2053d6f3e3d537f51.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/3d95ac000d6d5da2ea6ad680027c620fb265d584.6f4f666fa00116ae0469.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/44f33f1fa6dee449be588e74c5ac16b85ffbac9f.2cda68342d7b498e1cdd.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/5ff275371f77ea7d1f478cf2d9330d0e8493f9b9.3b76ae96bea022a4dfca.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/623ba7d13a36ba006a972273da7196a0f3d2ce6a.f0ecf71462650cc736d1.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/ad6919fc631dc6e8bbe786e735e4e16804c81967.ee1cb7632df0216c3000.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/ad7f724d.04a09f777298fd1a2859.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/ae6055a5.daab04b49a53233b29d8.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/b18b711953543fc0c94f247590b027533126c003.0093eb04c049fd679965.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/commons.4555739b44914526c668.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/d5a6ecc9801588bae072f8d431cb4b5e9d53ad5b.1c3b8188cdffcb05ec7e.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/dc61105acfb1ec41f4c7b36bd7558120a7b6fcec.195a6880699415a940a2.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/eed7972724d43adb12563caf542996a00f7e3333.55ecb3d6144e04f783c8.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/f13d14c8cdf10f60fcebe9695d3030c93b41189c.ab04aa9ad39dc130002f.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/framework.8683c114909ee93ee89f.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/main-77207deb833b85a26912.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/_app-8bcdcd737203ac14a017.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/_error-173859ef034705ac8adb.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/applicationaddcategorys-7a483fc78fce1e1f1816.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/blog-5a0776d822f391becb20.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/branch/%5Bid%5D-f6b91fa90414c4eacb03.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/branchs-976a108e843c2eb8b120.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/branchs/%5Bid%5D-049ed4cb1ed14388cd14.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/cashbox/%5Bid%5D-014bbabe8665e2c0c550.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/cashboxes-53957dfad7e7d98fe223.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/cashboxes/%5Bid%5D-31a81e0c8ae47b38f1c4.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/category-ab8129fb1146e6743ae0.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/client/%5Bid%5D-241154d3a721619505ea.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/clients-0500c1b74e501bf16b53.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/clients/%5Bid%5D-6a0f19ed3a206048df4c.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/connectionapplications-7c2bf423648e6ebb3341.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/consignations-6e45b4307926eb50ab24.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/consignations/%5Bid%5D-6cb33e99e26410bb6d6c.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/contact-87067a5d16039a4e7a70.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/deposithistory/%5Bid%5D-35c3ad36d787b26dc7c6.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/deposithistorys-e1e35e0f04d2c6a98e40.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/deposithistorys/%5Bid%5D-45f249129c29c8634f9b.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/district/%5Bid%5D-723fa5c7492798b1ce06.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/districts-b2a40c4ee2f85bcd4a12.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/districts/%5Bid%5D-032545121fa48570736c.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/faq-270a76d1d42536c72a78.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/index-8efd51f5b608507c03af.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/item/%5Bid%5D-7b81f30e8aefbaf2f859.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/items-9dc2f1ab56451a7b9c01.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/items/%5Bid%5D-85acf3d498b58a412b62.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/legalobject/%5Bid%5D-a05ec5170fb3d0e92b03.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/legalobjects-0d0f517125dceb63ec83.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/payment/%5Bid%5D-54ccb1d6d5f36b3b5ab7.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/payment/failure-2b2e507004c677e4c00a.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/payment/receipt/%5Bid%5D-6212f5e23afb79ae27fa.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/payment/success-82c13d3267493c3186a4.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/payments-ca402a52d0429684a6ac.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/prepayments-fe2b4f4aa0fe918bdc91.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/prepayments/%5Bid%5D-e1bbe5dc0b8fddf6a970.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/report/%5Bid%5D-f20523e30114e4db6b3f.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/reports-b505221df349399ed2bf.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/reports/%5Bid%5D-3cb33a75f9b112d1fd34.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/reviews-178788850f59e35a1337.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/sale/%5Bid%5D-eee2f57ea656e12464f7.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/salenew-bd4b199bf0b192617532.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/sales-66982ed975a09448628a.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/sales/%5Bid%5D-dcee21976440708cae77.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/scanner-66849ad33deb027e3aa7.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic-0bbbe58fffd4c05f22e5.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/checkintegrity-15dc00dd3c1652181ec5.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/errors-ad0edfe08bb8d008c0ad.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/files-6666c6e3c1462b20302e.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/integration/%5Bid%5D-fda332a82a9e02ea9595.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/integrations-348a95af83d9b9bd00c1.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/itembarcodes-327cffce6b9b0dabcac8.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/notificationstatistic-ae57cdb705c812645092.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticexpiredworkshifts-4069d2e07098457d0caa.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticintegration-c73d1a9e77da59d0b21a.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticpayment-f05194d9fb96f12ea71c.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticsale-4af7b7507499e0bf3f69.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticstoragesize-3e1d829629120967063f.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/statisticsynckkm-2c48d7aa8956de685ea3.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/sync-eb00dc12742567569fc6.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/tariffs-5e545a5ccd70f73f80e2.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/trash-636a893d4a22de01638d.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/uploadingclients-6e5722c71e024dba7d96.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/uploadingdistricts-4bb4f448977f333cc36d.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/statistic/uploadingitems-77c3f2a76e948e890be4.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-ae557b65614bed2cca3d.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/users-bcb2e85857e44c0c6296.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/users/%5Bid%5D-09f1414d63af5e8fc5e0.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/withdrawhistory/%5Bid%5D-46b37d18eebbbf5d3f67.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/withdrawhistorys-0e4d9c260985490cd06f.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/withdrawhistorys/%5Bid%5D-5b8423928905b74e037d.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/workshift/%5Bid%5D-f766590f5ab892f99f9b.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/workshifts-60abbe5b54e3eeb521df.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/pages/workshifts/%5Bid%5D-0e257bb896cb5330031b.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/polyfills-26808775dbe4f1e86a7d.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/chunks/webpack-9f1121a94da5d136c9e3.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/css/76cf515a361f1a1b9790.css",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/n5L5VFZKI8vFfRWYhNBa2/_buildManifest.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/_next/static/n5L5VFZKI8vFfRWYhNBa2/_ssgManifest.js",revision:"n5L5VFZKI8vFfRWYhNBa2"},{url:"/add.png",revision:"55251e1d4d78651b1c5eca6ecea6d0c4"},{url:"/alert.mp3",revision:"594e6e429f66513a2bc759fce6c1abc7"},{url:"/facebook.svg",revision:"d3d5088f6491df12be40d840fcc12e2d"},{url:"/favicon.ico",revision:"d76f53ca59dc633c6be752d76d0fc2b4"},{url:"/instagram.svg",revision:"bb3fda5c6302b48820cdb70cbec5c4c4"},{url:"/manifest.json",revision:"dd5010a3ec55d2e50d8b8059ad7be55b"},{url:"/privet/12123.png",revision:"4a36b8b5ad2671f8a04847e7918017f9"},{url:"/privet/avatar.png",revision:"16b55af55e228324f7e15df72cd18458"},{url:"/privet/bar-chart.png",revision:"5cfac60e51db1c95de89e6b611870098"},{url:"/privet/cloud-network (1).png",revision:"376f0982d81f9bd96b76ce9279eb7843"},{url:"/privet/global-network.png",revision:"8d8fc1c7565e537a4de8e1c329f8a4aa"},{url:"/privet/globe (1).png",revision:"b785b8f203a035f9d1837b6161afe03e"},{url:"/privet/integration (1).png",revision:"a4477930068b85f3efc820a80cd651e6"},{url:"/privet/lock.png",revision:"1eb654041b2fcd53ed5e81a9034ca6b3"},{url:"/privet/mail.png",revision:"30f675ad8c87abd0bb24e82143cf531a"},{url:"/privet/man-in-suit-and-tie.png",revision:"78550622a9d53b2f8c258f46db547f2a"},{url:"/privet/phone-call.png",revision:"512d593c2807579f3815247fc1aca160"},{url:"/privet/phone.png",revision:"bd0233db4fdbf44edd59de0a88325496"},{url:"/privet/settings.png",revision:"55d7c4ba2162e9efe342ba8e0a1dcda2"},{url:"/privet/shield.png",revision:"baed1e41678a5ca03ea676d7ae917b44"},{url:"/salyk-scanner.apk",revision:"ad0fd020e365ee614526d46deeeac37a"},{url:"/sitemap.xml",revision:"54a2f42e80c3c13a638f08d5d1297ee2"},{url:"/telegram.svg",revision:"a1994736ad75ab94e8733fe148b6e44e"},{url:"/twitter.svg",revision:"4f41a9846006dbe195ddcf426c32c502"},{url:"sw-push-listener.js",revision:"n5L5VFZKI8vFfRWYhNBa2"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^http?.*\/images\/.*/,new s.NetworkOnly,"GET"),s.registerRoute(/^https?.*/,new s.NetworkFirst({cacheName:"cache",plugins:[new s.ExpirationPlugin({maxAgeSeconds:432e3,purgeOnQuotaError:!0})]}),"GET")}));
