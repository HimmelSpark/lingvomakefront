//Vue components
import Vue from "vue";
import Router from "vue-router";
//Router guards
import AuthGuard from "./authguard";
import DoubleEnterGuard from "./doubleEnterGuard";
//Admin components
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Registration from "@/components/auth/Registration";
import Panel from "@/components/panel/Panel";
import Students from "@/components/student/Students";
import Manage from "@/components/manage/Manage"
//Panel sub-components
import CoursePage from "@/components/panel/subcomponents/CoursePage";
import UnitPage from "@/components/panel/subcomponents/UnitPage";
import TaskPage from "@/components/panel/subcomponents/TaskPage";
//Student sub-components
import GroupPage from "@/components/student/subcomponents/GroupPage";
import StudentPage from "../components/student/subcomponents/StudentPage";
//Management suv-components
import Application from "@/components/manage/subcomponents/Application"
import Employees from "@/components/manage/subcomponents/Employees"
//Mobile web-view components
import MobileTranslate from "@/components/mobile/TranslateTask";

import ColorPicker from "@/components/extra/Color";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: DoubleEnterGuard
    },
    {
      path: "/students",
      name: "students",
      component: Students,
      children: [
        {
          path: "group/:id",
          props: true,
          component: GroupPage
        },
        {
          path: "student/:id",
          props: true,
          component: StudentPage
        }
      ]
    },
    {
      name: 'manage',
      path: '/manage',
      component: Manage,
      children: [
        {
          path: "application",
		  // components: {
           //  'Application': Application,
           //  'color-picker': ColorPicker
		  // },
          component: Application
        },
        {
          path: "employees",
          component: Employees
        }
      ]
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
      beforeEnter: DoubleEnterGuard
    },
    {
      path: "/panel",
      component: Panel,
      children: [
        {
          path: "course/:id",
          props: true,
          component: CoursePage,
          beforeEnter: AuthGuard
        },
        {
          path: "unit/:id",
          props: true,
          component: UnitPage
        },
        {
          path: "task/:id",
          props: true,
          component: TaskPage
        }
      ]
    },
    {
      path: "/mobile/translate",
      name: "translate",
      component: MobileTranslate
    }
  ]
});
