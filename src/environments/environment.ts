export const environment = {
  version: require('../../package.json').version,
  firebase: {
    apiKey: "AIzaSyBtShpfIxWdclulPpCQ-BN9XybkuRuEzuw",
    authDomain: "available-app-5071d.firebaseapp.com",
    databaseURL: "https://available-app-5071d.firebaseio.com",
    projectId: "available-app-5071d",
    storageBucket: "available-app-5071d.appspot.com",
    messagingSenderId: "702468920612",
    appId: "1:702468920612:web:e02f06a1f2684cdd730fb1",
    measurementId: "G-8LC34REC3L"
  },
  urlCheckStatusLocal: "http://localhost:4000/checkstatus",
  urlCheckStatusFirebaseFunction: "http://localhost:5001/available-app-functions-d7588/us-central1/checkstatus",
  // urlCheckStatusFirebaseFunction: "https://us-central1-available-app-functions-d7588.cloudfunctions.net/checkstatus",
  production: false,
}