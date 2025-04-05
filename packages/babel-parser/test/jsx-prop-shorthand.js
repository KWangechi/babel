import { parse } from "../lib/index.js";

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
  plugins: ["jsx"],
  sourceType: "module",
});

describe("test jsx-prop-shorthand", function () {
  it("should parse", function () {
    console.log("Testing New JSX syntax tokenization");
    expect(ast).toMatchSnapshot();
  });
});
