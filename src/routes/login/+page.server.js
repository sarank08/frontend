import { error, redirect } from '@sveltejs/kit'

export const actions = {
    login: async({locals, request}) => {
        const body = Object.fromEntries(await request.formData())
        let user;
        try {
            user = await locals.pb.collection('users').authWithPassword(body.email, body.password)
        }
        catch(err) {
            console.log(err)
            throw error(500, 'something wrong happened')
        }
        if (!user) {
            throw redirect(303, '/')
        }
        else if (user.record.role == 'student') {
            throw redirect(303, '/student')
        }
        else if(user.record.role == 'teacher') {
            throw redirect(303, '/teacher')
        }
    }
}