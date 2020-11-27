const { write } = require('fs');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();


    // put link here - Make sure they are links for a specific person...
    await page.goto('https://www.quotes.net/authors/Justin+Amash');
    


    await page.waitForTimeout(500)
    let writeArray = []


    writeArray = await page.evaluate(() => {
        let segment = {
            "quote": "",
            "author": ""
        }
        let returnArray = []
        for (i = 1; i < document.querySelector("#content-body > div > div.tdata-ext > div").children.length; i++) {
            segment = {
                "quote": "",
                "author": ""
            }
            try {
                segment.quote = document.querySelector(`#content-body > div > div.tdata-ext > div > div:nth-child(${i}) > blockquote > a`).innerText
                segment.author = document.querySelector("#content-body > div > div.tdata-ext > div > div:nth-child(1) > p > a").innerText.replace("–","").trim()
            } catch (err) {
                console.log(err)
            }
            returnArray.push(segment)
        }
        return returnArray
    })


    console.log(writeArray)
    fs.writeFileSync('quotesNet.json', JSON.stringify(writeArray));

    // await browser.close();
})();