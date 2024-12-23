import { Request, Response } from "express";
import { LoginTicket, OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import user from "../schemas/user.schema";
import {
  comparePassword,
  hashPassword,
} from "../middlewares/passwordBcrypt.js";
import axios from "axios";

/*creating OAuth2Client instace */
const client = new OAuth2Client();
/* custom register controller*/
const registerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, phone, email, password } = req.body;
    console.log(name, phone);
    if (!name || !email || !phone || !password) {
      return res.status(400).send({
        message: "please fill the form completely",
        success: false,
      });
    }
    const checkUserExist = await user.findOne({ email });
    if (checkUserExist) {
      return res.status(400).send({
        message: "user already exist",
        success: false,
      });
    }
    const hashpass = hashPassword(password);
    const userData = await new user({
      name,
      phone,
      email,
      password: hashpass,
    }).save();
    return res.status(201).send({
      message: "user registered successfully",
      success: true,
      userData,
    });
  } catch (e) {
    console.log(e);
  }
};
/* custom login controller */
// const loginController = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { email, password } = req.body;

//     if (!email) {
//       return res.status(400).send({
//         message: "Please the fill form completely",
//         success: false,
//       });
//     }
//     const checkUserExist = await user.findOne({ email });
//     if (!checkUserExist) {
//       return res.status(404).send({
//         message: "There is no user",
//         success: false,
//       });
//     }
//     const checkUserPassword = comparePassword(
//       password,
//       checkUserExist.password
//     );
//     if (!checkUserPassword) {
//       return res.status(400).send({
//         message: "Invalid credentials",
//         success: false,
//       });
//     }
//     const token = jwt.sign(
//       { id: checkUserExist.id },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" }
//     );
//     return res.status(200).send({
//       message: "user logged in successfully",
//       success: true,
//       userData: checkUserExist,
//       token,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
/* googleLoginController */
const googleLoginController = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    let checkUserExist = await user.findOne({ email });
    if (!checkUserExist) {
      checkUserExist = await new user({ email, name }).save();
    }
    console.log(checkUserExist);
    const jwtToken = jwt.sign(
      { id: checkUserExist.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(201).send({
      message: "User logged in successfully",
      success: true,
      token: jwtToken,
    });
  } catch (e) {
    console.log(e);
  }
};
export { registerController, googleLoginController };
