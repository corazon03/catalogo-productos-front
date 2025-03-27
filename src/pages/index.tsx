import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { Chip } from "@heroui/chip";
import DefaultLayout from "@/layouts/default";
import { CardProduct } from "@/components/cardProduct";
import { Pagination } from "@heroui/pagination";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import {
  genericResponseModel,
  productModel,
  responsePaginationModel,
} from "@/types/models";
import { useEffect, useState } from "react";
import { use } from "framer-motion/client";

export default function IndexPage() {
  const [productos, setproductos] = useState<productModel[]>([]);

  async function initialLoad() {
    const data = await fetch("http://127.0.0.1:8000/api/products");
    const response =
      (await data.json()) as genericResponseModel<responsePaginationModel>;

    setproductos(response.data.data);
  }

  useEffect(() => {
    initialLoad();
  }, []);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1
          className={`${title.toString()} text-4xl font-bold text-center text-gray-800 dark:text-gray-100`}
        >
          {siteConfig.name}
        </h1>
        <div className="mt-6 w-full max-w-4xl mx-auto">
          <span className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por:
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {/* Crear FOR para categorías */}
              <Chip
                radius="lg"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              >
                Categoría 1
              </Chip>
              <Chip
                radius="lg"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              >
                Categoría 2
              </Chip>
              <Chip
                radius="lg"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              >
                Categoría 3
              </Chip>
            </div>
          </div>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
          {productos.map((producto) => (
            <CardProduct {...producto} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 w-full">
          <div className="">
            <Pagination initialPage={1} total={10} />
          </div>
          <Select
            className="max-w-[100px] sm:max-w-[120px]"
            label="Límite"
            defaultSelectedKeys={[3]}
          >
            {[{ 3: 3 }, { 5: 5 }, { 10: 10 }, { 20: 20 }].map((limit) => (
              <SelectItem key={limit[3]}>{limit[3]}</SelectItem>
            ))}
          </Select>
        </div>
      </section>
    </DefaultLayout>
  );
}
