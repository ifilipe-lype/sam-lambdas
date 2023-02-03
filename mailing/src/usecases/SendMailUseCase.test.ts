import AppError from '../utils/AppError';
import { IMailProvider } from '../provider';
import { SendMailUseCase } from './SendMailUseCase';
import { makeSendMailPayload } from '../../__tests__/fixtures';

const MailProviderMock = jest.fn<IMailProvider, any>(() => ({
    sendMail: jest.fn<Promise<void>, any>(),
}));

const sutFactory = () => {
    const mailProviderMock = new MailProviderMock() as jest.Mocked<IMailProvider>;
    const sendMailUseCase = new SendMailUseCase(mailProviderMock);

    return Object.freeze({
        mailProviderMock,
        sendMailUseCase,
    });
};

describe('SendMailUseCase', () => {
    let sendMailUseCase: SendMailUseCase;

    beforeEach(() => {
        let { sendMailUseCase: sendMailUseCaseMock } = sutFactory();
        sendMailUseCase = sendMailUseCaseMock;
    });

    it('Should instantiate class', () => {
        expect(sendMailUseCase).toBeDefined();
        expect(sendMailUseCase).toBeInstanceOf(SendMailUseCase);
        expect(sendMailUseCase.execute).toBeInstanceOf(Function);
    });

    it('Should throw for invalid destination mail', async () => {
        await expect(sendMailUseCase.execute(makeSendMailPayload({ to: '' }))).rejects.toThrow(
            'Invalid destination email!',
        );
        await expect(sendMailUseCase.execute(makeSendMailPayload({ to: 'invalid.mail.com' }))).rejects.toThrow(
            'Invalid destination email!',
        );
    });

    it('Should throw for invalid source mail', async () => {
        await expect(sendMailUseCase.execute(makeSendMailPayload({ from: '' }))).rejects.toThrow(
            'Invalid source email!',
        );
        await expect(sendMailUseCase.execute(makeSendMailPayload({ from: 'invalid.mail.com' }))).rejects.toThrow(
            'Invalid source email!',
        );
    });

    it("Should handle  mailProvider's unexpected errors", async () => {
        let { sendMailUseCase, mailProviderMock } = sutFactory();

        mailProviderMock.sendMail.mockImplementation(() => {
            throw new Error('Unexpected error!');
        });

        await expect(sendMailUseCase.execute(makeSendMailPayload())).rejects.toBeInstanceOf(AppError);
        expect(mailProviderMock.sendMail).toHaveBeenCalledTimes(1);
    });

    it('Should throw if neither template nor text is provided', async () => {
        await expect(
            sendMailUseCase.execute(makeSendMailPayload({ template: undefined, text: undefined })),
        ).rejects.toThrow();
    });

    it('Should not throw if either template or text is not provided', async () => {
        await expect(
            sendMailUseCase.execute(makeSendMailPayload({ template: 'test', text: undefined })),
        ).resolves.not.toThrow();
        await expect(
            sendMailUseCase.execute(makeSendMailPayload({ template: undefined })),
        ).resolves.not.toThrow();
    });

    it('Should throw for invalid template', async () => {
        await expect(sendMailUseCase.execute(makeSendMailPayload({ template: 'non-existing' }))).rejects.toThrow();
    });

    it('Should not throw for valid payload', async () => {
        await expect(sendMailUseCase.execute(makeSendMailPayload())).resolves.not.toThrow();
    });

    it('Should parse and send a template based mail', async () => {
        await expect(sendMailUseCase.execute(makeSendMailPayload({ template: 'test' }))).resolves.not.toThrow();
    });
});
