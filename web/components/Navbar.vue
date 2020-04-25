<template>
  <div>
    <b-navbar :mobile-burger="true" type="is-primary" :spaced="false" :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          CovidReportMZ
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/sms' }">
          SMS
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/whatsapp' }">
          WhatsApp
        </b-navbar-item>
        <b-navbar-item href="#">
          Sobre
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>
<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)
export default {
  name: 'Navbar'
}
</script>
