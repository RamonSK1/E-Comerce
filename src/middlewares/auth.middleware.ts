import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface TokenPayload {
  id: string
  email: string
  role: 'admin' | 'customer'
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    ;(req as any).user = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

export function authorize(role: 'admin' | 'customer') {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as TokenPayload

    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    next()
  }
}