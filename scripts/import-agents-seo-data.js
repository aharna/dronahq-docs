const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const results = [];

// Helper to parse JSON safely
const parseJSON = (val) => {
  try {
    if (!val) return null;

    const cleaned = val.replace(/""/g, '"').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.log("❌ JSON Parse Failed:", val);
    return null;
  }
};

const outputDir = path.join(__dirname, "../src/data");
const outputFile = path.join(outputDir, "seo-data.json");

// 👉 STEP 1: Read existing data (if file exists)
let existingData = [];

if (fs.existsSync(outputFile)) {
  try {
    const fileContent = fs.readFileSync(outputFile, "utf-8");
    existingData = JSON.parse(fileContent);
  } catch (e) {
    console.log("⚠️ Existing JSON corrupted, starting fresh");
    existingData = [];
  }
}

// 👉 Convert existing data to map for fast lookup
const existingMap = new Map();
existingData.forEach((item) => {
  existingMap.set(item.slug, item);
});

fs.createReadStream("agents-seo-full-data.csv")
  .pipe(csv())
  .on("data", (data) => {
    const newItem = {
      slug: data.slug,

      title: data.title,
      description: data.description,
      keywords: data.keywords,
      author: data.author,
      image: data.image,
      canonical: data.canonical,

      faq_schema: parseJSON(data.faq_schema),
      howto_schema: parseJSON(data.howto_schema),
      article_schema: parseJSON(data.article_schema),
      product_schema: parseJSON(data.product_schema),
      search_schema: parseJSON(data.search_schema),
      dataset_schema: parseJSON(data.dataset_schema),
    };

    // 👉 STEP 2: UPDATE or INSERT
    if (existingMap.has(newItem.slug)) {
      // UPDATE
      existingMap.set(newItem.slug, {
        ...existingMap.get(newItem.slug),
        ...newItem,
      });
    } else {
      // INSERT
      existingMap.set(newItem.slug, newItem);
    }
  })
  .on("end", () => {
    // 👉 STEP 3: Convert map back to array
    const finalData = Array.from(existingMap.values());

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 👉 STEP 4: Save merged data
    fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2));

    console.log("✅ SEO JSON CRUD import completed");
  });