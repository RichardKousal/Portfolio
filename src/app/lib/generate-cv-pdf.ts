import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import { formatMonth, type Certification, type Education, type LanguageSkill, type Position } from './profile';

// Set fonts - pdfMake has Roboto built-in which supports Czech
if (pdfFonts && (pdfFonts as any).pdfMake) {
  pdfMake.vfs = (pdfFonts as any).pdfMake.vfs;
} else {
  pdfMake.vfs = pdfFonts as any;
}

interface CVData {
  locale: string;
  name: string;
  email: string;
  phone: string;
  subtitle: string;
  summary: string[];
  experience: {
    title: string;
    timeline: Position[];
  };
  education: { title: string; items: Education[] };
  languages: { title: string; items: LanguageSkill[] };
  certifications: { title: string; items: Certification[] };
  skills: {
    title: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  vision: {
    title: string;
    text: string;
  };
  pdf: {
    aboutMe: string;
    location: string;
    availability: string;
    specialization: string;
    languages: string;
    locationValue: string;
    availabilityValue: string;
    specializationValue: string;
    languagesValue: string;
    generatedFrom: string;
    present: string;
    issued: string;
    expires: string;
    credentialId: string;
  };
}

/** "2024-07" -> "07/2024" */
const mmYYYY = (ym: string) => { const [y, m] = ym.split('-'); return `${m}/${y}`; };

/** "Label: text" bullet -> bold label + text */
const bullet = (text: string) => {
  const idx = text.indexOf(': ');
  if (idx > 0 && idx < 50) {
    return { text: [{ text: text.slice(0, idx + 1), bold: true }, ' ' + text.slice(idx + 2)], style: 'responsibility' };
  }
  return { text, style: 'responsibility' };
};

export function generateCVPDF(data: CVData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const content: Content[] = [];

    // Header section with blue background and text
    content.push({
      stack: [
        {
      canvas: [
        {
          type: 'rect',
          x: -40,
          y: -10,
          w: 595,
          h: 140,
          color: '#0ea5e9'
        }
      ]
        },
        {
          text: data.name,
          style: 'header',
          color: 'white',
          margin: [0, -120, 0, 0]
        },
        {
          text: data.subtitle,
          style: 'subtitle',
          color: 'white',
          margin: [0, 5, 0, 8]
        },
        {
          text: data.email,
          fontSize: 10,
          color: 'white',
          bold: true,
          margin: [0, 0, 0, 5]
        },
        {
          text: `${data.phone}  •  linkedin.com/in/richard-kousal`,
          fontSize: 10,
          color: 'white',
          bold: true,
          margin: [0, 0, 0, 30]
        }
      ]
    });

    // Key Info for HR (highlighted box) - compact version without emoji
    content.push({
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [
          [
            {
              stack: [
                { text: data.pdf.location, bold: true, fontSize: 8.5, margin: [0, 0, 0, 2] },
                { text: data.pdf.locationValue, fontSize: 8 }
              ],
              fillColor: '#f0f9ff',
              border: [true, true, true, true],
              borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9'],
              margin: 5
            },
            {
              stack: [
                { text: data.pdf.availability, bold: true, fontSize: 8.5, margin: [0, 0, 0, 2] },
                { text: data.pdf.availabilityValue, fontSize: 8.5 }
              ],
              fillColor: '#f0f9ff',
              border: [true, true, true, true],
              borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9'],
              margin: 5
            },
            {
              stack: [
                { text: data.pdf.specialization, bold: true, fontSize: 8.5, margin: [0, 0, 0, 2] },
                { text: data.pdf.specializationValue, fontSize: 8.5 }
              ],
              fillColor: '#f0f9ff',
              border: [true, true, true, true],
              borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9'],
              margin: 5
            },
            {
              stack: [
                { text: data.pdf.languages, bold: true, fontSize: 8.5, margin: [0, 0, 0, 2] },
                { text: data.pdf.languagesValue, fontSize: 8.5 }
              ],
              fillColor: '#f0f9ff',
              border: [true, true, true, true],
              borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9'],
              margin: 5
            }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#0ea5e9',
        vLineColor: () => '#0ea5e9'
      },
      margin: [0, 5, 0, 15]
    });

    // About Me section
    content.push({
      text: data.pdf.aboutMe,
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 0, 0, 10]
    });

    data.summary.forEach((paragraph, i) => {
      content.push({
        text: paragraph,
        style: 'body',
        margin: [0, 0, 0, i === data.summary.length - 1 ? 20 : 6]
      });
    });

    // Experience section (title is kept together with the first job)
    data.experience.timeline.forEach((job, index) => {
      const block: Content[] = [];
      if (index === 0) {
        block.push({
          text: data.experience.title.toUpperCase(),
          style: 'sectionTitle',
          margin: [0, 10, 0, 10]
        });
      }
      block.push({
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              {
                text: job.role,
                style: 'jobTitle',
                border: [false, false, false, false]
              },
              {
                text: `${formatMonth(job.start, data.locale)} – ${job.end ? formatMonth(job.end, data.locale) : data.pdf.present}`,
                style: 'period',
                alignment: 'right',
                border: [false, false, false, false]
              }
            ]
          ]
        },
        layout: 'noBorders',
        fillColor: '#f8fafc',
        margin: [0, 5, 0, 5]
      });

