import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "./authentication-error";
import { makeJsonWebToken } from "@/services/token/make-jason-web-token-service";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const tokenService = makeJsonWebToken()
    const { authorization } = req.headers

    const error = new AuthenticationError()

    if(!authorization) return res.status(401).json({ type: error.name, message: error.message })

    const token = authorization!.split(' ')[1]

    if(!token) return res.status(401).json({ type: error.name, message: error.message })

    try {
        const auth = await tokenService.verify(token)
        req.body = { ...req.body , ...{ auth } }
        next()
    } catch(e) {
        return res.status(401).json({ type: error.name, message: error.message })
    }
}

export default authentication