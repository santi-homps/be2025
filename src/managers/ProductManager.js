import fs from 'fs/promises';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    async addProduct(product) {
        // ... lógica para agregar un producto, incluyendo la generación del id ...
        await this.saveProducts();
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    async updateProduct(id, updatedFields) {
        // ... lógica para actualizar un producto ...
        await this.saveProducts();
    }

    async deleteProduct(id) {
        // ... lógica para eliminar un producto ...
        await this.saveProducts();
    }
}

export default ProductManager;