import AWS from 'aws-sdk';
import AppError from '../../errors/AppError';

import { IMailProvider, ISendMailParams } from '../IMailProvider';

AWS.config.update({
    region: process.env.AWS_REGION,
});

export class SESMailProvider implements IMailProvider {
    SES: AWS.SES;

    constructor() {
        this.SES = new AWS.SES({
            apiVersion: '2010-12-01',
        });
    }

    async sendMail({ text, html, subject, from, to }: ISendMailParams): Promise<void> {
        try {
            const params = {
                Destination: {
                    ToAddresses: [to],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: html ?? text,
                        },
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: subject ?? '',
                    },
                },
                Source: from,
            };

            await this.SES.sendEmail(params).promise();
        } catch (error) {
            console.error(error); // logging
            throw new AppError('Erro inesperado ao enviar email, por favor tente mais tarde');
        }
    }
}

export default SESMailProvider;
