import {describe,it,expect} from 'vitest';
import ExcelJS from 'exceljs';
import {specs,defaults,generate,toCSV,toXLSX} from '../src/engine';
function csvRows(content){const s=content.replace(/^\uFEFF/,'');let rows=[],row=[],field='',quoted=false;for(let i=0;i<s.length;i++){const c=s[i];if(quoted){if(c==='"'&&s[i+1]==='"'){field+='"';i++}else if(c==='"')quoted=false;else field+=c}else if(c==='"')quoted=true;else if(c===','){row.push(field);field=''}else if(c==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field=''}else field+=c}if(field||row.length){row.push(field);rows.push(row)}return rows}
describe('CSV / XLSX exact data correspondence',()=>{
for(const s of specs){it(s.name,async()=>{
const p={...defaults(s),count:20,seed:12345},generated=generate(s,p);
const csv=csvRows(toCSV(s.columns,generated)),xlsx=await toXLSX(s.columns,generated);
const wb=new ExcelJS.Workbook();await wb.xlsx.load(await xlsx.arrayBuffer());
const sheet=wb.worksheets[0],excel=sheet.getRows(1,21).map(row=>s.columns.map((_,i)=>String(row.getCell(i+1).value??'')));
expect(csv).toEqual(excel);
expect(csv).toHaveLength(21);
expect(csv[0]).toEqual(s.columns);
})}
});
