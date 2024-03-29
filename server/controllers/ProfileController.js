import pool from "../db.js";


export const getAllEntryCatalog = async (req, res) => {

    const id = req.id;

    try {

        //Проверяем, существуют ли записи
        const data = await pool.query(`SELECT * FROM catalog WHERE clients_id = $1;`, [id]);

        const arr = data.rows;

        if (arr.length === 0) {
            return res.status(204).json({
                message: "The entry's was not found",
                status: false
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: [
                    ...arr,
                ],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}

export const getHistoryLastThree = async (req, res) => {

    const {id} = req.query;

    try {
        //Получаем последние 3 записи истории
        const data = await pool.query(`SELECT * FROM catalog WHERE clients_id = $1 ORDER BY last_update DESC LIMIT 3 `,
            [id]);

        const arr = data.rows;

        if (arr.length === 0) {
            return res.status(204).json({
                message: "The entry was not found",
                status: false
            });
        } else {
            res.status(200).json({
                success: true,
                data: [
                    ...arr,
                ],
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}



