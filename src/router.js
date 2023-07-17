import { createRouter, createWebHashHistory } from "vue-router";
import ExpensesComponent from "./components/Expenses.vue";
import IncomeComponent from "./components/Income.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/expenses", component: ExpensesComponent, alias: "/" },
    { path: "/income", component: IncomeComponent },
  ],
});
