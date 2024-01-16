const routes = [
    {
        path: "/",
        name: "Layout",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "/",
                name: "Weather",
                component: () => import("pages/WeatherPage.vue"),
            },
            {
                path: "map",
                name: "Map",
                component: () => import("pages/MapPage.vue"),
            },
            {
                path: "nasa",
                name: "Nasa",
                component: () => import("pages/NasaPage.vue"),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
