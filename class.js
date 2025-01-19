// Base Class: User (Parent Class)
// Subclasses: Merchant, Customer
class User {
    static userCount = 0; // Static property to track the total number of users
  
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.#password = password;
      User.userCount++;
    }
  
    #password; // Private parameter, accessible only within the class
  
    // Instance method: login
    login(email, password) {
      if (this.email === email && this.#password === password) {
        console.log(`${this.name} has logged in.`);
        return true;
      }
      console.log(`Login failed for ${this.name}.`);
      return false;
    }
  
    // Instance method: logout
    logout() {
      console.log(`${this.name} has logged out.`);
    }
  
    // Static method: displayUserCount
    static displayUserCount() {
      console.log(`Total users: ${User.userCount}`);
    }
  }
  
  // Subclass: Merchant
  class Merchant extends User {
    static totalProductsCreated = 0; // Static property for product tracking
    static totalOrdersCompleted = 0; // Static property for order tracking
  
    constructor(name, email, password, merchantId) {
      super(name, email, password);
      this.merchantId = merchantId;
      this.role = 'merchant';
    }
  
    // Instance method: createProduct
    createProduct(product) {
      console.log(`${this.name} created a product: ${product.name}`);
      Merchant.totalProductsCreated++;
    }
  
    // Instance method: manageOrders
    manageOrders() {
      console.log(`${this.name} is managing orders.`);
      Merchant.totalOrdersCompleted++;
    }
  
    // Static method: displayTotalProducts
    static displayTotalProducts() {
      console.log(`Total products created: ${Merchant.totalProductsCreated}`);
    }

    // Static method: displayTotalOrders
    static displayTotalOrders() {
      console.log(`Total orders completed: ${Merchant.totalOrdersCompleted}`);
    }
  }
  
  // Subclass: Customer
  class Customer extends User {
    constructor(name, email, password, customerId, socialMediaURL) {
      super(name, email, password);
      this.customerId = customerId;
      this.role = 'customer';
      this.socialMediaURL = socialMediaURL;
    }
  
    // Instance method: addItemToCart
    addItemToCart(product) {
      console.log(`${this.name} added ${product.name} to the cart.`);
    }
  
    // Instance method: checkoutCart
    checkoutCart(cartId, total) {
        
      console.log(`CartId of ${cartId} checked out by ${this.name}. Total: $${total}`);
    }
  }
  
  // Class: Product
  class Product {
    static totalInventory = 0; // Static property to track inventory
  
    constructor(productId, name, price, quantity) {
      this.productId = productId;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      Product.totalInventory += quantity;
    }
  
    // Instance method: updateInventory
    updateInventory(newQuantity) {
      Product.totalInventory -= this.quantity;
      this.quantity = newQuantity;
      Product.totalInventory += newQuantity;
      console.log(`${this.name} inventory updated to ${this.quantity}.`);
    }
  
    // Static method: displayTotalInventory
    static displayTotalInventory() {
      console.log(`Total inventory: ${Product.totalInventory}`);
    }
  }
  
  // Class: Cart
  class Cart {
    static cartCount = 0; // Static property to track total carts
  
    constructor(cartId, customerId) {
      this.cartId = cartId;
      this.customerId = customerId;
      this.total = 0;
      this.items = [];
      Cart.cartCount++;
    }
  
    // Instance method: addItem
    addItem(item) {
      this.items.push(item);
      this.total += item.total;
      console.log(`Item ${item.name} added to cart.`);
    }
  
    // Instance method: calculateTotal
    calculateTotal() {
      console.log(`Total price of cart: $${this.total}`);
      return this.total;
    }
  
    // Static method: displayCartCount
    static displayCartCount() {
      console.log(`Total carts created: ${Cart.cartCount}`);
    }
  }
  
  class Item {
    static totalItems = 0; // Static property to track total items

    constructor( productId, cartId, quantity, total) {
      this.itemId = Item.totalItems + 1;
      this.productId = productId;
      this.cartId = cartId;
      this.quantity = quantity;
      this.total = total;
      Item.totalItems++;
    }

    // Calculate total quantity
    calculateTotal() {
      console.log(`Total quantity: ${this.quantity}`);
      return this.quantity;
    }

  }
  // Class: Order
  class Order {
    static totalOrders = 0; // Static property for order count
  
    constructor(orderId, cartId, total, customerId, location) {
      this.orderId = orderId;
      this.cartId = cartId;
      this.total = total;
      this.customerId = customerId;
      this.location = location;
      this.status = 'pending';
      Order.totalOrders++;
    }
  
    // Instance method: verifyOrder
    verifyOrder() {
      this.status = 'verified';
      console.log(`Order ${this.orderId} verified.`);
    }
  
    // Static method: displayOrderCount
    static displayOrderCount() {
      console.log(`Total orders: ${Order.totalOrders}`);
    }
  }
  
  // Class: Chat
  class Chat {
    static messageCount = 0; // Static property for message count
  
    constructor(chatId, senderId, receiverId, senderRole, message) {
      this.chatId = chatId;
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.senderRole = senderRole;
      this.message = message;
      Chat.messageCount++;
    }
  
    // Instance method: createMessage
    createMessage() {
      console.log(`Message sent by ${this.senderId}: ${this.message}`);
    }
  
    // Static method: displayMessageCount
    static displayMessageCount() {
      console.log(`Total messages: ${Chat.messageCount}`);
    }
  }
  
  // Example Usage
  const merchant = new Merchant('Okafor Ifeanyi', 'bio@gmail.com', 'password123', 1);
  merchant.createProduct({ name: 'Laptop', price: 1500 });
  merchant.createProduct({ name: 'Book', price: 900 });
  merchant.createProduct({ name: 'Milk', price: 100 });
  Merchant.displayTotalProducts();
  
  const customer = new Customer('Livinus Ogam', 'Ezeh@livinus.com', 'password123', 101, 'https://socialmedia.com/jane');
  customer.addItemToCart({ name: 'Laptop', price: 1500 });
  customer.checkoutCart();
  
  const product = new Product(1, 'Laptop', 1500, 10);
  product.updateInventory(8);
  Product.displayTotalInventory();
  
  const cart = new Cart(1, 101);
  cart.addItem({ name: 'Laptop', total: 1500 });
  cart.calculateTotal();
  Cart.displayCartCount();
  
  const order = new Order(1, 1, 1500, 101, '123 Street, City');
  order.verifyOrder();
  Order.displayOrderCount();
  
  const chat = new Chat(1, 101, 1, 'customer', 'Hello, I need help.');
  chat.createMessage();
  Chat.displayMessageCount();