// wikibears.js

// Fetching bear data 
function bears() {

    var baseUrl = "https://en.wikipedia.org/w/api.php";
    var title = "List_of_ursids";

    var params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        section: 3,
        format: "json",
        origin: "*"
    };

    function fetchImageUrl(fileName) {
        var imageParams = {
            action: "query",
            titles: "File:" + fileName,
            prop: "imageinfo",
            iiprop: "url",
            format: "json",
            origin: "*"
        };

        var url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
        
        return fetch(url).then(function(res) {
            return res.json();
        }).then(function(data) {
            var pages = data.query.pages;
            var page = Object.values(pages)[0];
            return page.imageinfo[0].url;
        });
    }

    function extractBears(wikitext) {
        console.log(wikitext);
        var speciesTables = wikitext.split('{{Species table/end}}');
        var bears = [];

        speciesTables.forEach(function(table) {
            var rows = table.split('{{Species table/row');
            
            rows.forEach(function(row) {
                var nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
                var binomialMatch = row.match(/\|binomial=(.*?)\n/);
                var imageMatch = row.match(/\|image=(.*?)\n/);
                var rangeMatch = row.match(/\|range=(.*?)\|/);

                if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
                    var fileName = imageMatch[1].trim().replace('File:', '');

                    fetchImageUrl(fileName).then(function(imageUrl) {
                        var bear = {
                            name: nameMatch[1],
                            binomial: binomialMatch[1],
                            image: imageUrl,
                            range: rangeMatch[1]
                        };
                        bears.push(bear);
                        console.log("BEARS: " + bears.length);

                        if (bears.length === 8) {
                            console.log("DONE! Print to page...");
                            var moreBears = document.querySelector('.more_bears');
                            bears.forEach(function(bear) {
                                var html = '<div class="bear">' +
                                    '<img src="' + bear.image + '" alt="Image of ' + bear.name + '" style="width:200px; height:auto;">' +
                                    '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
                                    '<p>Range: ' + bear.range + '</p>' +
                                    '</div>';
                                moreBears.innerHTML += html;
                            });
                        }
                    });
                }
            });
        });
    }

    function printBears(bears) {
        console.log("DONE! Print to page...");
        var moreBears = document.querySelector('.more_bears');
        bears.forEach(function(bear) {
            var html = '<div class="bear">' +
                '<img src="' + bear.image + '" alt="Image of ' + bear.name + '" style="width:200px; height:auto;">' +
                '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
                '<p>Range: ' + bear.range + '</p>' +
                '</div>';
            moreBears.innerHTML += html;
        });
    }

    fetch(baseUrl + "?" + new URLSearchParams(params).toString())
    .then(function(res) { 
        return res.json(); 
    })
    .then(function(data) {
        extractBears(data.parse.wikitext['*']);
    });

}

export {bears}