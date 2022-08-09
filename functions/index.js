
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
let id = null;
const addville = (doc) => {
  return admin
    .firestore()
    .collection("CityOrder")
    .add(doc)
    .then((doc) => id=doc.id);
};
/*const updateville = (doc) => {
  return admin
    .firestore()
    .collection("CityOrder")
    .setDoc(doc)
    .then((doc) => console.log("done", doc));
};
*/
exports.orderCreated = functions.firestore
  .document("orders/{orderId}")
  .onCreate((doc) => {
    // const citiesRef = collection(db, "CityOrder");

    const order = doc.data();
    const city = {
      ville: `${order.order_city}`,
      totalSucceded: "",
      totalFailed: "",
      ca: 0,
    };
    id="zI51OMkzLQGXSj2WZcGb"
    return addville(city);
  });
exports.orderUpdated = functions.firestore
  .document("orders/zI51OMkzLQGXSj2WZcGb")
  .onUpdate((change) => {
    console.log(id);

    console.log("cxccccccc");

    console.log(change.after.data());
  });
