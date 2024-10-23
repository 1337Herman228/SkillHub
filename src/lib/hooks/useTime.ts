const useTime = () => {
    function convertMinutesToHoursAndMinutes(minutes: number): {
        hours: number;
        minutes: number;
    } {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return { hours, minutes: remainingMinutes };
    }

    function formatTimeToHoursAndMinutes(
        hours: number,
        minutes: number,
        short: boolean = false
    ): string {
        // Проверка на нулевые значения
        if (hours === 0 && minutes === 0) {
            return "0 " + (short ? "мин" : "минут");
        }

        const hourLabel = (h: number) => {
            if (h === 0) return "";
            return `${h} ${
                short
                    ? h === 1
                        ? "ч"
                        : "ч"
                    : h === 1
                    ? "час"
                    : h < 5
                    ? "часа"
                    : "часов"
            }`;
        };

        const minuteLabel = (m: number) => {
            if (m === 0) return "";
            return `${m} ${
                short
                    ? m === 1
                        ? "мин"
                        : "мин"
                    : m === 1
                    ? "минута"
                    : m < 5
                    ? "минуты"
                    : "минут"
            }`;
        };

        // Формирование итоговой строки
        const hourPart = hourLabel(hours);
        const minutePart = minuteLabel(minutes);

        // Объединение частей с учетом пробела
        return [hourPart, minutePart].filter(Boolean).join(" ").trim();
    }

    return { convertMinutesToHoursAndMinutes, formatTimeToHoursAndMinutes };
};

export default useTime;
