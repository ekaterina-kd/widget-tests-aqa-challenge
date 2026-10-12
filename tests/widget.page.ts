import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    BUTTON_ALL_ARTICLES = '[data-test=button_all_articles]',
    ARTICLE_SECTION = 'ul[class^=sections__]',
    ARTICLE_SECTION_ITEM = `${ARTICLE_SECTION} > li`,
    ARTICLE_SECTION_ITEM_TITLE = 'div[class^=section-title__]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
    static readonly selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    openWidget() {
        return this.page.locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    openAllArticles() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_ALL_ARTICLES).click();
    }

    getAllArticlesItems() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_SECTION_ITEM);
    }

    getAllArticlesTitle(index: number) {
        return this.getAllArticlesItems().nth(index).locator(WidgetPage.selector.ARTICLE_SECTION_ITEM_TITLE);
    }

    getPopularArticlesItems() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
    }

    clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    widgetTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}

