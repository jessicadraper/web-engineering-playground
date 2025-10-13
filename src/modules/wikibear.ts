// wikibears.js

const PLACEHOLDER_IMAGE = '/media/bear-placeholder.jpg';

const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const params: Record<string, string> = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: '3',
  format: 'json',
  origin: '*',
};

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Fetching bear data
const wikibears = async () => {
  const extractBears = async (wikitext: string) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears: Bear[] = [];

    for (const table of speciesTables) {
      const rows = table.split('{{Species table/row');

      for (const row of rows) {
        const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
        const binomialMatch = row.match(/\|binomial=(.*?)\n/);
        const imageMatch = row.match(/\|image=(.*?)\n/);
        const rangeMatch = row.match(/\|range=(.*?)\|/);

        // Skip if required data is missing
        if (!nameMatch || !binomialMatch || !rangeMatch) continue;

        const name = nameMatch?.[1] ?? 'Unknown';
        const binomial = binomialMatch?.[1] ?? 'Unknown';
        const range = rangeMatch?.[1] ?? 'Unknown';

        let imageUrl = PLACEHOLDER_IMAGE;

        if (imageMatch?.[1]) {
          const fileName = imageMatch[1].trim().replace('File:', '');

          // Fetch url and check if broken/available; otherwise placeholder
          try {
            const fetchedImageUrl = await fetchImageUrl(fileName);
            imageUrl = await checkImageAvailability(fetchedImageUrl);
          } catch (error) {
            console.log(error);
            imageUrl = PLACEHOLDER_IMAGE; // placeholder image if fetch or check fails
          }
        }

        // Add bear to array
        const bear = {
          name,
          binomial,
          image: imageUrl,
          range,
        };
        bears.push(bear);
      }
    }
    return bears;
  };

  const printBears = (bears: Bear[]) => {
    const moreBears = document.querySelector('.more_bears');

    // If no .more_bears HTML  element, do nothing
    if (!moreBears) {
      return;
    }

    // If no bears content, display error
    if (bears.length == 0) {
      moreBears.innerHTML =
        '<div class="error">There is an issue loading more bear content. Please contact site administrator.</div>';
      return;
    }

    bears.forEach((bear) => {
      moreBears.appendChild(renderBear(bear));
    });
  };

  const renderBear = (bear: Bear): HTMLElement => {
    const bearDiv = document.createElement('div');
    bearDiv.className = 'bear';

    const img = document.createElement('img');
    img.src = bear.image;
    img.alt = `Image of ${bear.name}`;
    img.style.width = '200px';
    img.style.height = 'auto';

    const namePara = document.createElement('p');
    namePara.innerHTML = `<b>${bear.name}</b> (${bear.binomial})`;

    const rangePara = document.createElement('p');
    rangePara.textContent = `Range: ${bear.range}`;

    bearDiv.appendChild(img);
    bearDiv.appendChild(namePara);
    bearDiv.appendChild(rangePara);

    return bearDiv;
  };

  const getAndPrintBears = async (params: Record<string, string>) => {
    try {
      const url = baseUrl + '?' + new URLSearchParams(params).toString();
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch bear data from Wikipedia');

      const data = await res.json();
      const wikitext = data?.parse?.wikitext?.['*'];
      if (!wikitext) throw new Error('Issue with returned format of bear data');

      console.log('Getting bears...');
      const bears = await extractBears(wikitext);

      if (bears) {
        console.log('Bears loaded!');
        printBears(bears);
      }
    } catch (error) {
      console.error('Error loading bears: ', error);
      printBears([]);
    }
  };

  await getAndPrintBears(params);
};

const fetchImageUrl = async (fileName: string) => {
  const imageParams = {
    action: 'query',
    titles: 'File:' + fileName,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = baseUrl + '?' + new URLSearchParams(imageParams).toString();

  try {
    const res = await fetch(url);
    const data = await res.json();

    const pages = Object.values(data?.query?.pages || {});
    const page = pages.length > 0 ? (pages[0] as any) : null;
    const imageUrl = page?.imageinfo?.[0]?.url || PLACEHOLDER_IMAGE;
    return imageUrl;
  } catch (e) {
    console.log(e);
    return PLACEHOLDER_IMAGE;
  }
};

const checkImageAvailability = async (url: string) => {
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
};

export { wikibears };
