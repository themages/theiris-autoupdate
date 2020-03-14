const Koa = require("koa");
const Router = require("koa-router");
const server = require("koa-static-server");
const compareVerisons = require("compare-versions");
const app = new Koa();
const router = new Router();

function getNewVersions(version) {
    if (!version) return;
    const package = {
        version: "1.0.1",
        pub_date: "2020-03-14T17:59:00+8:00",
        notes: "无",
        url: "http://127.0.0.1:9999/public/theiris-1.0.1-mac.zip",
    };
    if (compareVerisons.compare(package.version, version, ">")) {
        return package;
    }
    return null
}

router.get("/darwin", (ctx, next) => {
    let { version } = ctx.query;
    let newVersion = getNewVersions(version);
    if (newVersion) {
        ctx.body = newVersion;
    } else {
        ctx.status = 204;
    }
});

app.use(server({rootDir: "public", rootPath: "/public"})).use(router.routes()).use(router.allowedMethods()).listen(9999);