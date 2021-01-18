class CartItem {
    constructor(quantity, productPrice, productTitle, sum) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum; //It's a total sum of price
    }
}

export default CartItem
