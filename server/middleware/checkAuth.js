import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../config.js";

/**
 * Middleware для проверки аутентифкации пользователя.
 * Если пользователь раньше был авторизован и срок действия его JWT токена не истек,
 * то возвращается callback и в request добавляется поле userId,
 * которое используется для быстрого нахождения учетной записи.*/
export default (req, res, next) => {

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // достаем токен из headers
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY); // Расшифрофка токена
            req.email = decoded.email; // Добавлени userId в request
            next();                   // Вызов callback`а
        }
        catch (e) {
            return res.status(403).json({
                message: 'No access',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access',
        });
    }
}