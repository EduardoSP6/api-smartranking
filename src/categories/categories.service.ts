import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async listCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async createCategory(inputDto: CreateCategoryDto): Promise<Category> {
    const { name } = inputDto;

    if (await this.categoryModel.findOne({ name }).exec()) {
      throw new BadRequestException(`O nome ${name} já está em uso`);
    }

    const category = new this.categoryModel(inputDto);

    return await category.save();
  }
}
