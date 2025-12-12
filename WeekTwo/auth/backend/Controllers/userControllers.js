// IMPORTING REQUIRED MODELS
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// CONFIGURING DOTENV
dotenv.config();

// IMPORTING REQUIRED MODELS
import userModel from "../Models/userModel.js";

// Functions For Validating Existing Users
const checkRecords = async (userData) => {
  try {
    const userRecords = await userModel.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    return !!userRecords;
  } catch (e) {
    console.error(e.message, " - Controllers/userController.js:15");
  }
};

// Function For Retriving Users
const retriveExistingUser = async (userMail) => {
  try {
    const user = userModel.find({ email: userMail });
    return user;
    console.log(user);
  } catch (e) {
    console.error(
      e.message,
      "Error Fetching User -Controllers/userController.js[retriveExistingUser]"
    );
  }
};

// FUNCTION FOR CREATING A USER
const genUser = async (req, res) => {
  // Destructuring Request Data
  const { username, email, password } = req.body;

  // Hashing Raw Password
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);

  // Check For Duplicates
  const validationResult = await checkRecords({ username, email });

  try {
    if (validationResult) {
      res.status(400).json({ error: "User Already Exsists" });
    } else {
      await userModel.create({
        username: username,
        email: email,
        password: saltedPassword,
      });
      res.status(200).json({ msg: "Account Succesfully Created" });
    }
  } catch (e) {
    console.error(
      "Error Creating User - Controllers/userController.js:genUser"
    );
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // RETRIEVE USER INFO
    const user = await retriveExistingUser(email);

    if (!user || user.length === 0) {
      return res.status(400).json({ error: "User Does Not Exist" });
    }

    // COMPARE PASSWORDS
    const comparePassword = await bcrypt.compare(password, user[0].password);

    if (!comparePassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // SET PAYLOAD FOR TOKEN
    const userData = {
      username: user[0].username,
      email: user[0].email,
      id: user[0]._id,
    };

    // CREATE JWT
    const jsonToken = jsonwebtoken.sign(userData, process.env.SEC_KEY, {
      expiresIn: "15m",
    });

    res.cookie('auth_token', jsonToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
      path: '/'
    });

    // SET NON-SENSITIVE USER DATA IN REGULAR COOKIE (optional)
    res.cookie('user_info', JSON.stringify({
      username: user[0].username,
      email: user[0].email
    }), {
      httpOnly: false,
      maxAge: 15 * 60 * 1000,
      path: '/'
    });

    // Send success response WITHOUT token in body
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user[0].username,
        email: user[0].email,
        id: user[0]._id
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// EXPORTING ALL CONTROLLERS
export { genUser, verifyUser };
