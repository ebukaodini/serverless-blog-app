import mongoose from "mongoose";

export const dbConnect = async () => {
  const url = new URL(
    process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_CONNECTION_URL_TEST!
      : process.env.MONGODB_CONNECTION_URL!
  );
  url.username = process.env.AWS_ACCESS_KEY_ID!
  url.password = encodeURIComponent(process.env.AWS_SECRET_ACCESS_KEY!)
  url.searchParams.set('authSource', '$external')
  url.searchParams.set('authMechanism', 'MONGODB-AWS')
  url.searchParams.set('retryWrites', 'true')
  url.searchParams.set('w', 'majority')
  
  mongoose.connect(url.toString())
    .then(() => {
      console.log(`🌥  Connected to MongoDB: ${mongoose.connection.name}`)
    })
    .catch(err => {
      console.log(err.message)
      process.exit()
    });
}
