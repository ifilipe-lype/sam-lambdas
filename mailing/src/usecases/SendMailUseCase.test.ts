import { SendMailUseCase } from './SendMailUseCase';
import { FakeMailProvider } from '../../__tests__/fixtures/FakeMailProvider';

describe('SendMailUseCase', () => {
    let sendMailUseCase: SendMailUseCase;

    beforeEach(() => {
        sendMailUseCase = new SendMailUseCase(new FakeMailProvider());
    });

    it('Should instantiate class', () => {
        expect(sendMailUseCase).toBeDefined();
        expect(sendMailUseCase instanceof SendMailUseCase).toBe(true);
        expect(sendMailUseCase.execute instanceof Function).toBe(true);
    });

    it('Should fail for destination mail missing', async () => {
        await expect(sendMailUseCase.execute({})).rejects.toThrow();
    });
});
