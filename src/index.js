import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid'

import models, { sequelize } from './models';
import routes from './routes';

//console.log('Hello World!')
//console.log(process.env.SECRET)
//console.log(process.env.NAME)


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(async (req, res, next) => {
	req.context = {
		models,
		me: await models.User.findByLogin('sntaks'),
	}
	next();
})

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then( async () => {
	if(eraseDatabaseOnSync){
		createUserWithMessages();
	}

	app.listen(process.env.PORT, () => {
		console.log(`[!] Listening on port ${process.env.PORT}!`);
	})
})

const createUserWithMessages = async () => {
	await models.User.create(
		{
			username: 'sntaks',
			messages: [
				{
					text: 'A work in progress.',
				},
			],
		},
		{
			include: [models.Message]
		}
	);

	await models.User.create(
		{
			username: 'vkioko',
			messages: [
				{
					text: 'This is spectacular.',
				},
				{
					text: 'This is even more spectacular.',
				},
			],
		},
		{
			include: [models.Message]
		}
	)
}
