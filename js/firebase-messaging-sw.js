 importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
 
 	var firebaseConfig = {
	apiKey: "AIzaSyAOtl6eU2zLEK7k45fp-SCeQWB_UU31GLo",
	authDomain: "notif-api-node-02.firebaseapp.com",
	databaseURL: "https://notif-api-node-02.firebaseio.com",
	projectId: "notif-api-node-02",
	storageBucket: "notif-api-node-02.appspot.com",
	messagingSenderId: "1046035596722",
	appId: "1:1046035596722:web:61ed511679c69255fc90ab"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	console.log('init de firebase',firebase);
	
	const messaging = firebase.messaging();
	messaging.usePublicVapidKey("BMjn6x3uqqwnjlLFfyCbTV2hqQdVpeoz4NuobCeSEKAOJgJLZ6LXaM0BD1jRvswyY7ZgKeSECOmMORMze70Dz60");
	


/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'api-key',
   authDomain: 'project-id.firebaseapp.com',
   databaseURL: 'https://project-id.firebaseio.com',
   projectId: 'project-id',
   storageBucket: 'project-id.appspot.com',
   messagingSenderId: 'sender-id',
   appId: 'app-id',
   measurementId: 'G-measurement-id',
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]