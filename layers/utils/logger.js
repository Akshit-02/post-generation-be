const { ENVIRONMENT = "prod" } = process.env;

const LEVELS = {
  DEV: ["info", "log", "warn", "error"],
  PROD: ["info", "warn", "error"],
};

const currentLevels =
  ENVIRONMENT.toLowerCase() === "dev" ? LEVELS.DEV : LEVELS.PROD;

const info = (...args) => {
  if (currentLevels.includes("info")) {
    console.log(`📢 [INFO]`, ...args);
  }
};

const log = (...args) => {
  if (currentLevels.includes("log")) {
    console.log(`🚀 [LOG]`, ...args);
  }
};

const warn = (...args) => {
  if (currentLevels.includes("warn")) {
    console.warn(`⚠️ [WARN]`, ...args);
  }
};

const error = (...args) => {
  if (currentLevels.includes("error")) {
    console.error(`❌ [ERROR]`, ...args);
  }
};

export default { info, log, warn, error };
