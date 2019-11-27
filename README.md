## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i howell-http-lib
```

## Usage

```ts
import { AxiosDigestInstance } from "howell-http-lib";

const username = "admin";
const passwd = "123456";

const url = "/howell/ver10/data_service/village_system/Villages";
const base = "http://192.168.21.244:9000/";

const axios = new AxiosDigestInstance(username, passwd, true);

test("MD5", async () => {
  const a = await axios.get(`${base}${url}`);
  expect(a.status).toBe(200);
});
```

## Author

**Tuzhongyi**
