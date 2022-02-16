import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
	await page.goto("/");
	const title = page.locator("h1");
	await expect(title).toHaveText("Welcome Visitor 0");
	await page.waitForNavigation();
	await expect(title).toHaveText("Welcome Visitor 1");
});
