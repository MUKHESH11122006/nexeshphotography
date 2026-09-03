import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async (): Promise<void> => {
  if (!MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not defined in .env');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('⚠️  MongoDB connection error (running backend without DB persistence):', err instanceof Error ? err.message : err);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err);
});

export default connectDB;
