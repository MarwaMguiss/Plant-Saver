import { Category } from "src/category/entities/category.entity";
export declare class CreatePostDto {
    title: string;
    content: string;
    mainImageUrl: string;
    categoryId: number;
    category: Category;
}
