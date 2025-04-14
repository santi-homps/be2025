import fs from 'fs/promises';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: this.generateId(),
            products: []
        };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }

    async getCartById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    async addProductToCart(cid, pid) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            return null;
        }

        const existingProduct = cart.products.find(item => item.product === pid);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.saveCarts();
        return cart;
    }

    generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

export default CartManager;