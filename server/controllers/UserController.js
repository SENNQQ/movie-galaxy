import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../db.js";
import {SECRET_KEY} from "../config.js"


/**
//  * Обработка запроса на регистрацию нового пользователя*/
export const register = async (req, res) => {

    const {nickname, email, password} = req.body;
    try {
        //Проверяем, существует ли пользователь
        const data = await pool.query(`SELECT * FROM clients WHERE email= $1 or nickname = $2;`, [email, nickname]);
        const arr = data.rows;
        if (arr.length !== 0) {
            return res.status(400).json({
                message: "Email or nickname already there, No need to register again.",
            });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const passwordHas = await bcrypt.hash(password, salt);

            const user = {
                nickname,
                email,
                password: passwordHas,
            };

            // Вставка данных в базу данных
            await pool.query(`INSERT INTO clients (nickname, email, password) VALUES ($1,$2,$3);`, [user.nickname, user.email, user.password],
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
            })


            // Получение пользователя из базы
            await pool.query(`SELECT * FROM clients WHERE email= $1 or nickname = $2;`, [email, nickname], (err, results) =>{
                if (err) {
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else {
                    const token = jwt.sign({id: results.rows[0].clients_id}, SECRET_KEY, {expiresIn: '30d'});

                    res.status(201).json({
                        success: true,
                        data: {
                            ...results.rows[0],
                            token
                        },
                    });
                }
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Database error while registring user!", //Database connection error
        });
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        //Проверяем, существует ли пользователь
        const data = await pool.query(`SELECT * FROM clients WHERE email= $1;`, [email]);
        const arr = data.rows;

        if (arr.length === 0) {
            return res.status(400).json({
                message: "Email or nickname already there, No need to register again.",
            });
        }
        else {
            // const salt = await bcrypt.genSalt(10);
            // const passwordHas = bcrypt.hash(req.body.password, salt);

            const isValidPassword = await bcrypt.compare(password, arr[0].password)

            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Invalid username or password',
                });
            }

            const token = jwt.sign({id: arr[0].clients_id}, SECRET_KEY, {expiresIn: '30d'});

            // Получение пользователя из базы
            await pool.query(`SELECT * FROM clients WHERE email= $1`, [email], (err, results) =>{
                if (err) {
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...results.rows[0],
                            token
                        },
                    });
                }
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Database error while login user!", //Database connection error
        });
    }

}

export const getMe = async (req, res) => {

    try {
        //Проверяем, существует ли пользователь
        const data = await pool.query(`SELECT * FROM clients WHERE clients_id = $1;`, [req.id]);

        const arr = data.rows;

        if (arr.length === 0) {
            return res.status(400).json({
                message: "User is not found",
            });
        }
        else {
            res.status(201).json({
                success: true,
                data: {
                    ...arr[0],
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const update = async (req, res) => {

    try {

        const {nickname, email, surname, patronymic, phone, sex, birthdate, name, id, avatar} = req.body;
        if(avatar){
            // Обновление аватара пользователя
            await pool.query(`UPDATE clients SET avatar = $1 WHERE clients_id = $2;`,
                [avatar, id],(err) => {
                    if (err) {
                        return res.status(500).json({
                            error: "Failed to update user"
                        })
                    }
                })
        }
        else{
            // Обновление данных пользователя
            await pool.query(`UPDATE clients SET birth_date = $1, nickname = $2, sex = $3, name = $4, patronymic = $5, surname = $6, phone_number = $7, email = $8 WHERE clients_id = $9;`,
                [birthdate,nickname, sex, name, patronymic, surname, phone, email, id],(err) => {
                    if (err) {
                        return res.status(500).json({
                            error: "Failed to update user"
                        })
                    }
                })
        }

        // Получение пользователя из базы
        await pool.query(`SELECT * FROM clients WHERE clients_id = $1`, [id], (err, results) =>{
            if (err) {
                return res.status(500).json({
                    message: "User not found after update"
                })
            }
            else {
                res.status(201).json({
                    success: true,
                    data: {
                        ...results.rows[0],
                    },
                });
            }
        })

    }
    catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}