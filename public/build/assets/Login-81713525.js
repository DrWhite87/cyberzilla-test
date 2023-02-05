import{u as p}from"./auth-c4ae6726.js";import{_ as v,l as w,j as c,a as l,b as o,g as b,F as y,G as x,f as k,H as d,I as m,t as _,e as f,d as V,w as E,r as L,o as n}from"./_plugin-vue_export-helper-12bcda84.js";const N={name:"Login",setup(){const i=p(),t=w({email:"",password:""}),a=c({}),s=c(!1);return{form:t,validationErrors:a,processing:s,login:async()=>{s.value=!0,await i.login(t).catch(({response:r})=>{r.status===422?a.value=r.data.errors:a.value={}}).finally(()=>{s.value=!1})}}}},S={class:"container h-100 mt-4 mb-2"},B={class:"row h-100 align-items-center"},C={class:"col-12 col-md-6 offset-md-3"},D={class:"card shadow sm"},j={class:"card-body"},A=o("h1",{class:"text-center"},"Login",-1),F=o("hr",null,null,-1),M={key:0,class:"col-12"},P={class:"alert alert-danger"},T={class:"mb-0"},U={class:"form-group col-12"},G=o("label",{for:"email",class:"font-weight-bold"},"Email",-1),H={class:"form-group col-12 my-2"},I=o("label",{for:"password",class:"font-weight-bold"},"Password",-1),O={class:"col-12 my-2"},R=["disabled"],q={class:"col-12 text-center"};function z(i,t,a,s,u,r){const h=L("router-link");return n(),l("div",S,[o("div",B,[o("div",C,[o("div",D,[o("div",j,[A,F,o("form",{class:"row",method:"post",onSubmit:t[2]||(t[2]=b((...e)=>s.login&&s.login(...e),["prevent"]))},[Object.keys(s.validationErrors).length>0?(n(),l("div",M,[o("div",P,[o("ul",T,[(n(!0),l(y,null,x(s.validationErrors,(e,g)=>(n(),l("li",{key:g},_(e[0]),1))),128))])])])):k("",!0),o("div",U,[G,d(o("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.form.email=e),name:"email",id:"email",class:"form-control"},null,512),[[m,s.form.email]])]),o("div",H,[I,d(o("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.form.password=e),name:"password",id:"password",class:"form-control"},null,512),[[m,s.form.password]])]),o("div",O,[o("button",{type:"submit",disabled:s.processing,class:"btn btn-primary btn-block"},_(s.processing?"Please wait":"Login"),9,R)]),o("div",q,[o("label",null,[f("Don't have an account? "),V(h,{to:{name:"register"}},{default:E(()=>[f("Register Now!")]),_:1})])])],32)])])])])])}const Q=v(N,[["render",z]]);export{Q as default};
