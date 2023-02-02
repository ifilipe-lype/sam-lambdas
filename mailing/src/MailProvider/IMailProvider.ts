export interface ISendMailParams {
    from: string;
    to: string;
    subject?: string;
    text: string;
}

export interface IMailProvider {
    sendMail: (params: ISendMailParams) => Promise<void>;
}
