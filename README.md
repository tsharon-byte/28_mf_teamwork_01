# Игра BOMBERMAN

Выполнена студентами курса [Я.Практикум](https://practicum.yandex.ru/) `Мидл фронтенд-разработчик`

[Антон Татаринов](https://github.com/Avanire)

[Иван Аксененко](https://github.com/ioaksenenko)

[Сергей Калачев](https://github.com/likeariverstream)

[Татьяна Чуркина](https://github.com/tsharon-byte/)

## Используемые технологии

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

## [Описание игры](./docs/scenario.md)

## [Видео демонстрация задач 7-8 спринтов](TODO)

## [Отчет об утечках памяти тут](./docs/MEMORYLEAKS.md)

## Как запускать локально

### Режим разработки

1. Установите зависимости командой `yarn bootstrap`
2. В режиме разработки запустите сервер `yarn dev:server`

### Режим production локально

1. Установите зависимости командой `yarn bootstrap`
2. В режиме разработки запустите сервер `yarn dev:server`

## Как запускать в Docker

1. Проверить .env файл в нем должны быть указаны все зависимости указанные в .env.sample
2. В командной строке docker-compose build
3. docker-compose up
4. Будут собраны 3 контейнера postgres, pgadmin, server
5. Server запускается по адресу localhost:3001. pgadmin запускается по адресу localhost:8080
6. Документация к API доступна по url [swagger](http://localhost:3001/swagger/)

## Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```

### Тесты

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)

## Автодеплой статики на vercel

[BOMBERMAN](https://28-mf-teamwork-01-client.vercel.app/)
