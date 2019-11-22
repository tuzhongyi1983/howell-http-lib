export interface UsernamePassword {
  username: string;
  passwd: string;
}

export class ClientCredentials implements UsernamePassword {
  username: string;
  passwd: string;
  webBrowserAuth: boolean;

  constructor(username: string, passwd: string, webBrowserAuth?: boolean) {
    this.username = username;
    this.passwd = passwd;
    this.webBrowserAuth = webBrowserAuth === undefined ? true : webBrowserAuth;
  }
}
