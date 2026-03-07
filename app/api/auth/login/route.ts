import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { PrismaUserRepository } from '../../../../src/infrastructure/database/PrismaUserRepository';
import { LoginUserUseCase } from '../../../../src/domain/usecases/LoginUserUseCase';
import { bcryptPasswordHasher } from '../../../../src/infrastructure/providers/PasswordHasher';
import { jwtTokenGenerator } from '../../../../src/infrastructure/providers/TokenGenerator';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const userRepository = new PrismaUserRepository();
        const loginUseCase = new LoginUserUseCase(userRepository, bcryptPasswordHasher, jwtTokenGenerator);

        const result = await loginUseCase.execute({ email, password });
        console.log("Login user usecase success:", result);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Login route error:", error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 400 });
    }
}
