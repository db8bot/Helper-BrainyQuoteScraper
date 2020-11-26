const { write } = require('fs');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();


    // put link here - Make sure they are links for a specific person...
    await page.goto('https://www.brainyquote.com/authors/jerome-powell-quotes');


    await page.waitForTimeout(500)
    let writeArray = []


    writeArray = await page.evaluate(() => {
        let segment = {
            "quote": "",
            "author": ""
        }
        let returnArray = []
        for (i = 1; i < document.querySelector("#quotesList").children.length; i++) {
            segment = {
                "quote": "",
                "author": ""
            }
            try {
                segment.quote = document.querySelector(`#quotesList >div:nth-child(${i})>div>a`).innerText
                segment.author = document.querySelector(`#quotesList >div:nth-child(${i})>div>a:nth-child(3)`).innerText
            } catch (err) {
                console.log(err)
            }
            returnArray.push(segment)
        }
        return returnArray
    })


    console.log(writeArray)
    fs.writeFileSync('quotes.json', JSON.stringify(writeArray));

    // await browser.close();
})();