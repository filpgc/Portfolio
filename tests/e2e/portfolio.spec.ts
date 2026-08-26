import { expect, test } from "@playwright/test";

test("renders the portfolio structure and primary sections", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(/Filippo Piggici/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /I’m Filippo.*systems behind them/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Selected Work" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Experience" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "I make music, too." }),
  ).toBeVisible();
});

test("project tabs expose one selected project consistently", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#work", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const streamingTab = page.getByRole("tab", {
    name: /Streaming Calculator/i,
  });
  await streamingTab.click();

  await expect(streamingTab).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tabpanel").getByRole("button", {
      name: "Explore Streaming Calculator",
      exact: true,
    }),
  ).toBeVisible();

  await streamingTab.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /Treatwell/i })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("project details gallery adapts across mobile and tablet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#work", { waitUntil: "domcontentloaded" });

  await page
    .getByRole("button", { name: "Explore Outverse", exact: true })
    .click();

  const mobileDialog = page.getByRole("dialog", {
    name: /Outverse selected work/i,
  });
  await expect(mobileDialog).toBeVisible();

  const galleryRegion = mobileDialog.getByRole("region", {
    name: "Project gallery",
  });
  await expect(galleryRegion).toBeVisible();

  const previousSlide = mobileDialog.getByRole("button", {
    name: "Previous slide",
  });
  const nextSlide = mobileDialog.getByRole("button", { name: "Next slide" });
  await expect(previousSlide).toBeDisabled();
  await expect(nextSlide).toBeEnabled();

  await nextSlide.click();
  await expect(
    mobileDialog.getByRole("button", { name: "View Intent orchestration" }),
  ).toHaveAttribute("aria-current", "true");
  await expect(previousSlide).toBeEnabled();

  await page.keyboard.press("ArrowLeft");
  await expect(
    mobileDialog.getByRole("button", { name: "View Conversation history" }),
  ).toHaveAttribute("aria-current", "true");

  const firstGalleryImage = mobileDialog.getByRole("img", {
    name: /conversation workspace showing customer messages/i,
  });
  await expect(firstGalleryImage).toHaveCSS("object-fit", "contain");
  const galleryRatios = await firstGalleryImage.evaluate(async (image) => {
    const element = image as HTMLImageElement;
    await element.decode();
    const frame = element.parentElement?.getBoundingClientRect();

    return {
      asset: element.naturalWidth / element.naturalHeight,
      frame: frame ? frame.width / frame.height : 0,
    };
  });
  expect(Math.abs(galleryRatios.asset - galleryRatios.frame)).toBeLessThan(
    0.01,
  );

  const mobileDialogBox = await mobileDialog.boundingBox();
  const mobileSlideBox = await mobileDialog
    .getByRole("group", { name: /1 of 8/i })
    .boundingBox();
  expect(mobileDialogBox).not.toBeNull();
  expect(mobileSlideBox).not.toBeNull();
  expect(mobileDialogBox!.width).toBe(390);
  expect(mobileSlideBox!.width / mobileDialogBox!.width).toBeGreaterThan(0.85);

  const intentControl = mobileDialog.getByRole("button", {
    name: "View Intent orchestration",
  });
  await intentControl.click();
  await expect(intentControl).toHaveAttribute("aria-current", "true");

  const interactionControl = mobileDialog.getByRole("button", {
    name: "View Interaction prototypes",
  });
  await interactionControl.click();
  await expect(interactionControl).toHaveAttribute("aria-current", "true");
  await expect(nextSlide).toBeEnabled();

  const finalSlideControl = mobileDialog.getByRole("button", {
    name: "View Integration testing",
  });
  await finalSlideControl.click();
  await expect(finalSlideControl).toHaveAttribute("aria-current", "true");
  await expect(nextSlide).toBeDisabled();

  await mobileDialog.getByRole("button", { name: "Close gallery" }).click();
  await expect(mobileDialog).toBeHidden();

  await page.setViewportSize({ width: 820, height: 1180 });
  await page
    .getByRole("button", { name: "Explore Outverse", exact: true })
    .click();

  const tabletDialog = page.getByRole("dialog", {
    name: /Outverse selected work/i,
  });
  const tabletDialogBox = await tabletDialog.boundingBox();
  const tabletSlideBox = await tabletDialog
    .getByRole("group", { name: /1 of 8/i })
    .boundingBox();
  expect(tabletDialogBox).not.toBeNull();
  expect(tabletSlideBox).not.toBeNull();
  expect(tabletSlideBox!.width / tabletDialogBox!.width).toBeGreaterThan(0.67);
  expect(tabletSlideBox!.width / tabletDialogBox!.width).toBeLessThan(0.9);
});

