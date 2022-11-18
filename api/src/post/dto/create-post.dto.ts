import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty({message: 'Please entre something for the content'})
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    mainImageUrl: string;

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsOptional()
    category: Category;
}
