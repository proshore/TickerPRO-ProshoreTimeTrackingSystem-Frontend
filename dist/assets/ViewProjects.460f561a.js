import{r as o,C as S,o as n,c as u,a as e,y as w,D as U,F as h,g as k,t as v,A,i as D,x as R,h as P,b as f,z as E,n as z,G as F,e as M,B as G,E as q}from"./index.fc24babe.js";import{T as H,_ as J}from"./BaseHeading.7358d9eb.js";import{p as K,e as O,a as Q}from"./index.c1eee3fd.js";import{v as W}from"./validateName.6ce7ed4b.js";import{a as T,_ as X}from"./BaseAlert.aa8ad542.js";import"./logo.5b10267d.js";import"./plugin-vue_export-helper.21dcd24c.js";const Y={class:"mt-3 border border-bottom-0 rounded"},Z={class:"topnav"},ee={class:"table table-hover"},te=e("thead",{class:"text-primary"},[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"Project Name"),e("th",{scope:"col"},"Color"),e("th",{scope:"col"},"Client Id"),e("th",{scope:"col"},"Billable"),e("th",{scope:"col"},"Status"),e("th",{scope:"col"},"Action")])],-1),ae=["onClick","textContent"],le={setup(p){const c=o(!0),r=o([]),g=S(),m=o(r.value),d=o(!0);async function j(){try{const a=await K(g);a.status===200&&(r.value=a.data.users)}catch{alert("Something went wrong, please try again later")}}j();async function y(a){try{const l=await O(g,a);c.value=!1,l.status==200&&(alert("Project status changed successfully"),j())}catch{alert("Something went wrong, please try again later")}}function _(a){return a=="1"?"Disable":"Enable"}function C(a){return a==!0?"Billable":"Non Billable"}function x(a){m.value.splice(0,r.value.length),r.value.forEach(l=>{l.project_name.includes(a)&&m.value.push(l),d.value=!1})}return(a,l)=>(n(),u("div",Y,[e("div",Z,[w(e("input",{type:"text",placeholder:"Search..","onUpdate:modelValue":l[0]||(l[0]=i=>a.value=i),onInput:l[1]||(l[1]=i=>x(a.value))},null,544),[[U,a.value]])]),e("table",ee,[te,e("tbody",null,[(n(!0),u(h,null,k(d.value?r.value:m.value,(i,N)=>(n(),u("tr",{key:i.id},[e("td",null,v(N+1),1),e("td",null,v(i.project_name),1),e("td",null,v(i.project_color_code),1),e("td",null,v(i.client_id),1),e("td",null,v(C(i.billable)),1),e("td",null,v(_(i.status)),1),e("td",null,[e("button",{class:"btn btn-light btn-sm",onClick:V=>y(i.id),textContent:v(_(i.status)==="Enable"?"Disable":"Enable")},null,8,ae)])]))),128))])])]))}},se="/api/client/view-client";var oe={CLIENT_LIST_URL:se};const ne=async p=>await A.get(oe.CLIENT_LIST_URL,{headers:{Authorization:p}});function re(p){return p?{isValid:!0,errorMessage:""}:{isValid:!1,errorMessage:"Color field is required."}}const ie=e("button",{type:"button",class:"btn btn-sm btn-primary text-white","data-bs-toggle":"modal","data-bs-target":"#exampleModal"}," Add Project ",-1),ue={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},ce={class:"modal-dialog"},de={class:"modal-content"},ve=e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},"Create New Project"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),me={class:"modal-body"},_e=["onSubmit"],pe={key:1},be={class:"mt-4"},he=e("label",{class:"form-label"},[M("Color"),e("span",{class:"text-danger"},"*")],-1),fe=["error"],ge=["value","textContent"],ye={class:"mt-4"},Ce=e("label",{class:"form-label",for:"client-id"},[M("Client Name"),e("span",{class:"text-danger"},"*")],-1),xe=["error"],je=["value","textContent"],we={class:"mt-4"},ke=e("label",{for:"billable"},"Billable",-1),Ne=e("div",{class:"mt-4 mb-2"},[e("button",{type:"submit",class:"btn btn-primary text-white"}," CREATE ")],-1),Pe={setup(p){const c=o(""),r=o(""),g=o([{id:1,name:"Black",hex:"#000000"},{id:2,name:"Red",hex:"#ff0000"},{id:3,name:"Blue",hex:"#0000ff"},{id:3,name:"Green",hex:"#008000"}]),m=o(""),d=o("0"),j=o(1),y=o([]),_=o(""),C=o(""),x=o(""),a=o(!1),l=o([]),i=S();async function N(b){try{const s=await ne(b);s.status===200&&(y.value=s.data.users)}catch{alert("Something went wrong, please try again later")}}N(i);async function V(){_.value="",C.value="",x.value="",l.value=[],a.value=!1;const{isValid:b,errorMessage:s}=W(c.value),{isValid:t,errorMessage:$}=re(r.value);if(b||(C.value=$,r.value=""),t||(_.value=s,c.value=""),_.value===""&&x.value===""&&l.value.length===0)try{const{user:{id:L}}=G();d.value=d.value===!0?"1":"0";const B={project_name:c.value,client_id:m.value,billable:d.value,status:j.value,project_color_code:r.value,user_id:L},I=S();(await Q(B,I)).status===200&&(a.value=!0,location.reload(),setTimeout(()=>{a.value=!1},3e3),c.value="",m.value="",d.value="",r.value="")}catch{l.value.push("Something went wrong, please try again later.")}}return(b,s)=>(n(),u(h,null,[ie,e("div",ue,[e("div",ce,[e("div",de,[ve,e("div",me,[e("form",{onSubmit:D(V,["prevent"])},[a.value?(n(),R(T,{key:0,message:"Project add successfully!","hex-font-color":"198754"})):P("",!0),l.value.length?(n(),u("div",pe,[(n(!0),u(h,null,k(l.value,t=>(n(),u("div",{key:t},[f(T,{message:t,"hex-font-color":"ff0000"},null,8,["message"])]))),128))])):P("",!0),f(X,{type:"text",name:"project_name",label:"Project name",modelValue:c.value,"onUpdate:modelValue":s[0]||(s[0]=t=>c.value=t),error:_.value},null,8,["modelValue","error"]),e("div",be,[he,w(e("select",{id:"color","onUpdate:modelValue":s[1]||(s[1]=t=>r.value=t),onChange:s[2]||(s[2]=(...t)=>b.onChangeRole&&b.onChangeRole(...t)),class:"form-select",error:C.value},[(n(!0),u(h,null,k(g.value,t=>(n(),u("option",{key:t.id,value:t.name,style:z({color:t.hex}),textContent:v(t.name)},null,12,ge))),128))],40,fe),[[E,r.value]])]),e("div",ye,[Ce,y.value.length?w((n(),u("select",{key:0,id:"client-id","onUpdate:modelValue":s[3]||(s[3]=t=>m.value=t),class:"form-select",error:x.value},[(n(!0),u(h,null,k(y.value,t=>(n(),u("option",{key:t.id,value:t.id,textContent:v(t.client_name)},null,8,je))),128))],8,xe)),[[E,m.value]]):P("",!0)]),e("div",we,[ke,w(e("input",{type:"radio",value:"true","onUpdate:modelValue":s[4]||(s[4]=t=>d.value=t),name:"billable"},null,512),[[F,d.value]])]),Ne],40,_e)])])])])],64))}},Ie={setup(p){const c=q();return c.userStatus=!1,(r,g)=>(n(),u(h,null,[f(H),e("main",null,[f(J,{title:"Projects"}),f(Pe),f(le)])],64))}};export{Ie as default};