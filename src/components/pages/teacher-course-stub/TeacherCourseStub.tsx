import "./TeacherCourseStub.scss";

const TeacherCourseStub = () => {
    return (
        <div className="course-stub-container container">
            <div className="course-stub">
                <h1 className="course-stub__title">Страница курса</h1>
                <div className="course-stub__description">
                    <p>
                        На данной странице вы можете просмотреть управлять своим
                        курсом.
                        <br />
                        Добавлять и просматривать уроки можно посмотреть в
                        разделе "Материалы курса".
                        <br />
                        Изменять изображение и описания курса можно в разделе
                        "Редактировать курс".
                        <br />
                        В разделу "Сертификат" вы можете устанавливать
                        сертификат о прохождении своего курса.
                        <br />
                        Раздел "Имеют доступ" нужен для контроля доступа
                        студентов к курсу.
                        <br />
                        В разделу "Запрашивают доступ" видны заявки студентов на
                        прохождение курса, которые необходимо одобрять или
                        отклонять.
                        <br />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherCourseStub;
