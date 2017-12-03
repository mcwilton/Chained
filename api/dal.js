require('dotenv').config()

const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const pkGen = require('./lib/pk-generator')
const dbName = process.env.COUCHDB_DATABASE
const dbURL = process.env.COUCHDB_URL

console.log('db is' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)

// Users
const addUser = (user) => {

  user._id = pkGen('user', '_', user.userName)

  add(user)
  //add(merge(book, {_id: pkGen("book", "_", prop('title', book)}), callback)
}
const getUser = id => get(id)
const updateUser = user => update(user)
const deleteUser = id => deleteDoc(id)
const listUsers = () => db
  .find({
  selector: {
    userName: {
      $gte: null
    }
  }
})
  .then(res => res.docs)
  .catch(err => console.log("error in dal/listUsers: ", err))

  // we want addTx to have a guid so we will use the pouchdb post method instead
  // of put
  const addTx = tx => createWithId(tx)
const getTx = id => get(id)
const updateTx = tx => update(tx)
const deleteTx = id => deleteDoc(id)
const listTx = () => db
  .find({
  selector: {
    sender: {
      $gte: null
    }
  }
})
  .then(res => res.docs)
  .catch(err => console.log("error in dal/listTX: ", err))

  ////////////////////////////// /        HELPERS ////////////////////////////
  const add = doc => db.put(doc)
const createWithId = doc => db.post(doc)
const get = id => db.get(id)
const update = doc => db.put(doc)
const deleteDoc = id => get(id)
  .then(doc => db.remove(doc))
  .catch(err => console.log(err))

  const dal = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  addTx,
  getTx,
  updateTx,
  deleteTx,
  listTx
}

module.exports = dal