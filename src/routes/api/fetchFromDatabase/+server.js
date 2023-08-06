import { URLSearchParams } from 'url';
import { serializeNonPOJOs } from '../../../lib/utils.js';

export const GET = async ({ locals, request }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const collectionName = searchParams.get('collectionName')
    const data = serializeNonPOJOs(await locals.pb.collection(collectionName).getFullList())
    return new Response(JSON.stringify(data), { status: 201 })
}