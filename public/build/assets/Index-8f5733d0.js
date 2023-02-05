import{_ as C,c as l,J as b,a as y,b as r,t as S,d as c,w as u,F as v,r as d,o as x,g,e as f}from"./_plugin-vue_export-helper-12bcda84.js";import{_ as P,a as k}from"./MTColumn-55816288.js";import{u as M}from"./users-3fd51020.js";import"./auth-8a346ea3.js";const w={name:"UsersIndex",components:{MTColumn:P,MTable:k},setup(){const e=M(),n=l(()=>e.users),m=l(()=>e.query.sort||""),t=l(()=>e.query.search||"");b(()=>{e.fetchAll()});const h=o=>{if(confirm("Are you sure you want to Delete"))return e.destroy(o)},p=o=>{e.query.page=o,e.fetchAll()},s=o=>{e.query.sort=o,e.fetchAll()},i=_.debounce(o=>{e.query.page=1,e.query.search=o.target.value,e.fetchAll()},300);return{users:n,sort:m,search:t,destroy:h,onPaginationChangePage:p,onSortChange:s,onSearchChange:i}}},T={class:"container mt-4 mb-2 d-flex justify-content-between align-items-center"},q={class:"mt-2"},A={class:"search"},N=["value"],B={class:"container p-3 mb-4 bg-white"},D=["onClick"];function E(e,n,m,t,h,p){const s=d("MTColumn"),i=d("router-link"),o=d("MTable");return x(),y(v,null,[r("div",T,[r("h1",q,S(e.$route.meta.title),1),r("div",A,[r("input",{type:"text",value:t.search,onInput:n[0]||(n[0]=(...a)=>t.onSearchChange&&t.onSearchChange(...a)),name:"search",placeholder:"Search",id:"search",class:"form-control"},null,40,N)])]),r("div",B,[c(o,{resources:t.users,onPaginationChangePage:t.onPaginationChangePage,onClickRow:n[2]||(n[2]=a=>e.$router.push({name:"users.payments",params:{id:a.id}})),rowClass:"cursor-pointer",sort:t.sort,onSortChange:t.onSortChange},{default:u(()=>[c(s,{attribute:"name",label:"Name",sortable:!0}),c(s,{attribute:"email",label:"Email"}),c(s,{attribute:"phone",label:"Phone"}),c(s,{attribute:"actions",label:"Actions"},{body:u(({row:a})=>[c(i,{to:{name:"users.edit",params:{id:a.id}},onClick:n[1]||(n[1]=g(()=>{},["stop","prevent"])),class:"text-secondary mr-1"},{default:u(()=>[f("Edit")]),_:2},1032,["to"]),f(" | "),r("a",{href:"",onClick:g(I=>t.destroy(a.id),["prevent","stop"]),class:"text-secondary"},"Delete",8,D)]),_:1})]),_:1},8,["resources","onPaginationChangePage","sort","onSortChange"])])],64)}const J=C(w,[["render",E]]);export{J as default};