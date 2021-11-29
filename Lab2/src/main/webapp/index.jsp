<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="icon" href="jps/logo.png">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторная работа №2</title>
</head>

<body>
    <header class="main-header topper clearfix">
        <span class="main-header__info">
            Лабораторная работа №2 <br>
            Вариант #536112
        </span>
        <span class="main-header__authors">
            Пурэвсурэн Билгуун P3213 <br>
        </span>
    </header>

    <main class="main-container">
        <h1 class="visually-hidden">Лабораторная работа №2</h1>
        <div class="main-container__item main-container__item_left-column"></div>>
            <section class="main-container__item_left-column__item content-section content-section_graph">
                <h2 class="content-section__header content-section__header_graph topper">
                    <span class="content-section__header__text">
                        График
                    </span>
                </h2>
                <div class="content-container result-graph_container">
                    <object class="result-graph" data="jpg/areas.svg" type="image/svg+xml">
                        <img src="jpg/areas.png" width="220" height="220" alt="График">
                    </object>
                    <canvas class="graph-canvas" width="220" height="220">Интерактивная область графика</canvas>
                </div>
            </section>

            <section class="main-container__item_left-column__item content-section content-section_values">
                <h2 class="content-section__header content-section__header_values topper">
                    <span class="content-section__header__text">
                        Данные
                    </span>
                </h2>
                <form action="/web-lab2" method="post" class="input-form">
                    <p class="input-form__info"> Введите координаты точки</p>
                    <div class="input_form__container input-form__container_select">
                        <label class="input-form__label" for="x-select">X</label>
                        <select class="input_form__control input-form__select input-form__select_x" name="x-val"
                            id="x-select">
                            <option value="-3">-3</option>
                            <option value="-2">-2</option>
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div class="input-form__container input-form__container_text">
                        <label class="input-form__label input-form__label_y" for="y-text">Y</label>
                        <input class="input-form__control input-form__text input-form__text_y" type="text" id="y-text"
                            name="yval" maxlength="10" autocomplete="off" placeholder="Число от -3 до 3">
                    </div>

                    <div class="input-form__container input-form__container-buttons">
                        <label class="input-form__label input-form__label_r">R</label>
                        <ul class="input-form--control input-form__button-list_r">
                            <li class="input-form__button-list_r__item">
                                <button class="input-form__button input-form__button_r" id="r-button1" type="button"
                                    name="rval" value="1">1</button>
                            </li>
                            <li class="input-form__button-list_r__item">
                                <button class="input-form__button input-form__button_r" id="r-button2" type="button"
                                    name="rval" value="1.5">1.5</button>
                            </li>
                            <li class="input-form__button-list_r__item">
                                <button class="input-form__button input-form__button_r" id="r-button3" type="button"
                                    name="rval" value="2">2</button>
                            </li>
                            <li class="input-form__button-list_r__item">
                                <button class="input-form__button input-form__button_r" id="r-button4" type="button"
                                    name="rval" value="2.5">2.5</button>
                            </li>
                            <li class="input-form__button-list_r__item">
                                <button class="input-form__button input-form__button_r" id="r-button5" type="button"
                                    name="rval" value="3">3</button>
                            </li>
                        </ul>
                    </div>

                    <input type="hidden" name="rval" value="" class="input-form__hidden_r">
                    <input type="hidden" name="timezone" value="" class="input-form__hidden_timezone">
                    <input type="hidden" name="clear" value="" class="input-form__hidden_clear">

                    <div class="input-form__control-button__container">
                        <button class="input-from__control-buttons__button input-form__control-buttons__button_submit"
                            type="submit"> Отправить </button>
                        <button class="input-form__control-buttons__button input-form__control-buttons__button_reset"
                            type="submit">Очистить</button>
                    </div>
                </form>
            </section>
        </div>

        <section class="main-container__item main-container__item_table content-section content-section_table">
            <h2 class="content-section__header content-section__header_table topper">
                <span class="content-section__header__text">
                    Таблица
                </span>
            </h2>
            <div class="result_table_container">
                <table class="result-table">
                    <tr>
                        <th class="result-table__coords-column">X</th>
                        <th class="result-table__coords-column">Y</th>
                        <th class="result-table__coords-column">R</th>
                        <th class="result-table__time-column">Время запроса</th>
                        <th class="result-table__time-column">Время выполнения (нс)</th>
                        <th class="result-table__hitres-column">Результат</th>
                    </tr>
                    <c:forEach var="entry" items="${entries.entries}">
                        <tr>
                            <td>${entry.xValue}</td>
                            <td>${entry.yValue}</td>
                            <td>${entry.rValue}</td>
                            <td>${entry.currentTime}</td>
                            <td>${entry.executionTime}</td>
                            <td>${entry.hitResult}</td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
        </section>
    </main>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>