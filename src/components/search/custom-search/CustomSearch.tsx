import "./CustomSearch.scss";

interface CustomSearchProps {
    placeholder?: string;
    style?: React.CSSProperties;
}

const CustomSearch = ({
    style,
    placeholder = "Поиск...",
}: CustomSearchProps) => {
    return (
        <div className="custom-search">
            <img
                className="custom-search__image"
                loading="lazy"
                alt=""
                src="svg/search.svg"
                width={20}
                height={20}
            />
            <input
                style={style}
                className="custom-search__input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default CustomSearch;
