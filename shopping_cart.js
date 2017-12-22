//************************************
// Shopping Cart functions

var shoppingCart = (function() {
	// Private methods and properties
	var cart = [];

	 function Item (name, price, count) {
		this.name = name
		this.price = price
		this.count = count
	};

		// Save the contents of the cart locally
	function saveCart() {
		localStorage.setItem("shoppingCart", JSON.stringify(cart));
	};

	// Load the content of the cart from local storage 
	function loadCart() {
		cart = JSON.parse (localStorage.getItem("shoppingCart"));
	};
	
	loadCart();

	// Public methods and proberties
		var obj = {};

			// add item to cart
	obj.addItemToCart = function (name, price, count) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count += count;
				saveCart();
				return;	
			}
		}
		var item = new Item(name, price, count);
		cart.push(item);
		saveCart();
	};

	obj.setCountForItem = function(name, count){
		for (var i in cart) {
			if (cart[i].name === name){
				cart[i].count = count; 
				break;
			}
		}
		saveCart();
	};

		// Remove one item (decrement count)
	obj.removeItemFromCart = function (name, count) {
		for (var i in cart) {
			if (cart[i].name === name){ 
				cart[i].count --;
				if (cart[i].count === 0) {
					cart.splice(i, 1)
				}
				break;
			}
		}
		saveCart();
	}; 

		// Remove all of one items 
	obj.removeItemFromCartAll = function (name) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart.splice(i, 1);
				break;
			}
		}
		saveCart();
	};

		// clear the cart
	obj.clearCart = function () {
		cart = [];
		saveCart();
	};

		// Count the items in the cart
	obj.countCart = function() {
		var totalCount = 0;
			for (var i in cart) {
				totalCount += cart[i].count;
			}
		return totalCount;
	};

		// Total of Costs for the Cart
	obj.totalCart = function () {
		var totalCost = 0;
			for (var i in cart) {
				totalCost += cart[i].price * cart[i].count;
			}
		return totalCost.toFixed(2);
	};

		// List all items in the Cart (whole array)
		// you are creating a copy of the array, so the original cart array does not get tampered with
	obj.listCart = function () {
		var cartCopy = [];
		for (var i in cart) {
			var item = cart[i];
			var itemCopy = {};
			for (var p in item) {
				itemCopy[p] = item[p];
			}
			itemCopy.total = (item.price * item.count).toFixed(2);
			cartCopy.push(itemCopy);
		}
		return cartCopy;
	};



	//---------
	return obj;
})(); //self executing function


