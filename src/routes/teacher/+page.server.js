import { serializeNonPOJOs } from '../../lib/utils.js';

export const load = async ({ locals}) => {
    const course = serializeNonPOJOs(await locals.pb.collection('theory').getFullList());
    const theorySlots = serializeNonPOJOs(await locals.pb.collection('theory_slots').getFullList())
    let selected_classes = serializeNonPOJOs(await locals.pb.collection('theory_classes').getFullList())
    selected_classes = selected_classes.filter(item => item.teacher_id == locals.user.id)
    
    return {
        courses: course,
        theory_slots: theorySlots,
        user: locals.user,
        selected_classes
    }
}