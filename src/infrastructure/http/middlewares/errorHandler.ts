import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
): Response | void {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}
