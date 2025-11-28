import Parser from "rss-parser";

const parser = new Parser();

export const getNews = async (industry) => {
  const feed = await parser.parseURL(
    `https://news.google.com/rss/search?q=${industry}&hl=en-IN&gl=IN&ceid=IN:en`
  );

  return feed.items.slice(0, 10).map((item) => ({
    title: item.title,
    link: item.link,
    published: item.pubDate,
  }));
};
