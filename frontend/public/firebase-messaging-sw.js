importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js');


if (!firebase.apps.length) {
  firebase.initializeApp({
    messagingSenderId: "339818812474",
    appId: "1:339818812474:web:3bca7d8e3b23db4ab9d103",
    projectId: "notifier-79a60",
    apiKey: "AIzaSyDM33DElBEy5afMiLX2aVNkeL_BFLHchSk"
  });

  //background notifications will be received here
  firebase.messaging()
    .setBackgroundMessageHandler((payload) => {
      const { title, body } = JSON.parse(payload.data.notification);
      var options = { body };
      console.log('background message happened');
        
      self.registration.showNotification(title, options);
    });
}
