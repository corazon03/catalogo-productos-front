import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { genericResponseModel, producByIdModel } from "@/types/models";
import { use } from "framer-motion/client";

type Props = {
  idProduct: number;
  changeIdProduct: (idProduct: number | null) => void;
};

function ModalProduct({ idProduct, changeIdProduct }: Props) {
  const [newPrecio, setnewPrecio] = useState({
    haveDiscount: false,
    priceNumber: 0,
    newPrice: 0,
  });
  const [productData, setproductData] = useState<producByIdModel | null>(null);
  const [isLoading, setisLoading] = useState(true);

  async function getProductById() {
    try {
      const data = await fetch(
        "http://127.0.0.1:8000/api/products/" + idProduct
      );
      const response =
        (await data.json()) as genericResponseModel<producByIdModel>;
      setproductData(response.data);

      setnewPrecio({
        haveDiscount: response.data.on_sale == 1,
        priceNumber: Number(response.data.price),
        newPrice:
          Number(response.data.price) -
          Number(response.data.price) * (response.data.discount / 100),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    getProductById();
  }, []);
  return (
    <Modal isOpen={true} hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {productData?.name} - {productData?.mini_description}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <img
                    src={productData?.main_image || "/placeholder-image.png"}
                    alt={productData?.name || "Product Image"}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold">Descripción:</h3>
                  <p className="text-sm text-black dark:text-white">
                    {productData?.description || "No disponible"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Puntuación:
                  </span>
                  <span className="text-lg font-bold text-yellow-500">
                    {productData?.score || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Stock:
                  </span>
                  <span className="text-lg font-bold text-green-500">
                    {productData?.stock || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Precio:
                  </span>
                  <span className="text-lg font-bold text-blue-500">
                    ${Number(productData?.price).toFixed(2) || "N/A"}
                  </span>
                  {newPrecio.haveDiscount && (
                    <span className="text-lg font-bold text-red-500">
                      ${newPrecio.newPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => changeIdProduct(null)}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export { ModalProduct };
