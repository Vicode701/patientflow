import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from "crypto";
//import { Validator } from 'validator';

export interface UserDocument extends Document {
	name: string;
	email: string;
	role: "admin" | "user";
	providerType: "email" | "credentials";
	password: string;
	subscriptionTier: string;
	active: boolean;
	isLoggedIn: boolean;
	numberOfCasesAllTime: number;
	currentNumberOfCases: number;
	passwordChangedAt: Date;
	passwordResetToken: string;
	passwordResetExpires: Date;
}

interface Methods {
	comparePassword(password: string): Promise<boolean>;
	correctPassword(password: string): Promise<boolean>;
	changedPasswordAfter(timeStamp: any): Promise<boolean>;
	createPasswordResetToken(): Promise<string>;
}

const userSchema: Schema = new Schema<UserDocument, {}, Methods>({
	name: {
		type: String,
		required: [true, "Please provide your name!"],
		trim: true
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		//validate: [Validator.isEmail, "Please provide a valid email"],
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	providerType: {
		type: String,
		enum: ["email", "credentials", "google" ,"apple","microsoft"],
		default: "credentials",
	},
	password: {
		type: String,
		minlength: 8,
		select: false,
	},
	subscriptionTier: {
		type: String,
		enum: ["free", "paid"],
		default: "free",
	},
	numberOfCasesAllTime: {
		type: Number
	},
	currentNumberOfCases: {
		type: Number
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	isLoggedIn: {
		type: Boolean,
		default: false,
	},
	passwordChangedAt: {
		type: Date,
	},
	passwordResetToken: {
		type: String,
	},
	passwordResetExpires: {
		type: Date
	}
});

userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();
	try {
		// Hash the password with cost of 12
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		// Delete passwordConfirm field
		this.passwordConfirm = undefined;
		next();
	}
	catch(error) {
		throw error;
	}  
});

// Compare Method
userSchema.methods.comparePassword = async function (password: string) {

	try {
		return await bcrypt.compare(password, this.password);
	}
	catch (error) {
		throw error;
	}
};

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre(/^find/, function (next) {
	// this points to the current query
	this.find({ active: { $ne: false } });
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
	if (this.passwordChangedAt) {
		const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");



	// this.passwordResetExpires = Date.now() + 8640 * 60 * 1000;
	const expiresAt = new Date();
	// this.passwordResetExpires = expiresAt.setMinutes(expiresAt.getMinutes() + 20); //Expires in 20 minutes
	this.passwordResetExpires = new Date(expiresAt.getTime() + 20 * 60 * 1000); //Expires in 20 minutes
	console.log('Inside createPasswordResetToken method on userModel');
	console.log(`resetToken: ${resetToken} , hashedToken: ${this.passwordResetToken}, expires: ${this.passwordResetExpires}`);

	return resetToken;
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
