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
                error: "Email or nickname already there, No need to register again.",
            });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const passwordHas = bcrypt.hash(req.body.password, salt);

            const user = {
                nickname,
                email,
                password: passwordHas,
            };


            console.log(SECRET_KEY)
            const token = jwt.sign({email: user.email}, SECRET_KEY, {expiresIn: '30d'});

            // Вставка данных в базу данных
            await pool.query(`INSERT INTO clients (nickname, email, password) VALUES ($1,$2,$3);`, [user.nickname, user.email, user.password],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
            })

            // Получение пользователя из базы
            await pool.query(`SELECT * FROM clients WHERE email= $1 or nickname = $2;`, [email, nickname], (err, results) =>{
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else {
                    console.log(results)
                    res.status(201).json({
                        success: true,
                        data: {...results.rows, token},
                    });
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    }

}