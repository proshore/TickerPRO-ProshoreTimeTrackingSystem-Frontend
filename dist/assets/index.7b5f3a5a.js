import{bz as e}from"./index.fa8cc11f.js";const r="/api/project",n=r,c=r,i=`${r}/project-status`,E=r,R=r;var s={ADD_PROJECT_URL:n,EDIT_PROJECT_URL:c,PROJECT_ENABLE_URL:i,PROJECT_LIST_URL:E,DELETE_PROJECT_URL:R};const L=async(t,a)=>await e.post(s.ADD_PROJECT_URL,t,{headers:{Authorization:a}}),T=async(t,a,o)=>await e.patch(`${s.EDIT_PROJECT_URL}/${o}`,t,{headers:{Authorization:a}}),P=async(t,a)=>await e.patch(`${s.PROJECT_ENABLE_URL}/${a}`,{},{headers:{Authorization:t}}),h=async(t,a)=>await e.get(`${s.PROJECT_LIST_URL}?page=${a}`,{headers:{Authorization:t}}),p=async(t,a)=>await e.delete(`${s.DELETE_PROJECT_URL}/${a}`,{headers:{authorization:t}}),u=async(t,a,o)=>await e.get(`${s.PROJECT_LIST_URL}?search=${a}&page=${o}`,{headers:{authorization:t}});export{P as a,L as b,p as d,T as e,h as p,u as s};
