export interface genericResponseModel<T> {
  status: string;
  message: string;
  data: T;
}

export interface categoryModel {
  id_category: number;
  name: string;
}

export interface producByIdModel {
  id_product: number;
  name: string;
  price: string;
  category: number;
  score: number;
  on_sale: number;
  discount: number;
  stock: number;
  description: string;
  main_image: string;
  mini_description: string;
  product_images: ProductImageModel[];
}

export interface ProductImageModel {
  id_image: number;
  id_product: number;
  image: string;
}

export interface responsePaginationModel {
  current_page: number;
  data: productModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: LinkModel[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface productModel {
  id_product: number;
  name: string;
  price: string;
  score: number;
  on_sale: number;
  discount: number;
  main_image: string;
  mini_description: string;
}

export interface LinkModel {
  url?: string;
  label: string;
  active: boolean;
}
