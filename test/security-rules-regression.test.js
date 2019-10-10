const firebase = require('@firebase/testing')

const app = firebase.initializeTestApp({
  projectId: 'firebase-emulators-test',
  auth: null
})

const validInput = {
  message: 'message',
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
}

test('成功', async () => {
  const result = await app.firestore()
    .collection('messages')
    .add(validInput)
  expect(result).toBeInstanceOf(firebase.firestore.DocumentReference)
})

test('失敗: メッセージが空文字列', async () => {
  try {
    await app.firestore()
      .collection('messages')
      .add({
        ...validInput,
        message: '',
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
})

test('失敗: メッセージが長すぎる', async () => {
  try {
    await app.firestore()
      .collection('messages')
      .add({
        ...validInput,
        message: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
})

test('失敗: 適当な時刻', async () => {
  try {
    await app.firestore()
      .collection('messages')
      .add({
        ...validInput,
        createdAt: firebase.firestore.Timestamp.now()
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
})

test('失敗: 不正なデータ形式', async () => {
  expect.assertions(3)
  try {
    await app.firestore()
      .collection('messages')
      .add({
        message: 'message',
        createdAtAAA: firebase.firestore.FieldValue.serverTimestamp() // ここが間違っている
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
  try {
    await app.firestore()
      .collection('messages')
      .add({
        messageAAA: 'message', // ここが間違っている
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
  try {
    await app.firestore()
      .collection('messages')
      .add({
        message: 'message',
        createdAt: firebase.firestore.Timestamp.now(),
        AAA: '' // 余計なフィールド
      })
  } catch (error) {
    expect(error.code).toEqual('permission-denied')
  }
})

afterAll(async () => await app.delete())