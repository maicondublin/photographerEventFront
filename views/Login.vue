<template>
    <div class="page-flex">
        <v-card
            class="mx-auto"
            max-width="600"
            elevation="24"
        >
            <v-img
                class="white--text align-end"
                height="400px"
                :src="header"
            >
                <v-card-title>Bem Vindo!</v-card-title>
            </v-img>

            <v-card-text class="text--primary">
                <form>
                    <v-text-field
                        v-model="name"  
                        label="Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn
                        class="button-login"
                        @click="login"
                        color="green"
                        :disabled="!name || !password"
                    >
                        Login
                    </v-btn>
                </form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

import getin from '../src/app/login/getin'

export default {
  name: 'login',
  data() {
        return {
            header: require('../src/assets/card_header.jpeg'),
            name: null,
            password: null
        }
  },
  methods: {
        async login() {
            await getin(this.name, this.password).then(function(response){
                localStorage.setItem('user', JSON.stringify(response.data))
                this.$router.push('/events')
            }.bind(this))
        }
  }
}
</script>

<style scoped> /* scoped, para restringir estilo somente para esta página */

.button-login{
    color: white !important;
}

.page-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}



</style>
