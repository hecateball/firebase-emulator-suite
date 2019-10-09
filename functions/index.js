const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

exports.onCreate = functions.firestore
  .document('messages/{message}').onCreate((snapshot) => {
    return admin.firestore().doc(snapshot.ref.path)
      .update({
        message: `${snapshot.get('message')} [Function Processed]`
      })
  })