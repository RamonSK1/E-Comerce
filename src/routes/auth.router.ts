import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// usuários simulados
const users = [
  { id: '1', email: 'admin@email.com', password: '123456', role: 'admin' },
  { id: '2', email: 'customer@email.com', password: '123456', role: 'customer' },
]

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )

  return res.status(200).json({ token })
})

export default router