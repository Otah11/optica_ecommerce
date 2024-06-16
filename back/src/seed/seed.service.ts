import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../seed/data.json';
import { Gender } from '../products/entities/gender.entity';
import { ProductsType } from '../products/entities/ProductsType.entity';
import { Categories } from '../products/entities/categories.entity';
import { Products } from '../products/entities/products.entity';
import { Measurements } from '../products/entities/measurements';
import { Colors } from '../products/entities/colors.entity';
import { ProductsColors } from '../products/entities/productsColors.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductsType
    )
    private productsTypeRepository: Repository<ProductsType>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Colors)
    private colorRepository: Repository<Colors>,
    @InjectRepository(ProductsColors)
    private productColorRepository: Repository<ProductsColors>
  ) {}

    async onModuleInit() {
        await this.preloadData()
    }


  async preloadData() {
    await this.preloadProductTypes();
    await this.preloadGenders();
    await this.preloadCategories();
    await this.preloadColors();
    await this.preloadProducts();
  }

  private async preloadProductTypes() {
    for (const productTypeData of data.productTypes) {
      let productType = await this.productsTypeRepository.findOne({ where: { name: productTypeData.name } });
      if (!productType) {
        productType = this.productsTypeRepository.create(productTypeData);
        await this.productsTypeRepository.save(productType);
      }
    }
  }

  private async preloadGenders() {
    for (const genderData of data.genders) {
      let gender = await this.genderRepository.findOne({ where: { name: genderData.name } });
      if (!gender) {
        gender = this.genderRepository.create(genderData);
        await this.genderRepository.save(gender);
      }
    }
  }

  private async preloadCategories() {
    for (const categoryData of data.categories) {
      let category = await this.categoriesRepository.findOne({ where: { name: categoryData.name } });
      if (!category) {
        category = this.categoriesRepository.create(categoryData);
        await this.categoriesRepository.save(category);
      }
    }
  }

  private async preloadColors() {
    for (const colorData of data.colors) {
      let color = await this.colorRepository.findOne({ where: { name: colorData.name } });
      if (!color) {
        color = this.colorRepository.create(colorData);
        await this.colorRepository.save(color);
      }
    }
  }

  private async preloadProducts() {
    for (const productData of data.products) {
      const productsType = await this.productsTypeRepository.findOne({ where: { name: productData.productsType.name } });
      const gender = await this.genderRepository.findOne({ where: { name: productData.gender.name } });
      const categories = await Promise.all(productData.categories.map(async (categoryData) => {
        return await this.categoriesRepository.findOne({ where: { name: categoryData.name } });
      }));

      const product = new Products();
      product.name = productData.name;
      product.code = productData.code;
      product.description = productData.description;
      product.price = productData.price;
      product.image = "https://w7.pngwing.com/pngs/43/171/png-transparent-universal-product-code-barcode-computer-icons-warehouse-business-warehouse-miscellaneous-label-text.png";
      product.productsType = productsType
      product.gender = gender;
      product.categories = categories;

      const measurements = new Measurements();
      measurements.lenses = productData.measures.lenses;
      measurements.bridge = productData.measures.bridge;
      measurements.temple = productData.measures.temple;
      product.measurements = measurements;

      const productColors = await Promise.all(productData.colors.map(async (colorData) => {
        const color = await this.colorRepository.findOne({ where: { name: colorData.name } });
        const productColor = new ProductsColors();
        productColor.colors = color;
        productColor.isPolarized = colorData.isPolarized;
        productColor.stock = colorData.stock;
        productColor.products = product;
        return productColor;
      }));
      
      product.productsColors = productColors;


      const existingProducts = await this.productsRepository.findOne({where: {name: product.name}})
      if(!existingProducts){     
      await this.productsRepository.save(product);
      }
    }
  }
}