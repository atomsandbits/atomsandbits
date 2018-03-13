import { Servers } from '/both/imports/db';
import { runCalculations } from '/server/imports/api/run-calculations';

Servers.find().observe({
  added: (document) => {
    console.log(document);
  },
});
