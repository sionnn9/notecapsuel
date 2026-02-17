import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key"); //success needs stupid brackets
    //my-limit-key is supposed to have userid which can be implimented when we use auth which is not done here
    if (!success) {
      return res
        .status(429)
        .json({ Message: "Too many requests. Please try again later." });
    }
    next(); //put next inside try block to ensure it only gets called if rate limit check passes
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(err);
  }
};

export default rateLimiter;
