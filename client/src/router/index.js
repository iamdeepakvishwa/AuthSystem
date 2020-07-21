/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/signup.vue';
import Login from '../views/login.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/signup',
		name: 'signup',
		component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
