const testA = (a, b) => {
    let result = a + b;
    console.log('testA:', result)
    return result;
}

testA(1,2)
// export {testA}

// ---------

//   function component() {
//     const element = document.createElement('pre');

//     element.innerHTML = [
//       'Hello webpack!',
//       '5 cubed is equal to 5'
//     ].join('\n\n');

//     return element;
//   }

//   document.body.appendChild(component());