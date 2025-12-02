// wikibears.ts

const PLACEHOLDER_IMAGE =
  '/web-engineering-playground/media/bear-placeholder.jpg';

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
const wikibears = async (): Promise<Bear[]> => {
  const extractBears = async (wikitext: string): Promise<Bear[]> => {
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
        if (nameMatch == null || binomialMatch == null || rangeMatch == null)
          continue;

        const name = nameMatch?.[1] ?? 'Unknown';
        const binomial = binomialMatch?.[1] ?? 'Unknown';
        const range = rangeMatch?.[1] ?? 'Unknown';

        let imageUrl = PLACEHOLDER_IMAGE;

        if (imageMatch?.[1] != null) {
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

  const getBears = async (params: Record<string, string>): Promise<Bear[]> => {
    try {
      const url = baseUrl + '?' + new URLSearchParams(params).toString();
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch bear data from Wikipedia');

      const data = await res.json();
      const wikitext: string = data?.parse?.wikitext?.['*'];
      if (wikitext == null || wikitext === undefined)
        throw new Error('Issue with returned format of bear data');

      console.log('Getting bears...');
      const bears: Bear[] = await extractBears(wikitext);

      if (bears != null || bears !== undefined) {
        console.log('Bears loaded!');
        console.log(bears);
        return bears;
      }
    } catch (error) {
      console.error('Error loading bears: ', error);
      // printBears([]);
    }
    return [];
  };

  // return array of fetched bears
  return await getBears(params);
};

// helper functions for fetching bears
const fetchImageUrl = async (fileName: string): Promise<string> => {
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
    const rawData = (await res.json()) as {
      query?: { pages?: Record<string, unknown> };
    };

    const pages = Object.values(rawData.query?.pages ?? {});
    const page = pages.length > 0 ? pages[0] : null;
    const imageUrl = page?.imageinfo?.[0]?.url ?? PLACEHOLDER_IMAGE;
    return imageUrl;
  } catch (e) {
    console.log(e);
    return PLACEHOLDER_IMAGE;
  }
};

const checkImageAvailability = async (url: string): Promise<string> => {
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
