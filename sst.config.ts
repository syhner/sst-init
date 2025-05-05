/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-init",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const outputs = {};
    const { readdirSync } = await import("fs");
    for (const value of readdirSync("./infra/")) {
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
