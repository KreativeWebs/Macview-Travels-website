import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';
dotenv.config();

async function resetAdminAttempts() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/macviewtravels');

    const admin = await Admin.findOne({ email: 'admin@macviewtravels.com' });
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    await admin.save();

    console.log('Admin login attempts reset successfully');
    console.log('Email: admin@macviewtravels.com');
    console.log('Password: Admin@123');
  } catch (error) {
    console.error('Error resetting admin attempts:', error);
  } finally {
    await mongoose.disconnect();
  }
}

resetAdminAttempts();
