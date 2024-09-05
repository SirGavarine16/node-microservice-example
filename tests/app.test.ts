import request from "supertest";
import type { Express } from "express";

import { createApp } from "./../src/app";

let app: Express;

beforeAll(async () => {
  app = (await createApp()).app;
})

describe("Express app tests", () => {
  it("createApp function should return an app variable", () => {
    expect(app).toBeDefined();
  });

  it("GET request to /health should have a 200 HTTP response status", async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it("GET request to /health should return a 'message' string", async () => {
    const response = await request(app).get('/health');
    expect(response.body?.message).toEqual(expect.any(String));
  });

  it("GET request to /health should return a 'Service is up and running!' message", async () => {
    const response = await request(app).get('/health');
    expect(response.body?.message).toBe("Service is up and running!");
  })
});