import jwt from 'jsonwebtoken';

export const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJWTToken();

    const cookieExpireDays = Number(process.env.EXPIRE_COOKIE) || 7;

    const options = {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("❌ TOKEN ERROR DETAILS:", error.message);
    console.error("❌ Full Error:", error);
    
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating token",
      error: error.message
    });
  }
};