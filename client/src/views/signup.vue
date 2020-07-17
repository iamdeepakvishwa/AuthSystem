<template>
  <!-- eslint-disable-->
  <section class="pt-5">
      <h2 class="pl-3">Create Accout</h2>
  <form @submit.prevent = "signup">
    <div class="form-group col-md-6">
        <label for="Name">Name</label>
        <input v-model="user.Name" type="text" class="form-control" id="Name" placeholder="Enter Your Name" required>
    </div>
    <div class="form-group col-md-6">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" class="form-control" id="username" placeholder="Enter Username" required>
    </div>
    <div class="form-group col-md-6">
        <label for="Email">Email address</label>
        <input v-model="user.Email" type="email" class="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" required>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group col-md-6">
        <label for="Password">Password</label>
        <input v-model="user.Password" type="password" class="form-control" id="Password" placeholder="Password" required>
    </div>
    <div class="form-group col-md-6">
        <label for="cPassword">Confirm Password</label>
        <input v-model="user.confirmPassword" type="password" class="form-control" id="cPassword" placeholder="Confirm Password" required>
    </div>
    <div class="form-group col-md-6">
        <button type="submit" class="btn btn-primary">SignUp</button>
    </div>
    
  </form> 
  </section>
</template>
<script>
export default {
	methods: {
		data: () => ({
			user: {
				Name: '',
				username: '',
				Email: '',
				Password: '',
				confirmPassword: '',
			},
		}),
		signup() {
			console.log('form was submitted');
		},
	},
};
</script>
