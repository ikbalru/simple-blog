// formatted date
export const formatDate = (createdAt: string | Date | undefined) => {
  if (!createdAt) return '';
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
};

// change url title (%20) to (-)
export const urlTitle = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w-]+/g, '') // Hapus semua karakter non-kata kecuali -
    .replace(/--+/g, '-') // Ganti beberapa - dengan satu -
    .replace(/^-+/, '') // Hapus - dari awal teks
    .replace(/-+$/, ''); // Hapus - dari akhir teks
};
