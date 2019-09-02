const mongoose = require('mongoose'); // imports mongoose
const config = require('config'); // imports config package
const db = config.get('mongoURI'); // gets mongoDB URI to connect

// creates async method to connect to mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(db, { 
            useNewUrlParser: true
        });

        console.log('MongoDb Connected...')
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;