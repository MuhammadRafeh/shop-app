class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id; // it's not the product id
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}

export default Order;