test("project galleries include prototype and editorial case-study slides", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#work", { waitUntil: "domcontentloaded" });

  await page
    .getByRole("button", { name: "Explore Outverse", exact: true })
    .click();
  const outverseDialog = page.getByRole("dialog", {
    name: /Outverse selected work/i,
  });
  await expect(
    outverseDialog.getByRole("link", { name: "Case study" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/filpgc/Portfolio/blob/main/README.md",
  );
  await outverseDialog
    .getByRole("button", { name: "View Interaction prototypes" })
    .click();
  await expect(
    outverseDialog.getByRole("img", {
      name: /sandbox prototype showing suggested customer support actions/i,
    }),
  ).toBeVisible();
  await expect(
    outverseDialog.getByRole("img", {
      name: /voice prototype showing a connected audio conversation/i,
    }),
  ).toBeVisible();
  await outverseDialog.getByRole("button", { name: "Close gallery" }).click();

  await page.getByRole("tab", { name: /Streaming Calculator/i }).click();
  await page
    .getByRole("button", {
      name: "Explore Streaming Calculator",
      exact: true,
    })
    .click();
  const streamingDialog = page.getByRole("dialog", {
    name: /Streaming Calculator selected work/i,
  });
  await streamingDialog
    .getByRole("button", { name: "View Editorial discovery" })
    .click();
  await expect(
    streamingDialog.getByRole("img", {
      name: /Blog and Guides index/i,
    }),
  ).toBeVisible();
});

test("music timeline supports persistent seeking", async ({ page }) => {
  await page.goto("/#music", { waitUntil: "domcontentloaded" });

  const music = page.getByRole("region", { name: "Music by Moyo" });
  const audio = music.locator("audio");
  const timeline = music.getByRole("slider", {
    name: /Seek through Catch Me/i,
  });
  await expect(timeline).toBeAttached();
  await expect(timeline).toBeEnabled();

  await music.getByRole("button", { name: "Play Catch Me" }).click();
  await expect
    .poll(() =>
      audio.evaluate((element) => (element as HTMLAudioElement).currentTime),
    )
    .toBeGreaterThan(0);

  const timelineBox = await timeline.boundingBox();
  expect(timelineBox).not.toBeNull();
  await timeline.click({
    position: {
      x: timelineBox!.width * 0.75,
      y: timelineBox!.height / 2,
    },
  });
  await expect
    .poll(() =>
      audio.evaluate((element) => (element as HTMLAudioElement).currentTime),
    )
    .toBeGreaterThan(100);
  await expect
    .poll(async () => Number(await timeline.inputValue()))
    .toBeGreaterThan(100);

  await page.waitForTimeout(1_000);
  await expect
    .poll(() =>
      audio.evaluate((element) => (element as HTMLAudioElement).currentTime),
    )
    .toBeGreaterThan(100);
});

test("uses light by default and restores an explicitly saved theme", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const themeToggle = page.getByRole("button", { name: "Toggle colour theme" });
  await expect(themeToggle).toBeVisible();

  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle colour theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("contact popover submits a verified message and keeps its receipt visible", async ({
  page,
}) => {
  let submittedBody: Record<string, string> | undefined;

  await page.route("**/turnstile/v0/api.js*", async (route) => {
    const onload = new URL(route.request().url()).searchParams.get("onload");
    await route.fulfill({
      contentType: "application/javascript",
      body: `window.turnstile = {
          render: function (_container, options) {
            setTimeout(function () {
              options.callback("test-turnstile-token");
            });
            return "test-widget";
          },
          getResponse: function () { return "test-turnstile-token"; },
          reset: function () {},
          remove: function () {}
        };
        if (${JSON.stringify(onload)} && window[${JSON.stringify(onload)}]) {
          window[${JSON.stringify(onload)}]();
        }`,
    });
  });
  await page.route("**/api/send", async (route) => {
    submittedBody = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({
      status: 204,
    });
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Let's chat" }).click();

  const popover = page.locator("#my-popover");
  const email = "visitor@example.com";
  const message = "Hello from the portfolio contact form.";
  await popover
    .getByRole("textbox", { name: "Your email address" })
    .fill(email);
  await popover.getByRole("textbox", { name: "Message" }).fill(message);

  const sendButton = popover.getByRole("button", { name: "Send", exact: true });
  await expect(sendButton).toBeEnabled();
  await sendButton.click();

  await expect
    .poll(() => submittedBody)
    .toEqual({
      email,
      message,
      turnstileToken: "test-turnstile-token",
    });
  await expect(popover.getByText("Message sent to Filippo")).toBeVisible();
  await expect(popover.getByText(`Receipt sent to ${email}`)).toBeVisible();

  await page.waitForTimeout(3_200);
  await expect(popover.getByText("Message sent to Filippo")).toBeVisible();

  await popover.getByRole("button", { name: "Dismiss message status" }).click();
  await expect(popover.getByText("Message sent to Filippo")).toBeHidden();
});
