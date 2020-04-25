<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">
          CovidReportMZ
        </h1>
        <h2 class="subtitle">
          <p>
            O CovidReportMZ é uma plataforma que permite as pessoas a terem acesso a informação sobre a Covid-19 em Moçambique. A informação é proveniente da página web do Instituto Nacional de Saude (https://covid19.ins.gov.mz) através da técnica de <i>web scraping</i>.<br>Seleccione <b>SMS</b> para subscrever ao envio de sms com estatísticas diarias ou <b>WhatsApp</b> para informação de como receber a informação via WhatsApp.
          </p>
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'CovidReportMZ - Home'
    }
  }
}
</script>
<style>
body {
  font-size: 20pt;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 22px;
  color: #526488;
  word-spacing: 5px;
  padding: 2.5em;
  text-align: justify;
}
.links {
  padding-top: 15px;
}

a {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 22px;
}
</style>
