import {describe,it,expect} from 'vitest';
import {specs,defaults,generate} from '../src/engine';
import {specs6a} from '../src/expansion6a';
import {specs6b} from '../src/expansion6b';
import {specs6c} from '../src/expansion6c';
describe('300-tool milestone',()=>{
 it('has exactly 300 functional tool definitions',()=>expect(specs).toHaveLength(300));
 it('has 99 distinct phase-6 tools',()=>expect([...specs6a,...specs6b,...specs6c]).toHaveLength(99));
 it('contains no duplicate paths or IDs',()=>expect(new Set(specs.map(s=>s.slug)).size).toBe(300));
 it('has descriptive configuration and matching generated fields',()=>{
 for(const s of specs){
   expect(s.name.length).toBeGreaterThan(8);
   expect(s.columns.length).toBeGreaterThanOrEqual(4);
   const records=generate(s,{...defaults(s),count:3});
   expect(records).toHaveLength(3);
   for(const row of records)expect(Object.keys(row)).toEqual(s.columns);
 }
 });
 it('keeps synthetic sample contact information across the entire catalog',()=>{
 for(const s of specs){
   const row=generate(s,{...defaults(s),count:1})[0];
   for(const [key,value] of Object.entries(row)){
     if(/^(?:Name|Employee Name|Customer|Supplier|Candidate|Student|Learner|Employee|Owner|Agent)$/i.test(key))expect(String(value)).toMatch(/^(?:Example|First|Sample|Demo) /);
     if(/^(?:Phone Number|Phone|Mobile)$/i.test(key))expect(String(value)).toMatch(/^(\d)\1{8}$/);
     if(/address/i.test(key))expect(String(value)).toMatch(/Sample District, 00000, USA$/);
   }
 }
 });
});
