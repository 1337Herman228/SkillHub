import { useEffect, useRef, useState } from "react";
import "./VolumeSlider.scss";

interface VolumeSliderProps {
    w?: number;
    h?: number;
    fillLevel: number; // Значение заполненности от 0 до 1
    onChange: (newLevel: number) => void; // Функция для изменения состояния родителя
}

const VolumeSlider = ({
    w = 24,
    h = 130,
    fillLevel,
    onChange,
}: VolumeSliderProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Устанавливаем высоту заливки при изменении fillLevel
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newHeight = fillLevel * rect.height;
            setHeight(newHeight);
        }
    }, [fillLevel]);

    const [height, setHeight] = useState<number>(fillLevel * h); // Начальная высота заливки

    const handleMouseMove = (event: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newHeight = rect.bottom - event.clientY; // Вычисляем новую высоту
            const constrainedHeight = Math.max(
                0,
                Math.min(newHeight, rect.height)
            ); // Ограничиваем высоту
            const normalizedLevel = constrainedHeight / rect.height; // Нормализуем значение от 0 до 1

            setHeight(constrainedHeight);
            onChange(normalizedLevel); // Вызываем функцию для изменения состояния родителя
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault(); // Предотвращаем выделение текста
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className="volume-slider-container"
            ref={containerRef}
            style={{
                width: w,
                height: h,
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="volume-slider-bar"
                style={{
                    height: `${height}px`,
                }}
            />
        </div>
    );
};

export default VolumeSlider;
