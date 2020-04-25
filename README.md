# CovidReportMZ

Platform that help people get realiable information about Covid-19 on Mozambique. The user can recieve daily sms with statistics or from whatsapp get statistics and faq's. 

The data come from the Mozambique Health Institute website (https://covid19.ins.gov.mz) using web scraping technique build by myself.

> :information_source: This project is for Twilio Hackaton + DEV submission. You can find the [announcement post](https://twil.io/dev-hack-april).

## Built with
- Backend: Node.js web server using [Express](https://expressjs.com/) + web scrapping using [cheerio](http://cheerio.js.org/) + [Parse](https://parseplatform.org/)
- Frontend: [Nuxt](https://nuxt.org/) + [Buefy](https://buefy.org/) + Javascript
- Integration: [Programmable SMS Twilio API](https://www.twilio.com/docs/sms/api) + [Twilio API for WhatsApp](https://www.twilio.com/whatsapp) + [Twilio Autopilot API](https://www.twilio.com/docs/autopilot/api) + [Back4app Parse Server](https://www.back4app.com/)
- Deployed with [Heroku](https://www.heroku.com/). You can check out the live application [here](https://covidreportmz.herokuapp.com/) or the live API [here](https://covidreportmz-api.herokuapp.com/) 

## Features
- Recieve statistics related to COVID-19 on Mozambique via SMS (Mozambique only) (Language: Portuguese)
- Recieve statistics related to COVID-19 on Mozambique via WhatsApp (Worldwide) (Language: Portuguese)
- Recieve FAQ's related to COVID-19 via WhatsApp (WorldWide) (Language: Portuguese)

## Set up

### Requirements
- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- A Parse Server account - I'm using [Back4app](https://www.back4app.com/)

### Enviroment Variables

This application uses the `dotenv` module to read the environement variables configuration. So in order to run the server, you must create a .env file and set the appropriate values to each variable. Below is a table with the variables you need to set, or check the file `.env.sample` (optional values aren't on the table):

| Env Variable | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TWILIO_ACCOUNT_SID  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| TWILIO_AUTH_TOKEN   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| TWILIO_NUMBER | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming)
PARSE_APP_ID | A Parse App Id - you can [get one here](https://back4app.com)|
PARSE_JS_KEY | A Parse Javascript Key - you can [get one here](https://back4app.com)|
PARSE_SERVER_URL | A Parse API Address - you can [get one here](https://back4app.com)


### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/kradnoel/CovidReportMZ.git
cd CovidReportMZ

```

For the backend:

2. `cd` into api and install dependencies

```bash
cd api
npm install
```
2.1. Modify the `.env` file and change the following values:

```env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_NUMBER=...
PARSE_APP_ID=...
PARSE_JS_KEY=...
PARSE_SERVER_URL=...


```
2.2. Run the application

```bash
npm start
```

For the frontend:

3. `cd` into api and install dependencies

```bash
cd web
npm install
```
3.1.`cd` into web and install dependencies

```bash
cd web
npm install
```
3.2. Modify the `.env` file and change the API_URL with the `api` , PORT and HOST

```env
API_URL=localhost:4000
PORT=4001
HOST=localhost
```

4. Run the application

```bash
npm start
```

5.  Navigate to [http://localhost:4001](http://localhost:4001)

## License

[MIT](LICENSE)

