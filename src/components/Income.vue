<script>
export default {
  props: ["actions"],
  data() {
    return {
      category: "salary",
      maxDate: "",
      sum: "",
      date: "",
      comment: "",
    };
  },
  methods: {
    addIncome() {
      if (this.sum !== "") {
        if (this.comment !== "") {
          this.actions.push({
            type: "income",
            category: this.category,
            date: this.date,
            sum: this.sum,
            comment: this.comment,
          });
          alert("Income added");
          this.$emit("asd");
          this.sum = "";
          this.comment = "";
        } else {
          this.actions.push({
            type: "income",
            category: this.category,
            date: this.date,
            sum: this.sum,
          });
          alert("Income added");
          this.$emit("asd");
          this.sum = "";
        }
      } else {
        alert("Fill in the field with the sum ");
      }
      localStorage.setItem("acts", JSON.stringify(this.actions));
    },
  },
  mounted() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    this.maxDate = formattedDate;
    this.date = formattedDate;
  },
};
</script>

<template>
  <h2 @click="log">Income</h2>
  <div class="income-form">
    <select name="Category" id="category" class="form-item" v-model="category">
      <option value="salary" selected>Salary</option>
      <option value="bonus">Bonuses</option>
      <option value="dividend">Dividend</option>
      <option value="others">Others</option>
    </select>

    <input
      type="date"
      id="income-date"
      class="form-item"
      v-model="date"
      min="01.01.2020"
      :max="maxDate"
    />
    <input
      class="form-item"
      type="number"
      placeholder="sum(TNG)"
      v-model="sum"
    />
    <input id="comment" type="text" placeholder="A comment" v-model="comment" />
    <button class="btn-add form-item" @click="addIncome">Add</button>
  </div>
</template>

<style scoped>
template {
}
.income-form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
.form-item {
  width: 13%;
  font-size: 17px;
  outline: none;
  outline: 1px solid rgb(0, 255, 0);
  border-radius: 5px;
  padding: 5px;
  transition: 0.3s ease-in-out;
}
.form-item:focus {
  border-radius: 10px;
}
#comment {
  outline: none;
  width: 15%;
  font-size: 17px;
  padding: 5px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  border: 1px solid rgb(89, 0, 205);
  outline: 1px solid rgb(0, 255, 0);
}
#comment:focus {
  border-radius: 10px;
}
.btn-add {
  width: 5%;
  font-size: 20px;
}
.btn-add:hover {
  border-radius: 10px;
  cursor: pointer;
}
</style>
