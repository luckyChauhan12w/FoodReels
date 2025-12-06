import "./env.js";
import app from './src/app.js';
import connectDB from './src/db/db.js';

const PORT = process.env.PORT || 3000;

// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server started on port ${PORT}`);
      console.log(`✅ Database connected successfully`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit if DB connection fails
  });

