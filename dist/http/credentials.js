"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientCredentials {
    constructor(username, passwd, webBrowserAuth) {
        this.username = username;
        this.passwd = passwd;
        this.webBrowserAuth = webBrowserAuth === undefined ? true : webBrowserAuth;
    }
}
exports.ClientCredentials = ClientCredentials;
//# sourceMappingURL=credentials.js.map