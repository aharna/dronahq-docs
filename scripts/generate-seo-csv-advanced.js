const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const docsDir = path.join(__dirname, "../docs");
const outputFile = path.join(__dirname, "../seo-full-data.csv");

// ✅ Escape CSV values safely
function escapeCSV(value) {
  if (!value) return "";
  const str = typeof value === "string" ? value : JSON.stringify(value);
  return `"${str.replace(/"/g, '""')}"`;
}

// ✅ Build FAQ Schema
function buildFAQSchema(data) {
  if (!data.faq_questions || !data.faq_answers) return "";

  const faq = data.faq_questions.map((q, i) => ({
    question: q,
    answer: data.faq_answers[i] || "",
  }));

  return escapeCSV(faq);
}

// ✅ Build HowTo Schema
function buildHowToSchema(data) {
  if (!data.howto_steps) return "";
  return escapeCSV(data.howto_steps);
}

// ✅ Build Article Schema
function buildArticleSchema(data) {
  if (!data.author && !data.published_time) return "";

  return escapeCSV({
    author: data.author || "",
    datePublished: data.published_time || "",
    dateModified: data.modified_time || "",
  });
}

// ✅ Build Product Schema
function buildProductSchema(data) {
  if (!data.product_name) return "";

  return escapeCSV({
    name: data.product_name,
    description: data.product_description || "",
    price: data.product_price || "",
    currency: data.product_currency || "",
  });
}

// ✅ Build Search Schema
function buildSearchSchema(data) {
  if (!data.search_target) return "";

  return escapeCSV({
    target: data.search_target,
    "query-input": data.search_query_input || "",
  });
}

// ✅ Build Dataset Schema
function buildDatasetSchema(data) {
  if (!data.dataset_name) return "";

  return escapeCSV({
    name: data.dataset_name,
    description: data.dataset_description || "",
  });
}

// ✅ CSV Headers (FINAL STRUCTURE)
const headers = [
  "slug",
  "title",
  "description",
  "keywords",
  "author",
  "image",
  "canonical",

//   "schema_type",

  "faq_schema",
  "howto_schema",
  "article_schema",
  "product_schema",
  "search_schema",
  "dataset_schema",
];

let rows = [headers.join(",")];

// 🔁 Scan docs
function scanDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      processFile(fullPath);
    }
  });
}

// 📄 Process each file
function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  const slug = filePath
    .replace(docsDir, "")
    .replace(".mdx", "")
    .replace(".md", "")
    .replace(/\\/g, "/");

  const row = [
    escapeCSV(`/docs${slug}`),
    escapeCSV(data.title),
    escapeCSV(data.description),
    escapeCSV((data.keywords || []).join(" ")),
    escapeCSV(data.author),
    escapeCSV(data.image),
    escapeCSV(data.canonical),

    // escapeCSV(data.schema || "TechArticle"),

    buildFAQSchema(data),
    buildHowToSchema(data),
    buildArticleSchema(data),
    buildProductSchema(data),
    buildSearchSchema(data),
    buildDatasetSchema(data),
  ];

  rows.push(row.join(","));
}

// ▶️ Run
scanDir(docsDir);

fs.writeFileSync(outputFile, rows.join("\n"));

console.log("✅ SEO CSV with schema generated: seo-full-data.csv");