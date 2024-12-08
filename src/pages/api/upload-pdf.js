import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Отключаем парсинг тела запроса
    },
};

// Папка для сохранения PDF-файлов
const uploadDir = path.join(process.cwd(), "public/upload-certificates");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = (req, res) => {
    const form = new IncomingForm();

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Ошибка парсинга:", err);
            return res.status(500).json({ error: "Ошибка загрузки" });
        }

        const name = fields.name[0]; // получить поле 'name' из запроса
        const filePath = files?.file[0]?.filepath;
        const newFilePath = path.join(uploadDir, name);

        // Перемещаем файл в папку назначения
        fs.rename(filePath, newFilePath, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Ошибка перемещения файла" });
            }
            res.status(200).json({
                message: "Файл загружен",
                filePath: newFilePath,
            });
        });
    });
};

export default handler;
