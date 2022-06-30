import fs from "fs";
import { resolve } from "path";
import statement from "./statement.js";

const basePath = resolve();

export const readJSON = (path) =>
  JSON.parse(fs.readFileSync(resolve(basePath, path), "utf-8"));

const invoices = readJSON("invoices.json");
const plays = readJSON("plays.json");

invoices.forEach((invoice) => {
  console.log(statement(invoice, plays));
});
