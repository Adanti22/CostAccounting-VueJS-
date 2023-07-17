<script>
export default {
  data() {
    return {
      routingDisplay: "none",
      currentRouter: "",
      balance: 0,
      actions: [],
      dateValue: "today",
      topExpensive: [],
      categoryValue: "clothing",
      incomes: 0,
      expenses: 0,
    };
  },
  created() {
    const savedArr = localStorage.getItem("acts");
    if (savedArr) {
      this.actions = JSON.parse(savedArr);
    }
  },
  methods: {
    routing() {
      this.routingDisplay = "block";
    },
    noneRouting() {
      console.log(this.routingDisplay);
      this.routingDisplay = "none";
    },
    changeCurrent(routerItem) {
      this.currentRouter = routerItem;
    },
    dateSort(dateVal) {
      this.dateValue = dateVal;
      console.log(this.dateValue);
    },
    categorySort(catVal) {
      this.categoryValue = catVal;
      console.log(this.categoryValue);
    },
  },
  computed: {
    filteredActionsByCategory() {
      return this.actions.filter(
        (action) => action.category === this.categoryValue
      );
    },
    generalBalance() {
      let sumExp = 0;
      let sumInc = 0;

      this.actions.forEach((action) => {
        if (action.type == "expense") {
          sumExp += action.sum;
        }
      });
      this.actions.forEach((action) => {
        if (action.type == "income") {
          sumInc += action.sum;
        }
      });
      return sumInc - sumExp;
    },
    mostExpensive() {
      const newActions = this.actions
        .map((item) => ({ ...item }))
        .filter((item) => item.type === "expense");

      newActions.sort((a, b) => b.sum - a.sum);
      const topFive = newActions.slice(0, 5);
      return topFive;
    },
    sumExpenses() {
      let sum = 0;
      const now = new Date();
      if (this.dateValue == "today") {
        const lastDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const expenses = this.actions.filter(
          (action) =>
            action.type === "expense" && new Date(action.date) >= lastDay
        );
        return expenses.reduce((total, action) => total + action.sum, 0);
      } else if (this.dateValue == "week") {
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const expenses = this.actions.filter(
          (action) =>
            action.type === "expense" && new Date(action.date) >= lastWeek
        );
        return expenses.reduce((total, action) => total + action.sum, 0);
      } else if (this.dateValue == "month") {
        const lastMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const expenses = this.actions.filter(
          (action) =>
            action.type === "expense" && new Date(action.date) >= lastMonth
        );
        return expenses.reduce((total, action) => total + action.sum, 0);
      } else {
        let sum = 0;
        this.actions.forEach((action) => {
          if (action.type == "expense") {
            sum += action.sum;
          }
        });
        return sum;
      }
    },
    sumIncomes() {
      let sum = 0;
      this.actions.forEach((action) => {
        if (action.type == "income") {
          sum += action.sum;
        }
      });
      return sum;
    },
  },
 
};
</script>

