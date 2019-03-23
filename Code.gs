function doGet(e) {  
  if (e && e.parameter.target && e.parameter.target.toString().toLowerCase() == 'web') {
    //for techmuzz blog news feed
    return postsToXml(getUrlArticles(xmlPRUrls), false);
  } else {
    //for social media
    return postsToXml(getUrlArticles(xmlUrls), true);
  }
}

function getUrlArticles(urls, limit) {
  var posts = [];
  for (var j = 0; j < urls.length; j++) {
    var url = urls[j][0];
    var itemsPath = urls[j][1];
    var allPosts = getArticleNodes(getXmlRoot(url), itemsPath);
    allPosts.length = limit || 3;
    posts = posts.concat(allPosts);
  }
  return posts;
}

function getXmlRoot(url){
  var xml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService.parse(xml);
  return document.getRootElement();  
}

function getArticleNodes(root, itemsPath) {
  var nodeNames = itemsPath.split('>');
  for (var j = 0; j < nodeNames.length; j++) {
    if (j == nodeNames.length - 1) {
      return root.getChildren(nodeNames[j]);
    }
    root = root.getChild(nodeNames[j]);
  }  
}

function postsToXml(posts, injectTMPosts) {
  var rss = new Rss(); 
  var channel = rss.newChannel();
  
  channel.title('TechMuzz Mix Feed Stream')
  .description('RSS 2.0 Feed')
  .link('http://techmuzz.com')
  .language('en')
  .atomLink('http://techmuzz.com/rss');
  
  posts.sort(function(a,b){
    return new Date(b.getChild('pubDate').getText()) - new Date(a.getChild('pubDate').getText());
  });
  
  if (injectTMPosts == true) {
    //find random techmuzz post and inject in the posts array
    var allTMPosts = getUrlArticles(defaultXmlUrl, 10);
    var randomIndex = Math.floor(Math.random() * allTMPosts.length);
    posts.unshift(allTMPosts[randomIndex]);
  }
  
  for (var i = 0; i < posts.length; i++) {  
    var post = parseXml(posts[i], injectTMPosts);
    Logger.log("%s, (%s)", post.link, post.pubDate);
    channel.newItem()
    .title(post.title)
    .description(post.description)
    .link(post.link)
    .pubDate(post.pubDate)
    .guid(post.guid);
  }
  
  return ContentService.createTextOutput(rss.build()).setMimeType(ContentService.MimeType.RSS);
}

function parseXml(node, injectTMPosts) {
  var post = {};
  post.title = node.getChild('title').getText();
  post.description = node.getChild('description').getText();
  post.link = node.getChild('link').getText();
  if (injectTMPosts == true) post.pubDate = Utilities.formatDate(new Date(), 'GMT', 'EEE, dd MMM yyyy HH:mm:ss Z'); //techmuzz post
  else post.pubDate = node.getChild('pubDate').getText();
  if (node.getChild('guid')) post.guid = node.getChild('guid').getText();
  else post.guid = Utilities.getUuid();
  return post;
}