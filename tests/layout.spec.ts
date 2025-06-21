import { test, expect } from '@playwright/test';
import path from 'path';

test('homepage computes correct max-width for container', async ({ page }) => {
  // Устанавливаем размер окна просмотра для десктопа
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Переходим на опубликованный сайт с параметром для сброса кеша
  const cacheBust = `?v=${Date.now()}`;
  await page.goto(`https://26-03-dmitry.github.io/idea/ru${cacheBust}`);

  // Ждем, пока страница полностью прогрузится
  await page.waitForLoadState('networkidle');

  // Находим первый контейнер внутри первой секции.
  // Это самый надежный способ найти наш целевой элемент.
  const containerLocator = page.locator('section:first-of-type > div');

  // Ждем, пока он станет видимым
  await containerLocator.waitFor();

  // Используем page.evaluate для получения вычисленного (computed) стиля
  // Это самый надежный способ узнать, что CSS браузер *действительно* применяет
  const maxWidth = await containerLocator.evaluate((element) => {
    return window.getComputedStyle(element).maxWidth;
  });

  // Добавляем актуальную ширину в отчет
  test.info().annotations.push({
    type: 'info',
    description: `Computed max-width is: ${maxWidth}.`,
  });
  
  // Делаем скриншот для истории
  const screenshotPath = path.join(__dirname, '..', 'test-results', 'homepage-screenshot-v3.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // ПРОВЕРКА: вычисленная максимальная ширина должна быть '1280px'
  // (что соответствует классу 'max-w-7xl' в Tailwind CSS)
  expect(maxWidth).toBe('1280px');
}); 