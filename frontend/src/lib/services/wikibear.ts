// wikibears.ts

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const API_BASE = import.meta.env.VITE_API_URL;

const wikibears = async (): Promise<Bear[]> => {
  try {
    const res = await fetch(`${API_BASE}/bears`);
    if (!res.ok) throw new Error('Failed to fetch bears');

    const data = await res.json();
    return data.bears;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { wikibears, Bear };
