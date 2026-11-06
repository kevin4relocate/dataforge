/**
 * Safe sample-data policy for every generator and export.
 * This is intentionally NOT an anonymization engine for uploaded user data.
 * It standardizes fictional generated data only; all outputs are visibly synthetic.
 */
export const SAMPLE_POLICY_VERSION = '2026-11-06';
const digits = ['000000000','111111111','222222222','333333333','444444444','555555555','666666666','777777777','888888888','999999999'];
const names = ['Example David','First Example','Sample Alex','Example Taylor','Demo Morgan','Sample Casey','Example Jordan','Demo Jamie'];
const streetNames=['ABC Street','Sample Road','Example Avenue','Demo Lane','Test Street'];
const padded=i=>String(i+1).padStart(6,'0');
export function sampleName(i){return names[i%names.length]+' '+padded(i)}
export function samplePhone(i){return digits[i%digits.length]}
export function sampleAddress(i){return (100+(i%899))+' '+streetNames[i%streetNames.length]+', Sample District, 00000, USA'}
export function sampleEmail(i){return 'example'+padded(i)+'@example.com'}
const isPersonField=k=> /^(name|first name|last name|full name|employee name|employee|candidate|student|learner|instructor|agent|representative|seller|owner|sponsor|replacement|responsible|accountable|consulted|informed|stakeholder|person|requested by|submitted by|assignee|reviewer|manager|customer name|contact name)$/i.test(k);
const isOrganizationField=k=>/^(customer|company|supplier|vendor|entity|account|client|affiliate|business name|organization|organisation)$/i.test(k);
const isPhoneField=k=>/(?:^|\s)(phone|telephone|mobile|cell|fax)(?:\s|$)/i.test(k)||/^(e\.164|raw phone)$/i.test(k);
const isAddressField=k=>/(?:^|\s)(?:address|street|postal address)(?:\s|$)/i.test(k);
const isEmailField=k=>/(?:^|\s)e-?mail(?:\s|$)/i.test(k);
/**
 * Preserve the data schema and calculations while replacing any identity-like
 * column with a deliberate example. Sample numbers are non-dialable placeholders,
 * and must never be marked as validated/real contact details.
 */
export function sanitizeGeneratedRows(spec,records){
  return records.map((record,i)=>{
    const row={...record};
    for(const key of Object.keys(row)){
      if(isPersonField(key))row[key]=sampleName(i);
      else if(isOrganizationField(key))row[key]='Example '+key+' '+padded(i);
      else if(isPhoneField(key))row[key]=key.toLowerCase().includes('e.164')?'':samplePhone(i);
      else if(isAddressField(key))row[key]=sampleAddress(i);
      else if(isEmailField(key))row[key]=key.toLowerCase().includes('masked')?'e***@example.com':sampleEmail(i);
    }
    if(Object.hasOwn(row,'E.164')){
      row['E.164']='';
      if(Object.hasOwn(row,'Valid'))row.Valid='No';
      if(Object.hasOwn(row,'Normalization Status'))row['Normalization Status']='Sample placeholder — not dialable';
    }
    if(Object.hasOwn(row,'Valid Syntax')&&Object.hasOwn(row,'Email')){
      row['Valid Syntax']='Yes';row['Validation Reason']='Reserved example.com domain; syntax only';row['Recommended Action']='Sample only';
    }
    if(Object.hasOwn(row,'Safe For Sharing'))row['Safe For Sharing']='Yes — synthetic sample';
    return row;
  });
}
export const contactSpec={
  slug:'sample-contact-generator',
  name:'Sample Contact Data Generator',
  category:'Data Cleaning & Validation',
  desc:'Create unmistakably fictitious example names, repeated-digit non-dialable phones and generic addresses. Not real PII.',
  fields:[['template','Example style','Mixed|Example|Sample|Demo']],
  columns:['Record ID','Name','Phone Number','Email','Address','Data Classification']
};
export function generateSampleContacts(p){
  const prefix=p.template||'Mixed';
  return Array.from({length:Number(p.count)},(_,i)=>{
    const num=String(i+1).padStart(6,'0');
    const base=sampleName(i);
    const name=prefix==='Mixed'?base:prefix+' Example '+num;
    return {'Record ID':'CONTACT-'+num,Name:name,'Phone Number':samplePhone(i),Email:sampleEmail(i),Address:sampleAddress(i),'Data Classification':'SYNTHETIC / SAMPLE ONLY'};
  });
}
