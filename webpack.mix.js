let mix = require('laravel-mix');

mix.sass('ThemeResource/assets/scss/app.scss', 'public')
    .sass('ThemeResource/assets/scss/admin.scss', 'public')
    .js('ThemeResource/assets/js/app.js', 'public')
    .js('ThemeResource/assets/js/admin.js', 'public')
    .options({ processCssUrls: false })
    .sourceMaps();

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use : {
                    loader : "file-loader",
                    options: {
                        name: "public/fonts/[name].[ext]",
                    },
                }
            }
        ]
    }
})