// Native modules
const path = require("path");

// Reusable utility string/path/function
const clientlibComponentsRoot = "src/main/content/jcr_root/etc/clientlibs/stjude/wbss";
const clientlibsPath = path.resolve(__dirname, clientlibComponentsRoot);
const componentJsSrcPath = (clientlibName, fileName) =>
  path.resolve(
    __dirname,
    `${clientlibComponentsRoot}/${clientlibName}/src/js/${fileName}.js`
  );

// Common configuration object for each entry module
const commonConfig = {
  mode: "development",
  module: {
    rules: [{ test: /\.jsx?$/, use: "babel-loader" }]
  },
  resolve: {
    alias: {
      components: path.resolve(
        __dirname,
        `${clientlibsPath}/libs.utils/src/js/components`
      ),
      models: path.resolve(__dirname, `${clientlibsPath}/libs.utils/src/js/models`),
      utils: path.resolve(__dirname, `${clientlibsPath}/libs.utils/src/js/utils`),
      vendor: path.resolve(__dirname, `${clientlibsPath}/libs.utils/src/js/vendor`)
    }
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js/"),
    library: "[name]",
    libraryExport: "",
    libraryTarget: "var"
  }
};

const changePasswordConfig = {
  ...commonConfig,
  name: "changePassword",
  entry: { changePassword: componentJsSrcPath("changePassword", "changePassword") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/changePassword/js/`)
  }
};

const contactPreferencesConfig = {
  ...commonConfig,
  name: "contactPreferences",
  entry: {
    contactPreferences: componentJsSrcPath("contactPreferences", "contactPreferences")
  },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/contactPreferences/js/`)
  }
};

const contentCardsConfig = {
  ...commonConfig,
  name: "contentCards",
  entry: { contentCards: componentJsSrcPath("contentCard", "contentCards") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/contentCard/js/`)
  }
};

const forgotPasswordConfig = {
  ...commonConfig,
  name: "forgotPassword",
  entry: {
    forgotPassword: componentJsSrcPath("forgotusernamepassword", "forgotPassword")
  },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/forgotusernamepassword/js/`)
  }
};

const generalTemplateConfig = {
  ...commonConfig,
  name: "generalTemplate",
  entry: {
    generalTemplate: componentJsSrcPath("generalpage", "generalTemplate")
  },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/generalpage/js/`)
  }
};

const pihSwitchConfig = {
  ...commonConfig,
  name: "pihSwitch",
  entry: { pihSwitch: componentJsSrcPath("pihSwitch", "pihSwitch") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/pihSwitch/js`)
  }
};

const giftManagementConfig = {
  ...commonConfig,
  name: "giftManagement",
  entry: { giftManagement: componentJsSrcPath("giftManagement", "giftManagement") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/giftManagement/js`)
  }
};

const pledgePreviewConfig = {
  ...commonConfig,
  name: "pledgePreview",
  entry: { pledgePreview: componentJsSrcPath("pledgePreview", "pledgePreview") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/pledgePreview/js`)
  }
};

const profileConfig = {
  ...commonConfig,
  name: "profile",
  entry: { profile: componentJsSrcPath("profile", "profile") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/profile/js`)
  }
};

const resetPasswordConfig = {
  ...commonConfig,
  name: "resetPassword",
  entry: { resetPassword: componentJsSrcPath("resetpassword", "resetPassword") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/resetpassword/js`)
  }
};

const loginConfig = {
  ...commonConfig,
  name: "signinsignup",
  entry: { signinsignup: componentJsSrcPath("login", "signIn_signUp") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/login/js`)
  }
};

const twoColTemplateConfig = {
  ...commonConfig,
  name: "twoColTemplate",
  entry: { twoColTemplate: componentJsSrcPath("twocolpagefixedright", "twoColTemplate") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/twocolpagefixedright/js`)
  }
};

const geoBasedConfig = {
  ...commonConfig,
  name: "geoBased",
  entry: { geoBased: componentJsSrcPath("geoBased", "geoBased") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/geoBased/js`)
  }
};

const utilsConfig = {
  ...commonConfig,
  name: "msaUtils",
  entry: { msaUtils: componentJsSrcPath("libs.utils", "msaUtils") },
  output: {
    ...commonConfig.output,
    path: path.resolve(__dirname, `${clientlibsPath}/libs.utils/js`)
  }
};

const DEVELOPMENT_CONFIG = {
  ...commonConfig,
  entry: {
    ...changePasswordConfig.entry,
    ...contactPreferencesConfig.entry,
    ...contentCardsConfig.entry,
    ...forgotPasswordConfig.entry,
    ...geoBasedConfig.entry,
    ...generalTemplateConfig.entry,
    ...loginConfig.entry,
    ...pihSwitchConfig.entry,
    ...giftManagementConfig.entry,
    ...pledgePreviewConfig.entry,
    ...profileConfig.entry,
    ...resetPasswordConfig.entry,
    ...twoColTemplateConfig.entry,
    ...utilsConfig.entry
  }
};

const PRODUCTION_CONFIGS = [
  changePasswordConfig,
  contactPreferencesConfig,
  contentCardsConfig,
  forgotPasswordConfig,
  geoBasedConfig,
  generalTemplateConfig,
  loginConfig,
  pihSwitchConfig,
  giftManagementConfig,
  pledgePreviewConfig,
  profileConfig,
  resetPasswordConfig,
  twoColTemplateConfig,
  utilsConfig
];

module.exports = { DEVELOPMENT_CONFIG, PRODUCTION_CONFIGS };
