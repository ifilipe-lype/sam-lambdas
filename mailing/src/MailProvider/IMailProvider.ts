export interface ISendMailParams {
    from: string;
    to: string;
    subject?: string;
    text: string;
    html?: string;
}

export interface IMailProvider {
    sendMail: (params: ISendMailParams) => Promise<void>;
}
