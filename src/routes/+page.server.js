import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    if (locals.user) {
        if (locals.user.role === 'teacher') {
            throw redirect(303, '/teacher')
        }
        else {
            throw redirect(303, '/student')
        }
    }
}