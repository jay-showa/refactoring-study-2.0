import fs from "fs";
import { resolve } from "path";
const basePath = resolve();

export const readJSON = (path) =>
  JSON.parse(fs.readFileSync(resolve(basePath, path), "utf-8"));

const invoices = readJSON("invoices.json");

function printOwing(invoice) {
    // printBanner();

    // let outstanding = calculateOutstanding();
    let outstanding = 0;

    console.log('**************');
    console.log('****고객 채무***');
    console.log('**************');

    for (const o of invoice.orders)
    {
        outstandining += o.amount;
    }

    const today = Clock.today;

    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무액 : ${outstanding}`);
    console.log(`고객명 : ${invoice.dueDate.toLocalDateString()}`);


    
    
}


printOwing(invoices)
