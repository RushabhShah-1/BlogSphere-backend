import mongoose from "mongoose";
const connection = async (username, password) => {
  const dbURL = `mongodb+srv://${username}:${password}@blogsphere.wmasvvq.mongodb.net/?retryWrites=true&w=majority&appName=BlogSphere`;
  try {
    await mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};
export default connection;