<template>
  <div class="add" @click="routing">
    <img src="./images/add.png" alt="" />
  </div>
  <header>
    <h1>Cost accounting</h1>
  </header>
  <div class="balance-container">
    <div class="wallets">
      <h2>Your current balance:</h2>
      <div class="wallet">{{ generalBalance }}</div>
    </div>
  </div>
  <div class="statistic">
    <div class="statistic-container">
      <h2 class="category-title">Balance by date</h2>
      <div class="category-container">
        <div
          :class="['category', dateValue == 'today' ? 'category-activ' : '']"
          @click="dateSort('today')"
        >
          Today
        </div>
        <div
          :class="['category', dateValue == 'week' ? 'category-activ' : '']"
          @click="dateSort('week')"
        >
          Last Week
        </div>
        <div
          :class="['category', dateValue == 'month' ? 'category-activ' : '']"
          @click="dateSort('month')"
        >
          Last Month
        </div>
        <div
          :class="['category', dateValue == 'allTime' ? 'category-activ' : '']"
          @click="dateSort('allTime')"
        >
          Of all time
        </div>
      </div>
      <div class="sums-value">
        <h2>Overall balance: {{ sumIncomes - sumExpenses }}</h2>
        <p class="sum-incomes">Incomes: {{ sumIncomes }}</p>
        <p class="sum-expenses">Expenses: {{ sumExpenses }}</p>
      </div>
    </div>
    <div class="statistic-container">
      <h2 class="category-title">Top expensive purchases</h2>
      <div class="actions action-category">
        <div class="action" v-for="action in mostExpensive">
          <h2 class="action-title">{{ action.date }}</h2>
          <p>Category: {{ action.category }}</p>
          <p>Sum: {{ action.sum }}</p>
          <p v-if="action.comment">
            Comment: <br />
            "{{ action.comment }}"
          </p>
        </div>
      </div>
    </div>
    <div class="statistic-container">
      <h2 class="category-title">By category</h2>
      <div class="category-container">
        <div
          :class="[
            'category',
            categoryValue == 'clothing' ? 'category-activ' : '',
          ]"
          @click="categorySort('clothing')"
        >
          Clothing
        </div>
        <div
          :class="[
            'category',
            categoryValue == 'health' ? 'category-activ' : '',
          ]"
          @click="categorySort('health')"
        >
          Health
        </div>
        <div
          :class="['category', categoryValue == 'food' ? 'category-activ' : '']"
          @click="categorySort('food')"
        >
          Food
        </div>
        <div
          :class="[
            'category',
            categoryValue == 'others' ? 'category-activ' : '',
          ]"
          @click="categorySort('others')"
        >
          Others
        </div>
      </div>
      <div class="actions action-category">
        <div class="action" v-for="action in filteredActionsByCategory">
          <h2 class="action-title">{{ action.date }}</h2>
          <p>Sum: {{ action.sum }}</p>
          <p v-if="action.comment">
            Comment: <br />
            "{{ action.comment }}"
          </p>
        </div>
      </div>
    </div>
  </div>
  <div :style="{ display: routingDisplay }" class="routing-wrapper">
    <div class="routing-background" @click="noneRouting"></div>
    <div class="routing-container">
      <img
        src="./images/routing-exit.png"
        alt=""
        id="exit"
        @click="noneRouting"
      />
      <ul class="menu">
        <li class="router-in">
          <router-link
            to="/income"
            @click="changeCurrent('income')"
            :class="{ active: currentRouter == 'income' }"
            >Income</router-link
          >
        </li>
        <li class="router-exp">
          <router-link
            to="/expenses"
            @click="changeCurrent('expense')"
            :class="{ active: currentRouter == 'expense' }"
            >Expense</router-link
          >
        </li>
      </ul>
      <router-view class="router-view" :actions="actions"></router-view>
    </div>
  </div>
</template>
<style scoped>
.action {
  text-align: center;
  border: 1px solid white;
}
h1 {
  color: hsla(160, 100%, 37%, 1);
  font-size: 50px;
}
template {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
}
.actions {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.sums-value {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action {
  padding: 10px;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.statistic {
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
}
.sum-incomes {
  color: rgb(146, 255, 146);
}
.sum-expenses {
  color: rgb(255, 130, 130);
}
.statistic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: 1px solid white;
}

.category-container {
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
}
.category {
  cursor: pointer;
}
.category:hover {
  text-decoration: underline;
}
.category-activ {
  font-weight: bold;
}
.balance-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.add {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.add img {
  width: 5vw;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.add img:hover {
  transform: scale(1.1);
}

.routing-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.routing-background {
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: absolute;
  opacity: 0.9;
  z-index: 2;
}
.routing-container {
  position: absolute;
  z-index: 3;
  width: 80%;
  height: 50%;
  left: 10vw;
  border-radius: 20px;
  top: 15vh;
  -webkit-box-shadow: 0px 0px 41px 31px rgba(7, 41, 0, 0.34);
  -moz-box-shadow: 0px 0px 41px 31px rgba(7, 41, 0, 0.34);
  box-shadow: 0px 0px 41px 31px rgba(7, 41, 0, 0.34);
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}
#exit {
  position: absolute;
  top: 1%;
  right: 1%;
  width: 3vw;
  cursor: pointer;
}
.menu {
  display: flex;
  width: 50vw;
  justify-content: space-around;
}
.menu * {
  font-size: 40px;
}
.btn {
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: 0.3s ease-in-out;
  background-color: rgb(13, 255, 0);
  -webkit-box-shadow: 0px 0px 58px -14px rgba(151, 255, 156, 1);
  -moz-box-shadow: 0px 0px 58px -14px rgba(151, 255, 156, 1);
  box-shadow: 0px 0px 58px -14px rgba(151, 255, 156, 1);
  margin: 30px 0 70px;
}
.btn:hover {
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 58px -2px rgba(151, 255, 156, 1);
  -moz-box-shadow: 0px 0px 58px -2px rgba(151, 255, 156, 1);
  box-shadow: 0px 0px 58px -2px rgba(151, 255, 156, 1);
}
.active {
  text-decoration: underline;
}
.wallet {
  font-size: 50px;
}
</style>