      block.push({
        text: [
          { text: job.company, style: 'company' },
          ...(job.location ? [{ text: `  ·  ${job.location}`, fontSize: 9, color: '#666666' }] : [])
        ],
        margin: [5, 5, 0, 5]
      });

      job.intro.forEach(paragraph => {
        block.push({ text: paragraph, style: 'responsibility', margin: [5, 0, 0, 4] });
      });

      if (job.bullets.length > 0) {
        block.push({
          ul: job.bullets.map(bullet),
          margin: [5, 0, 0, 4]
        });
      }

      job.outro.forEach(paragraph => {
        block.push({ text: paragraph, style: 'responsibility', margin: [5, 0, 0, 4] });
      });

      content.push({ stack: block, unbreakable: true, margin: [0, 0, 0, 8] });
    });


    // Vision/Approach section - on page 2
    content.push({
      text: data.vision.title.toUpperCase(),
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 10, 0, 10]
    });

    content.push({
      table: {
        widths: [4, '*'],
        body: [
          [
            {
              text: '',
              fillColor: '#0ea5e9',
              border: [false, false, false, false]
            },
            {
              text: data.vision.text,
              style: 'vision',
              fillColor: '#f0f9ff',
              border: [true, true, true, true],
              borderColor: ['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9'],
              margin: [10, 10, 10, 10]
            }
          ]
        ]
      },
      layout: {
        hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0,
        vLineWidth: (i: number, node: any) => 1,
        hLineColor: () => '#0ea5e9',
        vLineColor: () => '#0ea5e9',
        paddingLeft: () => 0,
        paddingRight: () => 0,
        paddingTop: () => 0,
        paddingBottom: () => 0
      },
      margin: [0, 0, 0, 20]
    });

    // Skills section - continue on page 2
    content.push({
      text: data.skills.title.toUpperCase(),
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 10, 0, 10]
    });

    data.skills.categories.forEach(category => {
      content.push({
        text: category.name,
        style: 'categoryName',
        margin: [0, 5, 0, 8]
      });

      // Create skill pills as inline text with separators
      const skillsText = category.items.map((skill, idx) => {
        const parts: any[] = [];
        if (idx > 0) parts.push({ text: '  •  ', color: '#0ea5e9' });
        parts.push({ text: skill, color: '#0ea5e9', bold: false });
        return parts;
      }).flat();

      content.push({
        text: skillsText,
        fontSize: 9,
        margin: [5, 0, 0, 12],
        lineHeight: 1.4
      });
    });

    // Education (each short section is kept on one page)
    let sec: Content[] = [];
    sec.push({
      text: data.education.title.toUpperCase(),
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 10, 0, 8]
    });
    data.education.items.forEach(e => {
      sec.push({
        columns: [
          { text: e.school, style: 'jobTitle', fontSize: 10.5 },
          { text: `${e.start} – ${e.end}`, style: 'period', width: 'auto' }
        ],
        margin: [0, 0, 0, 2]
      });
      sec.push({ text: e.degree, style: 'responsibility', margin: [0, 0, 0, 2] });
      if (e.activities.length) {
        sec.push({ ul: e.activities.map(a => ({ text: a, style: 'responsibility' })), margin: [5, 0, 0, 10] });
      }
    });

    content.push({ stack: sec, unbreakable: true });

    // Languages
    sec = [];
    sec.push({
      text: data.languages.title.toUpperCase(),
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 10, 0, 8]
    });
    sec.push({
      ul: data.languages.items.map(l => ({
        text: [{ text: l.name, bold: true }, ` – ${l.level}`],
        style: 'responsibility'
      })),
      margin: [5, 0, 0, 10]
    });

    content.push({ stack: sec, unbreakable: true });

    // Certifications
    sec = [];
    sec.push({
      text: data.certifications.title.toUpperCase(),
      style: 'sectionTitle',
      headlineLevel: 1,
      margin: [0, 10, 0, 8]
    });
    data.certifications.items.forEach(c => {
      const meta = [
        c.authority,
        `${data.pdf.issued} ${mmYYYY(c.issued)}`,
        c.expires ? `${data.pdf.expires} ${mmYYYY(c.expires)}` : null,
        c.credentialId ? `${data.pdf.credentialId} ${c.credentialId}` : null
      ].filter(Boolean).join('  ·  ');
      sec.push({
        stack: [
          c.url
            ? { text: c.name, bold: true, fontSize: 9.5, link: c.url, color: '#0e7490' }
            : { text: c.name, bold: true, fontSize: 9.5 },
          { text: meta, fontSize: 8.5, color: '#666666' }
        ],
        margin: [0, 0, 0, 6]
      });
    });

    content.push({ stack: sec, unbreakable: true });

    // Document definition
    const docDefinition: TDocumentDefinitions = {
      content: content,
      styles: {
        header: {
          fontSize: 28,
          bold: true
        },
        subtitle: {
          fontSize: 11.5
        },
        contact: {
          fontSize: 9
        },
        sectionTitle: {
          fontSize: 14,
          bold: true,
          color: '#0ea5e9'
        },
        body: {
          fontSize: 10,
          lineHeight: 1.4
        },
        jobTitle: {
          fontSize: 12,
          bold: true
        },
        period: {
          fontSize: 9,
          color: '#666666'
        },
        company: {
          fontSize: 11,
          bold: true,
          color: '#0ea5e9'
        },
        responsibility: {
          fontSize: 9.5,
          color: '#3c3c3c',
          lineHeight: 1.3
        },
        categoryName: {
          fontSize: 11,
          bold: true
        },
        skill: {
          fontSize: 8.5,
          color: '#0ea5e9'
        },
        skillPill: {
          fontSize: 9,
          color: '#0ea5e9',
          background: '#f0f9ff',
          bold: false
        },
        vision: {
          fontSize: 10,
          lineHeight: 1.5,
          color: '#282828'
        }
      },
      defaultStyle: {
        font: 'Roboto'
      },
      footer: (currentPage: number, pageCount: number) => {
        return {
          stack: [
            {
              canvas: [
                {
                  type: 'line',
                  x1: 40,
                  y1: 5,
                  x2: 555,
                  y2: 5,
                  lineWidth: 0.5,
                  lineColor: '#dddddd'
                }
              ]
            },
            {
              columns: [
                {
                  width: 'auto',
                  text: pageCount > 1 ? `${currentPage} / ${pageCount}` : '',
                  alignment: 'left',
                  fontSize: 7.5,
                  color: '#8c8c8c'
                },
                {
                  width: '*',
                  stack: [
                    {
                      text: `IČO: 09121251 | ${data.pdf.generatedFrom} richardkousal.com`,
                      alignment: 'center',
                      fontSize: 7.5,
                      color: '#8c8c8c'
                    },
                    {
                      text: `${data.email} • ${data.phone} • linkedin.com/in/richard-kousal`,
                      alignment: 'center',
                      fontSize: 7.5,
                      color: '#8c8c8c',
                      margin: [0, 2, 0, 0]
                    }
                  ]
                },
                {
                  width: 'auto',
                  text: '',
                  alignment: 'right'
                }
              ],
              margin: [40, 8, 40, 0]
            }
          ]
        };
      },
      pageMargins: [40, 40, 40, 60],
      // Never leave a section title alone at the bottom of a page
      pageBreakBefore: (currentNode: any, followingNodesOnPage: any[]) =>
        currentNode.headlineLevel === 1 && followingNodesOnPage.length < 2
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBuffer((buffer: Buffer) => {
      resolve(buffer);
    });
  });
}
