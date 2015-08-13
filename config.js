var config = module.exports = {};

if (process.env.NODE_ENV == "dev") {
	// DEVELOPMENT-SPECIFIC CONFIG //
	config.portNum = 3000;	
} else {
	// PRODUCTION-SPECIFIC CONFIG //
	config.portNum = 80;
}