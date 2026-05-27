import {Request, Response, NextFunction } from 'express'

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const date = new Date().toISOString()

    console.log(`[${date}] ${req.method} ${req.originalUrl}`)
    next()
}