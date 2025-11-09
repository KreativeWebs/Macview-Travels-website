import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    ipAddresses: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
