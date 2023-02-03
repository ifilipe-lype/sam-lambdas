import { faker } from '@faker-js/faker';
import { ISendMailPayload } from '../../src/usecases/SendMailUseCase';

export function makeSendMailPayload(overrides: Partial<ISendMailPayload> = {}): ISendMailPayload {
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
