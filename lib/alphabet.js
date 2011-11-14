var comparator = module.exports = function(x, y) {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    } else {
        return;
    }
};