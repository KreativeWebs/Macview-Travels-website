const mongoose = require('mongoose');
const FlashSaleBooking = require('./models/FlashSaleBooking.js');
const User = require('./models/User.js');

async function updateExistingBookings() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/macviewtravels');

    const bookings = await FlashSaleBooking.find({ email: { $exists: false } });

    for (const booking of bookings) {
      const user = await User.findById(booking.userId);
      if (user && user.email) {
        await FlashSaleBooking.findByIdAndUpdate(booking._id, { email: user.email });
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating bookings:', error);
    process.exit(1);
  }
}

updateExistingBookings();
