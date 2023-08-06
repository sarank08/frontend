import { error, redirect } from '@sveltejs/kit'
import { generateUserName } from '../../lib/utils.js'

export const actions = {
    register: async({locals, request}) => {
        const body = Object.fromEntries(await request.formData())
        const username = generateUserName(body.name.split(" ").join("")).toLowerCase()
        try {
            await locals.pb.collection('users').create({username, ...body})
        } catch (err) {
            throw error(500, "Something wrong happened")
        }
        throw redirect(303,'/login')
    }
}