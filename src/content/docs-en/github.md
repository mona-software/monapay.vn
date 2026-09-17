---
title: "MONA Pay source code on GitHub"
description: "A map of MONA Pay repositories under The MONA Group: 10 SDKs, MCP, CLI, plugins, connectors and examples, plus issue, pull request and security guidance."
updated: 05/09/2026
---

MONA Pay source code and integration examples live under [github.com/themonagroup](https://github.com/themonagroup). Choose by task: an SDK for API calls in your backend, MCP for an AI coding agent, the CLI for terminal testing, or a plugin or connector for an e-commerce platform.

The endpoint documentation is published separately at `monapay.vn`. When a README or example does not explain a field, check the [OpenAPI 3.1 specification](/openapi.json) and the matching API page before sending a live request.

## Repository map

| Repository | Contents | Status recorded in the repository |
|---|---|---|
| [`monapay-node`](https://github.com/themonagroup/monapay-node) | Node.js / TypeScript SDK, package `@monapay/node` | npm 0.5.1 published |
| [`monapay-python`](https://github.com/themonagroup/monapay-python) | Python SDK, package `monapay` | PyPI 0.5.1 published |
| [`monapay-go`](https://github.com/themonagroup/monapay-go) | Go SDK, module `github.com/themonagroup/monapay-go` | 0.4.0 tag, installable through the module path |
| [`monapay-php`](https://github.com/themonagroup/monapay-php) | PHP SDK, intended package `monapay/php-sdk` | 0.4.0 tag; on GitHub, not on Packagist yet |
| [`monapay-java`](https://github.com/themonagroup/monapay-java) | Java SDK, Maven artifact `com.themona:monapay` | 0.4.0 tag; on GitHub, not on Maven Central yet |
| [`monapay-dotnet`](https://github.com/themonagroup/monapay-dotnet) | .NET SDK, NuGet package `MonaPay` | 0.4.0 tag; on GitHub, not on NuGet yet |
| [`monapay-ruby`](https://github.com/themonagroup/monapay-ruby) | Ruby SDK, gem `monapay` | 0.4.0 tag; on GitHub, not on RubyGems yet |
| [`monapay-dart`](https://github.com/themonagroup/monapay-dart) | Dart / Flutter SDK, package `monapay` | 0.4.0 tag; on GitHub, not on pub.dev yet |
| [`monapay-rust`](https://github.com/themonagroup/monapay-rust) | Rust SDK, crate `monapay` | 0.4.0 tag; on GitHub, not on crates.io yet |
| [`monapay-elixir`](https://github.com/themonagroup/monapay-elixir) | Elixir SDK, Hex package `monapay` | 0.4.0 tag; on GitHub, not on Hex yet |
| [`monapay-mcp`](https://github.com/themonagroup/monapay-mcp) | MCP server for Claude Code, Cursor and Codex | npm `monapay-mcp` 0.6.0; manifest contains 50 tools |
| [`monapay-cli`](https://github.com/themonagroup/monapay-cli) | CLI for login, QR creation, transaction queries and webhook listening | npm `@monapay/cli` 0.2.0 published |
| [`woocommerce-monapay`](https://github.com/themonagroup/woocommerce-monapay) | WooCommerce plugin for hosted checkout or VietQR with automatic order confirmation | GitHub release 0.3.2; WordPress.org account review pending |
| [`monapay-connectors`](https://github.com/themonagroup/monapay-connectors) | Shopify app, platform adapters and commerce modules | Shopify, OpenCart and PrestaShop passed sandbox flows through `paid`; Magento remains a scaffold |
| [`monapay-examples`](https://github.com/themonagroup/monapay-examples) | Next.js, Express, NestJS, Laravel, Django, FastAPI, Spring Boot and Go samples | 8 examples completed with runtime-specific gates |
| [`monapay.vn`](https://github.com/themonagroup/monapay.vn) | Website, docs, `llms.txt`, OpenAPI and Postman collection | Public documentation at [monapay.vn/docs](/en/docs) |

Each SDK repository includes a README, `SECURITY.md`, a licence file and a webhook example for its language. Check runtime requirements, install a specific version and run the repository's tests before introducing it into a system that collects money.

## Use the `monapay` CLI

The CLI requires Node.js 18 or later. Its published package is `@monapay/cli`:

```bash
npm install --global @monapay/cli
```

When developing inside the `monapay-cli` repository, run `npm link` from the repository directory to link the command locally.

### Log in with an API key

```bash
monapay login \
  --client-id "$MONAPAY_CLIENT_ID" \
  --client-secret "$MONAPAY_CLIENT_SECRET"

monapay me
```

The CLI exchanges the client credentials for an OAuth token and caches it for its lifetime. Credentials are stored in `~/.config/monapay/credentials.json`; the directory uses mode `700` and the file uses mode `600`. Set `MONAPAY_CONFIG_DIR` to choose another location.

### Create a dynamic VietQR

Dynamic QR creation needs the ACB merchant values in environment variables such as `MONAPAY_OWNER_NUMBER`, `MONAPAY_MERCHANT_ID`, `MONAPAY_TERMINAL_ID`, `MONAPAY_VA_PREFIX` and `MONAPAY_BENEFICIARY_NAME`. After setting them:

```bash
monapay qr create \
  --order DH10234 \
  --amount 2500000 \
  --desc "Payment DH10234"
```

The CLI prints `qr_data_url` and saves `DH10234.png`. Use `--out ./public/qr/DH10234.png` to choose another path.

### Query transactions

```bash
monapay tx list \
  --va MONA0000010234 \
  --limit 100

monapay tx list \
  --va MONA0000010234 \
  --since-id FT26240001234 \
  --json
```

`--since-id` stops before the known transaction and does not print it again. This filter runs in the CLI; your order database should still enforce uniqueness on `transaction_code`.

### Listen for webhooks locally

```bash
export MONAPAY_WEBHOOK_SECRET="hmac-secret"
monapay webhook listen --port 3939
```

To forward verified payloads to a running application:

```bash
monapay webhook listen \
  --port 3939 \
  --forward http://localhost:8000/webhook
```

MONA Pay needs a public HTTPS URL for the test delivery. Open a tunnel to port 3939, then run `monapay webhooks test --url https://YOUR-TUNNEL.example`.

## OpenAPI and Postman

| File | Contents | Use |
|---|---|---|
| [`openapi.json`](/openapi.json) | OpenAPI 3.1 with 52 paths at the time of this update | Import into Postman, Insomnia or a client generator; use it as the source for methods, paths, fields and responses |
| [`monapay.postman_collection.json`](/monapay.postman_collection.json) | 20 sample requests | Import the collection and set `baseUrl`, `accessToken` and `clientSecret` in a separate environment |
| [`llms.txt`](/llms.txt) | Documentation index with Markdown links | Give it to an AI agent so it can select the right page |
| [`llms-full.txt`](/llms-full.txt) | Full Vietnamese and English documentation | Use when an agent needs the whole reference in one load |

The collection's default `baseUrl` is `https://api.monapay.vn`. Never enter a live secret and then export or commit the Postman environment.

## Report a bug

Open **Issues** in the repository that owns the affected code and include:

1. Runtime and package version.
2. Short reproduction steps with tokens, secrets, account numbers and customer data removed.
3. Expected and actual results.
4. The HTTP status, `message` and relevant sanitised logs.

Search open issues first to avoid duplicates. If an API endpoint fails through an SDK, opening the issue in the SDK repository is fine; include the API path so the MONA team can route it correctly.

## Submit a pull request

Fork the repository, create a focused branch, update tests and adjust the README when public behaviour changes. Run the gates documented in the README or package scripts before opening the pull request. The description should cover the reason, file scope, verification steps and screenshots for plugin UI changes.

Never commit `.env` files, API keys, access tokens, webhook secrets, CLI credential files or live transaction data. Use fake order and VA identifiers in fixtures.

## Licences and security reports

The SDKs, MCP server, CLI and examples use MIT. The WooCommerce plugin uses GPLv2 or later. Some connector components have separate terms; for example, the current Magento metadata says `proprietary`. Read the `LICENSE` file or package metadata in the exact repository before redistribution.

Do not post a vulnerability in a public issue. Email `info@themona.global` with the subject `[security] monapay`, reproduction details and impact. Under `SECURITY.md`, the team acknowledges reports within 2 business days and publishes details only after a fix is available.
