import { NextResponse } from 'next/server';
import { dummyProperties } from '@/lib/dummy-data';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const property = dummyProperties.find((p) => p.id === id);

    if (!property) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ property });
}
