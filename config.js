export default {
    "path" : {
        "src": {
            "style": "src/scss/*.scss",
            "public": "public/*.*",
            "assets": "src/assets/*.*",
            "remove": [".", "!*.html", "!/css", "!/assets"]
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