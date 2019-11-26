"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientCredentials = (function () {
    function ClientCredentials(username, passwd, webBrowserAuth) {
        this.username = username;
        this.passwd = passwd;
        this.webBrowserAuth = webBrowserAuth === undefined ? true : webBrowserAuth;
    }
    return ClientCredentials;
}());
exports.ClientCredentials = ClientCredentials;
//# sourceMappingURL=credentials.js.map