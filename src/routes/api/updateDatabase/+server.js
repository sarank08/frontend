import { URLSearchParams } from 'url'

export const PATCH = async ({ request, locals }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const collectionName = searchParams.get('collectionName')
    const body = await request.json()

    let data;
    const record_id = body.record_id
    if (collectionName === 'lab_classes') {
        data = {
            strength: body.strength
        }
    }
    if (collectionName==='theory_classes') {
        data = {
            strength: body.strength
        }
    }
    // eslint-disable-next-line no-unused-vars
    const response = await locals.pb.collection(collectionName).update(record_id, data)
    // console.log(response.json())
    return new Response(response)
}