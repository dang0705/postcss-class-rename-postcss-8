module.exports =  (options) => {
  const isObject = typeof options === "object" && options instanceof Object;

  if (!isObject) return;

  return {
    postcssPlugin:"postcss-class-rename-pc-8",
    Once (root){
      const replaceClass = (pattern, replacement) => {
        if (typeof pattern !== "string") {
          return;
        }

        root.walk(rule => {
          const regex = new RegExp(pattern, "gi");

          if (rule.type === "rule") {
            rule.selector = rule.selector.replace(regex, replacement);
          } else if (rule.type === "atrule") {
            rule.params = rule.params.replace(regex, replacement);
          }
        });
      };

      // Replace all defined pattern and replacement
      Object.keys(options).forEach(function(p) {
        replaceClass(p, options[p]);
      });
    }
  }
};
module.exports.postcss=true
