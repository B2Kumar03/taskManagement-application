import jwt from "jsonwebtoken";
export const authAccess = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Unauthorized", data: [] });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).json({ error: "Unauthorized", data: [] });
    }
    const decoded = jwt.verify(token, "kya_dekh_raha_hai_binod");
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(501).json("error occurs while deconding the data");
  }
};
