
const { ViewR } = require("../core/viewr");
const users = require("../data/sampleData.json");

/* Routes logic */
module.exports = {
    log: (req, res, next) => {
        console.log(`[${new Date().toISOString()} ${req.ip}] ${req.originalUrl}`);
        next();
    },

    root: async (req, res) => {

        res.status(200).send(await ViewR.render("views/index",
            {
                card: users[0],
                cards: users,
            }));
    },
    newsPage:(req,res)=>{
        res.status(200).send(ViewR.render("views/news"));
    },
    outerinner: (req, res) => {
        let toggle = true;
        if (req.query.toggleVar === "true") {
            toggle = true;
        } else if (req.query.toggleVar === "false") {
            toggle = false;
        };
        res.status(200).send(ViewR.renderSync("views/outerinner",
            {
                card: users[0],
                toggle
            }));
    },
    loop: (req, res) => {
        res.status(200).send(ViewR.renderSync("views/loop",
            {
                cards: users,
            }));
    },
    component: async (req, res) => {
        res.status(200).send(await ViewR.render("views/component"));
    },
    componentQueryResult: (req, res) => {
        let test = req.query.msg;
        test += " wolrd";
        res.status(200).send(test);
    },
    test: (req, res) => {
        res.status(200).json({ searchLabel: " Search", button: "Go !" });
    },

    /*  */
    session: (req, res) => {

    },

}