import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    _id: mongoose.Types.ObjectId | string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string | undefined): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
