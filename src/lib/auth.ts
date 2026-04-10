import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vareweb-studio-super-secret-key-change-in-production-2024'
)

const COOKIE_NAME = 'vareweb-auth-token'

export interface JWTPayload {
  userId: string
  username: string
  role: string
  name: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as string,
      name: payload.name as string,
    }
  } catch {
    return null
  }
}

export { JWT_SECRET, COOKIE_NAME }
