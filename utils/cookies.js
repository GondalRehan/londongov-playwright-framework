import { Page } from '@playwright/test';

export async function acceptCookiesIfVisible(page) {
  
  await page.getByRole('button', { name: 'I Accept' }).click();
  // Match typical cookie banners

  // const acceptButton = page.locator('//*[@id="ccc-notify-accept"]/span"), #onetrust-accept-btn-handler');

  // // If visible, click it
  // if (await acceptButton.first().isVisible().catch(() => false)) {
  //   await acceptButton.first().click();
  }


// Accept common cookie banners automatically
async function acceptCookies(page) {
  const selectors = [
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Accept cookies")',
    'button:has-text("Accept Cookies")',
    'button:has-text("Allow all")',
    'button:has-text("I accept")',
    'button:has-text("I Accept")',
    'button:has-text("Agree")',
    'button[aria-label="Accept cookies"]',
    '#onetrust-accept-btn-handler',
    'button#accept',
    'button.cookie-accept'
  ];

  for (const sel of selectors) {
    const btn = page.locator(sel);
    if (await btn.count() > 0) {
      try {
        await btn.first().click({ timeout: 2000 });
        console.log("Cookies accepted.");
        return;
      } catch {}
    }
  }

  console.log("No cookie banner found.");
}
export { acceptCookies };

