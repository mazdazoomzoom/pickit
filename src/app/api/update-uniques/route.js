import { NextResponse } from 'next/server';

import uniques from '@/data/pickit/uniques';
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;

export async function POST() {
    // Check if header contains the correct token
    if (
        request.headers.get('Authorization') !== `Bearer ${GITHUB_AUTH_TOKEN}`
    ) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('Updating API data...');
        uniques.initialized = false;
        await uniques.update();
        return NextResponse.json({ complete: true });
    } catch (error) {
        console.error('Update failed:', error);
        return NextResponse.json({ complete: false, error });
    }
}
