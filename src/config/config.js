import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongodb: {
        uri: process.env.MONGODB_URI ||'mongodb://edd:1234@localhost:27017/java59?authorSource=admin',
        db:{
            dbName:process.env.DB_NAME,
        }
    }
}

export default config;