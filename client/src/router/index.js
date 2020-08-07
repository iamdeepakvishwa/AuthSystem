/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/signup.vue';
import Login from '../views/login.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

function isLoggedinDashboard(to,from,next){
	if(localStorage.token){
		next('/dashboard');
	} else{
		next();
	}
}

function isLoggedin(to,from,next){
	if(localStorage.token){
		next();
	} else{
		next('/login');
	}
}

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
		beforeEnter: isLoggedinDashboard,
  },
  {
    path: '/login',
    name: 'login',
	component: Login,
	beforeEnter: isLoggedinDashboard,
  },
  {
	path: '/Dashboard',
	name: 'Dashboard',
	component: Dashboard,
	beforeEnter: isLoggedin
  }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
