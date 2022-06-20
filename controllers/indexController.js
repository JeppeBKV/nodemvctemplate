
// For index View sending path to other layout than default
const indexView = (req, res) => {
    res.render("index", { title: 'Frontpage', layout: './layouts/sidebar' });
}

module.exports = {
    indexView
};