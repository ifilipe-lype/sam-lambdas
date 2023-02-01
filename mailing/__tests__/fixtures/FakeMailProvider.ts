import { IMailProvider } from '../../src/MailProvider/IMailProvider';

export class FakeMailProvider implements IMailProvider {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async sendMail(): Promise<void> {}
}

export default FakeMailProvider;
