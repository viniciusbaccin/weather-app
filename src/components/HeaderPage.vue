<template>
    <q-toolbar class="text-white">
        <q-btn flat round dense icon="arrow_back" />
        <q-space />
        <q-btn flat round dense icon="more_vert">
            <q-menu anchor="center start" self="top end" max-width="300px">
                <q-toolbar class="bg-primary text-white">
                    <q-icon name="settings" size="sm" />
                    <q-toolbar-title>Configurações</q-toolbar-title>
                </q-toolbar>
                <q-list style="min-width: 230px; max-width: 280px">
                    <q-item>
                        <div>
                            <div class="q-pl-sm q-pt-sm text-bold">Tema</div>
                            <q-toggle v-model="darkMode" label="Light Mode" />
                        </div>
                    </q-item>
                    <q-separator />
                    <q-item class="q-pb-md">
                        <div>
                            <div class="q-pl-sm q-pt-sm q-pb-sm text-bold">
                                Idioma
                            </div>
                            <q-select
                                v-model="languageSelected"
                                :options="languageOpts"
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
            languageSelected: {
                label: "Português",
                value: "pt-BR",
            },
            languageOpts: [
                {
                    label: "Português",
                    value: "pt-BR",
                },
                {
                    label: "Inglês",
                    value: "en-US",
                },
            ],
            darkMode: false,
        };
    },
};
</script>

<style lang="scss" scoped></style>
