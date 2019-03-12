import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './authguard'
import DoubleEnterGuard from './doubleEnterGuard'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'
import Courses from '@/components/course/Courses'
import Course from '@/components/course/Course'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  	{
  	  path: '/',
	  name: 'home',
	  component: Home,
	  beforeEnter: AuthGuard
	},
	{
	  path: '/login',
	  name: 'login',
	  component: Login,
	  beforeEnter: DoubleEnterGuard
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: Registration,
	  beforeEnter: DoubleEnterGuard
	},
	{
	  path: '/courses',
	  name: 'courses',
	  component: Courses,
	  // beforeEnter: AuthGuard //TODO раскомментировать когда бек будет задеплоен
	},
	{
	  path: '/course',
	  name: 'course',
	  component: Course,
	  // beforeEnter: AuthGuard //TODO раскомментировать когда бек будет задеплоен
	}
  ]
})
