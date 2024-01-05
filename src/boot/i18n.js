import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const i18n = createI18n({
    globalInjection: true,
    locale: (localStorage.getItem('language') || 'pt-BR'), // initial language
    messages
})

export default boot(({app}) => {
    localStorage.setItem("language", 'pt-BR');
    app.use(i18n)
})

export {i18n}
