<template>
    <q-page :class="bgClass">
        <HeaderPage></HeaderPage>
        <div style="height: calc(100vh - 60px)">
            <div class="flex flex-center q-pt-xl q-px-md">
                <q-input
                    v-model="search"
                    @keyup.enter="getWeatherBySearch"
                    placeholder="Pesquisar localização"
                    bg-color="white"
                    rounded
                    outlined
                    standout
                    dense
                    style="width: 500px"
                >
                    <template v-slot:prepend>
                        <q-icon name="location_on" />
                    </template>

                    <!-- <template v-slot:prepend>
                        <q-icon
                            @click="getLocation"
                            name="location_on"
                        />
                        <q-tooltip>Localização atual</q-tooltip>
                    </template> -->

                    <template v-slot:append>
                        <q-btn
                            @click="getWeatherBySearch"
                            round
                            dense
                            flat
                            icon="search"
                        />
                        <q-tooltip>Pesquisar</q-tooltip>
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
                    <div
                        class="text-h1 text-weight-thin q-my-lg relative-position"
                    >
                        <span>{{ Math.round(weatherData.main.temp) }}</span>
                        <span class="text-h4 relative-position degree"
                            >&deg;C</span
                        >
                    </div>
                </div>

                <div class="col text-center">
                    <img
                        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                        alt=""
                    />
                </div>
            </div>

            <div v-else class="q-pa-xl" style="height: calc(100vh - 140px)">
                <div
                    class="fit column justify-evenly items-center content-center"
                >
                    <div>
                        <q-img
                            alt="animation"
                            src="../../public/animations/homeAnimation.svg"
                            style="width: 250px"
                        ></q-img>
                    </div>

                    <div
                        class="text-h3 text-center text-primary titleStyle"
                        style="max-width: 250px"
                    >
                        {{ $t("weatherForecast") }}
                    </div>

                    <div>
                        <q-btn
                            @click="getLocation"
                            class="bg-white"
                            outline
                            rounded
                            icon="my_location"
                            :label="$t('myLocation')"
                        />
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import HeaderPage from "src/components/HeaderPage.vue";

export default defineComponent({
    name: "WeatherPage",

    components: {
        HeaderPage,
    },

    data() {
        return {
            search: "",
            weatherData: null,
            lat: null,
            lon: null,
            apiUrl: "https://api.openweathermap.org/data/2.5/weather", //forecast
            apiKey: "ded1a7724cbf8d3512230a1f3ac4b6b6",
            lang: "pt_br",
        };
    },

    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        bgClass() {
            if (this.weatherData) {
                if (this.weatherData.weather[0].icon.endsWith("n")) {
                    return "bg-night";
                } else {
                    return "";
                }
            }
        },
    },

    methods: {
        getLocation() {
            this.$q.loading.show();
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
            this.$q.loading.show();
            this.$axios(
                `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=${this.lang}`
            ).then((res) => {
                console.log("res by coords", res.data);
                this.weatherData = res.data;
                this.$q.loading.hide();
            });
        },
        getWeatherBySearch() {
            this.$q.loading.show();
            this.$axios(
                `${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric&lang=${this.lang}`
            ).then((res) => {
                console.log("res by city", res.data);
                this.weatherData = res.data;
                this.$q.loading.hide();
            });
        },
    },
});
</script>

<style lang="scss" scoped>
.q-page {
    background: rgb(39, 66, 121);
    background: linear-gradient(
        180deg,
        rgba(39, 66, 121, 1) 0%,
        rgba(56, 94, 159, 1) 20%,
        rgba(84, 123, 188, 1) 52%,
        rgba(149, 175, 208, 1) 81%,
        rgba(184, 198, 216, 1) 100%
    );

    &.bg-night {
        background: rgb(35, 37, 38);
        background: linear-gradient(
            180deg,
            rgba(35, 37, 38, 1) 0%,
            rgba(65, 67, 69, 1) 29%,
            rgba(97, 99, 103, 1) 66%,
            rgba(161, 163, 168, 1) 89%,
            rgba(204, 204, 204, 1) 100%
        );
    }
}

.my-card {
    width: 100%;
    max-width: 350px;
    height: 75%;
    backdrop-filter: blur(10px) saturate(140%);
    -webkit-backdrop-filter: blur(10px) saturate(140%);
    background-color: rgba(50, 79, 85, 0.6);
    border-radius: 12px;
}

.degree {
    top: -44px;
}

.titleStyle {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
}
</style>
