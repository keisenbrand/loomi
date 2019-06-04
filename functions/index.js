
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Get home status given a userID
exports.getHomeStatus = functions.https.onRequest((req, res) => {
  const params = req.url.split("/");
  const userID = params[1];
  var ref = admin.database().ref('users/' + userID);
  ref.once('value', (snapshot) => {
    res.send(JSON.stringify(snapshot.child('isHome').val()));
  }).catch(error => {
    console.error(error);
    res.error(500);
  });
});

// Get user's partner given their userID
exports.getPartner = functions.https.onRequest((req, res) => {
  const params = req.url.split("/");
  const userID = params[1];
  var ref = admin.database().ref('users/' + userID);
  ref.once('value', (snapshot) => {
    res.send(JSON.stringify(snapshot.child('partner').val()));
  }).catch(error => {
    console.error(error);
    res.error(500);
  });
});

// Update user's home status when they get home or leave home (handled on client side)
