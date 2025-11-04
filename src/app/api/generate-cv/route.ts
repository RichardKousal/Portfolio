import { NextRequest, NextResponse } from 'next/server';
import { generateCVPDF } from '@/app/lib/generate-cv-pdf';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get locale from query params (default to 'cs')
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'cs';

    // Validate locale
    const validLocales = ['cs', 'en', 'pl', 'de'];
    const finalLocale = validLocales.includes(locale) ? locale : 'cs';

    // Load messages for the locale
    const messages = await import(`../../../../messages/${finalLocale}.json`);
    const data = messages.default;

    // Prepare CV data
    const cvData = {
      locale: finalLocale,
      name: data.header.name,
      email: data.header.email,
      phone: data.header.phone,
      subtitle: data.professional.hero.subtitle,
      description: data.professional.hero.description,
      experience: data.professional.experience,
      skills: data.professional.skills,
      vision: data.professional.vision,
      pdf: data.pdf, // PDF translations
    };

    // Generate PDF using pdfmake
    const pdfBuffer = await generateCVPDF(cvData);

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Richard-Kousal-CV-${finalLocale.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Error generating CV:', error);
    console.error('Error stack:', error?.stack);
    console.error('Error message:', error?.message);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate CV',
        message: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

