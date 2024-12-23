import mongoose from "mongoose";
const connectToDb = async (): Promise<void> => {
  try {
    const connectionString: string = process.env.MONGOOSE_CONNECTION as string;
    const connectionResult = await mongoose.connect(connectionString);
    console.log("connected to db successfully");
  } catch (e: unknown) {
    console.log(e);
  }
};

export default connectToDb;
