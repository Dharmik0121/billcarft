export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // only secure in production
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: true, // ✅ required for HTTPS (Render)
      sameSite: "None",
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
