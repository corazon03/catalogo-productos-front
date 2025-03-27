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
            <ModalHeader className="flex flex-col justify-center items-center gap-1">
              {productData?.name} - {productData?.mini_description}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex overflow-x-auto gap-4">
                  {productData?.product_images?.length ? (
                    productData.product_images.map((image, index) => (
                      <img
                        key={index}
                        src={image.image || "/placeholder-image.png"}
                        alt={`Product Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                    ))
                  ) : (
                    <img
                      src="/placeholder-image.png"
                      alt="Placeholder Image"
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  )}
                </div>
                <div className="text-black dark:text-white">
                  <h3 className="text-lg font-semibold">Descripción:</h3>
                  <p className="text-sm">
                    {productData?.description || "No disponible"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Puntuación:
                  </span>
                  <span>
                    {productData?.score || "N/A"}
                    <span className="text-m font-bold text-yellow-500"> ★</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Stock:
                  </span>
                  <span className="text-m font-medium text-gray-600 dark:text-gray-300">
                    {productData?.stock || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
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
