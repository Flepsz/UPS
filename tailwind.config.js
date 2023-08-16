module.exports = {
  content: ["./**/*.tsx", "./screens/*.tsx"],
  theme: {
    extend: {
      colors: {
        cyansc: "#59C1CC"
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
