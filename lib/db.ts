import mongoose from 'mongoose';

const url = process.env.DATABASE_URL as string;

let connection: typeof mongoose;

const startDb = async () => {
    if (!connection) {
        connection = await mongoose.connect(url);
        console.log("DB connection successful!");
    }
    else {
        console.log("DB connection already established!");
    }
    return connection;
}

export default startDb;