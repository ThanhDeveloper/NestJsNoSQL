import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as puppeteer from 'puppeteer';

@Injectable()
export class CrawlersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getResource(pageUrl: string) {
    const URL = pageUrl;
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    const results = await page.evaluate(() => {
      const propertyList = [];

      document.querySelectorAll('.js__card-full-web').forEach((z) => {
        const data = {
          title: z.querySelector('.re__card-title')?.textContent,
        };
        console.log(data);
        propertyList.push(data);
      });
      return propertyList;
    });

    console.log('getDataViaPuppeteer results :', results);
    await browser.close();
    return results;
  }
}
