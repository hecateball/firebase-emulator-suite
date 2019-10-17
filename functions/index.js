const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()

/**
 * 投稿されたメッセージ内のアルファベットを大文字に変換します.
 */
exports.toUpperCase = functions.firestore
  .document('messages/{message}')
  .onCreate(async (snapshot) => {
    return snapshot.ref.update({
      message: snapshot.get('message').toUpperCase()
    })
  })