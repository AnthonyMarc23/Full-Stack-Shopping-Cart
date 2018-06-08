"use strict";
const cartItems = {
  // TODO: Create a template to display all the students from this class
  template: `
  <section class="cart-container">
    <div class="cart-item extra-padding" ng-repeat="item in $ctrl.cartItems">
      <a href="" ng-click="$ctrl.deleteCartItem(item.id);"><i class="material-icons clicky left">delete_forever</i></a>
        <input ng-blur="$ctrl.updateCartItem(item);" ng-model="item.product" class="no-border-bottom emphasis">
        <label>Price</label><input ng-blur="$ctrl.updateCartItem(item);" ng-model="item.price">
        <label>Quantity</label>
        <div id="plus-minus-row">
          <i class="material-icons change-pointer clicky left" ng-click="$ctrl.subtractQuantity(item);">remove_circle</i><input class="fill-container center-text" ng-blur="$ctrl.updateCartItem(item);" ng-model="item.quantity"><i class="material-icons change-pointer clicky right" ng-click="$ctrl.addQuantity(item);">add_circle</i>
        </div>
    </div>
  </section>

  <section class="center add-item">
    <p class="center-text minimize-margin">Add Item</p>
    <form ng-submit="$ctrl.addCartItem($ctrl.newItem)">
      <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
      <input type="text" placeholder="Price" ng-model="$ctrl.newItem.price">
      <input type="text" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
      <button class="right">Submit</button>
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

    vm.addQuantity = (item) => {
      item.quantity++;
      return vm.updateCartItem(item);
    };

    vm.subtractQuantity = (item) => {
      item.quantity--;
      return vm.updateCartItem(item);
    };
  }]
};

angular
  .module("App")
  .component("cartItems", cartItems);