const {chromium} =require('playwright');
const user = require('..//user');

(async() => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 10000
    });
    const page = await browser.newPage();
    await page.goto('https://netology.ru/?modal=sign_in');

    //test 1
    await page.locator('[placeholder="Email", force: true]').fill(user.email);
    await page.locator('[placeholder="Пароль", force: true]').fill(user.pass);
    await page.locator('button:has-text("Войти")').click();
    await expect(page.url()).toBe('https://netology.ru/profile');
    await expect(page.locator('h2')).toHaveText("Мои курсы и профессии");
    
    await browser.close();
})();

(async() => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 10000
    });
    const page = await browser.newPage();
    await page.goto('https://netology.ru/?modal=sign_in');

    //test 2
    await page.locator('[placeholder="Email", force: true]').fill(user.invEmail);
    await page.locator('[placeholder="Пароль", force: true]').fill(user.invPass);
    await page.locator('button:has-text("Войти")').click();
    await expect(page.locator('components-ui-Form-Hint--hint--A2dPV inputHint')).toHaveText("Вы ввели неправильно логин или пароль");

    await browser.close();
})();
