const argsChecker = (requiredArgs: number, receivedArgs: number) => {
  if (requiredArgs != receivedArgs)
    return `Expected: ${requiredArgs} got ${receivedArgs} command arguments`;
};
export {argsChecker}
