// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mern_app');
    console.log("✅ MongoDB Connected");

    // Run CRUD operations
    await runCRUDOperations();

    // Close connection after operations
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  role: String
});

const User = mongoose.model("User", userSchema);

// Function to perform CRUD operations
async function runCRUDOperations() {
  try {
    // 1. CREATE
    const user = await User.create({
      name: "Arvind",
      email: "Arvind@in.com",
      age: 30,
      role: "admin"
    });
    console.log("🟢 User Created:", user);

    // 2. READ
    const users = await User.find();
    console.log("🔵 All Users:", users);

    // 3. UPDATE
    const updated = await User.updateOne(
      { email: "john@example.com" },
      { $set: { role: "superadmin" } }
    );
    console.log("🟡 User Updated:", updated);

    // 4. DELETE
    const deleted = await User.deleteOne({ email: "Arvind@in.com" });
    console.log("🔴 User Deleted:", deleted);
  } catch (err) {
    console.error("❌ Error during CRUD operations:", err);
  }
}

// Call the connection function
connectDB();
// 4. DELETE
// const deleted = await User.deleteOne({ email: "john@example.com" });
// console.log("🔴 User Deleted:", deleted);
