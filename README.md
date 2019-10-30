# RSSAggregator
- Aggregate predefined RSS feeds using Google app script


# GET
- To get xml feeds from `xmlUrls` urls do not pass target URL parameter
```
https://script.google.com/macros/s/AKfycbwS0iuUEueQdAXuZ4Ej0RGXvp6Zutwtf9GCFc9OsPhmH1NUux4A/exec
```
- To get xml feeds from `xmlPRUrls` urls pass `target` parameter like this
```
https://script.google.com/macros/s/AKfycbwS0iuUEueQdAXuZ4Ej0RGXvp6Zutwtf9GCFc9OsPhmH1NUux4A/exec?target=web
```

# Deploy
- Create a project in `script.google.com` if you haven't created yet
- Copy/create all files in the project or use CLI to upload these files
- Deploy the project as WebApp to get url as mentioned above
