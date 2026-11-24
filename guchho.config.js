import blogger from "@guchho/blogger";

export default {
  plugins: [
    blogger({
      entry: "src/template.xml",
      outfile: "dist/template.xml",
      minify: false,
      validate: true,
    }),
  ],
  build: {
    entry: "src/template.xml",
    outdir: "dist",
  },
};
