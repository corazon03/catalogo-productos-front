import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";

type Props = {};

function CardProduct({}: Props) {
  return (
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <img
          src="https://i.ibb.co/7d2qQ7yW/5-girasoles-3-rosas-amarillas-en-caja-de-madera-sin-ilustraciones.jpg"
          alt="Description"
        />
      </CardBody>
      <CardFooter className="text-small flex flex-col gap-2 items-start">
        <p>
          <b>Nombre</b> - Descripción corta
        </p>
        <div className="flex justify-between w-full">
          <p className="text-default-500">Calificación</p>
          <p className="text-default-500">Precio</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export { CardProduct };
