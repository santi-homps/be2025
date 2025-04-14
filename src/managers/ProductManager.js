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
        this.products.push(product)
        await this.saveProducts();
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    async updateProduct(idToReplace, updatedProduct) {
        const index = myArray.findIndex(item => item.id === idToReplace);

        if (index !== -1) {
        myArray[index] = updatedProduct;
        } else {
        console.error(`No se encontró ningún objeto con el ID ${idToReplace}`);
        }

        await this.saveProducts();
    }

    async deleteProduct(idToRemove) {
        const indexToRemove = this.products.findIndex(item => item.id === idToRemove);
        
        if (indexToRemove !== -1) {
            this.products.splice(indexToRemove, 1);
        } else {
          console.error(`No se encontró ningún objeto con el ID ${idToRemove}`);
        }
        await this.saveProducts();
    }
}

export default ProductManager;