import { ZodSchema } from 'zod'

import {
  Request,
  Response,
  NextFunction,
} from 'express'

export function validateData(
  schema: ZodSchema,
  source: 'body' | 'params' | 'query'
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(
      req[source]
    )

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.format(),
      })
    }

    next()
  }
}