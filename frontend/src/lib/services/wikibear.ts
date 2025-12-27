// wikibears.ts

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const wikibears = async (): Promise<Bear[]> => {
  try {
    const res = await fetch('http://localhost:3001/api/bears');
    if (!res.ok) throw new Error('Failed to fetch bears');

    const data = await res.json();
    return data.bears;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { wikibears, Bear };
