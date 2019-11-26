import AxiosDigest, { AxiosDigestInstance } from "../src/http/digest-client";

const rand = (): number => {
  return Math.floor(Math.random() * 0x100);
};
const username = "admin";
const passwd = "123456";

const url = "/howell/ver10/data_service/village_system/Villages";
const base = "http://192.168.21.244:9000/";

//const axios = new AxiosDigestInstance(username, passwd, true);
const axios = AxiosDigest.create(username, passwd, true);

test("MD5", async () => {
  const a = await axios.get(`${base}${url}`);
  expect(a.status).toBe(200);
});
/*test("SHA-256", async () => {
  const a = await axios.get(`${base}${url}SHA-256`);
  expect(a.status).toBe(200);
});
test("SHA-512", async () => {
  const a = await axios.get(`${base}${url}SHA-512`);
  expect(a.status).toBe(200);
});
const url2 = `/digest-auth/auth-int/${username}/${passwd}/`;
test("MD5-int (not support)", () => {
  expect(axios.get(`${base}${url2}MD5`)).rejects.toMatch("error");
});
test("SHA-256-int (not support)", () => {
  expect(axios.get(`${base}${url2}SHA-256`)).rejects.toMatch("error");
});
test("SHA-512-int (not support)", () => {
  expect(axios.get(`${base}${url2}SHA-512`)).rejects.toMatch("error");
});*/
