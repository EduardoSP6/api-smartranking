import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async listAllCategories(): Promise<Category[]> {
    return await this.categoryService.listCategories();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() inputDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.createCategory(inputDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update() {}
}
