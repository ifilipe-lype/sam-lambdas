import AppError from '../utils/AppError';
import { isEmail } from '../utils/isEmail';
import { parseMailTemplate } from '../provider/parseMailTemplate';
import { IMailProvider, ISendMailParams } from '../provider/IMailProvider';

export interface ISendMailPayload extends ISendMailParams {
    template?: string;
    data?: Record<any, any>;
}

export class SendMailUseCase {
    constructor(private readonly mailProvider: IMailProvider) {}

    async execute(payload: ISendMailPayload) {
        const { to, from, text, template, data } = payload;

        if (!isEmail(to)) {
            throw new AppError('Invalid destination email!');
        }
        if (!isEmail(from)) {
            throw new AppError('Invalid source email!');
        }

        if (!text && !template) {
            throw new AppError('No email content provided! specify mail text or template!');
        }

        if (template) {
            Object.assign(payload, { html: await parseMailTemplate(template, data ?? {}) });
        }

        try {
            await this.mailProvider.sendMail(payload);
        } catch (e) {
            if (e instanceof AppError) throw e;

            throw new AppError('Unexpected error, please try again later!', 500);
        }
    }
}

export default SendMailUseCase;
