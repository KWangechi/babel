import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { types: t } = api;
  return {
    name: "babel-plugin-react-jsx-props-shorthand",
    visitor: {
      JSXOpeningElement(path) {
        // only target Functional Components
        // get the JSX Identifier from this node
        if (t.isJSXIdentifier(path.node.name)) {
          const componentName = path.node.name.name;
          if (
            !componentName ||
            componentName[0] !== componentName[0].toUpperCase()
          ) {
            return;
          }
        }

        // console.log(path.scope);
        console.log("Progressing: ");

        const attributes = path.get("attributes");
        attributes.forEach(attributePath => {
          const attrNode = attributePath.node;

          console.log(attrNode.type);

          if (t.isJSXPropShorthandAttribute(attrNode)) {
            console.log("Found JSXPropShorthandAttribute");
            const propName = attrNode.name.name;
            const propValue = attrNode.value;

            if (t.isJSXExpressionContainer(propValue)) {
              const newAttr = t.jsxAttribute(
                t.jsxIdentifier(propName),
                t.jsxExpressionContainer(propValue.expression),
              );
              attributePath.replaceWith(newAttr);
            }
          }

          // if (t.isNode(attrNode, "JSXPropShorthandAttribute")) {
          //   // check if the prop name is already defined in the local scope or global scope
          //   if (!path.scope.hasBinding(propName)) {
          //     console.warn(
          //       "Prop name not found in scope:... Skipping transformation",
          //     );
          //   }
          //   const newAttr = t.jsxAttribute(
          //     t.jsxIdentifier(propName),
          //     t.jsxExpressionContainer(t.identifier(propName)),
          //   );
          //   attributePath.replaceWith(newAttr);
          // }
        });
      },
    },
  };
});
