import { NextResponse } from 'next/server';
import { dummyProperties } from '@/lib/dummy-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    let properties = [...dummyProperties];

    // Filters
    const type = searchParams.get('type');
    const propertyType = searchParams.get('propertyType');
    const city = searchParams.get('city');
    const beds = searchParams.get('beds');
    const furnishing = searchParams.get('furnishing');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');

    if (type) properties = properties.filter((p) => p.type === type);
    if (propertyType) properties = properties.filter((p) => p.propertyType === propertyType);
    if (city) properties = properties.filter((p) => p.city === city);
    if (beds) {
        const bedCount = parseInt(beds);
        properties = properties.filter((p) => (bedCount >= 4 ? p.beds >= 4 : p.beds === bedCount));
    }
    if (furnishing) properties = properties.filter((p) => p.furnishing === furnishing);
    if (minPrice) properties = properties.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice) properties = properties.filter((p) => p.price <= parseInt(maxPrice));
    if (featured === 'true') properties = properties.filter((p) => p.featured);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const start = (page - 1) * limit;
    const paginatedProperties = properties.slice(start, start + limit);

    return NextResponse.json({
        properties: paginatedProperties,
        total: properties.length,
        page,
        limit,
        totalPages: Math.ceil(properties.length / limit),
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // In production, this would save to Supabase
        return NextResponse.json(
            { message: 'Property created successfully', property: { id: `prop-${Date.now()}`, ...body } },
            { status: 201 }
        );
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
