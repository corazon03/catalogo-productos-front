import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { Chip } from "@heroui/chip";
import DefaultLayout from "@/layouts/default";
import { CardProduct } from "@/components/cardProduct";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import {
  categoryModel,
  genericResponseModel,
  responsePaginationModel,
} from "@/types/models";
import { useEffect, useState } from "react";
import { CircularProgress } from "@heroui/progress";
import { ModalProduct } from "@/components/modalProduct";

interface RequestPaginatedData {
  page?: number | null;
  limit?: number | null;
  category?: number | null;
}

export default function IndexPage() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const [paginationInfo, setPaginationInfo] =
    useState<null | responsePaginationModel>(null);

  const [categories, setCategories] = useState<null | categoryModel[]>(null);

  const [requestData, setRequesData] = useState<RequestPaginatedData>({
    page: 1,
    limit: 5,
    category: null,
  });

  async function getProducts() {
    setIsLoadingProducts(true);

    let url = "http://127.0.0.1:8000/api/products";
    if (requestData.page) url += `?page=${requestData.page}`;
    if (requestData.limit) url += `&limit=${requestData.limit}`;
    if (requestData.category) url += `&idCategory=${requestData.category}`;

    console.log({ url });
    try {
      const peticion = await fetch(url);
      const data =
        (await peticion.json()) as genericResponseModel<responsePaginationModel>;

      setPaginationInfo(data.data);
    } catch (error) {
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function getCategories() {
    const data = await fetch("http://127.0.0.1:8000/api/categories");
    const response = (await data.json()) as genericResponseModel<
      categoryModel[]
    >;
    setCategories(response.data);
  }

  useEffect(() => {
    getProducts();
  }, [requestData]);

  //Carga inicial
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
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
              {categories?.map((category) => (
                <Chip
                  radius="lg"
                  key={category.id_category}
                  onClick={() =>
                    setRequesData((prev) => {
                      return {
                        ...prev,
                        category:
                          prev.category === category.id_category
                            ? null
                            : category.id_category,
                        page: 1,
                      };
                    })
                  }
                  className={`cursor-pointer bg-white dark:bg-black text-blue-700 border-blue-700 border-[1px] hover:bg-blue-200 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-800 ${
                    requestData.category === category.id_category
                      ? "bg-blue-800 text-white dark:bg-blue-800 dark:text-white"
                      : ""
                  }`}
                >
                  {category.name}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`gap-2 grid grid-cols-2 sm:grid-cols-5 justify-center`}
          style={{ minHeight: "300px" }}
        >
          {paginationInfo?.data.map((producto) => (
            <CardProduct
              key={producto.id_product}
              data={producto}
              selectProduct={setSelectedProduct}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 w-full">
          {isLoadingProducts && <CircularProgress aria-label="Loading..." />}
          <div className="">
            {paginationInfo !== null && (
              <Pagination
                initialPage={1}
                page={paginationInfo?.current_page}
                total={paginationInfo?.last_page}
                showControls
                onChange={(e) =>
                  setRequesData((prev) => {
                    return { ...prev, page: e };
                  })
                }
              />
            )}
          </div>
          <Select
            className="max-w-[100px] sm:max-w-[120px]"
            label="Límite"
            defaultSelectedKeys={[3]}
            onChange={(e) =>
              setRequesData((prev) => {
                return { ...prev, limit: Number(e.target.value), page: 1 };
              })
            }
          >
            {[3, 5, 10, 20].map((limit) => (
              <SelectItem key={limit}>{limit}</SelectItem>
            ))}
          </Select>
        </div>
      </section>
      {selectedProduct !== null && (
        <ModalProduct
          changeIdProduct={setSelectedProduct}
          idProduct={selectedProduct}
        />
      )}
    </DefaultLayout>
  );
}
