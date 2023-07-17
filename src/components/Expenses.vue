<script>
export default {
  props: ["actions"],
  data() {
    return {
      maxDate: "",
      category: "food",
      date: "",
      sum: "",
      comment: "",
    };
  },

  methods: {
    addPurchase() {
      if (this.sum !== "") {
        if (this.comment !== "") {
          this.actions.push({
            type: "expense",
            category: this.category,
            date: this.date,
            sum: this.sum,
            comment: this.comment,
          });
          alert("Expense added");
          this.$emit("asd");
          this.sum = "";
          this.comment = "";
        } else {
          this.actions.push({
            type: "expense",
            category: this.category,
            date: this.date,
            sum: this.sum,
          });
          alert("Expense added");
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
  <h2>Expense</h2>
  <div class="expense-form">
    <select name="Category" id="category" class="form-item" v-model="category">
      <option value="food" selected>Food</option>
      <option value="clothing">Clothing</option>
      <option value="health">Health</option>
      <option value="others">Others</option>
    </select>

    <input
      type="date"
      id="exp-date"
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
    <button class="btn-add form-item" @click="addPurchase">Add</button>
  </div>
</template>

<style scoped>
template {
}
.expense-form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
.form-item {
  width: 13%;
  font-size: 17px;
  outline: 1px solid rgb(255, 60, 0);
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
  outline: 1px solid rgb(255, 60, 0);
}
#comment:focus {
  border-radius: 10px;
}
.btn-add {
  width: 5%;
  font-size: 20px;
  background-color: white;
}
.btn-add:hover {
  border-radius: 10px;
  cursor: pointer;
}
</style>
