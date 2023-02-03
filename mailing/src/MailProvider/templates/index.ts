import path from 'path';

export const template_paths: Record<string, string> = Object.freeze({
    test: path.join(__dirname, 'test.hbs'),
});

export default template_paths;
