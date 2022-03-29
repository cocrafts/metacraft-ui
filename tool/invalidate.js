const Aws = require('aws-sdk');
const { cloudFrontId } = require('../tf-output.json');

const args = process.argv.slice(2);
const gitBranch = args[0] || 'master';
const CallerReference = new Date().getTime().toString();
const cloudfront = new Aws.CloudFront();

const invalidateParams = {
	DistributionId: cloudFrontId.value,
	InvalidationBatch: {
		CallerReference,
		Paths: {
			Quantity: 1,
			Items: [`/${gitBranch}/*`],
		},
	},
};

cloudfront.createInvalidation(invalidateParams, (err, data) => {
	if (err) console.log(err, err.stack);
	else console.log(data);
});
