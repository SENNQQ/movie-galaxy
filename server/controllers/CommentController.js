import pool from "../db.js";


export const createComment = async (req, res) => {

    const id = req.id;

    try {

        //Создаем комментарий к посту
        await pool.query(`INSERT INTO comments (clients_id, content_id, comment) VALUES ($1,$2,$3);`,
            [id, req.body.mt_id, req.body.comment], (err,results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else{
                    console.log(results)
                    res.status(201).json({
                        success: true,
                    });
                }
        });

    }
    catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}




