import runner from "@babel/helper-plugin-test-runner";

console.log("My route: ", import.meta.url);

runner(import.meta.url);
