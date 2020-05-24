const {watch} = require("gulp");
const path = require("path");
const del = require("del");

exports.default = function () {
    const watcher = watch("src/**/*.ts");
    watcher.on("unlink", function (filepath) {
        const filePathFromSrc = path.relative(path.resolve("src"), filepath);
        let destFilePath = path.resolve("dist", filePathFromSrc);
        destFilePath = destFilePath.substr(0, destFilePath.length - 3);
        del.sync([
            destFilePath + ".js",
            destFilePath + ".js.map"
        ]);
    });
};