import {describe,it,expect} from 'vitest';
import {specs,generate,defaults,toCSV,toXLSX} from '../src/engine';
import {samplePhone,sampleName,sampleAddress,sampleEmail,contactSpec} from '../src/safeSamples';
describe('PII-free fictional data policy',()=>{
  it('uses unmistakable name placeholders',()=>{
    expect(sampleName(0)).toMatch(/^Example David /);
    expect(sampleName(1)).toMatch(/^First Example /);
  });
  it('uses non-dialable repeated-digit numbers',()=>{
    for(let i=0;i<20;i++)expect(samplePhone(i)).toMatch(/^(\d)\1{8}$/);
  });
  it('uses generic USA sample addresses',()=>{
    for(let i=0;i<10;i++)expect(sampleAddress(i)).toMatch(/Sample District, 00000, USA$/);
  });
  it('uses reserved example.com email domain',()=>expect(sampleEmail(0)).toMatch(/@example\.com$/));
  it('has exactly one dedicated contact generator',()=>expect(specs.filter(s=>s.slug===contactSpec.slug)).toHaveLength(1));
  for(const spec of specs){
    it(spec.slug+' avoids realistic identity-shaped fields',()=>{
      const rows=generate(spec,{...defaults(spec),count:18});
      expect(rows).toHaveLength(18);
      for(const record of rows){
        for(const [key,val] of Object.entries(record)){
          if(/^(?:name|employee name|employee|candidate|student|learner|instructor|agent|representative|seller|owner|sponsor|replacement|responsible|accountable|consulted|informed|stakeholder|contact name)$/i.test(key))expect(String(val)).toMatch(/^(?:Example|First|Sample|Demo) /);
          if(/(?:^|\s)(?:phone|mobile|telephone)(?:\s|$)/i.test(key)){
            expect(String(val)).toMatch(/^(\d)\1{8}$/);
          }
          if(/address/i.test(key))expect(String(val)).toMatch(/Sample District, 00000, USA$/);
          if(/(?:^|\s)e-?mail(?:\s|$)/i.test(key))expect(String(val)).toMatch(/@example\.com$|^e\*\*\*@example\.com$/);
        }
      }
    });
  }
  it('preview data and both exports retain the same synthetic contact values',async()=>{
    const rows=generate(contactSpec,{...defaults(contactSpec),count:11});
    const csv=toCSV(contactSpec.columns,rows);
    const ExcelJS=(await import('exceljs')).default;
    const book=new ExcelJS.Workbook();
    const blob=await toXLSX(contactSpec.columns,rows);
    await book.xlsx.load(await blob.arrayBuffer());
    for(let i=0;i<rows.length;i++){
      expect(csv).toContain(rows[i]['Phone Number']);
      expect(csv).toContain(rows[i].Address);
      expect(book.worksheets[0].getRow(i+2).getCell(2).value).toBe(rows[i].Name);
      expect(book.worksheets[0].getRow(i+2).getCell(3).value).toBe(rows[i]['Phone Number']);
    }
  });
});
