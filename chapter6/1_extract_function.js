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
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명 : ${invoice.customer}`);
  console.log(`채무액 : ${outstanding}`);
  console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
}

function printBanner() {
  console.log("**************");
  console.log("****고객 채무***");
  console.log("**************");
}

function recordDueDate(invoice) {
  const today = Clock.today;

  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

printOwing(invoice);
