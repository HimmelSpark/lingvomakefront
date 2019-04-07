//Vue components
import Vue from "vue";
import Router from "vue-router";
//Router guards
import AuthGuard from "./authguard";
import DoubleEnterGuard from "./doubleEnterGuard";
import LoadUnitsGuard from "./loadUnitsGuard";
import LoadTasksGuard from "./loadTasksGuard";
//Admin components
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Registration from "@/components/auth/Registration";
import Courses from "@/components/courses/Courses";
import Students from "@/components/student/Students";
import Manage from "@/components/manage/Manage"
import Help from "@/components/help/Help";
//Panel sub-components
import CoursePage from "@/components/courses/subcomponents/CoursePage";
import UnitPage from "@/components/courses/subcomponents/UnitPage";
import TaskPage from "@/components/courses/subcomponents/TaskPage";
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
      beforeEnter: AuthGuard,
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
      name: 'settings',
      path: '/settings',
      component: Manage,
      beforeEnter: AuthGuard,
      children: [
        {
          path: "application",
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
      path: "/courses",
      component: Courses,
      beforeEnter: AuthGuard,
      children: [
        {
          path: "course/:id",
          props: true,
          component: CoursePage,
          beforeEnter: LoadUnitsGuard,
        },
        {
          path: "unit/:id",
          props: true,
          component: UnitPage,
          beforeEnter: LoadTasksGuard
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
      component: MobileTranslate,
      beforeEnter: AuthGuard
    },
    {
      path: "/help",
      name: "help",
      component: Help
    }
  ]
});
