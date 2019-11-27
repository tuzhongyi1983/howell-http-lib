import { AxiosDigestInstance } from "../src/http/digest-client";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse
} from "axios";
const rand = (): number => {
  return Math.floor(Math.random() * 0x100);
};
const username = "admin";
const passwd = "123456";

const url = "/howell/ver10/data_service/village_system/Villages";
const base = "http://192.168.21.244:9000/";

//const axios = new AxiosDigestInstance(username, passwd, true);
//const axios = new AxiosDigestInstance(username, passwd, true);
const client = new AxiosDigestInstance(
  username,
  passwd,
  true,
  axios.create({
    baseURL: base,
    timeout: 10000
  })
);
test("MD5", async () => {
  const a = await client.get(`${url}`, { timeout: 10000 });
  expect(a.status).toBe(200);
});
