import { parse } from "../lib/index.js";
// import * from jsx from '../src/plugins/jsx/index.ts'
// import jsxPlugin from "../src/plugins/jsx/index.ts";

const code = `
export default function ChildComponent({name, age}) {
return (
<div>My name is {name} and I am {age} years old</div>
);
}
function App() {
const user = { name: "John", age: 30 };
const {name, age} = user;
return (
<ChildComponent ::product age={age} />
);
}
`;

// parse the code with the JSX plugin enabled
const ast = parse(code, {
  plugins: ["jsx"], // plugin is not being loaded correctly
  sourceType: "module",
});

// print the AST
console.log(JSON.stringify(ast, null, 2));
