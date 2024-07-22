const response = fetch("https://wallhaven.cc/w/3led2d");
console.log(response); 

response.then((resolvedValue) => {
    console.log(resolvedValue);
}).catch((errorValue) => {
    console.log(errorValue); 
})