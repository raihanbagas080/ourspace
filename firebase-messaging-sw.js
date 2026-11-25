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

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes('ourspace-ecru.vercel.app') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://ourspace-ecru.vercel.app');
      }
    })
  );
});
