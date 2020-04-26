const Koa = require("koa");
const Router = require("koa-router");
const server = require("koa-static-server");
const compareVerisons = require("compare-versions");
const multer = require("koa-multer");
const app = new Koa();
const router = new Router();
const uploadCrash = multer({dest: "crash/"})

function getNewVersions(version) {
    if (!version) return;
    const package = {
        version: "1.0.0",
        pub_date: "2020-03-14T17:59:00+8:00",
        notes: "无",
        url: "http://120.24.162.36:9999/public/theiris-1.0.0-mac.zip",
    };
    if (compareVerisons.compare(package.version, version, ">")) {
        return package;
    }
    return null;
}

router.post("/crash", uploadCrash.single("upload_file_minidump"), (ctx, next) => {
    // ctx.req.body 存DB
})

router.get("/darwin", (ctx, next) => {
    let { version } = ctx.query;
    let newVersion = getNewVersions(version);
    if (newVersion) {
        ctx.body = newVersion;
    } else {
        ctx.status = 204;
    };
});

router.get("/win32", (ctx, next) => {
    let { version } = ctx.query;
    let newVersion = getNewVersions(version);
    if (newVersion) {
        ctx.body = newVersion;
    } else {
        ctx.status = 204;
    };
});

router.get("/win32/*.nupkg", (ctx, next) => {
    ctx.redirect(`/public/${ctx.params[0]}.nupkg`);
});

app.use(server({rootDir: "public", rootPath: "/public"})).use(router.routes()).use(router.allowedMethods()).listen(9999);