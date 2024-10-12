import React, { useRef } from "react";
import "./ScrollableBlock.scss";

interface ScrollableBlockProps {
    itemsToScroll: number; // Количество элементов для прокрутки
}

const ScrollableBlock: React.FC<ScrollableBlockProps> = ({
    itemsToScroll = 1,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const itemWidth = 220; // Ширина элемента + отступ (можно изменить по необходимости)

    const scrollToNext = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: itemWidth * itemsToScroll, // Прокрутка на ширину нескольких элементов
                behavior: "smooth", // Плавная прокрутка
            });
        }
    };

    const scrollToPrev = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -itemWidth * itemsToScroll, // Прокрутка на ширину нескольких элементов
                behavior: "smooth", // Плавная прокрутка
            });
        }
    };

    return (
        <div>
            <button onClick={scrollToPrev}>Назад</button>
            <div className="scrollable-container" ref={scrollContainerRef}>
                {[...Array(10)].map((_, index) => (
                    <div className="item" key={index}>
                        Item {index + 1}
                    </div>
                ))}
            </div>
            <button onClick={scrollToNext}>Вперед</button>
        </div>
    );
};

export default ScrollableBlock;
