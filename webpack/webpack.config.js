
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    mode: "development",
    // 用 context 來指定 root 資料夾位置
    context: path.resolve(__dirname, ".."),
    // entry 內的位置會以 context 中設定的為基準
    entry: {
        INDEX: "./webpack\ practicing/index",
        // 可以藉由使用陣列來作為值的方式將沒有 import 到 js 檔案內的其他檔案，在打包後放入同一個 chunk
        Hello: ["./webpack\ practicing/EntryPoint/multiEntryA", "./webpack\ practicing/Styles/multiEntryA.css"],
        gogo: "./webpack\ practicing/EntryPoint/multiEntryB"
    }, // 沒有給 key 的話預設是 main
    // output.filename 一定要使用絕對位置
    /**@tutorial https://webpack.js.org/configuration/output/#outputpath */
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].bundle.js",
        // output.publicPath 這個選項會將值加入到所有在運行中或是由 loader 產生的網址的前方作為前綴，例如 cdn 的網址
        publicPath: "/"
    },
    module: {
        rules: [
            // style-loader 會把 css 包在 style<tag> 中放進 HTML 的 <head> 裡面
            // MiniCssExtractPlugin.loader 可以把 css 抽出來作為一隻獨立的檔案讓 HTML 引用
            {
                test: /\.css$/,
                use: [/*"style-loader", */MiniCssExtractPlugin.loader, "css-loader"],
            }
        ],
    },
    // 用 source map 來讓開發工具能夠明確指出錯誤發生在哪個檔案，而非只指出錯誤在打包後的檔案的位置
    devtool: "inline-source-map",
    // 使用 webpack-dev-server 會將打包後的檔案暫存在記憶體內，並不會打包出實體的檔案
    /** @tutorial https://awdr74100.github.io/2020-03-26-webpack-webpackdevserver/*/
    devServer: {
        // 告訴 webpack-dev-server 從 ./dist 資料夾提供檔案
        // 建議使用絕對路徑
        // devServer.contentBase 主要用來使 webpack-dev-server 在開啟伺服器時如果找不到 index.html 檔案，就轉而載入指定的內容
        // 當記憶體中的 dist 資料夾內放入的 html 不叫 index 時, 可以藉由 contentBase 來指定正確路徑
        contentBase: path.resolve(__dirname, "../error\ handling"),
        // 會在記憶體中的 dist 資料夾增加一層 assets 目錄，這也導致預設的 localhost:8080 找不到任何檔案，需要到下一層的目錄才找的到 index.html
        // 如果沒有配置 devServer.publicPath 選項，預設會向 output.publicPath 取值，如果兩者都沒有配置，預設值為 /
        // publicPath: "/asset/",
        port: 5732,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./webpack\ practicing/index.html",
            scriptLoading: "defer",
            chunks: ["INDEX"],
            // filename: "index789.html"
        }),
        new HtmlWebpackPlugin({
            template: "./webpack\ practicing/HTML\ template/multiEntryA.html",
            scriptLoading: "defer",
            filename: "html/multiEntryA.html",
            chunks: ["Hello"]
        }),
        new HtmlWebpackPlugin({
            template: "./webpack\ practicing/HTML\ template/multiEntryB.html",
            scriptLoading: "defer",
            filename: "html/multiEntryB.html",
            chunks: ["gogo"]
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
        }),
        // 每次重新 build 時會刪除 dist 資料夾再重新建立
        new CleanWebpackPlugin(),
    ],
    optimization: {
        /** @tutorial https://awdr74100.github.io/2020-04-06-webpack-splitchunksplugin/ */
        splitChunks: {
            // chunks：async | initial | all
            // async：只處理 Lazy Loading 的 chunks，例如 import(xxx) 語法載入的模組
            // initial：只處理同步加載的 chunk，例如 import xxx 語法載入的模組
            // all：兼容以上兩種方式，通通進行處理
            chunks: "async", // 預設為 async
            // cache groups 可以繼承或覆蓋所有來自 splitChunks(splitChunks.*) 的選項
            // 預設的 cacheGroups(default) 的優先權設定為負數
            cacheGroups: {
                vendors: {
                    // 由於在 windows 上路徑會包含 \ 而在 unix 路徑則會包含 / 所以使用[\\/]來做判斷是必要的
                    test: /[\\/]node_modules[\\/]/,
                    // 一個模組可能同時屬於複數的 cacheGroups, 此時就會以優先權高低做取捨
                    // 客製化 cacheGroups 的優先權預設值是 0
                    priority: 10,
                    name: "vendors",
                    chunks: "all",
                    minSize: 0,
                },
                common: {
                    test: /[\\/]CommonModule[\\/]/,
                    priority: 50,
                    name: "common",
                    chunks: "all",
                    minSize: 0,
                }
            }
        },
        runtimeChunk: "multiple"
    }
}

module.exports = config;

console.log(config.context);