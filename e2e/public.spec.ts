import { expect, test } from "@playwright/test";

test("trang chủ render, không màn trắng", async ({ page }) => {
  const res = await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(res?.status()).toBeLessThan(400);
  expect((await page.locator("body").innerText()).trim().length).toBeGreaterThan(80);
  await expect(page.getByRole("img", { name: /MONA Pay/i }).first()).toBeVisible();
});

test("/ngan-hang: ACB và BIDV đều ở trạng thái Đang hoạt động", async ({ page }) => {
  await page.goto("/ngan-hang", { waitUntil: "domcontentloaded" });
  // Hàng BIDV phải có badge 'Đang hoạt động' (ghi như thật — Mon chốt 15/09).
  const bidvRow = page.locator("tr", { hasText: "BIDV" }).first();
  await expect(bidvRow).toContainText(/Đang hoạt động/);
  const acbRow = page.locator("tr", { hasText: "ACB" }).first();
  await expect(acbRow).toContainText(/Đang hoạt động/);
});

test("/ngan-hang: không có link gãy tới /bidv (chưa có trang riêng)", async ({ page }) => {
  await page.goto("/ngan-hang", { waitUntil: "domcontentloaded" });
  await expect(page.locator('a[href="/bidv"]')).toHaveCount(0);
});
