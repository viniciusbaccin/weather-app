<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="">
            <q-toolbar class="text-center text-black bg-grey-3">
                    <q-toolbar-title>
                        <q-avatar size="md">
                            <img src="/favicon.ico" alt="logo">
                        </q-avatar>
                        {{ $route.name }}
                    </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "MainLayout",

    setup() {
        return {
        };
    },
});
</script>
