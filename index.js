const { write } = require('fs');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.brainyquote.com/authors/jerome-powell-quotes');
    //   await page.screenshot({path: 'example.png'});
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
                console.log(i)
                console.log(document.querySelector(`#quotesList >div:nth-child(${i})>div>a`).innerText)
            } catch (err) {
                console.log(err)
            }
            returnArray.push(segment)
        }
        return returnArray
    })


    console.log(writeArray)
    // fs.writeFile('quotes.json', writeArray, function (err) {
    //     if (err) return console.log(err);
    //     console.log('Hello World > helloworld.txt');
    // })
    fs.writeFileSync('quotes.json', JSON.stringify(writeArray));

    // await browser.close();
})();