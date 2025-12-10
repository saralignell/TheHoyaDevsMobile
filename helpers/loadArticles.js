import axios from "axios";
import categories from "./categories.js";
import { subcategories } from "./categories.js";

const parseArticle = (content) => {
  const paragraphs = content.split("\n");
  for (let i = 0; i < paragraphs.length; i++) {
    //removes inline figures or ratings from the guide
    if (
      paragraphs[i].startsWith("<figure") ||
      paragraphs[i].startsWith("<p><img")
    ) {
      paragraphs.splice(i, 1);
    }
    paragraphs[i] = paragraphs[i].replaceAll(/<[^>]*>&nbsp;/g, "");
    paragraphs[i] = paragraphs[i].replaceAll(/&#8217;/g, "’");
  }
  return paragraphs;
};

// Function to fetch subcategories based on input
function fetchSubcategories(input) {
  if (!input) {
    throw new Error("Input is required to fetch subcategories");
  }

  const category = input.toLowerCase();
  const matchingKey = Object.keys(subcategories).find(
    (key) => key.toLowerCase() === category
  );

  if (!matchingKey) {
    throw new Error("Subcategory not found");
  }

  // Return the subcategories or the key itself if the array is empty
  const result = subcategories[matchingKey];
  return result && result.length > 0 ? result.slice(0, 15) : [matchingKey];
}

// Function to fetch articles by category with dynamic page number and limit
async function FetchArticlesByCategory(categoryInput, pageNumber, limit) {
  let category;

  if (typeof categoryInput === "number") {
    category = categories.find((cat) => cat.id === categoryInput);
  } else {
    category = categories.find(
      (cat) => cat.name.toLowerCase() === categoryInput.toLowerCase()
    );
  }

  if (!category) {
    throw new Error("Category not found");
  }

  try {
    const response = await axios.get(category.posts_link, {
      params: { per_page: limit, page: pageNumber },
    });
    let articles = response.data;

    // Filter out articles with class_list "category-crosswords"
    if (category !== "crosswords") {
      articles = articles.filter((article) => {
        return !article.class_list.includes("category-crosswords");
      });
    }

    const articlesFormatted = await Promise.all(
      articles.map(async (article) => {
        const imageUrl = article.featured_media
          ? await fetchImage(article.featured_media)
          : "https://library.georgetown.edu/sites/default/files/styles/large/public/2021-12/the-hoya-archives-collection-thumbnail.jpg?itok=oCYkFdt4";

        return {
          id: article.id,
          date: article.date,
          title: article.title.rendered.replace(/&nbsp;|&#8217;/g, ""),
          link: article.link,
          content: parseArticle(article.content.rendered).join("\n"),
          image_url: imageUrl,
        };
      })
    );

    return articlesFormatted.slice(0, 10);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    return [];
  }
}

async function FetchArticlesByKeyword(keyword, pageNumber = 1, limit = 10) {
  const apiUrl = "https://thehoya.com/wp-json/wp/v2/posts";

  try {
    // Fetch articles with pagination
    const response = await axios.get(apiUrl, {
      params: { per_page: limit, page: pageNumber, search: keyword },
    });

    const articles = response.data;

    // Format the articles
    const articlesFormatted = await Promise.all(
      articles.map(async (article) => {
        if (article[0].class_list.includes("category-crosswords")) {
          return;
        }
        const imageUrl = article.featured_media
          ? await fetchImage(article.featured_media)
          : "";

        return {
          id: article.id,
          date: article.date,
          title: article.title.rendered,
          link: article.link,
          content: article.content.rendered.replace(
            /<\/?[^>]+(>|$)|&nbsp;|&#8217;/g,
            ""
          ),
          image_url: imageUrl,
        };
      })
    );

    return articlesFormatted;
  } catch (error) {
    console.error("Error fetching articles by keyword:", error.message);
    return [];
  }
}

async function fetchAuthor(authorId) {
  const apiUrl = "https://thehoya.com/wp-json/wp/v2/staff_profile";

  try {
    const response = await axios.get(apiUrl, {
      params: { staff_name: authorId },
    });
    let author = response.data[0];
    let profilePhotoUrl = "";

    if (author && author._links) {
      if (author._links["wp:attachment"]) {
        mediaResponse = await fetchImage(
          author._links["wp:featuredmedia"][0].href.split("/").pop()
        );

        profilePhotoUrl = mediaResponse;
      } else {
        profilePhotoUrl =
          "https://thehoya.com/wp-content/uploads/2013/12/The-Hoya-First-Issue-767x1024.jpg";
      }
    } else {
      profilePhotoUrl =
        "https://thehoya.com/wp-content/uploads/2013/12/The-Hoya-First-Issue-767x1024.jpg";
    }

    // this seems to happen with some users who don't have any bio info in WP
    if (!author) {
      const apiUrlFallback = `https://thehoya.com/wp-json/wp/v2/staff_name/${authorId}`;

      const responseFallback = await axios.get(apiUrlFallback);
      author = responseFallback.data;

      return {
        id: authorId,
        name: author.name || "Unknown Author",
        title: "",
        bio: "",
        url: "",
        profile_photo:
          "https://thehoya.com/wp-content/uploads/2013/12/The-Hoya-First-Issue-767x1024.jpg",
      };
    }

    return {
      id: author.id,
      name: author.title.rendered,
      title: author.excerpt.rendered,
      bio: parseArticle(author.content.rendered)
        .join("\n")
        .replace(/<\/?[^>]*>/g, "")
        .replace(/&amp;/g, "&"),
      url: author.link,
      profile_photo: profilePhotoUrl,
    };
  } catch (error) {
    console.error("Error fetching author:", error.message);
    return null;
  }
}

// helper function for things like features which have multiple authors
async function parseAuthorNames(authorTags) {
  let res = "";
  // converts from staff_name-opal-kendall to Opal Kendall format
  for (let tag of authorTags) {
    const namePart = tag.replace("staff_name-", "").replace(/-/g, " ");
    const nameFormatted = namePart
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
    if (res.length > 0) {
      res += ", ";
    }
    res += nameFormatted;
  }
  return res;
}

async function fetchArticlesByAuthor(authorId, pageNumber = 1, limit = 5) {
  const apiUrl = "https://thehoya.com/wp-json/wp/v2/posts";

  try {
    const response = await axios.get(apiUrl, {
      params: { per_page: limit, page: pageNumber, staff_name: authorId },
    });

    const articles = response.data;

    const articlesFormatted = await Promise.all(
      articles.map(async (article) => {
        const imageUrl = article.featured_media
          ? await fetchImage(article.featured_media)
          : "";

        return {
          id: article.id,
          date: article.date,
          title: article.title.rendered,
          link: article.link,
          content: parseArticle(article.content.rendered).join("\n"),
          image_url: imageUrl,
        };
      })
    );

    return articlesFormatted;
  } catch (error) {
    console.error("Error fetching articles by author:", error.message);
    return [];
  }
}
// Helper function to fetch the image URL
async function fetchImage(mediaId) {
  try {
    const mediaResponse = await axios.get(
      `https://thehoya.com/wp-json/wp/v2/media/${mediaId}`
    );
    return (
      mediaResponse.data.source_url ||
      "https://thehoya.com/wp-content/uploads/2013/12/The-Hoya-First-Issue-767x1024.jpg"
    );
  } catch (error) {
    console.error(
      `Error fetching image for media ID ${mediaId}:`,
      error.message
    );
    return "https://thehoya.com/wp-content/uploads/2013/12/The-Hoya-First-Issue-767x1024.jpg";
  }
}

// should probably be cached in future by earlier req, but this works for now
async function fetchArticle(id) {
  try {
    const response = await axios.get(
      `https://thehoya.com/wp-json/wp/v2/posts/${id}?_embed`
    );
    const article = response.data;
    const imageUrl = article.featured_media
      ? await fetchImage(article.featured_media)
      : "";
    const isFeature = article.class_list.includes("category-features");
    console.log("article id", article.id);

    // handle Features with multiple authors
    const authorNames = await parseAuthorNames(
      article.class_list.filter((tag) => tag.startsWith("staff_name-"))
    );
    return {
      id: article.id,
      date: article.date,
      title: parseArticle(article.title.rendered).join("\n"),
      link: article.link,
      content: parseArticle(article.content.rendered).join("\n"),
      image_url: imageUrl,
      author: authorNames,
      author_id: article.staff_name[0],
      isFeature: isFeature,
    };
  } catch (error) {
    console.error("Error fetching article:", error.message);
    return {};
  }
}

async function fetchCrossword() {
  try {
    const response = await axios.get(
      "https://thehoya.com/wp-json/wp/v2/posts?categories=49982"
    );
    const articles = response.data;
    const article = articles[0];
    const imageUrl = article.featured_media
      ? await fetchImage(article.featured_media)
      : "";
    return {
      id: article.id,
      date: article.date,
      title: article.title.rendered,
      content: article.content.rendered.replace(/&nbsp;/g, ""),
      image_url: imageUrl,
    };
  } catch (error) {
    console.error("Error fetching article:", error.message);
    return {};
  }
}

async function fetchGames(offset = 0, limit = 10, sport = null) {
  const apiUrl = "https://guhoyas.com/services/adaptive_components.ashx";
  const params = {
    type: "events",
    sport_id: sport,
    start: offset,
    count: limit,
    extra: `{"school_name":"Georgetown+University"}`,
  };

  try {
    // accept a json response that's an array of json objects
    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error.message);
    return [];
  }
}

// Exporting the functions
export {
  FetchArticlesByCategory,
  fetchSubcategories,
  FetchArticlesByKeyword,
  fetchArticle,
  fetchCrossword,
  fetchAuthor,
  fetchArticlesByAuthor,
  fetchGames,
};
