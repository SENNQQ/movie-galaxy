import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import sizeOf from 'image-size';


const app = express()
const port = 3100

import routes from './routes/routes.js';
import checkAuth from "./middleware/checkAuth.js";

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())
app.use(fileUpload({
    createParentPath: true, // Автоматическое создания пути
    limits: {
        fileSize: 20 * 1024 * 1024 * 1024, //20MB максимальный размер файла
    },
    responseOnLimit: 'Максимальный размер файла 20мб',
}));// Конфигурация для загрузки файлов
app.use('/files', express.static('files'));     // Конфигурация для использования статических файлов в папке files


// app.use(express.json())
app.use('/api', routes)

app.post('/upload', checkAuth, async (req, res) => {
    try {
        if (!req.files) {
            return res.json({
                success: false,
                message: 'Нет загружаемых файлов',
            });
        }
        if (req.files.avatar) {
            let avatar = req.files.avatar;
            const {height, width, type} = sizeOf(avatar.data);
            if (height && height < 480 || width && width < 480) {
                return res.json({
                    success: false,
                    message: 'Минимальные высота и ширина: 480px',
                });
            }
            if (type !== 'jpg' && type !== 'png') {
                return res.json({
                    success: false,
                    message: 'Допустимые форматы: png, jpg',
                });
            }
            const filePath = `files/avatars/${req.id}/${avatar.name}`;
            await avatar.mv(filePath);
            return res.status(200).json({
                success: true,
                message: 'Файл успешно загружен',
                url: filePath,
            });
        }

        return res.json({
            success: false,
            message: `Не найдено имя ${Object.keys(req.files).join(', ')}. Доступные имена: avatar, homework`,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'Не удалось загрузить файл',
        });
    }
}); // Обработка загрузки файлов

const start = () => {
    try {
        app.listen(port, () => console.log(`App running on port ${port}.`))
    } catch (e) {
        console.error('Error', e.message);
        process.exit(1);
    }
};

start();