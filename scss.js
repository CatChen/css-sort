var usage = [
    'Usage:',
    '   node scss.js comparator style1.css [style2.css style3.css ...]',
    'Comparators:',
    '   alphabet'
];

require.paths.unshift('./lib');

const fs = require('fs');
const less = require('less');
const overload = require('jshelpers').Overload;

var sortRulesRecursively = function(rule, comparator) {
    rule.rules.sort(function(rule1, rule2) {
        if (rule1.name && rule2.name) {
            return comparator(rule1.name, rule2.name);
        } else if (rule1.name) {
            return 1;
        } else if (rule2.name) {
            return -1;
        } else {
            return 0;
        }
    });
    rule.rules.forEach(function(rule) {
        if (rule.rules) {
            sortRulesRecursively(rule, comparator);
        }
    });
};

var main = overload
    .add('String, ...', function(comparatorName, cssFiles) {
        if (cssFiles.length === 0) {
            console.log(usage.join('\n'));
            return;
        }
        try {
            var comparator = require(comparatorName);
        } catch (error) {
            console.log(error);
            return;
        }
        
        var cssTexts = [];
        cssFiles.forEach(function(cssFile) {
            cssTexts.push(fs.readFileSync(cssFile));
        });
        var cssText = cssTexts.join('\n\n');
        
        var parser = new less.Parser();
        parser.parse(cssText, function(error, tree) {
            if (error) {
                console.log(error);
                return;
            }
            
            sortRulesRecursively(tree, comparator);
            
            cssText = tree.toCSS();
            console.log(cssText);
        });
    })
    .add('...', function(anything) {
        console.log(usage.join('\n'));
    });

if (require.main === module) {
    main.apply(this, process.argv.slice(2));
}

module.exports = main;
