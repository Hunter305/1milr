import mongoose from "mongoose";

const db = async () => {
  const conn = await mongoose.connect(process.env.MONGO);
  console.log(conn.connection.host);
};

export default db;
