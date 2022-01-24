const express = require("express");
const multer = require("multer");
const cors = require("cors");
const models = require("./models");
const uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
let sequelize = models.sequelize;
sequelize.sync();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Access-Control-Allow-Headers", "Content-Type"]
}));
app.use('/images', express.static('uploads'));

//새로운 단어 카드 등록 #1
// app.post("/create", (req, res) => {
//     try {
//         models.Stage1.create({
//             word: req.body.word,
//             mean: req.body.mean
//         });
//     }
//     catch (err) {
//         res.send(err);
//     }
// })

//각 stage에 해당하는 word를 읽어옴
app.get("/stages/:id/words", async (req, res) => {
    const Stage = "Stage" + req.params.id;
    const words = await models[Stage].findAll();
    res.send(words);
})

// image create
app.post("/stages/1/words/images", uploader.single('image'), async (req, res) => {
    const Stage = "Stage1";
    models[Stage].create({
        word: '/images/' + req.file.filename,
        mean: req.body.mean
    });
    res.send("Success posting");
})

//단어 성공
//맞춘 단어를 다음 stage에 등록하는 API
app.post("/stages/:id/words", async (req, res) => {
    const Stage = "Stage" + req.params.id;
    models[Stage].create({
        word: req.body.word,
        mean: req.body.mean
    });
    res.send("Success posting");
})

//맞춘 단어를 해당 stage에서 삭제하는 API #2
app.delete("/stages/:id/words", async (req, res) => {
    const Stage = "Stage" + req.params.id;
    models[Stage].destroy({
        where: {
            word: req.query.word,
            mean: req.query.mean
        }
    });
    res.send("Success deleting");
})

//단어 실패
//틀린 단어를 Stage1에 등록하는 API == #1과 동일
//틀린 단어를 해당 stage에서 삭제하는 API == #2와 동일

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`our express run on ${PORT}`);
})