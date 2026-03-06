import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { PrismaUserRepository } from '../../../../src/infrastructure/database/PrismaUserRepository';
import { RegisterUserUseCase } from '../../../../src/domain/usecases/RegisterUserUseCase';
import { bcryptPasswordHasher } from '../../../../src/infrastructure/providers/PasswordHasher';
import { jwtTokenGenerator } from '../../../../src/infrastructure/providers/TokenGenerator';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = registerSchema.parse(body);

        const userRepository = new PrismaUserRepository();
        const registerUseCase = new RegisterUserUseCase(userRepository, bcryptPasswordHasher, jwtTokenGenerator);

        const result = await registerUseCase.execute({ email, name, password });

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Dados inválidos', errors: error.issues }, { status: 400 });
        }
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 400 });
    }
}
