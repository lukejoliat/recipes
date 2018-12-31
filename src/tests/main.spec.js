/* eslint-disable no-undef */
// const faker = require('faker')
const puppeteer = require('puppeteer')
// TODO: get this working
describe('Home Page', () => {
  let page, browser
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false
    })
    page = await browser.newPage()
    await page.goto('http://localhost:1234/')
  }, 50000)
  test('test', () => expect(true).toBe(true))
  // afterAll(() => browser.close())
  // test('title loads correctly', async () => {
  //   await page.waitForSelector('.site-title')
  //   const html = await page.$eval('.site-title strong', e => e.innerHTML)
  //   expect(html).toBe('Recipes')
  // })
  // test('has home and create links', async () => {
  //   await page.waitForSelector('.navbar-menu')
  //   const links = await page.evaluate(() =>
  //     document.getElementsByClassName('.navbar-item')
  //   )
  //   console.log(links)

  //   expect(true).toBe(true)
  // }, 50000)
})
