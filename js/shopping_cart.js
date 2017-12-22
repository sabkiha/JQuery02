// Shopping Cart functions

var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function(name, price, count) {
this.name = name
this.price = price
this.count = count
};

// add item to cart
shoppingCart.addItemToCart = function (name, price, count) {
for (var i in this.cart) {
	if (this.cart[i].name === name) {
		this.cart[i].count += count;
		this.saveCart();
		return;	
	}
}
var item = new this.Item(name, price, count);
this.cart.push(item);
this.saveCart();
};

shoppingCart.setCountForItem = function(name, count){
for (var i in this.cart) {
	if (this.cart[i].name === name){
		this.cart[i].count = count; 
		break;
	}
}
this.saveCart();
};

// Remove one item (decrement count)
shoppingCart.removeItemFromCart = function (name, count) {
for (var i in this.cart) {
	if (this.cart[i].name === name){ 
		this.cart[i].count --;
		if (this.cart[i].count === 0) {
			this.cart.splice(i, 1)
		}
		break;
	}
}
this.saveCart();
} 

// Remove all of one items 
shoppingCart.removeItemFromCartAll = function (name) {
for (var i in this.cart) {
	if (this.cart[i].name === name) {
		this.cart.splice(i, 1);
		break;
	}
}
this.saveCart();
};


// clear the cart
shoppingCart.clearCart = function () {
this.cart = [];
this.saveCart();
}

// Count the items in the cart
shoppingCart.countCart = function() {
var totalCount = 0;
for (var i in this.cart) {
	totalCount += this.cart[i].count;
}
return totalCount;
}

// Total of Costs for the Cart
shoppingCart.totalCart = function () {
var totalCost = 0;
for (var i in this.cart) {
	totalCost += this.cart[i].price * this.cart[i].count;
}
return totalCost.toFixed(2);
}

// List all items in the Cart (whole array)
// you are creating a copy of the array, so the original cart array does not get tampered with
shoppingCart.listCart = function () {
var cartCopy = [];
for (var i in this.cart) {
	var item = this.cart[i];
	var itemCopy = {};
	for (var p in item) {
		itemCopy[p] = item[p];
	}
	itemCopy.total = (item.price * item.count).toFixed(2);
	cartCopy.push(itemCopy);
}
return cartCopy;
}

// Save the contents of the cart locally
shoppingCart.saveCart = function () {
localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}

// Load the content of the cart from local storage 
shoppingCart.loadCart = function () {
this.cart = JSON.parse (localStorage.getItem("shoppingCart"));
}

shoppingCart.loadCart();