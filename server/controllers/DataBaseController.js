import {exec} from "child_process";


export const createBackUpDB = async (req, res) => {

    try {

        exec('"X:\\web dev project\\movie-galaxy\\DB\\backup.bat"', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            res.status(200).json({
                success:true
            })
            console.log(stdout);
        });

    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }
}

export const restoreBackUp = async (req, res) => {

    try {
        if (req.files.database) {
            let database = req.files.database;
            const filePath = `files\\db\\${new Date().toDateString()}\\${database.name}`;
            await database.mv(filePath);

            exec(`"C:\\Program Files\\PostgreSQL\\14\\bin\\pg_restore.exe"  --host "localhost" --port "5432" --username "postgres" --no-password --dbname "movie-galaxy" --clean --verbose "X:\\web dev project\\movie-galaxy\\server\\${filePath}"`, (err, stdout) => {
                if (err) {
                    console.log(err)
                    res.status(200).json({
                        error:"An error occurred while updating the database!"
                    })
                }
                res.status(200).json({
                    success:true
                })
                console.log(stdout);
            });
        }
        else{
            res.status(200).json({
                error:"An error occurred while updating the database!"
            })
        }

    } catch (err) {
        res.status(500).json({
            error: "No access!", //Database connection error
        });
    }
}

