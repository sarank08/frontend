import { serializeNonPOJOs } from '../../lib/utils.js'

export const load = async({locals}) => {
    const theory_classes = serializeNonPOJOs(await locals.pb.collection('theory_classes').getFullList()) 
    const theory_slots = serializeNonPOJOs(await locals.pb.collection('theory_slots').getFullList())
    const theory = serializeNonPOJOs(await locals.pb.collection('theory').getFullList())
    let student_timetable = serializeNonPOJOs(await locals.pb.collection('student_theory_timetable').getFullList())
    student_timetable = student_timetable.filter(item => item.student_id === locals.user.id)
    let faculty_details = serializeNonPOJOs(await locals.pb.collection('users').getFullList())
    faculty_details = faculty_details.filter(buddy => buddy.role == 'teacher')
    return {
        user: locals.user,
        theory_classes,
        theory_slots,
        theory,
        faculty_details,
        student_timetable
    }
}