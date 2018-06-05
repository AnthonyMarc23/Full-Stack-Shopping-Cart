"use strict";
const cartItems = {
  // TODO: Create a template to display all the students from this class
  template: `
  <section class="cart-container">
    <div class="cart-item" ng-repeat="item in $ctrl.cartItems">
      <p>
        <label>Product</label><input ng-blur="$ctrl.updateCartItem(item);" ng-model="item.product"><br>
        <label>Price</label><input ng-blur="$ctrl.updateCartItem(item);" ng-model="item.price">
        <label>Quantity</label><input ng-blur="$ctrl.updateCartItem(item);" ng-model="item.quantity">
      </p>
      <a href="" ng-click="$ctrl.deleteCartItem(item.id);">&times;</a>
    </div>
  </section>

  <section class="center add-item">
    <p class="center-text">Add Item</p>
    <form ng-submit="$ctrl.addCartItem($ctrl.newItem)">
      <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
      <input type="text" placeholder="Price" ng-model="$ctrl.newItem.price">
      <input type="text" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
      <button>Submit</button>
    </form>
  </section>
  `,
  controller: ["CartItemsService", function(CartItemsService) {
    const vm = this;
    // TODO: Call the StudentService to retrieve the list of the students
    CartItemsService.getCartItems().then((response) => {
      console.log(response);
      vm.cartItems = response.data;
    });

    vm.addCartItem = (newItem) => {
      CartItemsService.addCartItem(newItem).then((response) => {
        console.log(response);
        vm.cartItems = response.data;
      });
      vm.newItem = {};
    };

    vm.deleteCartItem = (id) => {
      CartItemsService.deleteCartItem(id).then((response) => {
        vm.cartItems = response.data;
      });
    };

    vm.updateCartItem = (item) => {
      CartItemsService.updateCartItem(item).then((response) => {
        console.log(response);
        vm.cartItems = response.data;
      });
    };

  }]
};

angular
  .module("App")
  .component("cartItems", cartItems);