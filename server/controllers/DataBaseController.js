import {exec} from "child_process";

export const createBackUpDB = async (req, res) => {

    try {
        exec('"X:\\web dev project\\movie-galaxy\\DB\\Текстовый документ.bat"', (err, stdout, stderr) => {
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
