let invoice = {
  orders: [{ amount: 1 }],
  customer: "JL",
  dueDate: "",
};
let Clock = {
  today: {
    getFullYear() {
      return 2000;
    },

    getMonth() {
      return 0;
    },

    getDate() {
      return 1;
    },
  },
};

function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;

  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails();

  function printDetails() {
    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무액 : ${outstanding}`);
    console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
  }
}

function printBanner() {
  console.log("**************");
  console.log("****고객 채무***");
  console.log("**************");
}

printOwing(invoice);
