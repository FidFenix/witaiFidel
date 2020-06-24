'use strict';
const WitSpeech = require('node-witai-speech');
const app = express();
app.use(cors());
const port = 8000;
const upload = multer();
const API_KEY = 'G6QVEWK7G5CIRT6VBK3D43TPUCCIWFWN';

app.post('/witai', upload.single('audio'), function(req, res, next) {
	const uploadName = '/tmp/' + req.file.originalname + '.mp3';
	fs.writeFileSync(uploadName, Buffer.from(new Uint8Array(req.file.buffer)));
	const stream = fs.createReadStream(uploadName);
	const content_type = 'audio/mpeg';

	const parseSpeech = new Promise((resolve, reject) => {
		WitSpeech.extractSpeechIntent(API_KEY, stream, content_type, (err, res) => {
			if(err) return reject(err);
			resolve(res);
		});
	});

	parseSpeech.then((data) =>{
		return res.send(data);
	}).catch((error) => {
		throw new Error('Upps');
	})

	res.sendStatus(500);

});

module.exports = app;