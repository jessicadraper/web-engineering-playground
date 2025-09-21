// wikibears.js

const PLACEHOLDER_IMAGE = '/media/bear-placeholder.jpg';

const baseUrl = "https://test.en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
};

// Fetching bear data 
const wikibears = async () => {

    const extractBears = async (wikitext) => {
        const speciesTables = wikitext.split('{{Species table/end}}');
        const bears = [];

        for (const table of speciesTables) {
            const rows = table.split('{{Species table/row');
            
            for (const row of rows) {
                const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
                const binomialMatch = row.match(/\|binomial=(.*?)\n/);
                const imageMatch = row.match(/\|image=(.*?)\n/);
                const rangeMatch = row.match(/\|range=(.*?)\|/);

                // Skip if required data is missing
                if (!nameMatch || !binomialMatch || !rangeMatch) continue;

                const name = nameMatch[1];
                const binomial = binomialMatch[1];
                const range = rangeMatch[1];

                let imageUrl = PLACEHOLDER_IMAGE;

                if (imageMatch) {
                    const fileName = imageMatch[1].trim().replace('File:', '');

                    // Fetch url and check if broken/available; otherwise placeholder
                    try {
                        const fetchedImageUrl = await fetchImageUrl(fileName);
                        imageUrl = await checkImageAvailability(fetchedImageUrl);
                    } catch (error) {
                        imageUrl = PLACEHOLDER_IMAGE; // placeholder image if fetch or check fails
                    }
                }

                // Add bear to array
                const bear = {
                    name,
                    binomial,
                    image: imageUrl,
                    range
                };
                bears.push(bear);
            }
        }
        return bears;
    }

    const printBears = (bears) => {
        const moreBears = document.querySelector('.more_bears');

        if (bears.length == 0) {
            moreBears.innerHTML = '<div class="error">There is an issue loading more bear content. Please contact site administrator.</div>'
            return
        }

        bears.forEach(bear => {
            const html = '<div class="bear">' +
                '<img src="' + bear.image + '" alt="Image of ' + bear.name + '" style="width:200px; height:auto;">' +
                '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
                '<p>Range: ' + bear.range + '</p>' +
                '</div>';
            moreBears.innerHTML += html;
        });
    }

    const getAndPrintBears = async (params) => {
        try {
            const url = baseUrl + "?" + new URLSearchParams(params).toString();
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch bear data from Wikipedia")

            const data = await res.json()
            const wikitext = data?.parse?.wikitext?.['*'];
            if (!wikitext) throw new Error("Issue with returned format of bear data")

            console.log("Getting bears...");
            const bears = await extractBears(wikitext);

            console.log("Bears loaded!");
            printBears(bears)
        } catch (error) {
            console.error("Error loading bears: ", error)
            printBears([])
        }
    }

    await getAndPrintBears(params)

}

const fetchImageUrl = async (fileName) => {
    const imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    const url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
    
    try {
        const res = await fetch(url);
        const data = await res.json();

        const page = Object.values(data?.query?.pages || {})[0];
        return page?.imageinfo?.[0]?.url || PLACEHOLDER_IMAGE;
    }
    catch (e) {
        console.log(e);
        return PLACEHOLDER_IMAGE
    }
}

const checkImageAvailability = async (url) => {
    try {
        const response = await fetch(url, { method: 'GET' });
        if (response.ok) {
            // console.log("URL available: ", url)
            return url;
        } else {
            // console.log("URL not available: ", url)
            return PLACEHOLDER_IMAGE;
        }
    } catch {
        return PLACEHOLDER_IMAGE;
    }
}

export {wikibears}