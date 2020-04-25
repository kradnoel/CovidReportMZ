<template>
  <div>
    <div class="container">
      <div style="justify-content: center;">
        <h1 class="title">
          CovidReportMZ SMS
        </h1>
        <b-tabs style="padding: 2.5em;">
          <b-tab-item label="Subscrever">
            <h2 class="subtitle">
              Subscreva ao envio de estatísticas sobre a Covid-19 introduzindo o seu número abaixo:
            </h2>
            <b-field>
              <p class="control">
                <span class="button is-static">+258</span>
              </p>
              <b-input
                v-model="number"
                type="text"
                placeholder="82..."
              />
              <p class="control">
                <b-button class="button is-primary" :disabled="number.length == 0" @click="SubscribeUser">
                  Subscrever
                </b-button>
              </p>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Remover Subscriação">
            <h2 class="subtitle">
              Remova a subscriação ao envio de estatísticas sobre a Covid-19 introduzindo o seu número abaixo:
            </h2>
            <b-field>
              <p class="control">
                <span class="button is-static">+258</span>
              </p>
              <b-input
                v-model="number"
                position="is-center"
                type="text"
                placeholder="82..."
              />
              <p class="control">
                <b-button class="button is-primary" :disabled="number.length == 0" @click="UnsubscribeUser">
                  Remover Subscriação
                </b-button>
              </p>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Phone from 'awesome-phonenumber'
import axios from 'axios'

Vue.use(Buefy)

export default {
  data () {
    return {
      number: '',
      error: false
    }
  },
  methods: {
    UnsubscribeUser: function g (e) {
      const pn = new Phone(this.number, 'MZ')
      if (pn.isValid()) {
        this.error = false
        axios({
          method: 'post',
          url: `${process.env.ApiUrl}/unsubscribe`,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { contact: this.number }
        }).then((r) => {
          const values = r.data.data
          if (values.error === true) {
            this.$buefy.notification.open({
              message: values.message,
              type: 'is-danger',
              position: 'is-bottom-right',
              duration: 5000
            })
          } else {
            this.$buefy.notification.open({
              message: values.message,
              type: 'is-success',
              position: 'is-bottom-right',
              duration: 5000
            })
          }
        }).catch((e) => {
        })
      } else {
        this.$buefy.notification.open({
          message: `${this.number} não é um número válido em Moçambique.`,
          type: 'is-danger',
          position: 'is-bottom-right',
          duration: 5000
        })
      }
    },
    SubscribeUser: function g (e) {
      const pn = new Phone(this.number, 'MZ')
      if (pn.isValid()) {
        this.error = false
        axios({
          method: 'post',
          url: `${process.env.ApiUrl}/subscribe`,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { contact: this.number }
        }).then((r) => {
          const values = r.data.data
          if (values.error === true) {
            this.$buefy.notification.open({
              message: values.message,
              type: 'is-danger',
              position: 'is-bottom-right',
              duration: 5000
            })
          } else {
            this.$buefy.notification.open({
              message: values.message,
              type: 'is-success',
              position: 'is-bottom-right',
              duration: 5000
            })
          }
        }).catch((e) => {
        })
      } else {
        this.$buefy.notification.open({
          message: `${this.number} não é um número válido em Moçambique.`,
          type: 'is-danger',
          position: 'is-bottom-right',
          duration: 5000
        })
      }
    }
  },
  head () {
    return {
      title: 'CovidReportMZ - SMS'
    }
  }
}
</script>
