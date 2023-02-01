import AppError from '../errors/AppError';
import { IMailProvider } from '../MailProvider/IMailProvider';

interface ISendMailParams {
    to: string;
}

export class SendMailUseCase {
    constructor(private readonly mailProvider: IMailProvider) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async execute({ to }: ISendMailParams) {
        if (!to) {
            throw new AppError('Invalid destination email!');
        }
    }
}

export default SendMailUseCase;
