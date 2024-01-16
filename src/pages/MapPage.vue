<template>
    <q-page>
        <div>
            <q-page-sticky position="left" :offset="[18, 0]" style="z-index: 999;">
                <router-link to="/">
                    <q-btn round flat color="red" icon="mdi-chevron-left" />
                </router-link>
            </q-page-sticky>

            <q-page-sticky position="right" :offset="[18, 0]" style="z-index: 999;">
                <router-link to="nasa">
                    <q-btn round flat color="red" icon="mdi-chevron-right" />
                </router-link>
            </q-page-sticky>

            <div id="map">

            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'MapPage',

    data() {
        return {
            map: null,
            apiKeyMap: "AIzaSyDF2zSlXdL7cLSf-fnKkm2pP4wsg9r3Eac",
        }
    },

    mounted() {
        this.initMap();
    },

    methods: {
        initMap() {
            this.map = L.map('map').setView([-28.79402824671573, -51.61141732545669], 15);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            const marker = L.marker([-28.79402824671573, -51.61141732545669]).addTo(this.map);

            marker.bindPopup("<b>Oi linda!</b>").openPopup();
        },
    },
}
</script>

<style lang="scss" scoped>
#map {
    height: calc(100vh - 60px)
}
</style>
