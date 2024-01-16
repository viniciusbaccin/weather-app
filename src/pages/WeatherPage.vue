<template>
    <q-page :class="bgClass">
        <div style="height: calc(100vh - 60px)">

            <q-page-sticky position="left" :offset="[18, 0]">
                <router-link to="nasa">
                    <q-btn round flat color="white" icon="mdi-chevron-left" />
                </router-link>
            </q-page-sticky>

            <q-page-sticky position="right" :offset="[18, 0]">
                <router-link to="map">
                    <q-btn round flat color="white" icon="mdi-chevron-right" />
                </router-link>
            </q-page-sticky>


            <div class="flex flex-center q-pt-xl q-px-md">
                <q-input v-model="search" @keyup.enter="getWeatherBySearch" placeholder="Pesquisar" dark rounded outlined
                    dense style="width: 500px;">
                    <template v-slot:before>
                        <q-icon @click="getLocation" name="my_location" />
                    </template>

                    <template v-slot:append>
                        <q-btn @click="getWeatherBySearch" round dense flat icon="search" />
                    </template>
                </q-input>
            </div>

            <div v-if="weatherData" class="q-pt-xl">
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
                    <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="" />
                </div>
            </div>

            <div v-else class="q-pa-xl flex flex-center" style="height: calc(100vh - 140px);">
                <q-card class="my-card text-center text-white flex flex-center">
                    <q-card-section class="q-pb-none" style="max-width: 80%;">
                        <div class="text-h2 titleStyle q-pb-none">
                            {{ $t('weatherForecast') }}
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-btn @click="getLocation" outline rounded icon="my_location" :label="$t('myLocation')" />
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "WeatherPage",

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
        getWeatherBySearch() {
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

<style lang="scss" scoped>
.q-page {
    background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100');
    background-position: center;
    background-size: cover;
    &.bg-night {
        background: linear-gradient(to bottom, #232526, #414345);
    }
    &.bg-day {
        background: linear-gradient(to bottom, #00b4db, #0083b0);
    }
}

.my-card {
    width: 100%;
    max-width: 350px;
    height: 75%;
    backdrop-filter: blur(10px) saturate(140%);
    -webkit-backdrop-filter: blur(10px) saturate(140%);
    background-color: rgba(50, 60, 85, 0.6);
    border-radius: 12px;
}

.degree{
    top: -44px;
}
.titleStyle {
    font-family: 'Handlee', cursive;
}
</style>
