import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
	const messages = await req.context.models.Message.findAll()
    return res.send(messages)
});

router.get('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findByPk(
		req.params.messageId
	)
    return res.send(message)
})

router.post('/', async (req, res) => {
	const message = await req.context.models.Message.create({
		text: req.body.text,
		userId: req.context.me.id
	});

	return res.send(message);
})

router.put('/:messageId', async (req, res) => {
	try {
		const message = req.context.models.Message.findByPk(
			req.params.messageId
		)
		if(!message) return res.status(404).send('Message Not Found')
		message.text = req.body.text
		await message.save()
		return res.send(message)
	} catch (error) {
		return res.status(500).send(`Internal Server Error: ${error}`)
	}
})

router.delete('/:messageId', async (req, res) => {
	const result = await req.context.models.Message.destroy({
		where: { id: req.params.messageId }
	})
	return res.send(true);
})

export default router