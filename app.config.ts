module.exports = ({config}) => {

    return {
        ...config,
        extra: {
            apiUrl: process.env.API_URL ?? 'https://staging.trivium.soluce-technologies.com/',
            versionAppStore: "1.0.4",
            eas: {
                "projectId": ""
            }
        },
    }
}
