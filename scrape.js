const fs = require('fs');
const got = require('got');
const cheerio = require('cheerio');

const NEPCAL_URL = 'http://nepcal.com/index.php';

const NP_START_YEAR = 1975;
const NP_END_YEAR = 2100;

const APRIL = 4;

/**
 * It's time to sleep.
 *
 * @param {Number} ms
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the arabic number for the Nepali counterpart.
 *
 * @param {string} num
 * @returns {string}
 */
function toArabic(num) {
  const npToEnMap = {
    '०': 0,
    '१': 1,
    '२': 2,
    '३': 3,
    '४': 4,
    '५': 5,
    '६': 6,
    '७': 7,
    '८': 8,
    '९': 9,
  };

  const chars = num.split('');

  return chars.reduce((prev, curr) => prev + npToEnMap[curr], '');
}

/**
 * Scrape EN and NP dates from nepcal.com.
 */
async function scrape() {
  const calendar = [];

  for (npYear = NP_START_YEAR; npYear <= NP_END_YEAR; npYear++) {
    const m = npYear === NP_END_YEAR ? 1 : 12;
    const { body } = await got(NEPCAL_URL + `?y=${npYear}&m=${m}`);
    const $ = cheerio.load(body);

    const dayContainers = $('.mrow div[class*="day_container"]').filter((_, el) => {
      const element = $(el);
      const isFaded = element.hasClass('faded') || element.hasClass('faded_h');

      return !isFaded;
    });

    const days = dayContainers.find('div[class*="dayvaln"]').filter((_, el) => {
      const element = $(el);
      const value = element.text().trim();

      return value !== '';
    });

    // Start of every Nepali year is April.
    let enMonth = APRIL;

    days.each((_, el) => {
      const element = $(el);

      // Day
      const npDay = Number(toArabic(element.text().trim()));
      const enDay = Number(element.next('div[class*="dayvale"]').text().trim());

      // Month
      // A.K.A Death by Parent
      const monthDiv = element.parent().parent().parent('div[class*="msmall"]');

      const npMonthDivOnClickAttr = monthDiv.attr('onclick');
      let [, npMonth] = npMonthDivOnClickAttr.match(/m=(\d+)/);
      npMonth = Number(npMonth);

      if (enDay === 1) {
        enMonth += 1;
      }

      if (enMonth > 12) {
        enMonth = enMonth - 12;
      }

      // Year
      let [enYear] = monthDiv.find('div[class*="mheade"]').text().match(/\d+/);
      enYear = Number(enYear);

      const value = {
        npYear,
        npMonth,
        npDay,
        enYear,
        enMonth,
        enDay,
      };

      calendar.push(value);
    });

    // Progress dots for the impatient.
    if (npYear % 3 === 0) {
      process.stdout.write('.');
    }

    // Graceful requests to nepcal.com
    await sleep(1000);

    fs.writeFileSync('export.json', JSON.stringify(calendar, null, 2));
  }
}

// Scrape for me please.
scrape();
