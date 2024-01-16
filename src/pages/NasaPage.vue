<template>
    <q-page>
        <div>
            <q-page-sticky position="left" :offset="[18, 0]">
                <router-link to="map">
                    <q-btn round flat color="white" icon="mdi-chevron-left" />
                </router-link>
            </q-page-sticky>

            <q-page-sticky position="right" :offset="[18, 0]">
                <router-link to="/">
                    <q-btn round flat color="white" icon="mdi-chevron-right" />
                </router-link>
            </q-page-sticky>
        </div>
    </q-page>
</template>

<script>
export default {
    name: "NasaPager",
}
</script>

<style lang="scss" scoped>
.q-page {
    background-image: url('https://services.meteored.com/img/article/para-qual-lugar-o-universo-esta-se-expandindo-1685829316554_1280.png');
    background-position: center;
    background-size: cover;
}
</style>
