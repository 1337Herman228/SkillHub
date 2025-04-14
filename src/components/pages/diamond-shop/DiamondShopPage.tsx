"use client";
import Link from "next/link";
import "./DiamondShopPage.scss";
import Image from "next/image";
import DiamondShopHeading from "./heading/DiamondShopHeading";

interface IShopCategory {
    id: number | string;
    name: string;
    link: string;
    image: string;
}

const decoration_possibility_categories: IShopCategory[] = [
    {
        id: 1,
        name: "Рамки аватаров",
        link: "/diamond-shop/avatar-strokes",
        image: "/avatar-strokes/tree-stroke.png",
    },
    {
        id: 2,
        name: "Титулы",
        link: "/diamond-shop/dignities",
        image: "/images/master-jedi.png",
    },
    {
        id: 3,
        name: "Цвета для ников",
        link: "/diamond-shop/nickname-colors",
        image: "/images/nickname-color.png",
    },
];

const DiamondShopPage = () => {
    return (
        <section className="container section-medium">
            <DiamondShopHeading />
            <div className="diamond-shop-catalog-categories-container">
                {decoration_possibility_categories.map((category) => (
                    <DiamondShopCatalogCategory
                        key={category.id}
                        category={category}
                    />
                ))}
            </div>
        </section>
    );
};

interface DiamondShopCatalogCategoryProps {
    category: IShopCategory;
}

const DiamondShopCatalogCategory = ({
    category,
}: DiamondShopCatalogCategoryProps) => {
    return (
        <Link href={category.link}>
            <div className="diamond-shop-catalog-category">
                <div className="diamond-shop-catalog-category__name">
                    {category.name}
                </div>
                <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                    style={{ objectFit: "contain" }}
                />
            </div>
        </Link>
    );
};

export default DiamondShopPage;
