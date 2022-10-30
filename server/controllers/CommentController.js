import pool from "../db.js";


export const createComment = async (req, res) => {

    const id = req.id;
    const {mt_id, comment, content_name, content_type} = req.body;
    try {

        //Создаем комментарий к посту
        await pool.query(`INSERT INTO comments (clients_id, content_id, comment, content_name, content_type) VALUES ($1,$2,$3,$4,$5);`,
            [id, mt_id, comment, content_name,content_type], (err) => {
                if (err) {
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else{
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

export const getContentComment  = async (req, res) => {

    const {content_id} = req.query;

    try {
        //Выбираем записи и передаем их
        const data = await pool.query(`SELECT clients.nickname, clients.avatar, comments.* FROM comments 
                                        JOIN clients ON clients.clients_id = "comments".clients_id
                                            WHERE content_id = $1 and verification = true`, [content_id]);
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

export const getAll = async (req, res) => {

    try {
        //Выбираем записи и передаем их
        const data = await pool.query(`SELECT clients.nickname, clients.avatar, comments.* FROM comments
                                        JOIN clients ON clients.clients_id = "comments".clients_id
                                            WHERE verification = false`);

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

export const updateApprove = async (req, res) => {

    const {comments_id} = req.body;

    try {
        //Обновляем верификацию комментария
        await pool.query(`UPDATE comments SET verification = true WHERE comments_id = $1;`, [comments_id],
            (err, results) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    error: "Failed to update user"
                })
            }else{
                console.log(results)
                return res.status(200).json({
                    success: true,
                })
            }
        });


    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }

}



