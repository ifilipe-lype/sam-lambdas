import { faker } from '@faker-js/faker';
import { ISendMailParams } from '../../src/MailProvider/IMailProvider';

export function makeSendMailPayload(overrides: Partial<ISendMailParams> = {}): ISendMailParams {
    return Object.assign(
        {
            to: faker.internet.email(),
            from: faker.internet.email(),
            text: faker.random.words(),
            subject: faker.lorem.paragraph(),
        },
        overrides,
    );
}
