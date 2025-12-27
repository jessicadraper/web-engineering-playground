const PLACEHOLDER_IMAGE =
  "/web-engineering-playground/media/bear-placeholder.jpg";

const WIKI_BASE_URL = "https://en.wikipedia.org/w/api.php";

export async function getBears() {
  const params = {
    action: "parse",
    page: "List_of_ursids",
    prop: "wikitext",
    section: "3",
    format: "json",
  };

  const url = `${WIKI_BASE_URL}?${new URLSearchParams(params)}`;
  console.log("Calling endpoint: " + url);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch wikitext");

  const data = await res.json();
  const wikitext = data?.parse?.wikitext?.["*"];
  // console.log(`Wikitext: \n${wikitext}`);
  if (!wikitext) throw new Error("Invalid wikitext");

  return extractBears(wikitext);
}

async function extractBears(wikitext) {
  const speciesTables = wikitext.split("{{Species table/end}}");
  // console.log(`Species: \n${speciesTables}`);
  let bears = [];

  for (const table of speciesTables) {
    const rows = table.split("{{Species table/row");

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\|/);

      // Skip if required data is missing
      if (nameMatch == null || binomialMatch == null || rangeMatch == null)
        continue;

      const name = nameMatch?.[1] ?? "Unknown";
      const binomial = binomialMatch?.[1] ?? "Unknown";
      const range = rangeMatch?.[1] ?? "Unknown";

      let imageUrl = PLACEHOLDER_IMAGE;

      if (imageMatch?.[1] != null) {
        const fileName = imageMatch[1].trim().replace("File:", "");

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
      // console.log(`ADDING BEAR: \n${bear.name}`);
      bears.push(bear);
    }
  }
  return bears;
}

const fetchImageUrl = async (fileName) => {
  const imageParams = {
    action: "query",
    titles: "File:" + fileName,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*",
  };

  const url = `${WIKI_BASE_URL}?${new URLSearchParams(imageParams)}`;

  try {
    const res = await fetch(url);
    const rawData = await res.json();

    const pages = Object.values(rawData.query?.pages ?? {});
    const page = pages.length > 0 ? pages[0] : null;
    const imageUrl = page?.imageinfo?.[0]?.url ?? PLACEHOLDER_IMAGE;
    return imageUrl;
  } catch (e) {
    console.log(e);
    return PLACEHOLDER_IMAGE;
  }
};

const checkImageAvailability = async (url) => {
  try {
    const response = await fetch(url, { method: "GET" });
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
