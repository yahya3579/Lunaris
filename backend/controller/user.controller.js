import User from "../model/user.model.js";
import { generateTokenAndSetCookie } from "../utils/handlerFunc.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      error: null,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: null,
      error: "Failed to create user. " + err.message,
    });
  }
};

// Create admin user
export const createAdmin = async (req, res) => {
  try {
    if (req.body.role !== 'admin') {
      return res.status(400).json({
        status: 'fail',
        message: null,
        error: 'Only admin role is allowed for this action.'
      });
    }
    const newAdmin = await User.create(req.body);
    // Generate token and set cookie so user is authenticated after signup
    generateTokenAndSetCookie(newAdmin, res, 201);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: null,
      error: 'Failed to create admin. ' + err.message,
    });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: null,
        error: "Please provide both email and password.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: null,
        error: "Login failed. Please check your credentials.",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: null,
        error: "Login failed. Please check your credentials.",
      });
    }

    // Send token with success
    generateTokenAndSetCookie(user, res, 200);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: null,
      error: err.message,
    });
  }
};

export const logout = async (_, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".lunarismanagement.com" // correct format for domain
    });
    res.status(200).json({
      success: true,
      message: "You have been logged out.",
      error: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: null,
      error: "Logout failed. Please try again."
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user; // Assuming user is set by auth middleware
    if (!user)
      return res.status(401).json({
        success: false,
        message: null,
        error: "Authentication failed. User does not exist."
      });

    // Get token from cookie or Authorization header
    let token = req.cookies.jwt;
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }
    res.status(200).json({
      success: true,
      message: "User authenticated successfully.",
      error: null,
      user,
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: null,
      error: err.message
    });
    console.log(`Error in checkAuth: ${err.message}`);
    console.log(`Error in checkAuth: ${err}`);
    console.log(`Error in checkAuth: ${err.stack}`);
  }
};
