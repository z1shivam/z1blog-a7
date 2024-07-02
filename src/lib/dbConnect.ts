import mongoose from "mongoose";
import { env } from "@/env";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const connectionString = `${env.MONGO_URL}/${env.MONGO_DB}`;

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log(`Already connected to DB.`);
    return;
  }

  try {
    const db = await mongoose.connect(connectionString, {});
    connection.isConnected = db.connections[0]?.readyState;
    console.log(`DB connected Successfully! - ${db.connection.host}`);
  } catch (error) {
    console.log(`DB connection failed. - ${error}`);
    process.exit(1);
  }
}

export default dbConnect;
