### Hexlet tests and linter status:

[![Actions Status](https://github.com/MrFiftyFifty/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MrFiftyFifty/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d26c3991f89e5b5025c2/maintainability)](https://codeclimate.com/github/MrFiftyFifty/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d26c3991f89e5b5025c2/test_coverage)](https://codeclimate.com/github/MrFiftyFifty/frontend-project-46/test_coverage)

# Вычислитель отличий (JavaScript)

«Вычислитель отличий» – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн-сервисов, например: http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

## Возможности утилиты:

- Поддержка разных входных форматов: yaml и json.
- Генерация отчета в виде plain text, stylish и json.

## Установка:

```
git clone https://github.com/mrfiftyfifty/frontend-project-46.git
cd frontend-project-46
make install
npm link
```

## Краткая документация:

- `$ gendiff <filepath1> <filepath2>:` показать разницу в стандартном формате (по умолчанию "stylish")
- `$ gendiff -f, --format [plain, json, stylish] <filepath1> <filepath2>:` показать разницу в формате plain, json или stylish
- `$ gendiff -h, --help:` отобразить справку по командам

---

## Пример использования:

[![asciicast](https://asciinema.org/a/lZZeTozPrUFlnXMzB1BOph5NU.svg)](https://asciinema.org/a/lZZeTozPrUFlnXMzB1BOph5NU)

## Пример использования с поддержкой json и yaml в формате stylish:

[![asciicast](https://asciinema.org/a/634725.svg)](https://asciinema.org/a/634725)

## Пример использования в формате plain:

[![asciicast](https://asciinema.org/a/634770.svg)](https://asciinema.org/a/634770)

## Пример использования в формате json:

[![asciicast](https://asciinema.org/a/634773.svg)](https://asciinema.org/a/634773)
