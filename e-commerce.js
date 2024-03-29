
    const products = [
    { name: "Noodles", price: 20 },
    { name: "Caprisonne", price: 15 },
    { name: "Rice", price: 30 },
    { name: "Buscuit", price: 30 },
    { name: "Sachet water", price: 30 },
    ];

    //Declaring our cart array to take all the items chosen
    let cart = [];
    let number = [];

    //Listing out available items for purchase
    console.log('Available products include:')
    
    for(let i = 0; i < products.length; i++){
        console.log(products[i].name)
    }

    // Adding item to cart
    let choice = prompt("Enter product name:");
    let product = products.find(p => p.name === choice);
    if (product) {
        cart.push(product);
        let unit = prompt("How many:");
        number.push(unit)
        console.log(`${product.name} added to cart!`);
    } else {
        console.log("Product not found!");
    }

    // Calculate total price
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++){
        totalPrice += cart[i].price * number[i];
    }

    console.log(`Your cart total is: $${totalPrice}`);