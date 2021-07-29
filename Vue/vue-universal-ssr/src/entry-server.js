import createApp from './main';

export default context => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        const { app, store, router } = createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) return reject({ code: 404 });

            resolve(app)
        }, reject)
    });
}