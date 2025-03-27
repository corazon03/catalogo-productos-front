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
import { CardProduct } from "@/components/cardProduct";

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
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          <CardProduct />
        </div>
      </section>
    </DefaultLayout>
  );
}
