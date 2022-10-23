import pool from "../db.js";

export const get = async (req, res) => {

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

export const createEntry = async (req, res) => {

    const id = req.id;
    const {status, score, watchedEp, mt_id} = req.body;

    try {

        // Вставка данных в базу данных
        await pool.query(`INSERT INTO catalog (clients_id, mt_id, score, watchedep, status) VALUES ($1,$2,$3, $4, $5);`,
            [id, mt_id, score, watchedEp, status],
            (err) => {
                if (err) {
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
        const {status, score, watchedEp, mt_id} = req.body;
        // Обновление данных каталога
        await pool.query(`UPDATE catalog SET score = $1, status = $2, watchedep = $3 WHERE clients_id = $4 and mt_id = $5;`,
            [score, status, watchedEp, id, mt_id], (err, resolve) => {
                if (err) {
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
