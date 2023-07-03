import dotenv from "dotenv";
import ConnectApp from "./Connection/connectApp";
import ConnectMongo from "./Connection/connectMongo";
dotenv.config();

// Destructure environment variables for convenience
const { PORT = 5050, DATABASE_URI } = process.env;

// Connect to the Express app using the ConnectApp class
const expressServer = new ConnectApp(PORT as string);
expressServer.start();

// Connect to MongoDB using the ConnectMongo class
const mongoServer = new ConnectMongo(DATABASE_URI);

mongoServer.start();
