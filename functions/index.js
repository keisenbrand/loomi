
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
  // const params = req.url.split("/");
  // console.log(params);
  // const userId = params[1];
  const userID = 'user1';
  var ref = admin.database().ref('users/' + userID);
  var isHome;
  ref.once('value', (snapshot) => {
    var isHome = snapshot.child('isHome').val();
    console.log(isHome);
  }).catch(error => {
    console.error(error);
    res.error(500);
  });
  res.send(isHome);
});

// Get user's partner given their userID
exports.getPartner = functions.https.onRequest((req, res) => {
  // const params = req.url.split("/");
  // console.log(params);
  // const userId = params[1];
  const userID = 'user1';
  var ref = admin.database().ref('users/' + userID);
  var partner;
  ref.once('value', (snapshot) => {
    partner = snapshot.child('partner').val();
  }).catch(error => {
    console.error(error);
    res.error(500);
  });
  res.send(partner);
});

// Update user's home status when they get home or leave home (handled on client side)
