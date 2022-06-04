const fs = require("fs-extra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EntryPlugin = require("webpack/lib/SingleEntryPlugin");

// const pluginInfo = { name: "ThemesPlugin" };
const pluginInfo = 'ThemesPlugin';
const themeDir = 'src/styles/themes';

class ThemesPlugin {
    constructor(options) {
        // console.log('options:', options)
        this.options = options;
    }

    apply(compiler) {
        const onEntryOption = (context, entry) => {
            
        }

        compiler.hooks.entryOption.tap(pluginInfo, onEntryOption);

        compiler.hooks.make.tap(pluginInfo, (compilation) => {
            console.log('make');
            const orgFiles = fs.readdirSync(themeDir);
            orgFiles.forEach(themeFile => {
                const theme = themeFile.slice(0, themeFile.indexOf('.'));
                console.log('theme:', theme);

                const childCompiler = compilation.createChildCompiler(pluginInfo, {
                    filename: `${theme}.bundler.js`,
                    chunkFilename: `${theme}.chunk.[id].js`,
                    publicPath: compiler.options.publicPath
                });

                childCompiler.context = compiler.context;

                const entries = {
                    [theme]: './src/styles/pages/index.scss'
                };
                Object.keys(entries).forEach((entry) => {
                    const entryFiles = entries[entry]
                    if (Array.isArray(entryFiles)) {
                      entryFiles.forEach((file) => {
                        new EntryPlugin(compiler.context, file, entry).apply(childCompiler)
                      })
                    } else {
                      new EntryPlugin(compiler.context, entryFiles, entry).apply(childCompiler)
                    }
                })

                const miniCssPlugin = new MiniCssExtractPlugin({
                    filename: `${theme}.[hash:6].css`,
                    chunkFilename: `${theme}.[hash:6].css`
                });
                miniCssPlugin.apply(childCompiler);

                compilation.hooks.additionalAssets.tapAsync(pluginInfo, (childProcessDone) => {
                    childCompiler.options.module.rules.map((it, idx) =>{
                        let useItemIdx = (it.use || []).findIndex(useItem => useItem.loader === 'sass-loader');
                       if (useItemIdx !== -1) {
                           let useItem = {
                               loader: "sass-loader",
                               options: {
                                   additionalData: `@import "./src/styles/themes/${theme}.scss";`,
                                   sassOptions: {
                                       outputStyle: "compressed"
                                   }
                               }
                           }
                           it.use.splice(useItemIdx, 1, useItem);
                       }
                       return it;
                   });

                    childCompiler.runAsChild((err, entries, childCompilation) => {
                      console.log('childCompiler-entries:', entries);
                      if (err) {
                        return childProcessDone(err)
                      }
            
                      if (childCompilation.errors.length > 0) {
                        return childProcessDone(childCompilation.errors[0])
                      }
            
                      childProcessDone()
                    })
                  })
            })
        })
    }
}

module.exports = ThemesPlugin;