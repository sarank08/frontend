import { serializeNonPOJOs } from '../../../lib/utils.js'

export const load = async({locals}) => {
    const labs = serializeNonPOJOs(await locals.pb.collection('labs').getFullList())
    const lab_slots = serializeNonPOJOs(await locals.pb.collection('lab_slots').getFullList())
    let lab_classes = serializeNonPOJOs(await locals.pb.collection('lab_classes').getFullList())
    lab_classes = lab_classes.filter(item=> item.faculty_id == locals.user.id)
    return {
        labs,
        lab_slots,
        lab_classes,
        user: locals.user
    }
}