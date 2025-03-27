import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { productModel } from "@/types/models";

type Props = {};

function CardProduct(data: productModel) {
  const priceNumber = Number(data.price);
  const newPrice = priceNumber - priceNumber * (data.discount / 100);
  return (
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <img src={data.main_image} alt={data.name} />
      </CardBody>
      <CardFooter className="text-small flex flex-col gap-2 items-start">
        <p>
          <b>{data.name}</b> - {data.mini_description}
        </p>
        <div className="flex justify-between w-full">
          <p className="text-default-500">{data.score}</p>
          <p className="text-default-500">
            {data.on_sale == 0 ? data.price : newPrice}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export { CardProduct };
