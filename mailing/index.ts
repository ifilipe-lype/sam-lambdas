import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import SendMailUseCase from './src/usecases/SendMailUseCase';
import { SESMailProvider } from './src/provider';
import AppError from './src/utils/AppError';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const sendMailUseCase = new SendMailUseCase(new SESMailProvider());
    const data = JSON.parse(event.body ?? '{}');

    try {
        await sendMailUseCase.execute(data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'mail sent successfully',
            }),
        };
    } catch (err: unknown) {
        console.error(err); // Logging
        if (err instanceof AppError) {
            return {
                statusCode: err.statusCode,
                body: JSON.stringify({
                    message: err.message,
                }),
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Unexpected error! please try again later.',
            }),
        };
    }
};
