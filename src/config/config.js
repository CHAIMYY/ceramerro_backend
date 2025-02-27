
const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const DB =process.env.MONGODB_URI
const dbConnect = () => {
    mongoose.connect(DB)
        .then(() => {
            console.log('Database Connected')
        }).catch(() => {
            console.log('Problem in Database Connection')
        })
}

module.exports = dbConnect 