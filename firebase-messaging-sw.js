importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

firebase.initializeApp({
  apiKey: "AIzaSyByUZl_n0H65j2MPT7R1GOE2YB_zH9RbXc",
  authDomain: "our-space-aad66.firebaseapp.com",
  databaseURL: "https://our-space-aad66-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "our-space-aad66",
  storageBucket: "our-space-aad66.firebasestorage.app",
  messagingSenderId: "1091560854681",
  appId: "1:1091560854681:web:e4d98d6758e834ceed9408"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'OurSpace';
  const body = payload.notification?.body || payload.data?.body || '';
  return self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/badge-96.png',
    vibrate: [200, 100, 200]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
