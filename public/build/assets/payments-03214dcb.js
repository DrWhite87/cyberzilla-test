import{d as y,a,h as n}from"./auth-b8800a8f.js";import{j as c,l as i}from"./_plugin-vue_export-helper-b42ff5c8.js";const q=y("payments",()=>{const r=c({}),p=c({}),u=c([]),o=i({page:1}),m=(t,e)=>a.get("/api/users/"+t+"/payments/"+e).then(({data:s})=>{s.success&&s.data.payment&&(r.value=s.data.payment)}).catch(s=>{n(s)}),h=t=>{a.get("/api/users/"+t+"/payments?"+new URLSearchParams(o)).then(({data:e})=>{e.success&&e.data.payments&&(p.value=e.data.payments)}).catch(e=>{n(e)})};return{payment:r,payments:p,statuses:u,query:o,fetchOne:m,fetchAll:h,fetchStatuses:()=>a.get("/api/payments/statuses").then(({data:t})=>{t.success&&t.data.statuses&&(u.value=t.data.statuses)}).catch(t=>{n(t)}),store:(t,e)=>a.post("/api/users/"+t+"/payments",e).catch(s=>{n(s)}),update:(t,e)=>a.patch("/api/payments/"+t,e).catch(s=>{n(s)}),destroy:(t,e)=>a.delete("/api/payments/"+e).then(({data:s})=>{t&&s.success&&h(t)}).catch(s=>{n(s)})}},{persist:{paths:["query"]}});export{q as u};
