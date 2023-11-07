<template>
    <q-page class="flex column">
        <div class="col q-pt-lg q-px-md">
            <q-input v-model="search" placeholder="Pesquisar" dark borderless>
                <template v-slot:before>
                    <q-icon @click="getLocation" name="my_location" />
                </template>

                <template v-slot:append>
                    <q-btn round dense flat icon="search" />
                </template>
            </q-input>
        </div>

        <template v-if="weatherData">
            <div class="col text-white text-center">
                <div class="text-h4 text-weight-light">
                    {{ weatherData.name }}
                </div>
                <div class="text-h6 text-weight-light">
                    {{ weatherData.weather[0].description }}
                </div>
                <div class="text-h1 text-weight-thin q-my-lg relative-position">
                    <span>{{ Math.round(weatherData.main.temp) }}</span>
                    <span class="text-h4 relative-position degree">&deg;C</span>
                </div>
            </div>

            <div class="col text-center">
                <img
                    :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                    alt=""
                />
            </div>
        </template>

        <template v-else>
            <div class="col column text-center text-white">
                <div class="col text-h2 text-weight-thin">
                    Quasar<br />Weather
                </div>
                <q-btn @click="getLocation" class="col" flat>
                    <q-icon left size="3em" name="my_location" />
                    <div>Minha localização</div>
                </q-btn>
            </div>
        </template>

        <div class="col skyline"></div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "IndexPage",
    data() {
        return {
            search: "",
            weatherData: null,
            lat: null,
            lon: null,
            apiUrl: "https://api.openweathermap.org/data/2.5/weather",
            apiKey: "ded1a7724cbf8d3512230a1f3ac4b6b6",
            lang: "pt_br",
        };
    },
    methods: {
        getLocation() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("position: ", position);
                    this.lat = position.coords.latitude;
                    this.lon = position.coords.longitude;
                    this.getWeatherByCoords(this.lat, this.lon);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        getWeatherByCoords(lat, lon) {
            this.$axios(
                `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=${this.lang}`
            ).then((res) => {
                console.log("res", res);
                this.weatherData = res.data;
            });
        },
    },
});
</script>

<style lang="sass">
.q-page
    background: linear-gradient(to bottom, #136a8a, #267871)
.degree
    top: -44px
.skyline
    flex: 0 0 140px
    background: url(..\..\public\skyline.png)
    background-size: contain
    background-position: center bottom
</style>
