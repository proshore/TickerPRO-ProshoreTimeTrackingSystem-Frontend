import{r as u,o as l,c as n,a as s,u as c,b as i,F as d,g,h,i as w,w as y,R as k,e as x,j as b,q as V}from"./index.3d1a6b33.js";import{_ as E}from"./BaseFormHeading.062cb5bf.js";import{_ as R,a as N}from"./BaseAlert.5c41d31b.js";import{v as S}from"./validateEmail.db033d63.js";import{l as T}from"./logo.bccff2c0.js";const B=["src"],F={class:"d-grid col-md-8 col-lg-5 mx-auto"},$={key:0},C=["onSubmit"],L=s("div",{class:"d-grid"},[s("button",{class:"btn btn-primary mt-3 text-white"},"Get reset link")],-1),M={class:"mt-4"},j=x(" Never mind! "),q=s("u",null," Take me back to login",-1),z={setup(D){const a=u(""),o=u(""),t=u([]),_=b();async function p(){o.value="",t.value=[];const{isValid:m,errorMessage:r}=S(a.value);if(m||(o.value=r,a.value=""),o.value===""&&t.value.length===0)try{const e=await V(a.value),{status:v,statusText:f}=e;v===200&&f==="OK"&&_.push({name:"passwordResetSent"})}catch(e){e.response.status===404?t.value.push(e.response.data.message):t.value.push("Something went wrong, please try again later"),a.value=""}}return(m,r)=>(l(),n(d,null,[s("img",{src:c(T),alt:"Ticker logo",class:"logo"},null,8,B),s("div",F,[i(E,{title:"Reset password",shortDesc:"To reset your password, enter the email address you use to login."}),t.value.length?(l(),n("div",$,[(l(!0),n(d,null,g(t.value,e=>(l(),n("div",{key:e},[i(N,{message:e,"hex-font-color":"ff0000"},null,8,["message"])]))),128))])):h("",!0),s("form",{onSubmit:w(p,["prevent"])},[i(R,{type:"email",name:"email",label:"Email address",modelValue:a.value,"onUpdate:modelValue":r[0]||(r[0]=e=>a.value=e),error:o.value},null,8,["modelValue","error"]),L],40,C),s("p",M,[j,i(c(k),{to:{name:"login"},class:"text-secondary fw-normal"},{default:y(()=>[q]),_:1})])])],64))}};export{z as default};