import { URLSearchParams } from 'url'

export const DELETE = async ({ request, locals }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const collectionName = searchParams.get('collectionName')

    // console.log(locals.pb.authStore.token)
    // request.query.token = locals.pb.authStore.token
    const body = await request.json()
    // console.log(locals.pb.authStore)
    const hi = await fetch(`http://localhost:5173/api/fetchFromDatabase?collectionName=${collectionName}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            // 'Authorization': `Bearer ${locals.pb.authoStore.token}`
        }
    })
    const data = await hi.json()
    let id;
    data.forEach(element => {
        if (collectionName === 'theory_classes') {
            if (element.teacher_id == locals.user.id && element.slot_id == body.id) {
                id = element.id
            }
        }
        if (collectionName === 'lab_classes') {
            if (element.faculty_id == locals.user.id && element.lab_slot_id == body.id) {
                id = element.id
            }
        }
        if (collectionName === 'student_theory_timetable') {
            id = body.id
        }
        if (collectionName === 'student_lab_timetable') {
            id = body.id
        }
    });
    // eslint-disable-next-line no-unused-vars
    const response = await locals.pb.collection(collectionName).delete(id)
    return new Response(JSON.stringify({ status: 200, message: "Succesful" }))
}