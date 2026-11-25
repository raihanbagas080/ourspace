importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

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

const OURSPACE_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23f43f5e'/%3E%3Cstop offset='100%25' stop-color='%23db2777'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='512' height='512' rx='112' fill='url(%23g)'/%3E%3Cpath d='M256 408s-132-84-132-184c0-48 38-84 82-84 28 0 50 15 50 15s22-15 50-15c44 0 82 36 82 84 0 100-132 184-132 184z' fill='%23ffffff'/%3E%3C/svg%3E";
const OURSPACE_BADGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cpath d='M48 82S16 61 16 37c0-11 9-20 20-20 7 0 12 4 12 4s5-4 12-4c11 0 20 9 20 20 0 24-32 45-32 45z' fill='%23ffffff'/%3E%3C/svg%3E";

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'OurSpace';
  const body = payload.notification?.body || payload.data?.body || 'Ada pesan baru untukmu';

  self.registration.showNotification(title, {
    body: body,
    icon: OURSPACE_ICON,
    badge: OURSPACE_BADGE,
    tag: 'ourspace-msg',
    renotify: true,
    vibrate: [150, 80, 150],
    data: { url: '/' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
