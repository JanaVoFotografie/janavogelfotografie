import test from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { POST } from "../../src/app/api/kontakt/route";

const request = (body: string) =>
  new Request("https://example.test/api/kontakt/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

test("invalid top-level JSON is rejected without creating a mail transport", async (t) => {
  const transport = t.mock.method(nodemailer, "createTransport", () => {
    throw new Error("This validation test must never attempt SMTP");
  });

  for (const body of ["null", "[]", "[{}]", "true", "false", "42", '"text"', "{"]) {
    await t.test(body, async () => {
      const response = await POST(request(body));
      assert.equal(response.status, 400);
      assert.equal(typeof (await response.json()).error, "string");
      assert.equal(transport.mock.callCount(), 0);
    });
  }

  // Object payloads still reach the existing validation and honeypot handling.
  assert.equal((await POST(request("{}"))).status, 422);
  assert.equal((await POST(request('{"flo-contact-phone":"bot"}'))).status, 200);
  assert.equal(transport.mock.callCount(), 0);
});
