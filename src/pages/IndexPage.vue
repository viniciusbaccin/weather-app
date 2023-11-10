<template>
    <q-page class="flex column" :class="bgClass">
        <div class="col q-pt-lg q-px-md">
            <q-input
                v-model="search"
                @keyup.enter="getWeatherBySearch"
                placeholder="Pesquisar"
                dark
                borderless
            >
                <template v-slot:before>
                    <q-icon @click="getLocation" name="my_location" />
                </template>

                <template v-slot:append>
                    <q-btn @click="getWeatherBySearch" round dense flat icon="search" />
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
                <div
                    class="col text-h3 text-weight-thin"
                    style="text-transform: uppercase"
                >
                    Previsão<br />do Tempo
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

    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        bgClass() {
            if (this.weatherData) {
                if (this.weatherData.weather[0].icon.endsWith('n')) {
                    return 'bg-night'
                } else {
                    return 'bg-day'
                }
            }
        }
    },

    methods: {
        getLocation() {
            this.$q.loading.show()
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
            this.$q.loading.show()
            this.$axios(
                `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=${this.lang}`
            ).then((res) => {
                console.log("res by coords", res);
                this.weatherData = res.data;
                this.$q.loading.hide()
            });
        },
        getWeatherBySearch(){
            this.$q.loading.show()
            this.$axios(
                `${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric&lang=${this.lang}`
            ).then((res) => {
                console.log("res by city", res);
                this.weatherData = res.data;
                this.$q.loading.hide()
            })
        },
    },
});
</script>

<style lang="sass">
.q-page
    background: linear-gradient(to bottom, #136a8a, #267871)
    &.bg-night
        background: linear-gradient(to bottom, #232526, #414345)
    &.bg-day
        background: linear-gradient(to bottom, #00b4db, #0083b0)

.degree
    top: -44px

.skyline
    flex: 0 0 140px
    background: url(skyline.png)
    background-size: contain
    background-position: center bottom
</style>
