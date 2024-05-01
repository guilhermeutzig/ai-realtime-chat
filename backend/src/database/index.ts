import mongoose from "mongoose";

const uri: string = process.env.DB_PATH || "";

let connection: mongoose.Connection;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if (!connection) {
    connection = await mongoose.createConnection(uri, {
      bufferCommands: false,
    });
  }

  return connection;
};
