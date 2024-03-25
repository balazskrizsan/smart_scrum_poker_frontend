export const environment = {
  production: false,
  backend: {
    api: {
      host: 'https://stack-judge-prod.herokuapp.com/'
    },
    account: {
      identityServerUrl: 'https://localhost:5001'
    }
  },
  cdn: {
    host: 'https://stackjudge-cdn-dev-eu-central-1.s3.eu-central-1.amazonaws.com/'
  }
};
