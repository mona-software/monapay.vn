---
title: "MONA Pay MCP server: let Claude Code, Cursor and Codex collect payments"
description: "Install monapay-mcp, connect it with an API key, then create checkout links, query transactions and test webhooks from your coding agent."
updated: 05/09/2026
---

`monapay-mcp` is MONA Pay's official MCP server. It gives Claude Code, Cursor, Codex and other MCP clients 47 tools for creating checkout links and VietQR codes, querying transactions, configuring webhooks and running sandbox tests while they work on your code.

Funds still move directly into your bank account. The MCP server only uses the MONA Pay API to perform the actions you request.

## Before you install it

- Node.js 18 or later.
- A MONA Pay account at [my.monapay.vn](https://my.monapay.vn).
- The configuration block from **API Keys → Create key → Hand to AI agent** in the dashboard.

That block contains a `client_id` and `client_secret`. The agent exchanges them for a Bearer token through OAuth client credentials. It never needs your username or password, so two-factor authentication on your account does not interrupt the integration.

Keep the secret in environment variables or your local MCP configuration. Never put it in source code, screenshots, public GitHub issues or shared chat logs.

## Run it from a terminal

The npm package is named exactly `monapay-mcp` and requires Node.js 18 or later:

```bash
npx monapay-mcp
```

The server uses `stdio`. MCP clients should start it with `npx -y monapay-mcp`.

| Environment variable | Purpose |
|---|---|
| `MONAPAY_CLIENT_ID` | The API key's client ID |
| `MONAPAY_CLIENT_SECRET` | The key secret used to obtain an OAuth token and authorise writes |
| `MONAPAY_BASE_URL` | Optional; defaults to `https://api.monapay.vn` |

`MONAPAY_USERNAME` and `MONAPAY_PASSWORD` remain as a legacy fallback. Client credentials are the recommended path; password authentication will fail when the account has two-factor authentication enabled.

## Claude Code

Copy the block supplied by the dashboard, or replace the sample values below:

```bash
claude mcp add monapay \
  -e MONAPAY_CLIENT_ID=your_client_id \
  -e MONAPAY_CLIENT_SECRET=your_client_secret \
  -- npx -y monapay-mcp
```

Restart Claude Code if it does not pick up the server, then ask: `Check my MONA Pay connection`. The server will use `monapay_whoami`.

## Cursor

Create or update `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "monapay": {
      "command": "npx",
      "args": ["-y", "monapay-mcp"],
      "env": {
        "MONAPAY_CLIENT_ID": "client_id",
        "MONAPAY_CLIENT_SECRET": "client_secret"
      }
    }
  }
}
```

If this file contains a real secret, add it to `.gitignore` before committing. Restart Cursor and check that `monapay` appears in its MCP server list.

## Codex

Add this block to `~/.codex/config.toml`:

```toml
[mcp_servers.monapay]
command = "npx"
args = ["-y", "monapay-mcp"]
env = { MONAPAY_CLIENT_ID = "client_id", MONAPAY_CLIENT_SECRET = "client_secret" }
```

Restart Codex after saving. If you rotate the key in the dashboard or with `monapay_rotate_key`, update `MONAPAY_CLIENT_SECRET` and restart the client.

## All 47 MCP tools

Every tool in the manifest has a scope label so clients can distinguish reads from writes. Labels such as `read`, `checkout:write` and `webhooks:write` classify the action; the OAuth token currently returns `scope: "*"`.

| Area | Tools |
|---|---|
| Connection and profile | `monapay_whoami`, `monapay_me` |
| Banks and virtual accounts | `monapay_list_bank_accounts`, `monapay_list_virtual_accounts`, `monapay_link_bank_start`, `monapay_link_bank_verify_otp`, `monapay_notification_register`, `monapay_notification_verify_otp` |
| Payment profile | `monapay_get_payment_profile`, `monapay_set_payment_profile` |
| Checkout links | `monapay_create_checkout`, `monapay_get_checkout`, `monapay_list_checkouts`, `monapay_cancel_checkout` |
| VietQR | `monapay_create_qr`, `monapay_cancel_qr` |
| Transactions | `monapay_list_transactions`, `monapay_sandbox_transaction`, `monapay_retry_transaction` |
| Webhooks | `monapay_list_webhooks`, `monapay_create_webhook`, `monapay_update_webhook`, `monapay_delete_webhook`, `monapay_test_webhook`, `monapay_webhook_logs`, `monapay_webhook_stats` |
| Email | `monapay_list_email_configs`, `monapay_create_email_config`, `monapay_update_email_config`, `monapay_delete_email_config`, `monapay_verify_email`, `monapay_resend_email_verification`, `monapay_test_email`, `monapay_email_logs`, `monapay_email_stats`, `monapay_list_email_suppressions`, `monapay_remove_email_suppression` |
| Zalo groups | `monapay_list_zalo_groups`, `monapay_create_zalo_group`, `monapay_update_zalo_group`, `monapay_delete_zalo_group`, `monapay_test_zalo_group`, `monapay_zalo_group_logs` |
| API keys | `monapay_generate_key`, `monapay_rotate_key` |
| Local helpers | `monapay_verify_signature`, `monapay_generate_webhook_snippet` |

The server also exposes `monapay://docs/llms`, `monapay://docs/{slug}` and the `integrate-monapay` prompt. `monapay_verify_signature` runs locally and does not make a network request.

## Three requests you can type naturally

**1. “Create a VND 250,000 sandbox checkout for order DH10234.”**

The agent calls `monapay_create_checkout` with `amount: 250000`, `order_code: "DH10234"` and `sandbox: true`, then returns the `checkout_url`. It can later call `monapay_get_checkout` to check the status.

**2. “Show the latest 20 incoming transactions for virtual account MONA0000010234.”**

The agent calls `monapay_list_transactions` with that VA number, page 1 and a limit of 20. This is a read-only reconciliation action.

**3. “Create an HMAC webhook for this shop, test it and inspect the delivery log.”**

The agent can obtain starter code from `monapay_generate_webhook_snippet`, register it with `monapay_create_webhook`, send a test with `monapay_test_webhook`, then inspect `monapay_webhook_logs`. Treat the endpoint as ready only after it returns HTTP 200, 201 or 202.

## Steps that always require a person

- Linking ACB uses two OTPs sent by the bank to your phone. The agent must stop and ask you for both codes.
- Adding an email recipient sends a six-digit verification code. The agent must wait for you to read it from the inbox.
- A Zalo notification group needs a real `group_id` and must already contain Gấu Mona.

Write tools automatically send `X-Client-Secret` when `MONAPAY_CLIENT_SECRET` is configured. Use a separate API key for each machine or project so you can revoke only the affected key after a leak. If exposure is suspected, call `monapay_rotate_key`, update the configuration and restart the MCP client; the old secret stops working immediately.

## Troubleshooting

| Symptom | What to check |
|---|---|
| The client cannot see the server | Run `node --version`; it must be 18 or later. Run `npx -y monapay-mcp` in a terminal to see startup errors |
| `monapay_whoami` returns 401 | Copy `client_id` and `client_secret` again from the same API key |
| A write is rejected | Check `MONAPAY_CLIENT_SECRET` and restart the client after rotating the key |
| A webhook test fails | The URL must be public over HTTPS; inspect `monapay_webhook_logs` for the HTTP status and response time |

Full references: [MCP manifest](/.well-known/mcp-manifest.json) · [AI agent guide](/en/docs/ai-agent) · [Sandbox](/en/docs/api/sandbox)
