import mongoose from 'mongoose';
import Package from './models/Package.js';

async function setOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/macviewtravels');

    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });

    for (let i = 0; i < packages.length; i++) {
      packages[i].order = i;
      await packages[i].save();
      console.log(`Set order ${i} for package: ${packages[i].title}`);
    }

    console.log('Order values set successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setOrder();
