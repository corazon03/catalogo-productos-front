import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* {Array.from({ length: 100 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <h2>Card Header</h2>
            </CardHeader>
            <CardBody>
              <p>Card Body</p>
            </CardBody>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))} */}
        <h1 className={title.toString()}>{siteConfig.name}</h1>
        <div>
          <span>Filtrar por:</span>
          <div className="flex">
            <span>Categoría</span>
            <div>
              {/* Crear FOR para categorías */}
              <Chip radius="lg">Categoría</Chip>
              <Chip radius="lg">Categoría</Chip>
            </div>
          </div>
          <div>
            <span>Calificación</span>
          </div>
          <div>
            <span>Oferta</span>
          </div>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          <Card
            isPressable
            shadow="sm"
            onPress={() => console.log("item pressed")}
          >
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
        </div>
      </section>
    </DefaultLayout>
  );
}
