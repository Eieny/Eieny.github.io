export default {
    "path" : {
        "src": {
            "style": "src/scss/*.scss",
            "public": "public/*.*",
            "assets": "src/assets/*.*",
            "remove": ["public", "src"],
            "deploy": {
                "htmlSrc": "assets/",
                "htmlHref": "css/",
                "css": "./assets/",
            },
        },
        "dest": {
            "style": "./css",
            "map": "/",
            "public": "./",
            "assets": "./assets",
            "debug": {
                "style": "src/css",
                "map": "/",
            }
        }
    }
}