export interface UsernamePassword {
    username: string;
    passwd: string;
}
export declare class ClientCredentials implements UsernamePassword {
    username: string;
    passwd: string;
    webBrowserAuth: boolean;
    constructor(username: string, passwd: string, webBrowserAuth?: boolean);
}
