const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

async function runTestWithCaps () {
  let driver = await new Builder().forBrowser("chrome").build();
    try {

      const address = "your address goes here."
      await driver.get(address);
      await driver.wait(until.titleMatches(/React App/i), 6000);

      const email = "your email";
      const pwd = "your password";
      await driver.findElement(By.xpath("(//*[@class='LoginInput'])[1]")).sendKeys(email);
      await driver.findElement(By.xpath("(//*[@class='LoginInput'])[2]")).sendKeys(pwd,Key.RETURN);

  } catch (e) {
    console.log(e);
  }

  await delay(3000);
  await driver.quit();
  
}


runTestWithCaps();