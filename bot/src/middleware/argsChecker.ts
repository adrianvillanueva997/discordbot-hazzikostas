const argsChecker = (requiredArgs: number, receivedArgs: number) => {
    if (requiredArgs != receivedArgs)
        throw Error(`Expected: ${requiredArgs} got ${receivedArgs} command arguments`)
}