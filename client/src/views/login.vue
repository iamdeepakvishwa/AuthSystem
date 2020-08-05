<template>
  <section>
    <h1 class="pl-3">Login</h1>
    <div v-if="loggingIn">
      <img src="../assets/loader1.svg"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <form v-if="!loggingIn" @submit.prevent="login()">
      <div class="form-group col-md-6">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter a username" required>
        <h5 id="usernameHelp" class="form-text text-muted">
         Enter your username to login.
        </h5>
      </div>
      <div class="form-group col-md-6">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Enter a password" required>
        <h5 id="passwordHelp" class="form-text text-muted">
         Enter your password to login.
        </h5>
      </div>
      <div class="col-md-6 form-group">
          <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
/* eslint-disable */
import Joi from '@hapi/joi';
const LOGIN_URL = 'http://localhost:5000/login';
const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
});
export default {
  data: () => ({
    errorMessage: '',
    loggingIn: false,
    user: {
      username: '',
      password: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    login() {
      this.errorMessage = '';
      if (this.validUser()) {
        this.loggingIn = true;
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          setTimeout(() => {
            this.loggingIn = false;
            this.$router.push('/dashboard');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            this.loggingIn = false;
            this.errorMessage = error.message;
          }, 1000);
        });
      }
    },
    validUser() {
      const result = schema.validate(this.user);
      if (!result.error) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username Or Password is invalid. 😭';
      } else {
        this.errorMessage = 'Username Or Password is invalid. 🙈';
      }
      return false;
    },
  },
};
</script>

<style>
</style>