const mongoose = require('mongoose'); // imports mongoose
const config = require('config'); // imports config package
const db = config.get('mongoURI'); // gets mongoDB URI to connect


// async function to connect to mongoose
// we pass in options to avoid deprecated methods
const connectDB = async () => {
    try {
        await mongoose.connect(db, { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify : false
        });

        console.log('MongoDb Connected...')
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB; // exports method for use in routing