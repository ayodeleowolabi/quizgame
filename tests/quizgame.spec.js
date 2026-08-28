// @ts-check
const { test, expect } = require('@playwright/test');

async function getChosenQuestion(page) {
  return page.evaluate(() => window.__quizGameTestHooks.chosenQuestion);
}

async function getRemainingQuestionCount(page) {
  return page.evaluate(() => window.__quizGameTestHooks.allQuestions.length);
}

/**
 * Clicks a category button, then answers the resulting question either
 * correctly or incorrectly, and waits out the app's 2s auto-reset delay.
 * @param {import('@playwright/test').Page} page
 * @param {{ categoryId?: string, correct: boolean }} options
 */
async function playRound(page, { categoryId, correct }) {
  const categoryButton = categoryId
    ? page.locator(`#${categoryId}`)
    : page.locator('#questionscategories .categorybutton:visible').first();

  await categoryButton.click();
  await expect(page.locator('#answers')).toBeVisible();

  const chosen = await getChosenQuestion(page);
  const answerIdx = correct ? chosen.correctIdx : (chosen.correctIdx + 1) % 4;

  await page.locator('#answers .multiplechoice').nth(answerIdx).click();

  // The app shows a message, then resets state after a 2s setTimeout.
  await page.waitForTimeout(2200);
}

test.describe('Quiz Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads with categories visible, answers hidden, and instructions shown', async ({ page }) => {
    await expect(page.locator('#History')).toBeVisible();
    await expect(page.locator('#Science')).toBeVisible();
    await expect(page.locator('#Math')).toBeVisible();
    await expect(page.locator('#answers')).toBeHidden();
    await expect(page.locator('#message')).toContainText('click a category to begin');
    await expect(page.locator('#score')).toHaveText('');
  });

  test('selecting a category shows a question and four non-empty answer choices', async ({ page }) => {
    await page.locator('#History').click();

    await expect(page.locator('#questionscategories')).toBeHidden();
    await expect(page.locator('#answers')).toBeVisible();

    const chosen = await getChosenQuestion(page);
    expect(chosen.category).toBe('History');

    const answerButtons = page.locator('#answers .multiplechoice');
    await expect(answerButtons).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(answerButtons.nth(i)).not.toHaveText('');
    }
  });

  test('choosing the correct answer shows the point-earned message', async ({ page }) => {
    await page.locator('#Science').click();
    const chosen = await getChosenQuestion(page);

    await page.locator('#answers .multiplechoice').nth(chosen.correctIdx).click();

    await expect(page.locator('#message')).toHaveText('You earned 1 point.');
  });

  test('choosing an incorrect answer reveals the correct answer text', async ({ page }) => {
    await page.locator('#Math').click();
    const chosen = await getChosenQuestion(page);
    const wrongIdx = (chosen.correctIdx + 1) % 4;

    await page.locator('#answers .multiplechoice').nth(wrongIdx).click();

    const correctAnswerText = chosen.answers[chosen.correctIdx];
    await expect(page.locator('#message')).toHaveText(
      `The answer was ${correctAnswerText} but try the next one!`
    );
  });

  test('after answering, the UI resets to category selection', async ({ page }) => {
    await playRound(page, { categoryId: 'History', correct: true });

    await expect(page.locator('#questionscategories')).toBeVisible();
    await expect(page.locator('#answers')).toBeHidden();
    await expect(page.locator('h2')).toHaveText('Try a new category!');
  });

  test('score increments by 1 after a correct answer', async ({ page }) => {
    await playRound(page, { categoryId: 'Science', correct: true });
    await expect(page.locator('#score')).toHaveText('1');
  });

  test('score does not increment after an incorrect answer', async ({ page }) => {
    await playRound(page, { categoryId: 'Math', correct: false });
    await expect(page.locator('#score')).toHaveText('0');
  });

  test('score accumulates correctly across multiple rounds', async ({ page }) => {
    await playRound(page, { categoryId: 'History', correct: true });
    await playRound(page, { categoryId: 'Science', correct: true });
    await playRound(page, { categoryId: 'Math', correct: false });

    await expect(page.locator('#score')).toHaveText('2');
  });

  test('a category button disappears once its questions are exhausted', async ({ page }) => {
    // History has 5 questions in the bank.
    for (let i = 0; i < 5; i++) {
      await playRound(page, { categoryId: 'History', correct: true });
    }

    await expect(page.locator('#History')).toBeHidden();
    await expect(page.locator('#Science')).toBeVisible();
    await expect(page.locator('#Math')).toBeVisible();
  });

  test('winning the game shows the win message once score reaches 12+', async ({ page }) => {
    let remaining = await getRemainingQuestionCount(page);
    while (remaining > 0) {
      await playRound(page, { correct: true });
      remaining = await getRemainingQuestionCount(page);
    }

    await expect(page.locator('#message')).toHaveText('YOU WON!');
    await expect(page.locator('#playagain')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Congratulations');
  });

   test('losing the game shows the try-again message, and Play Again resets state', async ({ page }) => {
    let remaining = await getRemainingQuestionCount(page);
    while (remaining > 0) {
      await playRound(page, { correct: false });
      remaining = await getRemainingQuestionCount(page);
    }

    await expect(page.locator('h2')).toContainText('Try again');
    await expect(page.locator('#playagain')).toBeVisible();

    await page.locator('#playagain').click();

    await expect(page.locator('#score')).toHaveText('');
    await expect(page.locator('#History')).toBeVisible();
    await expect(page.locator('#Science')).toBeVisible();
    await expect(page.locator('#Math')).toBeVisible();
    await expect(page.locator('#message')).toContainText('click a category to begin');
  });
});