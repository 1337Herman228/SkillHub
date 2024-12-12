import { PDFDocument, rgb } from "pdf-lib";

export async function generateCertificate(
    userName: string,
    courseName: string
): Promise<Blob> {
    // Создаём новый PDF-документ
    const pdfDoc = await PDFDocument.create();

    // Добавляем страницу
    const page = pdfDoc.addPage([600, 400]);

    // Настраиваем фон
    const { width, height } = page.getSize();
    page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(1, 1, 1), // Белый фон
    });

    // Рисуем рамку
    page.drawRectangle({
        x: 10,
        y: 10,
        width: width - 20,
        height: height - 20,
        borderColor: rgb(0, 0, 0),
        borderWidth: 2,
    });

    // Заголовок сертификата
    page.drawText("SkillHub", {
        x: 40,
        y: height - 60,
        size: 28,
        color: rgb(0, 0, 0),
    });

    // Название курса
    page.drawText(`Sertificate`, {
        x: 40,
        y: height - 140,
        size: 18,
        color: rgb(1, 1, 1),
    });

    page.drawText(`${courseName}`, {
        x: 40,
        y: height - 150,
        size: 36,
        color: rgb(0, 0, 0),
    });

    page.drawText(
        `The bearer of this certificate has successfully completed the course and demonstrated proficiency in the covered topics.`,
        {
            x: 40,
            y: height - 230,
            size: 10,
            color: rgb(0, 0, 0),
        }
    );
    page.drawText(
        `This achievement certifies their dedication to professional growth and their commitment to acquiring valuable skills.`,
        {
            x: 40,
            y: height - 242,
            size: 10,
            color: rgb(0, 0, 0),
        }
    );
    page.drawText(
        `The knowledge gained through this course equips the certificate holder with practical expertise to excel in relevant fields.
        `,
        {
            x: 40,
            y: height - 254,
            size: 10,
            color: rgb(0, 0, 0),
        }
    );
    page.drawText(
        `This certificate is issued as a formal recognition of their accomplishment and does not expire unless otherwise stated`,
        {
            x: 40,
            y: height - 266,
            size: 10,
            color: rgb(0, 0, 0),
        }
    );

    // Имя пользователя
    page.drawText(`${userName}`, {
        x: 40,
        y: height - 320,
        size: 20,
        color: rgb(0, 0, 0),
    });

    // Дата выдачи (текущая)
    const currentDate = new Date().toLocaleDateString();
    page.drawText(`${currentDate}`, {
        x: 40,
        y: height - 340,
        size: 12,
        color: rgb(0, 0, 0),
    });

    // Экспорт PDF в Blob
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
}
