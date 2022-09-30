import { NextFunction, Request, Response } from "express";
import passport from "../config/passport";

export default function (req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies["connect.jit"];

  if (!accessToken) {
    next();
    return;
  }

  req.headers["authorization"] = `Bearer ${accessToken}`;

  passport.authenticate("jwt", (err, user, __) => {
    if (err || !user) {
      res.status(401).json({
        success: false,
        message: "Unauthenticated",
      });
      return;
    }

    req.user = user;

    next();
  })(req, res, next);
}
