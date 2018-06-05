"use strict";
function CartItemsService($http) {
  // Declare the functions to make GET, POST, PUT, and DELETE requests from this service.
  const getCartItems = () => {
    return $http({
      method: "GET",
      url: "/portal/cart-items"
    });
  };

  const addCartItem = (newItem) => {
    return $http({
      method: "POST",
      url: "/portal/cart-items",
      data: newItem
    });
  };

  const deleteCartItem = (id) => {
    return $http({
      method: "DELETE",
      url: "/portal/cart-items/" + id
    });
  };

  const updateCartItem = (item) => {
    return $http({
      method: "PUT",
      url: "/portal/cart-items/" + item.id,
      data: item
    });
  }
  
  return {
    getCartItems,
    addCartItem,
    deleteCartItem,
    updateCartItem
  };
}

angular
  .module("App")
  .factory("CartItemsService", CartItemsService);