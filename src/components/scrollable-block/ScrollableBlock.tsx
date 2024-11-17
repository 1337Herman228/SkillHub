import React, { useEffect, useRef, useState } from "react";
import "./ScrollableBlock.scss";
import { useMediaQuery } from "react-responsive";

interface ScrollableBlockProps {
    itemsToScroll: number; // Количество элементов для прокрутки
    children: React.ReactNode;
    _itemWidth?: number;
    gapDesktop?: number;
    gapMobile?: number;
    cardsCountDesktop?: number;
    cardsCountTablet?: number;
    cardsCountMobile?: number;
}

const ScrollableBlock: React.FC<ScrollableBlockProps> = ({
    cardsCountDesktop = 3,
    cardsCountTablet = 2,
    cardsCountMobile = 1.4,
    _itemWidth = 320,
    gapDesktop = 20,
    gapMobile = 15,
    itemsToScroll = 1,
    children,
}) => {
    const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    //  Ширина элемента
    const gap = isMobileDevice ? gapMobile : gapDesktop;

    // Устанавливаем ширину элемента
    let itemWidth = _itemWidth;

    // Обновляем состояние кнопок, когда компоненты монтируются
    useEffect(() => {
        const updateItemWidth = () => {
            if (scrollContainerRef.current) {
                itemWidth =
                    (scrollContainerRef.current.offsetWidth -
                        (itemsToScroll - 1) * gap) /
                    itemsToScroll;
            }
        };

        updateItemWidth();
        window.addEventListener("resize", updateItemWidth);

        return () => {
            window.removeEventListener("resize", updateItemWidth);
        };
    }, [itemsToScroll, isMobileDevice]);

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

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainer;

            // Проверка на достижение левого края
            setIsPrevDisabled(scrollLeft === 0);

            // Проверка на достижение правого края
            setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            // Убираем обработчик при размонтировании компонента
            return () => {
                scrollContainer.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    // Проверка на количество детей
    useEffect(() => {
        const totalItems = React.Children.count(children);
        if (isMobileDevice) {
            if (totalItems < 2) setIsNextDisabled(false);
        } else {
            setIsNextDisabled(totalItems <= itemsToScroll);
        }
    }, [children, itemsToScroll, isMobileDevice]);

    //Присвоение значений кол-ва карточек и отступов
    useEffect(() => {
        const scrollableContainer = document.querySelector(
            ".scrollable-container"
        ) as HTMLElement;
        if (scrollableContainer) {
            //Устанавливаем отступы между элементами
            scrollableContainer.style.setProperty(
                "--gap-desktop",
                `${gapDesktop}px`
            );
            scrollableContainer.style.setProperty(
                "--gap-mobile",
                `${gapMobile}px`
            );
            scrollableContainer.style.setProperty(
                "--cards-count-desktop",
                `${cardsCountDesktop}`
            );
            scrollableContainer.style.setProperty(
                "--cards-count-tablet",
                `${cardsCountTablet}`
            );
            scrollableContainer.style.setProperty(
                "--cards-count-mobile",
                `${cardsCountMobile}`
            );
        }
    }, []);

    return (
        <div className="scrollable-block">
            <button
                onClick={scrollToPrev}
                className="btn-back move-btn"
                disabled={isPrevDisabled}
            >
                <img
                    className="arrow-img arrow-img--left"
                    width={21}
                    height={14}
                    alt=""
                    src={"/svg/white-arrow-left.svg"}
                />
            </button>
            <div className="scrollable-container" ref={scrollContainerRef}>
                {children}
            </div>
            <button
                onClick={scrollToNext}
                className="btn-next move-btn"
                disabled={isNextDisabled}
            >
                <img
                    className="arrow-img arrow-img--right"
                    width={21}
                    height={14}
                    alt=""
                    src={"/svg/white-arrow-right.svg"}
                />
            </button>
        </div>
    );
};

interface ItemProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Item = ({ children, style }: ItemProps) => {
    return (
        <div style={style} className="item">
            {children}
        </div>
    );
};

export default ScrollableBlock;
