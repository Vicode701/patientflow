import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { CaseConversationSubset } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";
//import catchAsync from "../utils/catchAsync";
//import AppError from "../utils/appError";
//const Email = require("./../utils/email");

interface UserType {
    name: string;
    email: string;
    id: string;
    role: string;
    token: string | null;
    expiration: Date;
}

const signToken = (id: string, email: string) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

export const createSendToken = (user: any, statusCode: number, req: NextApiRequest, res: NextApiResponse, caseSubsets: CaseConversationSubset[] | null) => {
    const token = signToken(user._id, user.email);
    // Set cookie
    const expiration: Date = new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000);
    
    res.setHeader('Set-Cookie', `jwt=${token}; SameSite=Strict; Path=/; Expires=${expiration}; HttpOnly; Secure; `);

    // Remove password from output
    user.password = undefined;
    const expirationString: string = expiration.toISOString();

    if (caseSubsets && caseSubsets.length !== 0) {
      
      res.status(statusCode).json({
        token: token,
        expiration: expirationString,       
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        caseSubsets: caseSubsets,        
      });
    }
    else {
      res.status(statusCode).json({
        token: token,
        expiration: expirationString,        
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }

    console.log('Sending success response');
    return res;
  };

  
export const logoutUser = (req: NextRequest, res: NextResponse) => {
  // res.setHeader('Set-Cookie', 'jwt=; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
  // return res.status(200).json({ status: "success" });

  // res.cookies.set('jwt)
  // const newHeaders = new Headers(req.headers);
  // newHeaders.set()
  // NextResponse.json(
  //   {
  //       userId: user._id,
  //       email: user.email,
  //       name: user.name,
  //       role: user.role },
  //   {
  //       status: 400
  //   });
};

// exports.signup = catchAsync(async (req, res, next) => {
//   const { name, email, password, passwordConfirm } = req.body;
//   console.log(
//     `Received name:${req.body.name}, email:${email}, password:${password} and passwordConfirm:${passwordConfirm} `
//   );
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//   });

//   const url = `${req.protocol}://${req.get("host")}/me`;
//   console.log(url);
//   //TODO:
//   //await new Email(newUser, url).sendWelcome();

//   createSendToken(newUser, 201, req, res);
// });

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//   // 1) Check if email and password exist
//   if (!email || !password) {
//     return next(new AppError("Please provide email and password!", 400));
//   }
//   // 2) Check if user exists && password is correct
//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError("Incorrect email or password", 401));
//   }

//   // 3) If everything ok, send token to client
//   createSendToken(user, 200, req, res);
// });

// exports.protect = catchAsync(async (req, res, next) => {
//   // Handle OPTIONS request method
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(
//       new AppError("You are not logged in! Please log in to get access.", 401)
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         "The user belonging to this token does no longer exist.",
//         401
//       )
//     );
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });

// Only for rendered pages, no errors!
// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       // 2) Check if user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 3) Check if user changed password after the token was issued
//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }

//       // THERE IS A LOGGED IN USER
//       res.locals.user = currentUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     // roles ['admin', 'lead-guide']. role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have permission to perform this action", 403)
//       );
//     }

//     next();
//   };
// };

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on POSTed email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError("There is no user with email address.", 404));
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // 3) Send it to user's email
//   try {
//     const resetURL = `${req.protocol}://${req.get(
//       "host"
//     )}/api/v1/users/resetPassword/${resetToken}`;
//     await new Email(user, resetURL).sendPasswordReset();

//     res.status(200).json({
//       status: "success",
//       message: "Token sent to email!",
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(
//       new AppError("There was an error sending the email. Try again later!"),
//       500
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on the token
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     return next(new AppError("Token is invalid or has expired", 400));
//   }
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in, send JWT
//   createSendToken(user, 200, req, res);
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   // 1) Get user from collection
//   const user = await User.findById(req.user.id).select("+password");

//   // 2) Check if POSTed current password is correct
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError("Your current password is wrong.", 401));
//   }

//   // 3) If so, update password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();
//   // User.findByIdAndUpdate will NOT work as intended!

//   // 4) Log user in, send JWT
//   createSendToken(user, 200, req, res);
// });
