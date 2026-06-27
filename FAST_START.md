# IXSAYZ SHOP - быстрый запуск без лишней возни

## Самый простой рабочий вариант

Используем:

- GitHub Pages - чтобы получить ссылку сайта;
- Cloudinary - чтобы фото из галереи телефона были видны всем;
- Firebase Firestore - позже, чтобы товары и заказы были общей базой.

Сначала сделайте GitHub Pages + Cloudinary. Это самый быстрый путь.

---

## 1. Что нельзя сделать полностью командой

Командой нельзя автоматически создать аккаунты и подтвердить вход:

- GitHub аккаунт;
- Firebase проект;
- Cloudinary аккаунт;
- Telegram Bot.

Это надо один раз сделать руками в браузере.

Зато после этого можно пользоваться командами.

---

## 2. Быстро опубликовать через GitHub

Откройте PowerShell в папке:

```powershell
cd C:\Users\magf5\Documents\Codex\2026-06-26\new-chat\outputs\ixsayz-shop
```

Если установлен GitHub CLI, выполните:

```powershell
gh auth login
gh repo create ixsayz-shop --public --source . --remote origin --push
```

Потом включите GitHub Pages:

```powershell
gh api repos/:owner/ixsayz-shop/pages -X POST -f source.branch=main -f source.path=/
```

Если команда Pages не сработала, включите руками:

1. Откройте репозиторий `ixsayz-shop` на GitHub.
2. `Settings`.
3. `Pages`.
4. Source: `Deploy from a branch`.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.

Ссылка будет:

```text
https://ВАШ-НИК.github.io/ixsayz-shop/
```

Админка:

```text
https://ВАШ-НИК.github.io/ixsayz-shop/admin/
```

---

## 3. Если GitHub CLI не установлен

Скачайте:

```text
https://cli.github.com/
```

Потом снова выполните:

```powershell
gh auth login
cd C:\Users\magf5\Documents\Codex\2026-06-26\new-chat\outputs\ixsayz-shop
gh repo create ixsayz-shop --public --source . --remote origin --push
```

---

## 4. Настроить фото товаров бесплатно через Cloudinary

1. Откройте:

```text
https://cloudinary.com/
```

2. Создайте бесплатный аккаунт.
3. Найдите `Cloud name`.
4. Откройте `Settings`.
5. Откройте `Upload`.
6. Найдите `Upload presets`.
7. Создайте preset.
8. Поставьте режим `Unsigned`.
9. Назовите preset:

```text
ixsayz_unsigned
```

10. Откройте админку сайта:

```text
https://ВАШ-НИК.github.io/ixsayz-shop/admin/
```

11. Войдите:

```text
admin
IXSAYZ2026!
```

12. Откройте `Настройки`.
13. Вставьте:

```text
Cloudinary cloud name = ваш cloud name
Cloudinary unsigned upload preset = ixsayz_unsigned
```

14. Нажмите `Сохранить настройки`.

После этого фото из галереи телефона будут грузиться в облако.

---

## 5. Добавить товар с телефона

1. Откройте админку с телефона.
2. Войдите в админку.
3. Откройте `Товары`.
4. Нажмите `Загрузить фото из галереи телефона / компьютера`.
5. Выберите фото.
6. Заполните название.
7. Заполните цену.
8. Заполните размеры так:

```text
S:2,M:4,L:1,XL:0
```

9. Нажмите `Сохранить товар`.

Важно: фото будет в Cloudinary. Но сам товар без Firestore пока хранится в браузере админки. Для общей базы товаров нужен Firestore.

---

## 6. Быстро подготовить Firebase

Установите Firebase CLI:

```powershell
npm install -g firebase-tools
```

Войдите:

```powershell
firebase login
```

Откройте Firebase Console:

```text
https://console.firebase.google.com/
```

Создайте проект руками, например:

```text
ixsayz-shop
```

Потом в папке сайта:

```powershell
cd C:\Users\magf5\Documents\Codex\2026-06-26\new-chat\outputs\ixsayz-shop
firebase init hosting firestore
```

Выбирайте:

```text
Use an existing project
public directory: .
single-page app: No
overwrite index.html: No
```

Деплой:

```powershell
firebase deploy
```

После деплоя Firebase даст ссылку сайта.

---

## 7. Что сделать сначала

Самый быстрый порядок:

1. GitHub Pages.
2. Cloudinary.
3. Проверить сайт с телефона.
4. Проверить админку с телефона.
5. Добавить товар с фото.
6. Потом подключать Firebase Firestore для общей базы товаров и заказов.

---

## 8. Коротко про Telegram / WhatsApp

Сейчас заказ открывает:

- Telegram `@IXSAYZ`;
- WhatsApp `+7 925 365-62-55`.

Клиент нажимает отправить.

Полностью автоматическая отправка без клиента требует Telegram Bot + Firebase Functions.
