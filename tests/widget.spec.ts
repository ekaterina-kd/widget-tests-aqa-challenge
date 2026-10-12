import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";
import { WidgetData } from './widget.data';

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto(WidgetData.TITLES.MAIN_PAGE);

    // close cookies popup
    await page.click(WidgetData.TITLES.COOKIE_BUTTON);
  });

  test('The widget opens when you click the button', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('Transitioning to support from the widget shows the correct title', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getPopularArticlesItems()).toHaveCount(WidgetData.COUNTS.POPULAR_ARTICLES_ITEMS);

    await widgetPage.getPopularArticlesItems().first().click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.widgetTitle()).toHaveText(WidgetData.TITLES.CONNECTION_WITH_SUPPORT);
  });

  test('Displaying the correct titles of all articles in the widget', async () => {
    await widgetPage.openWidget();

    await widgetPage.openAllArticles();

    await expect(widgetPage.getAllArticlesItems()).toHaveCount(WidgetData.COUNTS.ALL_ARTICLES_ITEMS);

    await expect(widgetPage.getAllArticlesTitle(0)).toHaveText(WidgetData.TITLES.ARTICLES_FIRST);

    await expect(widgetPage.getAllArticlesTitle(1)).toHaveText(WidgetData.TITLES.ARTICLES_SECOND);

    await expect(widgetPage.getAllArticlesTitle(2)).toHaveText(WidgetData.TITLES.ARTICLES_THIRD);
  });
});
