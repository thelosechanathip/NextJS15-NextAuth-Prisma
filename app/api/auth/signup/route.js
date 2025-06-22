import pm from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await pm.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return Response.json({
            message: "User created successfully",
            data: newUser
        })
    } catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}