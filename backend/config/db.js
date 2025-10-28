import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * This function establishes connection to MongoDB using the URI from environment variables
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
