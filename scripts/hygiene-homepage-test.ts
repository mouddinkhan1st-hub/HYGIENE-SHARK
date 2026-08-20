import { chromium } from "playwright";

const url = process.env.APP_URL || "http://localhost:4173";
const browser = await chromium.launch({ headless: true });
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: "networkidle" });
  if (
    !(await page
      .getByRole("heading", { name: /rebuilt for modern life/i })
      .isVisible())
  )
    throw new Error("Hero missing");
  if ((await page.locator(".product-card").count()) !== 4)
    throw new Error("Expected four products");
  await page.locator(".product-card button").first().click();
  if (!(await page.getByLabel(/cart with 1 items/i).isVisible()))
    throw new Error("Cart did not update");
  await page.screenshot({
    path: `artifacts/home-${viewport.width}.png`,
    fullPage: true,
  });
  await page.close();
}
await browser.close();
console.log("Homepage desktop + mobile checks passed");
