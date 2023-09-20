import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
	const users = await req.context.models.User.findAll();
    return res.send(users);
})

router.get('/:userId', async (req, res) => {
	const user = await req.context.models.User.findByPk(
		req.params.userId
	)
    return res.send(user);
})


router.put('/:userId', (req, res) => {
	res.send(`PUT HTTP method on users/${req.params.userId} resource`)
})

/*router.delete('/:userId', (req, res) => {
    const {
		[req.params.userId]: user,
		...otherUsers
	} = req.context.models.users

	req.context.models.users = otherUsers
	return res.send(user)
})*/

export default router