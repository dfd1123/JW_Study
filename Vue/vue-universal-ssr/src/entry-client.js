import createApp from './main'
// eslint-disable-next-line no-unused-vars
const { app, store, router } = createApp();
router.onReady(() => {
    app.$mount('#app')
})