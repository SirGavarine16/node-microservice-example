import { env } from "./../../src/configs/env";

describe("Environment config file tests", () => {
  it("exported env variable should be defined", () => {
    expect(env).toBeDefined();
  });

  it("env variable should be an object", () => {
    expect(typeof env).toBe("object");
  });

  it("env variable should have a port property", () => {
    expect(env?.port).toBeDefined();
  });

  it("env variable's port property should be a string", () => {
    expect(env?.port).toEqual(expect.any(String));
  });

  it("env variable's port property should be a valid port string", () => {
    expect(isNaN(parseInt(env?.port))).toBe(false);
  });

  it("env variable should have a rabbitmq property", () => {
    expect(env?.rabbitmq).toBeDefined();
  });

  it("nv variable's rabbitmq property should be an object", () => {
    expect(typeof env?.rabbitmq).toBe("object");
  });

  it("exported env variable's rabbitmq property should have a valid structure", () => {
    expect(env?.rabbitmq).toEqual({
      host: expect.any(String),
      port: expect.any(String),
      user: expect.any(String),
      pass: expect.any(String),
      exchange: expect.any(String),
      keys: expect.any(Array),
    });
  });
});
