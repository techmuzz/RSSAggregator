
function Rss() {
 this.root = XmlService.createElement('rss')
 .setAttribute('version', '2.0')
 .setAttribute('xmlnsatom', "http://www.w3.org/2005/Atom");
}
Rss.prototype.newChannel = function () {
 return new Channel(this.root);
};
Rss.prototype.build = function () {
 var document = XmlService.createDocument(this.root);
 var xml = XmlService.getPrettyFormat().format(document)
 
 var result = xml.replace('xmlnsatom', 'xmlns:atom')
 .replace('<atomlink href=', '<atom:link href=');
 
 return result;
}
function Channel(root) {
 this.root = root;
 
 this.channel = XmlService.createElement('channel');
 
 this.root.addContent(this.channel);
};
Channel.prototype.title = function (title) {
 this.channel.addContent(XmlService.createElement('title').setText(title));
 
 return this;
};
Channel.prototype.link = function (link) {
 this.channel.addContent(XmlService.createElement('link').setText(link));
 
 return this;
};
Channel.prototype.description = function (description) {
 this.channel.addContent(XmlService.createElement('description').setText(description));
 
 return this;
};
Channel.prototype.language = function (language) {
 this.channel.addContent(XmlService.createElement('language').setText(language));
 
 return this;
};
Channel.prototype.atomLink = function (atomLink) {
 var node = XmlService.createElement('atomlink')
 .setAttribute('href', atomLink)
 .setAttribute('rel', 'self')
 .setAttribute('type', 'application/rss+xml');
 
 this.channel.addContent(node);
 
 return this;
};
Channel.prototype.newItem = function (item) {
 return new Item(this.channel);
};
function Item(channel) {
 this.channel = channel;
 
 this.item = XmlService
 .createElement('item');
 
 this.channel.addContent(this.item);
}
Item.prototype.title = function (title) {
 this.item.addContent(XmlService.createElement('title').setText(title));
 
 return this;
};
Item.prototype.link = function (link) {
 this.item.addContent(XmlService.createElement('link').setText(link));
 
 return this;
};
Item.prototype.description = function (description) {
 this.item.addContent(XmlService.createElement('description').setText(description));
 
 return this;
};
Item.prototype.pubDate = function (pubDate, timezone) {
 var tz = timezone || 'GMT';
 this.item.addContent(XmlService.createElement('pubDate').setText(pubDate));
 
 return this;
};
Item.prototype.guid = function (guid) {
 this.item.addContent(XmlService.createElement('guid').setText(guid));
 
 return this;
};