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
const APP_LOGO = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'OurSpace';
  const body = payload.notification?.body || payload.data?.body || 'Ada pesan baru untukmu';

  self.registration.showNotification(title, {
    body: body,
    icon: APP_LOGO,
    badge: APP_LOGO,
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
