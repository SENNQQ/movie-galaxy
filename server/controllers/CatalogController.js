import pool from "../db.js";

export const getOneEntry = async (req, res) => {

    const id = req.id;
    const mt_id = req.query.mt_id;

    try {
        //Проверяем, существует ли запись
        const data = await pool.query(`SELECT * FROM catalog WHERE clients_id = $1 and mt_id = $2;`, [id, mt_id]);

        const arr = data.rows;
        console.log(mt_id);
        if (arr.length === 0) {
            return res.status(204).json({
                message: "The entry was not found",
                status: false
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    ...arr[0],
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const getAllEntry = async (req, res) => {
    const id = req.id;

    try {
        //Выбираем записи и передаем их
        const data = await pool.query(`SELECT * FROM catalog WHERE clients_id = $1`, [id]);
        const arr = data.rows;

        res.status(200).json({
            success: true,
            data: [
                ...arr,
            ],
        });

    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const getEntryStatus = async (req, res) => {

    const id = req.id;
    const status = req.query.status;

    try {
        //Выбираем записи и передаем их
        const data = await pool.query(`SELECT * FROM catalog WHERE clients_id = $1 and status = $2;`, [id, status]);
        const arr = data.rows;

        res.status(200).json({
            success: true,
            data: [
                ...arr,
            ],
        });

    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const createEntry = async (req, res) => {

    const id = req.id;
    const {status, score, watchedEp, mt_id, type_mt, episodes, img, name_mt} = req.body;
    console.log(type_mt);
    try {

        // Вставка данных в базу данных
        await pool.query(`INSERT INTO catalog (clients_id, mt_id, score, watchedep, status, type_mt, 
                                                                                episodes, img_string, name_mt_id) 
                            VALUES ($1,$2,$3, $4, $5, $6, $7, $8, $9);`,
            [id, mt_id, score, watchedEp, status, type_mt, episodes, img, name_mt],
            (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: "Database error"
                    })
                } else {
                    return res.status(201).json({
                        status: true
                    })
                }
            })
    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const updateEntry = async (req, res) => {

    try {
        const id = req.id;
        const {status, score, watchedEp, mt_id, episodes, img, name_mt} = req.body;
        // Обновление данных каталога
        await pool.query(`UPDATE catalog SET score = $1, status = $2, watchedep = $3, 
                            episodes = $4, img_string = $5, name_mt_id = $6
                            WHERE clients_id = $7 and mt_id = $8;`,
            [score, status, watchedEp, episodes, img, name_mt, id, mt_id],
            (err, resolve) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        error: "Failed to update catalog"
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                    })
                }
            })


    }
    catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}
