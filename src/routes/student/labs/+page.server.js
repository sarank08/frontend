import { serializeNonPOJOs } from '../../../lib/utils'

export const load = async({locals}) => {
    
    const lab_classes = serializeNonPOJOs(await locals.pb.collection('lab_classes').getFullList())
    // let lab_classes = locals.pb.collection('student_lab_timetable').subscribe('*', ()=>{});
    const labs = serializeNonPOJOs(await locals.pb.collection('labs').getFullList())
    const lab_slots = serializeNonPOJOs(await locals.pb.collection('lab_slots').getFullList())
    let faculty_details = serializeNonPOJOs(await locals.pb.collection('users').getFullList())
    faculty_details = faculty_details.filter(teacher => teacher.role === 'teacher')
    let student_timetable = serializeNonPOJOs(await locals.pb.collection('student_lab_timetable').getFullList())
    student_timetable = student_timetable.filter(item => item.student_id == locals.user.id)
    return {
        user: locals.user,
        lab_classes,
        labs,
        lab_slots,
        faculty_details,
        student_timetable
    }
}