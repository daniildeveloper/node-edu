var fortunes = [
    "Win!",
    "Los!",
    "Do not forget",
    "Wait for surprise",
    "Be simpler, DRY"
];

exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
};