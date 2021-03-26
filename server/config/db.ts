import mongoose from 'mongoose';

const localUri = 'mongodb://127.0.0.1:27017/mean-chitter';
const mongoUri = process.env.MONGO_URI || localUri;
const dbEnv = mongoUri === localUri ? 'Development' : 'Production';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected to ${dbEnv}!`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
