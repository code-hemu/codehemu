import blogger from "@guchho/blogger";

export default {
  plugins: [
    blogger({
      entry: "src/theme.xml",
      outfile: "dist/theme.xml",
      minify: false,
      validate: true,
    }),
  ],
  build: {
    entry: "src/theme.xml",
    outdir: "dist",
  },
};
