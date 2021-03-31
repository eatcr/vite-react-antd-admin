module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 配置 Tailwind 来移除生产环境下没有使用到的样式声明
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
