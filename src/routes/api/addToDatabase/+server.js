import { URLSearchParams } from 'url';

export const POST = async ({ request, locals }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const collectionName = searchParams.get('collectionName')
    const data = await request.json()
    // eslint-disable-next-line no-unused-vars
    const record = await locals.pb.collection(collectionName).create(data);
    return new Response({ status: 200, body: JSON.stringify({ message: 'Success' }) })
}