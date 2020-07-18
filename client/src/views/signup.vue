<template>
  <section class="pt-5">
    <h2 class="pl-3">Create Accout</h2>
		<form @submit.prevent = "signup">
			<div v-if="errorMessage" class="form-group alert alert-warning col-sm-6" role="alert">
				{{errorMessage}}
			</div>
			<div class="form-group col-md-6">
					<label for="Name">Name</label>
					<input
						v-model="user.name"
						type="text"
						class="form-control"
						id="Name"
						placeholder="Enter Your Name"
						required
					>
			</div>
			<div class="form-group col-md-6">
					<label for="username">Username</label>
					<input
						v-model="user.username"
						type="text"
						class="form-control"
						id="username"
						placeholder="Enter Username"
						required
					>
			</div>
			<div class="form-group col-md-6">
					<label for="Email">Email address</label>
					<input
						v-model="user.email"
						type="email"
						class="form-control"
						id="Email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						required
					>
					<small id="emailHelp" class="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
			</div>
			<div class="form-group col-md-6">
					<label for="Password">Password</label>
					<input
						v-model="user.password"
						type="password"
						class="form-control"
						id="Password"
						placeholder="Password"
						required
					>
			</div>
			<div class="form-group col-md-6">
					<label for="cPassword">Confirm Password</label>
					<input
						v-model="user.confirmPassword"
						type="password"
						class="form-control"
						id="cPassword"
						placeholder="Confirm Password"
						required
					>
			</div>
			<div class="form-group col-md-6">
					<button type="submit" class="btn btn-primary">SignUp</button>
			</div>
		</form>
  </section>
</template>
<script>
/* eslint-disable */
import Joi from '@hapi/joi';

const API_URL = 'http://localhost:5000/auth/signup';

const schema = Joi.object().keys({
	name: Joi.string().regex(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/),
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	password: Joi.string().trim().min(6).required(),
	confirmPassword: Joi.string().trim().min(6).required(),
});
export default {
	data: () => ({
		errorMessage: '',
		user: {
			name: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
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
		signup() {
			this.errorMessage = '';
			if (this.validUser()) {
				const body = {
					name: this.user.name,
					username: this.user.username,
					email: this.user.email,
          password: this.user.password,
        };
				fetch(API_URL,{
					method: 'POST',
					body : JSON.stringify(body),
					headers: {
						'content-type': 'application/json', 
					},
				}).then((res)=>{
					if(res.ok){
						return res.json();
					}
					return res.json().then((err)=>{
						throw new Error(err.message);
					});
				}).then((user)=>{

				}).catch((err)=>{
					
				})
			} 
		},
		validUser() {
			if (this.user.password !== this.user.confirmPassword) {
				this.errorMessage = 'Password Must Match. 🐁';
				return false;
			}
			const result = Joi.validate(this.user, schema);
			if (result.error === null) {
				return true;
			}
			if (result.error.message.includes('username')) {
				this.errorMessage = 'username invalid ! 😭 '	
			} else if(result.error.message.includes('name')) {
        this.errorMessage = 'Name is invalid. 🐘';
      } else {
        this.errorMessage = 'Password is invalid. 🙈';
      }
			return false;
		},
	},
};
</script>
