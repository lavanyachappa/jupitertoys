const feature = [`jupitertoys/features/*.feature`].join(' ');
const steps = ['--require jupitertoys/features/step-definitions/*.js'];
module.exports = {
    default:  feature,
    steps,
    retry: 1
};
