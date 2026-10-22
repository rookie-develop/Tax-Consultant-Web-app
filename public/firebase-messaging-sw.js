/* Firebase Cloud Messaging Service Worker */
/* ARSCA Tax Consultant Portal - Background Push Notifications */

importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

try {
  // Read configuration passed via registration URL query parameters
  var urlParams = new URLSearchParams(self.location.search);
  var firebaseConfig = {
    apiKey: urlParams.get('apiKey') || '',
    authDomain: urlParams.get('authDomain') || '',
    projectId: urlParams.get('projectId') || '',
    storageBucket: urlParams.get('storageBucket') || '',
    messagingSenderId: urlParams.get('messagingSenderId') || '',
    appId: urlParams.get('appId') || '',
  };

  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    var messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      console.log('[firebase-messaging-sw.js] Background notification received:', payload);

      var title =
        (payload.notification && payload.notification.title) ||
        (payload.data && payload.data.title) ||
        'ARSCA Tax Alert';

      var body =
        (payload.notification && payload.notification.body) ||
        (payload.data && payload.data.body) ||
        'Important compliance reminder from ARSCA Tax Consultants.';

      var options = {
        body: body,
        icon: (payload.notification && payload.notification.icon) || '/icons/launchericon-192x192.png',
        badge: '/icons/launchericon-192x192.png',
        data: {
          url: (payload.data && payload.data.url) || (payload.fcmOptions && payload.fcmOptions.link) || '/',
        },
      };

      return self.registration.showNotification(title, options);
    });
  } else {
    console.info('[firebase-messaging-sw.js] Service worker active, awaiting config parameters.');
  }
} catch (e) {
  console.warn('[firebase-messaging-sw.js] Background messaging initialization notice:', e);
}

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.indexOf(self.registration.scope) !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
