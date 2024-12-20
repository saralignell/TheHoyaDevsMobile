const categories=[
    { "name": "Academics", "id": 40929, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40929" },
    { "name": "Alum", "id": 40930, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40930" },
    { "name": "Arts & Entertainment", "id": 13169, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13169" },
    { "name": "Arts Issue", "id": 19479, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=19479" },
    { "name": "Asian Identity Issue", "id": 33965, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33965" },
    { "name": "Basketball Preview 2014-2015", "id": 19175, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=19175" },
    { "name": "Basketball Preview 2015-16", "id": 23168, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=23168" },
    { "name": "Basketball Preview 2016-2017", "id": 26283, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=26283" },
    { "name": "Basketball Preview 2017-18", "id": 28004, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28004" },
    { "name": "Basketball Preview 2019-20", "id": 31524, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=31524" },
    { "name": "Blog", "id": 45330, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=45330" },
    { "name": "Books", "id": 31083, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=31083" },
    { "name": "Business", "id": 155, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=155" },
    { "name": "Business - Top", "id": 13263, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13263" },
    { "name": "Campus", "id": 40931, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40931" },
    { "name": "Campus News", "id": 351, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=351" },
    { "name": "Chatter", "id": 352, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=352" },
    { "name": "City", "id": 40932, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40932" },
    { "name": "City News", "id": 350, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=350" },
    { "name": "Club Issue", "id": 30843, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30843" },
    { "name": "column", "id": 49773, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49773" },
    { "name": "Commentary", "id": 13174, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13174" },
    { "name": "Community Corner", "id": 32538, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32538" },
    { "name": "Community Corner Podcast", "id": 34120, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34120" },
    { "name": "Concerts", "id": 28170, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28170" },
    { "name": "Contests", "id": 40933, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40933" },
    { "name": "COVID-19", "id": 32338, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32338" },
    { "name": "Crosswords", "id": 49982, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49982" },
    { "name": "Curran", "id": 19174, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=19174" },
    { "name": "Dance", "id": 30926, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30926" },
    { "name": "Donate", "id": 50249, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=50249" },
    { "name": "Drug Issue", "id": 28531, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28531" },
    { "name": "Editorial", "id": 13173, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13173" },
    { "name": "Election Day 2016", "id": 26237, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=26237" },
    { "name": "Election Day 2018", "id": 29741, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=29741" },
    { "name": "Events", "id": 49774, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49774" },
    { "name": "Fashion Issue", "id": 22481, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=22481" },
    { "name": "Fashion Issue Guide", "id": 22482, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=22482" },
    { "name": "Features", "id": 14484, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=14484" },
    { "name": "Finance", "id": 40934, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40934" },
    { "name": "Food", "id": 40935, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40935" },
    { "name": "Food & Drink", "id": 13171, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13171" },
    { "name": "Food Issue", "id": 32157, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32157" },
    { "name": "From the EIC", "id": 49771, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49771" },
    { "name": "Fun", "id": 40936, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40936" },
    { "name": "Georgetown University Student Association", "id": 49775, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49775" },
    { "name": "Grad", "id": 49776, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49776" },
    { "name": "Grad Spring 2022", "id": 34555, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34555" },
    { "name": "Graduation Issue", "id": 30921, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30921" },
    { "name": "Guide - Top", "id": 13266, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13266" },
    { "name": "Guide Column", "id": 49777, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49777" },
    { "name": "Guide Columns", "id": 13172, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13172" },
    { "name": "Guide Feature", "id": 49778, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49778" },
    { "name": "Guide Special Issue", "id": 49779, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49779" },
    { "name": "GUSA Executive Election 2018", "id": 28404, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28404" },
    { "name": "GUSA Executive Election 2019", "id": 30125, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30125" },
    { "name": "Halftime on the Hilltop", "id": 34122, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34122" },
    { "name": "Health and Wellness Issue", "id": 20055, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=20055" },
    { "name": "Hip Hop DT", "id": 32766, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32766" },
    { "name": "Hip Hop DT Guide", "id": 32767, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32767" },
    { "name": "Hip Hop Issue", "id": 32743, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32743" },
    { "name": "Holiday", "id": 40937, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40937" },
    { "name": "Hoya Wellness", "id": 34121, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34121" },
    { "name": "International Cuisines in DC", "id": 35461, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=35461" },
    { "name": "LGBTQ+ Identity Issue", "id": 35646, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=35646" },
    { "name": "Lifestyle", "id": 13170, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13170" },
    { "name": "Lists", "id": 40938, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40938" },
    { "name": "March Madness", "id": 40939, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40939" },
    { "name": "Men's Basketball", "id": 32926, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32926" },
    { "name": "Men's Basketball Sports", "id": 32927, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=32927" },
    { "name": "Miscellaneous", "id": 40940, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40940" },
    { "name": "Movies", "id": 28121, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28121" },
    { "name": "Multimedia", "id": 7882, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=7882" },
    { "name": "Music", "id": 26414, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=26414" },
    { "name": "Music Issue", "id": 23364, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=23364" },
    { "name": "New Student", "id": 40941, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40941" },
    { "name": "New Student Orientation 2024", "id": 50504, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=50504" },
    { "name": "News", "id": 154, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=154" },
    { "name": "News - Top", "id": 13262, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13262" },
    { "name": "Office", "id": 40942, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40942" },
    { "name": "Opinion", "id": 158, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=158" },
    { "name": "Opinion - Top", "id": 13264, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13264" },
    { "name": "Photography", "id": 18389, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=18389" },
    { "name": "Podcast", "id": 34112, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34112" },
    { "name": "Podcast 3", "id": 34113, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34113" },
    { "name": "Podcast DT", "id": 33145, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33145" },
    { "name": "Podcast Issue", "id": 33125, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33125" },
    { "name": "Podcasts", "id": 28479, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28479" },
    { "name": "Queer Identity Issue", "id": 35678, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=35678" },
    { "name": "Quiz", "id": 40943, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40943" },
    { "name": "Religious Diversity Issue", "id": 34917, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34917" },
    { "name": "Religious Identity Issue", "id": 34968, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34968" },
    { "name": "Review", "id": 49780, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49780" },
    { "name": "Science", "id": 35078, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=35078" },
    { "name": "Sex Issue", "id": 20966, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=20966" },
    { "name": "Shopping", "id": 40944, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40944" },
    { "name": "Sponsored", "id": 40945, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40945" },
    { "name": "Sports", "id": 156, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=156" },
    { "name": "Sports - Top", "id": 13265, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13265" },
    { "name": "Sports Columns", "id": 13260, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=13260" },
    { "name": "Student Guide Special Issue", "id": 29813, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=29813" },
    { "name": "Student-Life", "id": 49781, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49781" },
    { "name": "Summer Highlights", "id": 15333, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=15333" },
    { "name": "Sustainability Issue", "id": 31564, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=31564" },
    { "name": "Television", "id": 28682, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28682" },
    { "name": "The 95th Anniversary Issue", "id": 19708, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=19708" },
    { "name": "The Centennial Issue", "id": 31783, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=31783" },
    { "name": "The Georgetown 14", "id": 30534, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30534" },
    { "name": "The Guide", "id": 157, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=157" },
    { "name": "The Guide - DT", "id": 33126, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33126" },
    { "name": "The Throwback Issue", "id": 33361, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33361" },
    { "name": "The Throwback Issue DT", "id": 33362, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33362" },
    { "name": "The Wellness Issue", "id": 33741, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33741" },
    { "name": "The Wellness Issue DT", "id": 33742, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=33742" },
    { "name": "The Women's Issue", "id": 30606, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=30606" },
    { "name": "Theatre", "id": 28257, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28257" },
    { "name": "Tracing the 272", "id": 29012, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=29012" },
    { "name": "travel", "id": 26853, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=26853" },
    { "name": "Uncategorized", "id": 1, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=1" },
    { "name": "Verbatim", "id": 40946, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=40946" },
    { "name": "Video", "id": 34111, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34111" },
    { "name": "Viewpoint", "id": 49782, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=49782" },
    { "name": "Women's Identity Issue", "id": 34396, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=34396" },
    { "name": "Year in Review", "id": 15197, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=15197" },
    { "name": "Year in Review 2013-2014", "id": 15207, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=15207" },
    { "name": "Year in Review 2014-2015", "id": 21384, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=21384" },
    { "name": "Year in Review 2015-2016", "id": 25017, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=25017" },
    { "name": "Year in Review 2016-2017", "id": 27172, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=27172" },
    { "name": "Year in Review 2017-2018", "id": 28944, "posts_link": "https://thehoya.com/wp-json/wp/v2/posts?categories=28944" }
  ]
  
  export const subcategories = {
    News: ["Student-Life", "Academics", "Grad", "City News",],
    Opinion: ["Viewpoint", "Editorial", "Column"],
    Guide: ["Review", "Column", "Features"],
    Sports:[],
    Features:[],
    Science:[],

  };
  

  
  export default categories ;