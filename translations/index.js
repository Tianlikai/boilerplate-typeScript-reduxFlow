const manageTranslations = require("react-intl-translations-manager").default;

manageTranslations({
  messagesDirectory: "./reactIntl/messages",
  translationsDirectory: "./translations/locales/",
  languages: ["zh-CN", "en-US"],
});
