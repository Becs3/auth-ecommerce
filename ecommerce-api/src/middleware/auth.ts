import dotenv from 'dotenv';
import { NextFunction, Request, RequestExtended, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken';

declare module 'express' {
  export interface RequestExtended extends Request {
    user?: any;
  }
}

export const verifyAccessToken = (req: RequestExtended, res: Response, next: NextFunction) => {
  const bearer = req.headers['authorization'];
  const accessToken = bearer && bearer.split(' ')[1];
  
  if (accessToken === undefined) {
    res.sendStatus(401);
    return
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return 
    }
    req.user = user;
    next();
  })
}


export const verifyRefreshToken = (req: RequestExtended, res: Response, next: NextFunction): void => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken === undefined) {
    res.sendStatus(401);
    return
  }
    
  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return 
    }
    req.user = user;
    next();
  })
}
