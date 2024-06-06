# Проект с сервисами пользователей и истории действий

Этот проект включает два микросервиса: сервис пользователей и сервис истории действий с пользователями. Проект также использует PostgreSQL для хранения данных.

# Сервис пользователей

Сервис пользователей предоставляет API для создания, изменения и получения списка пользователей.

### Эндпоинты

1. **Создание пользователя**
    - Метод: `POST`
    - URL: `/users`
    - Тело запроса (JSON):
      ```json
      {
        "name": "test",
        "email": "test@example.com"
      }
      ```
    - Ответ:
      ```json
      {
        "id": 1,
        "name": "test",
        "email": "test@example.com"
      }
      ```

2. **Изменение пользователя**
    - Метод: `PUT`
    - URL: `/users/:id`
    - Тело запроса (JSON):
      ```json
      {
        "name": "test Updated",
        "email": "test.updated@example.com"
      }
      ```
    - Ответ:
      ```json
      {
        "id": 1,
        "name": "test Updated",
        "email": "test.updated@example.com"
      }
      ```

3. **Получение списка пользователей**
    - Метод: `GET`
    - URL: `/users`
    - Ответ:
      ```json
      [
        {
          "id": 1,
          "name": "test",
          "email": "test@example.com"
        },
        {
          "id": 2,
          "name": "test2",
          "email": "test2@example.com"
        }
      ]
      ```

## Сервис истории действий

Сервис истории действий предоставляет API для получения истории действий пользователей с поддержкой фильтрации по `userId` .

### Эндпоинты

1. **Получение истории действий**
    - Метод: `GET`
    - URL: `/events`
    - Параметры запроса:
        - `userId`: ID пользователя (необязательный)
        - `page`: номер страницы (по умолчанию 1)
        - `limit`: количество записей на странице (по умолчанию 10)
    - Ответ:
      ```json
      [
        {
          "id": 1,
          "event": "USER_CREATED",
          "userId": 1,
          "timestamp": "2024-01-01T12:34:56.000Z"
        },
        {
          "id": 2,
          "event": "USER_UPDATED",
          "userId": 1,
          "timestamp": "2024-01-01T14:56:78.000Z"
        }
      ]
      ```

## Установка и запуск

### Требования

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/)

### Шаги для запуска проекта

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/SaimonWELL/user-service.git
    ```
2. Установите зависимости сервисов пользователей и истории действий:

    ```bash
    # В директории user-service
    cd user-service
    npm install

    # В другой вкладке терминала в директории history-service
    cd history-service
    npm install
    ```

3. Соберите и запустите контейнер:

    ```bash
    cd ..
    docker-compose up -d
    ```

4. Проверьте работу PostgreSQL, подключившись к базе данных с помощью клиента PostgreSQL или выполнив следующую команду:

    ```bash
    docker exec -it nodejs_junior-postgres-1 psql -U postgres
    ```

5. Установите завимости проекта и запустите сервисы пользователей и истории действий:

    ```bash
    # В корневой директории 
   npm install
   npm run start:services
    ```

