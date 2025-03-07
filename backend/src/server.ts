import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const PORT: number = config.port;

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:');
    console.error(error);
  });

  const startServer = () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }