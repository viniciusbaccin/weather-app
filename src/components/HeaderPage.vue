<template>
    <q-toolbar class="text-white">
        <q-btn flat round dense icon="arrow_back" />
        <q-space />
        <q-btn flat round dense icon="more_vert">
            <q-menu
                anchor="center start"
                self="top end"
                max-width="300px"
            >

                <q-toolbar class="bg-primary text-white">
                    <q-icon name="settings" size="sm" />
                    <q-toolbar-title>
                        {{ $t('settings') }}
                    </q-toolbar-title>
                </q-toolbar>

                <q-list style="min-width: 230px; max-width: 280px">
                    <q-item>
                        <div>
                            <div class="q-pl-sm q-pt-sm text-bold">
                                {{ $t('theme') }}
                            </div>
                            <q-toggle v-model="darkMode" :label="darkMode ? 'Dark mode' : 'Light mode'" />
                        </div>
                    </q-item>

                    <q-separator />

                    <q-item class="q-pb-md">
                        <div>
                            <div class="q-pl-sm q-pt-sm q-pb-sm text-bold">
                                {{ $t('language') }}
                            </div>
                            <q-select
                                v-model="$i18n.locale"
                                :options="$i18n.availableLocales"
                                :option-label="(item) => item == 'pt-BR' ? $t('portuguese') : $t('english')"
                                @popup-hide="changeLanguage"
                                dense
                                options-dense
                                outlined
                                color="primary"
                                style="width: 190px;"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="language" />
                                </template>
                            </q-select>
                        </div>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </q-toolbar>
</template>

<script>

export default {
    data() {
        return {
            darkMode: this.$q.dark.isActive,
        };
    },

    watch: {
        darkMode(val){
            localStorage.setItem("darkMode", val);
            this.$q.dark.set(val);
        }
    },

    methods: {
        changeLanguage(){
            localStorage.setItem("language", this.$i18n.locale)
        }
    },
};
</script>

<style lang="scss" scoped></style>
