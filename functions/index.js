const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

/**
 * 投稿されたメッセージ内のアルファベットを大文字に変換します.
 */
exports.toUpperCase = functions.firestore
  .document('messages/{message}')
  .onCreate((snapshot) => {
    return admin.firestore()
      .doc(snapshot.ref.path)
      .update({
        message: snapshot.get('message').toUpperCase()
      })
  })