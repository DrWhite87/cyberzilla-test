import{u as w}from"./auth-7afe0f1d.js";import{_ as g,l as v,j as m,a as i,b as o,g as b,F as y,G as x,f as E,H as r,I as n,t as f,e as p,d as k,w as V,r as P,o as d}from"./_plugin-vue_export-helper-12bcda84.js";const N={name:"Register",setup(){const c=w(),e=v({name:"",email:"",phone:"",password:"",password_confirmation:""}),a=m({}),s=m(!1);return{form:e,validationErrors:a,processing:s,register:async()=>{s.value=!0,await axios.get("/sanctum/csrf-cookie"),await axios.post("/api/register",e).then(l=>{a.value={},c.login({email:e.email,password:e.password})}).catch(({response:l})=>{l.status===422?a.value=l.data.errors:a.value={}}).finally(()=>{s.value=!1})}}}},U={class:"container h-100 mt-4 mb-2"},C={class:"row h-100 align-items-center"},R={class:"col-12 col-md-6 offset-md-3"},S={class:"card shadow sm"},A={class:"card-body"},B=o("h1",{class:"text-center"},"Register",-1),j=o("hr",null,null,-1),D={key:0,class:"col-12"},F={class:"alert alert-danger"},L={class:"mb-0"},M={class:"form-group col-12"},T=o("label",{for:"name",class:"font-weight-bold"},"Name",-1),G={class:"form-group col-12 my-2"},H=o("label",{for:"email",class:"font-weight-bold"},"Email",-1),I={class:"form-group col-12 my-2"},O=o("label",{for:"phone",class:"font-weight-bold"},"Phone",-1),q={class:"form-group col-12"},z=o("label",{for:"password",class:"font-weight-bold"},"Password",-1),J={class:"form-group col-12 my-2"},K=o("label",{for:"password_confirmation",class:"font-weight-bold"},"Confirm Password",-1),Q={class:"col-12 my-2"},W=["disabled"],X={class:"col-12 text-center"};function Y(c,e,a,s,_,l){const h=P("router-link");return d(),i("div",U,[o("div",C,[o("div",R,[o("div",S,[o("div",A,[B,j,o("form",{onSubmit:e[5]||(e[5]=b((...t)=>s.register&&s.register(...t),["prevent"])),class:"row",method:"post"},[Object.keys(s.validationErrors).length>0?(d(),i("div",D,[o("div",F,[o("ul",L,[(d(!0),i(y,null,x(s.validationErrors,(t,u)=>(d(),i("li",{key:u},f(t[0]),1))),128))])])])):E("",!0),o("div",M,[T,r(o("input",{type:"text",name:"name","onUpdate:modelValue":e[0]||(e[0]=t=>s.form.name=t),id:"name",placeholder:"Enter name",class:"form-control"},null,512),[[n,s.form.name]])]),o("div",G,[H,r(o("input",{type:"text",name:"email","onUpdate:modelValue":e[1]||(e[1]=t=>s.form.email=t),id:"email",placeholder:"Enter Email",class:"form-control"},null,512),[[n,s.form.email]])]),o("div",I,[O,r(o("input",{type:"text",name:"phone","onUpdate:modelValue":e[2]||(e[2]=t=>s.form.phone=t),id:"phone",placeholder:"Enter Phone",class:"form-control"},null,512),[[n,s.form.phone]])]),o("div",q,[z,r(o("input",{type:"password",name:"password","onUpdate:modelValue":e[3]||(e[3]=t=>s.form.password=t),id:"password",placeholder:"Enter Password",class:"form-control"},null,512),[[n,s.form.password]])]),o("div",J,[K,r(o("input",{type:"password",name:"password_confirmation","onUpdate:modelValue":e[4]||(e[4]=t=>s.form.password_confirmation=t),id:"password_confirmation",placeholder:"Enter Password",class:"form-control"},null,512),[[n,s.form.password_confirmation]])]),o("div",Q,[o("button",{type:"submit",disabled:s.processing,class:"btn btn-primary btn-block"},f(s.processing?"Please wait":"Register"),9,W)]),o("div",X,[o("label",null,[p("Already have an account? "),k(h,{to:{name:"login"}},{default:V(()=>[p("Login Now!")]),_:1})])])],32)])])])])])}const oo=g(N,[["render",Y]]);export{oo as default};
