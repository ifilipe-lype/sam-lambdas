import { readFileSync } from 'fs';
import Handlebars from 'handlebars';

import templates from './templates';
import AppError from '../errors/AppError';

export async function parseMailTemplate(template: string, data: Record<any, any>): Promise<Buffer | string> {
    if (!templates[template]) {
        throw new AppError('Invalid mail template', 404);
    }

    return Handlebars.compile(readFileSync(templates[template], { encoding: 'utf-8' }))(data);
}
