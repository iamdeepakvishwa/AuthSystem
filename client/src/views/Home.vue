<template>
  <!-- eslint-disable-->
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Authentication System</h1>
      <p class="lead">
        SignUp and Login System 🔒🍺
      </p>
      <p class="lead">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{name:'signup'}"
          role="button">SignUp</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
	name: 'Home',
};
</script>
