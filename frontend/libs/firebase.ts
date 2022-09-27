import Firebase from "firebase";
import localforage from "localforage";

/**
 * https://firebase.google.com/docs/cloud-messaging/js/receive#web-version-9_1
 * https://medium.com/@sarafathulla/how-to-add-firebase-push-notifications-in-next-js-react-8eecc56b5cab
*/

const firebaseConfig = {
  messagingSenderId: "339818812474",
  appId: "1:339818812474:web:3bca7d8e3b23db4ab9d103",
  projectId: "notifier-79a60",
  apiKey: "AIzaSyDM33DElBEy5afMiLX2aVNkeL_BFLHchSk",
};

const FCM_TOKEN = "FCM_TOKEN";

export class FirebaseCloudMessaging {
  private messaging: Firebase.messaging.Messaging | null = null;

  getToken = async () => localforage.getItem(FCM_TOKEN);

  init = async () => {
    if(!("Notification" in window)) return;

    if (!Firebase.apps.length) Firebase.initializeApp(firebaseConfig);

    this.messaging = Firebase.messaging();

    try {
      const fcmToken = await this.getToken();
      console.log('token', fcmToken);

      if (fcmToken) return fcmToken;

      return await this.requestFcmToken();
    } catch (error) {
      console.error("initialization failed", error);
    }
  };

  /**
   * Request firebase cloud messaging token
   * @return {Promise<String|void>}
   */
  requestFcmToken = async () => {
    try {
      const status = await Notification.requestPermission();
      const vapidKey = 'BDdf8VQjbQHlRVCI7GR2DTTWjEaEmkyD6Os5ObLbB45z5FdzUyzufbNY_koNlTZbjeZvqAvcN2VtZ0x0D1Lq0-w';

      
      if (status && status == "granted") {
        const fcmToken = await this.messaging?.getToken({ vapidKey });

        console.log('token', fcmToken);

        localforage.setItem(FCM_TOKEN, fcmToken);

        return fcmToken;
      }

    } catch (error) {
      console.error("unable to get fcm token", error);
    }
  };

  handleMessages () {
    this.messaging?.onMessage((payload:any) => {
      console.log('foreground message happened', payload)
      const { title, body } = JSON.parse(payload.data.notification);
      var options = { body };
        
      // new Notification(title, options);
    });
  }
}

export { Firebase };
