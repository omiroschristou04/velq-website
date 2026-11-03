'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const context={};vm.createContext(context);vm.runInContext(app.split('function byId')[0]+';this.data={roles,questions,rankRoles};',context);const{roles,questions,rankRoles}=context.data;
assert.equal(roles.length,16);assert.equal(questions.length,10);assert.equal(new Set(roles.map(r=>r.id)).size,16);
roles.forEach(r=>{assert.equal(r.weights.length,10);assert(r.weights.every(w=>w>=1&&w<=5));});
for(const[answer,score]of[[1,0],[3,50],[5,100]])assert(rankRoles(Array(10).fill(answer)).every(r=>r.score===score));
assert.throws(()=>rankRoles([1,2]));assert.throws(()=>rankRoles([1,1,1,1,1,1,1,1,1,6]));
const codingOnly=rankRoles([1,1,1,5,1,1,1,1,1,1]);assert.equal(codingOnly[0].id,'quant');
const clientOnly=rankRoles([1,1,5,1,1,1,1,1,1,1]);assert.equal(clientOnly[0].id,'wm');
const diverse=rankRoles([4,5,2,4,5,2,3,2,3,4]);assert.equal(diverse.length,16);assert(diverse.every(r=>r.score>=0&&r.score<=100));assert(diverse.every((r,i)=>!i||diverse[i-1].score>=r.score));
let links=0;for(const name of fs.readdirSync(root).filter(n=>n.endsWith('.html'))){const html=fs.readFileSync(path.join(root,name),'utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,name+' duplicate IDs');for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){const target=match[1];if(/^(https?:|data:|mailto:)/.test(target))continue;const[file,hash]=target.split('#');const filePath=file?path.resolve(root,file):path.join(root,name);assert(fs.existsSync(filePath),name+' broken file '+target);if(hash){const content=fs.readFileSync(filePath,'utf8');assert(content.includes('id="'+hash+'"'),name+' broken anchor '+target);}links++;}assert(html.includes('name="viewport"'),name+' missing viewport');}
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/.test(app),'unexpected answer persistence or transmission');
console.log('PASS: 16-role data, score boundaries, ties, validation, differentiated interests, ranking order, '+links+' local links/anchors, unique IDs, viewport metadata and no answer-transmission code.');
