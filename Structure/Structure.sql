-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 21 2018 г., 22:12
-- Версия сервера: 5.7.20
-- Версия PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Structure`
--

-- --------------------------------------------------------

--
-- Структура таблицы `massage`
--

CREATE TABLE `massage` (
  `massage_id` int(11) NOT NULL,
  `massage_name` text NOT NULL,
  `massage_email` text NOT NULL,
  `massage_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `massage`
--

INSERT INTO `massage` (`massage_id`, `massage_name`, `massage_email`, `massage_text`) VALUES
(1, 'sad', 'asd@asd.ru', ''),
(2, 'asd', 'asd@asd.ru', 'asdsad'),
(3, 'asd', 'asd@asd.ru', 'asdsad'),
(4, 'asdsad', 'sadasd@asdas.com', 'asdasd'),
(5, 'asdsad', 'asd@asd.ru', 'asdsad'),
(6, 'asd', 'asd@asd.ru', 'фывфывфы'),
(7, 'asd', 'asd@asd.ru', 'фывфыв'),
(8, 'asd', 'asd@asd.ru', 'фывфыв'),
(9, 'asd', 'asd@asd.ru', 'фывыфвыфв'),
(10, 'asd', 'asd@asd.ru', 'фывыфвasd'),
(11, 'asdsad', 'asd@asd.ru', 'asdas'),
(12, 'asd', 'asd@asd.ru', 'asd'),
(13, 'asd', 'asd@asd.ru', 'sadasd');

-- --------------------------------------------------------

--
-- Структура таблицы `subscribe`
--

CREATE TABLE `subscribe` (
  `subscribe_id` int(11) NOT NULL,
  `subscribe_email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `subscribe`
--

INSERT INTO `subscribe` (`subscribe_id`, `subscribe_email`) VALUES
(1, 'dsfdsfdsf'),
(2, 'sdfdsfds213'),
(3, 'dsfsdf@yadnex.ru'),
(4, 'dsfsdf@yadnex.ru'),
(5, 'dsfsdf@yadnex.ru'),
(6, 'asdasdsa@as.ru'),
(7, 'asd@asd.ru'),
(8, 'asd@as1d.ru'),
(9, 'asdsad@asdasdas.com');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `massage`
--
ALTER TABLE `massage`
  ADD PRIMARY KEY (`massage_id`);

--
-- Индексы таблицы `subscribe`
--
ALTER TABLE `subscribe`
  ADD PRIMARY KEY (`subscribe_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `massage`
--
ALTER TABLE `massage`
  MODIFY `massage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `subscribe`
--
ALTER TABLE `subscribe`
  MODIFY `subscribe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
