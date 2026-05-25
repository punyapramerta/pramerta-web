export interface SEOResult {
  score: number;
  checks: {
    id: string;
    label: string;
    passed: boolean;
    message: string;
  }[];
}

export function calculateSEOScore({
  title,
  metaDesc,
  content,
  keyword,
}: {
  title: string;
  metaDesc: string;
  content: string;
  keyword: string;
}): SEOResult {
  const checks = [];
  let score = 0;
  const maxScore = 5;

  const targetKeyword = keyword.trim().toLowerCase();

  // 1. Title Length
  const titleLength = title.trim().length;
  if (titleLength >= 50 && titleLength <= 60) {
    score++;
    checks.push({ id: "title_len", label: "Panjang Judul", passed: true, message: "Judul optimal (50-60 karakter)." });
  } else {
    checks.push({ 
      id: "title_len", 
      label: "Panjang Judul", 
      passed: false, 
      message: titleLength === 0 ? "Judul kosong." : `Judul saat ini ${titleLength} karakter. Usahakan 50-60 karakter.` 
    });
  }

  // 2. Meta Desc Length
  const descLength = metaDesc.trim().length;
  if (descLength >= 145 && descLength <= 155) {
    score++;
    checks.push({ id: "desc_len", label: "Meta Deskripsi", passed: true, message: "Meta deskripsi optimal (145-155 karakter)." });
  } else {
    checks.push({ 
      id: "desc_len", 
      label: "Meta Deskripsi", 
      passed: false, 
      message: descLength === 0 ? "Deskripsi kosong." : `Deskripsi saat ini ${descLength} karakter. Usahakan 145-155 karakter.` 
    });
  }

  // 3. Keyword in Title
  if (targetKeyword) {
    if (title.toLowerCase().includes(targetKeyword)) {
      score++;
      checks.push({ id: "kw_title", label: "Keyword di Judul", passed: true, message: "Keyword utama ditemukan di judul." });
    } else {
      checks.push({ id: "kw_title", label: "Keyword di Judul", passed: false, message: "Tambahkan keyword utama di judul artikel." });
    }
  } else {
    checks.push({ id: "kw_title", label: "Keyword di Judul", passed: false, message: "Masukkan keyword utama untuk dianalisis." });
  }

  // 4. Keyword in Content
  const contentLower = content.toLowerCase();
  if (targetKeyword) {
    if (contentLower.includes(targetKeyword)) {
      score++;
      checks.push({ id: "kw_content", label: "Keyword di Konten", passed: true, message: "Keyword utama ditemukan di dalam teks." });
    } else {
      checks.push({ id: "kw_content", label: "Keyword di Konten", passed: false, message: "Sertakan keyword utama di dalam tulisan." });
    }
  } else {
    checks.push({ id: "kw_content", label: "Keyword di Konten", passed: false, message: "Masukkan keyword utama." });
  }

  // 5. Content Length
  // Very rough word count
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  if (wordCount >= 300) {
    score++;
    checks.push({ id: "content_len", label: "Panjang Artikel", passed: true, message: `Artikel cukup panjang (${wordCount} kata).` });
  } else {
    checks.push({ id: "content_len", label: "Panjang Artikel", passed: false, message: `Artikel terlalu pendek (${wordCount} kata). Minimal 300 kata untuk SEO yang baik.` });
  }

  const finalScore = Math.round((score / maxScore) * 100);

  return {
    score: finalScore,
    checks,
  };
}
