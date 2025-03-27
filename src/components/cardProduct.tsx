import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { productModel } from "@/types/models";

type Props = {
  data: productModel;
  selectProduct: (idProduct: number) => void;
};

function CardProduct({ data, selectProduct }: Props) {
  const haveDiscount = data.on_sale == 1;
  const priceNumber = Number(data.price);
  const newPrice = (priceNumber - priceNumber * (data.discount / 100)).toFixed(
    2
  );
  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => selectProduct(data.id_product)}
    >
      <CardBody className="overflow-visible p-0">
        <img src={data.main_image} alt={data.name} />
      </CardBody>
      <CardFooter className="text-small flex flex-col gap-2 items-center">
        <p>
          <b>{data.name}</b> - {data.mini_description}
        </p>
        <div className="flex justify-between w-full items-center">
          <p className="text-default-500 flex items-center">
            Calificación: {data.score}
            <span className="ml-1 text-yellow-500">★</span>
          </p>
          <div>
            <p
              className={`text-default-500 font-medium ${haveDiscount ? "line-through text-red-500" : ""}`}
            >
              ${data.price}
            </p>
            {haveDiscount && <p className="text-default-500">${newPrice}</p>}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export { CardProduct };
