var orders = [
    /* text */ ['font', 'color', 'text', 'letter', 'word', 'line-height', 'vertical-align', 'direction'],
    /* background */ ['background'], ['opacity'],
    /* box model */ ['width', 'height'], ['top', 'right', 'bottom', 'left'], ['padding'], ['border'], ['margin'], ['box-shadow'],
    /* layout */ ['position'], ['display'], ['visibility'], ['z-index'], ['overflow'], ['white-space'], ['clip'], ['float', 'clear'],
    /* other */ []
];

var ranks = [];

orders.forEach(function(group, index) {
    group.forEach(function(prefix) {
        var pair = {
            prefix: prefix,
            rank: index
        };
        ranks.push(pair);
    });
});

var getRank = function(name) {
    var index = 0;
    while (index < ranks.length) {
        if (name.indexOf(ranks[index].prefix) === 0) {
            return ranks[index].rank;
        }
        index++;
    }
    return Number.MAX_VALUE;
};

var comparator = module.exports = function(x, y) {
    var xRank = getRank(x);
    var yRank = getRank(y);
    return xRank - yRank;
};
