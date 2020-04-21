const cheerio = require('cheerio')
const fs = require('fs')

const {
  withoutNulls,
  enforceHttpsUrl,
  fetchElemInnerText,
  fetchElemAttribute
} = require('../app/helpers')

//const $ = cheerio.load('<div class="class">test<div>')
const $ = cheerio.load(fs.readFileSync('./app/mock/covid19mz.html'))

test('recieve array [1, 2, null, 6, null] and return [1, 2, 6]', () => {
  var numbers = [1,2,null,6,null]
  var expected = [1,2,6]
  expect(withoutNulls(numbers)).toStrictEqual(expected)
})

test('recieve http://google.com and return https://google.com', () => {
  var url = 'http://google.com'
  var expectedUrl = 'https://google.com'
  expect(enforceHttpsUrl(url)).toStrictEqual(expectedUrl)
})

test('recieve a dom element <title>">xxx<title> and return inner text xxx', () => {
  var element = $('title')
  var expected = 'Início - COVID 19 - Fica Atento'
  expect(fetchElemInnerText(element)).toStrictEqual(expected)
})


test('recieve a dom element and return the attrib value', () => {
  var element = $('html')
  var expected = 'en-US'
  var fetchClass = fetchElemAttribute('lang')
  expect(fetchClass(element)).toStrictEqual(expected)
})

