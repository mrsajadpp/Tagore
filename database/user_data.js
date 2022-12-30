let db = require('./config.js')
let COLLECTIONS = require('./collections.js')
var mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    newSub: (data) => {
        try {
            return new Promise((resolve, reject) => {
                db.get().collection(COLLECTIONS.SUBSCRIBERS).insertOne(data).then((res) => {
                    resolve({ status: true })
                }).catch((err) => {
                    console.error(err)
                })
            })
        } catch (err) {
            console.error(err)
        }
    },
    getSub: () => {
        try {
            return new Promise(async (resolve, reject) => {
                let emails = await db.get().collection(COLLECTIONS.SUBSCRIBERS).find().toArray();
                resolve(emails)
            }).catch((err) => { console.error(err) })
        } catch (err) {
            console.error(err)
        }
    }
}