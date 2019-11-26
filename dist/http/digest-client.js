"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var credentials_1 = require("./credentials");
var js_md5_1 = tslib_1.__importDefault(require("js-md5"));
var js_sha256_1 = require("js-sha256");
var js_sha512_1 = require("js-sha512");
var AxiosDigestInstance = (function () {
    function AxiosDigestInstance(username, passwd, webBrowserAuth, customAxios) {
        var _this = this;
        this.getWwwAuth = function (r) {
            var status = r.response.status;
            if (status === 401 || (_this.webBrowserAuth === true && status === 403)) {
                return {
                    reAuth: true,
                    authenticateHeader: r.response.headers["www-authenticate"]
                };
            }
            throw r;
        };
        this.axios = customAxios !== undefined ? customAxios : axios_1.default;
        this.clientCredentials = new credentials_1.ClientCredentials(username, passwd, webBrowserAuth);
    }
    Object.defineProperty(AxiosDigestInstance.prototype, "clientCredentials", {
        get: function () {
            return new credentials_1.ClientCredentials(this.username, this.passwd, this.webBrowserAuth);
        },
        set: function (credentials) {
            this.username = credentials.username;
            this.passwd = credentials.passwd;
            this.webBrowserAuth = credentials.webBrowserAuth;
            if (this.webBrowserAuth === false) {
                axios_1.default.defaults.headers["X-WebBrowser-Authentication"] = null;
            }
            else {
                axios_1.default.defaults.headers["X-WebBrowser-Authentication"] = "Forbidden";
            }
        },
        enumerable: true,
        configurable: true
    });
    AxiosDigestInstance.prototype.get = function (path, config) {
        var _this = this;
        return this.axios
            .get(path, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(authenticateHeader, "GET", path, config);
                return _this.axios.get(path, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.post = function (path, data, config) {
        var _this = this;
        return this.axios
            .post(path, data, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(authenticateHeader, "POST", path, config);
                return _this.axios.post(path, data, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.put = function (path, data, config) {
        var _this = this;
        return this.axios
            .put(path, data, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(authenticateHeader, "PUT", path, config);
                return _this.axios.put(path, data, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.delete = function (path, config) {
        var _this = this;
        return this.axios
            .delete(path, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(authenticateHeader, "DELETE", path, config);
                return _this.axios.delete(path, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.head = function (path, config) {
        var _this = this;
        return this.axios
            .head(path, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(wwwAuth, "HEAD", path, config);
                return _this.axios.head(path, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.patch = function (path, data, config) {
        var _this = this;
        return this.axios
            .patch(path, data, config)
            .catch(this.getWwwAuth)
            .then(function (wwwAuth) {
            var reAuth = wwwAuth.reAuth, authenticateHeader = wwwAuth.authenticateHeader;
            if (reAuth === true) {
                var c = _this.getAuthHeader(authenticateHeader, "PATCH", path, config);
                return _this.axios.patch(path, data, c);
            }
            return wwwAuth;
        });
    };
    AxiosDigestInstance.prototype.getAuthHeader = function (authHeader, method, url, config) {
        var paramsString = authHeader
            .split(/\s*,?\s*Digest\s*/)
            .filter(function (v) { return v !== ""; });
        var paramsArray = paramsString.map(function (v) {
            return v.split(/\s*,(?=(?:[^"]*"[^"]*")*)\s*/);
        });
        var paramsKvArray = paramsArray.map(function (v) {
            return v.map(function (value) {
                var ret = value
                    .split(/\s*=(?:(?=[^"]*"[^"]*")|(?!"))\s*/, 2)
                    .map(function (v2) {
                    return v2.replace(/^"/, "").replace(/"$/, "");
                });
                return [ret[0], ret[1]];
            });
        });
        var paramsMapArray = paramsKvArray.map(function (v) {
            var t = {};
            v.forEach(function (w) { return (t[w[0]] = w[1]); });
            return t;
        });
        var calams = ["realm", "nonce", "qop", "opaque"];
        var paramsCalamsOk = paramsMapArray
            .map(function (v) {
            if (!("algorithm" in v)) {
                v["algorithm"] = "MD5";
            }
            return v;
        })
            .filter(function (v) {
            return ["MD5", "SHA-256", "SHA-512-256", "SHA-512"].findIndex(function (i) { return i === v.algorithm; }) >= 0;
        })
            .filter(function (v) { return calams.filter(function (value) { return !(value in v); }).length === 0; })
            .filter(function (v) { return v.qop.split(/\s*,\s*/).filter(function (v) { return v === "auth"; }).length !== 0; });
        if (paramsCalamsOk.length === 0) {
            throw new Error("Auth params error.");
        }
        paramsCalamsOk.sort(function (a, b) {
            var _a = [a.algorithm, b.algorithm].map(function (v) {
                if (v === "MD5")
                    return 0;
                if (v === "SHA-256")
                    return 1;
                if (v === "SHA-512-256")
                    return 2;
                return 3;
            }), aEval = _a[0], bEval = _a[1];
            return bEval - aEval;
        });
        var params = paramsCalamsOk[0];
        var username = this.username;
        var passwd = this.passwd;
        var realm = params.realm, nonce = params.nonce, opaque = params.opaque, algorithm = params.algorithm;
        var uri = url
            .split(/^https?:\/\/[^\/]+/)
            .filter(function (v) { return v !== ""; })[0];
        var cnonce = Math.random()
            .toString(32)
            .substring(2);
        var nc = "0001";
        var qop = "auth";
        var hashHex = (function () {
            if (algorithm === "MD5")
                return js_md5_1.default;
            if (algorithm === "SHA-256")
                return js_sha256_1.sha256;
            if (algorithm === "SHA-512-256")
                return js_sha512_1.sha512_256;
            return js_sha512_1.sha512;
        })();
        var hashHexArray = function (data) {
            return hashHex(data.join(":"));
        };
        var a1 = [username, realm, passwd];
        var a1hash = hashHexArray(a1);
        var a2 = [method, uri];
        var a2hash = hashHexArray(a2);
        var a3 = [a1hash, nonce, nc, cnonce, qop, a2hash];
        var response = hashHexArray(a3);
        var dh = {
            realm: realm,
            nonce: nonce,
            uri: uri,
            username: username,
            cnonce: cnonce,
            nc: nc,
            qop: qop,
            algorithm: algorithm,
            response: response,
            opaque: opaque
        };
        var auth = "Digest " + Object.keys(dh)
            .map(function (v) { return v + "=\"" + dh[v] + "\""; })
            .join(", ");
        if (config === undefined) {
            return { headers: { Authorization: auth } };
        }
        config.headers.Authorization = auth;
        return config;
    };
    return AxiosDigestInstance;
}());
exports.AxiosDigestInstance = AxiosDigestInstance;
//# sourceMappingURL=digest-client.js.map