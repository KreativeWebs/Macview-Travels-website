import mongoose from "mongoose";

const userSchema = mongoose.Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    authProvider: { type: String, default: 'email' }
})

const User = mongoose.models.user || mongoose.model("User", userSchema);


export default User;