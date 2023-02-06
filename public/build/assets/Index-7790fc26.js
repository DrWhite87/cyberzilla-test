import{_ as b,c as m,J as C,a as y,b as a,t as v,d as r,w as c,F as k,r as d,o as x,g as h,e as u}from"./_plugin-vue_export-helper-b42ff5c8.js";import{_ as S,a as P}from"./MTColumn-ae823966.js";import{u as M}from"./users-ce01e49d.js";import"./auth-b8800a8f.js";const w={name:"UsersIndex",components:{MTColumn:S,MTable:P},setup(){const e=M(),t=m(()=>e.users),p=m(()=>e.query.sort||""),o=m(()=>e.query.search||"");C(()=>{e.fetchAll()});const g=n=>{if(confirm("Are you sure you want to Delete"))return e.destroy(n)},f=n=>{e.query.page=n,e.fetchAll()},i=n=>{e.query.sort=n,e.fetchAll()},l=_.debounce(n=>{e.query.page=1,e.query.search=n.target.value,e.fetchAll()},300);return{users:t,sort:p,search:o,destroy:g,onPaginationChangePage:f,onSortChange:i,onSearchChange:l}}},T={class:"container mt-4 mb-2 d-flex justify-content-between align-items-center"},q={class:"mt-2"},A={class:"d-flex justify-content-end"},N={class:"search"},B=["value"],D={class:"container p-3 mb-4 bg-white"},E=["onClick"];function I(e,t,p,o,g,f){const i=d("MTColumn"),l=d("router-link"),n=d("MTable");return x(),y(k,null,[a("div",T,[a("h1",q,v(e.$route.meta.title),1),a("div",A,[a("div",N,[a("input",{type:"text",value:o.search,onInput:t[0]||(t[0]=(...s)=>o.onSearchChange&&o.onSearchChange(...s)),name:"search",placeholder:"Search",id:"search",class:"form-control"},null,40,B)]),a("button",{type:"button",class:"btn btn-primary btn-block ml-3",onClick:t[1]||(t[1]=s=>e.$router.push({name:"users.create"}))}," Create ")])]),a("div",D,[r(n,{resources:o.users,onPaginationChangePage:o.onPaginationChangePage,onClickRow:t[4]||(t[4]=s=>e.$router.push({name:"users.show",params:{user:s.id}})),rowClass:"cursor-pointer",sort:o.sort,onSortChange:o.onSortChange},{default:c(()=>[r(i,{attribute:"name",label:"Name",sortable:!0}),r(i,{attribute:"email",label:"Email"}),r(i,{attribute:"phone",label:"Phone"}),r(i,{attribute:"actions",label:"Actions"},{body:c(({row:s})=>[r(l,{to:{name:"users.payments.index",params:{user:s.id}},onClick:t[2]||(t[2]=h(()=>{},["stop","prevent"])),class:"text-secondary mr-1"},{default:c(()=>[u("Payments")]),_:2},1032,["to"]),u(" | "),r(l,{to:{name:"users.edit",params:{user:s.id}},onClick:t[3]||(t[3]=h(()=>{},["stop","prevent"])),class:"text-secondary mr-1"},{default:c(()=>[u("Edit")]),_:2},1032,["to"]),u(" | "),a("a",{href:"",onClick:h(U=>o.destroy(s.id),["prevent","stop"]),class:"text-secondary"},"Delete",8,E)]),_:1})]),_:1},8,["resources","onPaginationChangePage","sort","onSortChange"])])],64)}const J=b(w,[["render",I]]);export{J as default};
