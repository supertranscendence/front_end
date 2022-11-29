"use strict";(self.webpackChunksleact_ts_front=self.webpackChunksleact_ts_front||[]).push([[366],{56803:function(n,e,t){var o=t(70885),i=t(72791);e.Z=function(n){var e=(0,i.useState)(n),t=(0,o.Z)(e,2),r=t[0],a=t[1];return[r,(0,i.useCallback)((function(n){a(n.target.value)}),[]),a]}},70648:function(n,e,t){var o=t(72791),i=t(78577),r={};e.Z=function(n){var e=(0,o.useCallback)((function(){n&&r[n]&&(r[n].disconnect(),delete r[n])}),[n]);return n?(r[n]||(r[n]=(0,i.io)("".concat("http://localhost:3095","/ws-").concat(n),{transports:["websocket"]}),console.info("create socket",n,r[n])),[r[n],e]):[void 0,e]}},83366:function(n,e,t){t.r(e),t.d(e,{default:function(){return _n}});var o,i,r=t(70885),a=t(74569),c=t.n(a),l=t(72791),s=t(72419),d=t(88385),p=t(64880),u=t(62170),h=t.n(u),x=t(5803),f=t(30168),g=t(14193),m=g.Z.div(o||(o=(0,f.Z)(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 1000;\n\n  & > div {\n    position: absolute;\n    display: inline-block;\n    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);\n    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);\n    border-radius: 6px;\n    user-select: none;\n    min-width: 360px;\n    z-index: 512;\n    max-height: calc(100vh - 20px);\n    color: rgb(29, 28, 29);\n  }\n"]))),b=g.Z.button(i||(i=(0,f.Z)(["\n  position: absolute;\n  right: 10px;\n  top: 6px;\n  background: transparent;\n  border: none;\n  font-size: 30px;\n  cursor: pointer;\n  color: black;\n"]))),v=t(80184),w=function(n){var e=n.children,t=n.style,o=(n.show,n.onCloseModal),i=n.closeButton,r=(0,l.useCallback)((function(n){n.stopPropagation()}),[]);return(0,v.jsxs)(m,{onClick:o,children:["x",(0,v.jsxs)("div",{style:t,onClick:r,children:[i&&(0,v.jsx)(b,{onClick:o,children:"X"}),e]})]})};w.defaultProps={closeButton:!0};var k,Z,j,y,_,C,S,P,T,z,A,E,N,I,D,O=w,R=t(42982),W=t(35694),H=g.Z.div(k||(k=(0,f.Z)(["\n  display: flex;\n  width: 100%;\n  padding: 20px;\n  padding-top: 0;\n"]))),B=g.Z.form(Z||(Z=(0,f.Z)(["\n  color: rgb(29, 28, 29);\n  font-size: 15px;\n  width: 100%;\n  border-radius: 4px;\n  border: 1px solid rgb(29, 28, 29);\n"]))),L=(0,g.Z)(W.r)(j||(j=(0,f.Z)(["\n  font-family: Slack-Lato, appleLogo, sans-serif;\n  font-size: 15px;\n  padding: 8px 9px;\n\n  & strong {\n    background: skyblue;\n  }\n\n  & textarea {\n    height: 44px;\n    padding: 9px 10px !important;\n    outline: none !important;\n    border-radius: 4px !important;\n    resize: none !important;\n    line-height: 22px;\n    border: none;\n  }\n\n  & ul {\n    border: 1px solid lightgray;\n    max-height: 200px;\n    overflow-y: auto;\n    padding: 9px 10px;\n    background: white;\n    border-radius: 4px;\n    width: 150px;\n  }\n"]))),U=g.Z.div(y||(y=(0,f.Z)(["\n  position: relative;\n  background: rgb(248, 248, 248);\n  height: 41px;\n  display: flex;\n  border-top: 1px solid rgb(221, 221, 221);\n  align-items: center;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n"]))),F=g.Z.button(_||(_=(0,f.Z)(["\n  position: absolute;\n  right: 5px;\n  top: 5px;\n"]))),M=g.Z.button(C||(C=(0,f.Z)(["\n  padding: 4px 20px;\n  background: transparent;\n  border: none;\n  display: flex;\n  align-items: center;\n  color: rgb(28, 29, 28);\n  width: 100%;\n\n  & img {\n    margin-right: 5px;\n  }\n\n  ",";\n"])),(function(n){return n.focus&&"\n    background: #1264a3;\n    color: white;\n  "})),G=t(40138),J=function(n){var e=n.onSubmitForm,t=n.chat,o=n.onChangeChat,i=n.placeholder,r=n.data,a=(0,l.useRef)(null);(0,l.useEffect)((function(){a.current&&(0,G.Z)(a.current)}),[]);var c=(0,l.useCallback)((function(n){"Enter"===n.key&&(n.shiftKey||(n.preventDefault(),e(n)))}),[e]),s=(0,l.useCallback)((function(n,e,t,o,i){return r?(0,v.jsxs)(M,{focus:i,children:[(0,v.jsx)("img",{src:h().url(r[o].email,{s:"20px",d:"retro"}),alt:r[o].nickname}),(0,v.jsx)("span",{children:t})]}):null}),[r]);return(0,v.jsx)(H,{children:(0,v.jsxs)(B,{onSubmit:e,children:[(0,v.jsx)(L,{id:"editor-chat",value:t,onChange:o,onKeyPress:c,placeholder:i,inputRef:a,allowSuggestionsAboveCursor:!0,children:(0,v.jsx)(W.p,{appendSpaceOnAdd:!0,trigger:"@",data:(null===r||void 0===r?void 0:r.map((function(n){return{id:n.id,display:n.nickname}})))||[],renderSuggestion:s})}),(0,v.jsx)(U,{children:(0,v.jsx)(F,{className:"c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send"+(null!==t&&void 0!==t&&t.trim()?"":" c-texty_input__button--disabled"),"data-qa":"texty_send_button","aria-label":"Send message","data-sk":"tooltip_parent",type:"submit",disabled:!(null!==t&&void 0!==t&&t.trim()),children:(0,v.jsx)("i",{className:"c-icon c-icon--paperplane-filled","aria-hidden":"true"})})})]})})},Y=g.Z.div(S||(S=(0,f.Z)(["\n  display: flex;\n  padding: 8px 20px;\n\n  &:hover {\n    background: #eee;\n  }\n\n  & .chat-img {\n    display: flex;\n    width: 36px;\n    margin-right: 8px;\n\n    & img {\n      width: 36px;\n      height: 36px;\n    }\n  }\n\n  & .chat-text {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n\n    & p {\n      flex: 0 0 100%;\n      margin: 0;\n    }\n  }\n\n  & .chat-user {\n    display: flex;\n    flex: 0 0 100%;\n    align-items: center;\n\n    & > b {\n      margin-right: 5px;\n    }\n\n    & > span {\n      font-size: 12px;\n    }\n  }\n\n  & a {\n    text-decoration: none;\n    color: deepskyblue;\n  }\n"]))),q=t(97892),X=t.n(q),$=t(91523),K=t(56855),Q=(0,l.memo)((function(n){var e=n.data,t=(0,p.UO)().workspace,o="Sender"in e?e.Sender:e.User,i=(0,l.useMemo)((function(){return e.content.startsWith("uploads\\")||e.content.startsWith("uploads/")?(0,v.jsx)("img",{src:"".concat("https://sleact.nodebird.com","/").concat(e.content),style:{maxHeight:200}}):(0,K.Z)({pattern:/@\[(.+?)]\((\d+?)\)|\n/g,decorator:function(n,e){var o=n.match(/@\[(.+?)]\((\d+?)\)/);return o?(0,v.jsxs)($.rU,{to:"/workspace/".concat(t,"/dm/").concat(o[2]),children:["@",o[1]]},n+e):(0,v.jsx)("br",{},e)},input:e.content})}),[t,e.content]);return(0,v.jsxs)(Y,{children:[(0,v.jsx)("div",{className:"chat-img",children:(0,v.jsx)("img",{src:h().url(o.email,{s:"36px",d:"retro"}),alt:o.nickname})}),(0,v.jsxs)("div",{className:"chat-text",children:[(0,v.jsxs)("div",{className:"chat-user",children:[(0,v.jsx)("b",{children:o.nickname}),(0,v.jsx)("span",{children:X()(e.createdAt).format("h:mm A")})]}),(0,v.jsx)("p",{children:i})]})]})})),V=g.Z.div(P||(P=(0,f.Z)(["\n  width: 100%;\n  display: flex;\n  flex: 1;\n"]))),nn=g.Z.section(T||(T=(0,f.Z)(["\n  margin-top: 20px;\n  border-top: 1px solid #eee;\n"]))),en=g.Z.div(z||(z=(0,f.Z)(["\n  display: flex;\n  justify-content: center;\n  flex: 1;\n  width: 100%;\n  position: sticky;\n  top: 14px;\n\n  & button {\n    font-weight: bold;\n    font-size: 13px;\n    height: 28px;\n    line-height: 27px;\n    padding: 0 16px;\n    z-index: 2;\n    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);\n    border-radius: 24px;\n    position: relative;\n    top: -13px;\n    background: white;\n    border: none;\n    outline: none;\n  }\n"]))),tn=t(13889),on=function(n){var e=n.scrollbarRef,t=n.isReachingEnd,o=n.isEmpty,i=n.chatSections,a=n.setSize,c=(0,l.useCallback)((function(n){0!==n.scrollTop||t||o||a((function(n){return n+1})).then((function(){var t,o;null===(t=e.current)||void 0===t||t.scrollTop((null===(o=e.current)||void 0===o?void 0:o.getScrollHeight())-n.scrollHeight)}))}),[a,e,t,o]);return(0,v.jsx)(V,{children:(0,v.jsx)(tn.$B,{autoHide:!0,ref:e,onScrollFrame:c,children:Object.entries(i).map((function(n){var e=(0,r.Z)(n,2),t=e[0],o=e[1];return(0,v.jsxs)(nn,{className:"section-".concat(t),children:[(0,v.jsx)(en,{children:(0,v.jsx)("button",{children:t})}),o.map((function(n){return(0,v.jsx)(Q,{data:n},n.id)}))]},t)}))})})},rn=t(56803),an=t(70648),cn=(g.Z.div(A||(A=(0,f.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  height: calc(100vh - 38px);\n  flex-flow: column;\n  position: relative;\n"]))),g.Z.header(E||(E=(0,f.Z)(["\n  height: 64px;\n  display: flex;\n  width: 100%;\n  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);\n  box-shadow: 0 1px 0 var(--saf-0);\n  padding: 20px 16px 20px 20px;\n  font-weight: bold;\n  align-items: center;\n"]))),g.Z.div(N||(N=(0,f.Z)(["\n  position: absolute;\n  top: 64px;\n  left: 0;\n  width: 100%;\n  height: calc(100% - 64px);\n  background: white;\n  opacity: 0.7;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n"])))),ln=g.Z.div(I||(I=(0,f.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  height: calc(100vh - 38px);\n  flex-flow: column;\n  position: relative;\n"]))),sn=g.Z.header(D||(D=(0,f.Z)(["\n  height: 64px;\n  display: flex;\n  width: 100%;\n  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);\n  box-shadow: 0 1px 0 var(--saf-0);\n  padding: 20px 16px 20px 20px;\n  font-weight: bold;\n  align-items: center;\n\n  & img {\n    margin-right: 5px;\n  }\n"])));var dn,pn=t(15206),un=t(59667),hn=function(){var n,e,t,o=(0,p.UO)(),i=o.workspace,a=o.id,u=(0,an.Z)(i),x=(0,r.Z)(u,1)[0],f=(0,s.ZP)("http://localhost:3095/api/users",d.Z).data,g=(0,s.ZP)("http://localhost:3095/api/workspaces/".concat(i,"/users/").concat(a),d.Z).data,m=(0,un.ZP)((function(n){return"http://localhost:3095/api/workspaces/".concat(i,"/dms/").concat(a,"/chats?perPage=").concat(20,"&page=").concat(n+1)}),d.Z,{onSuccess:function(n){1===(null===n||void 0===n?void 0:n.length)&&setTimeout((function(){var n;null===(n=S.current)||void 0===n||n.scrollToBottom()}),100)}}),b=m.data,w=m.mutate,k=m.setSize,Z=(0,rn.Z)(""),j=(0,r.Z)(Z,3),y=j[0],_=j[1],C=j[2],S=(0,l.useRef)(null),P=(0,l.useState)(!1),T=(0,r.Z)(P,2),z=T[0],A=T[1],E=0===(null===b||void 0===b||null===(n=b[0])||void 0===n?void 0:n.length),N=E||b&&(null===(e=b[b.length-1])||void 0===e?void 0:e.length)<20,I=(0,l.useCallback)((function(n){if(n.preventDefault(),null!==y&&void 0!==y&&y.trim()&&b){var e=y;w((function(n){var t;return null===n||void 0===n||n[0].unshift({id:((null===(t=b[0][0])||void 0===t?void 0:t.id)||0)+1,content:e,SenderId:f.id,Sender:f,ReceiverId:g.id,Receiver:g,createdAt:new Date}),n}),!1).then((function(){var n;(localStorage.setItem("".concat(i,"-").concat(a),(new Date).getTime().toString()),C(""),S.current)&&(console.log("scrollToBottom!",null===(n=S.current)||void 0===n?void 0:n.getValues()),S.current.scrollToBottom())})),c().post("http://localhost:3095/api/workspaces/".concat(i,"/dms/").concat(a,"/chats"),{content:y}).catch(console.error)}}),[y,i,a,f,g,b,w,C]),D=(0,l.useCallback)((function(n){n.SenderId===Number(a)&&f.id!==Number(a)&&w((function(e){return null===e||void 0===e||e[0].unshift(n),e}),!1).then((function(){var n;S.current&&(S.current.getScrollHeight()<S.current.getClientHeight()+S.current.getScrollTop()+150?(console.log("scrollToBottom!",null===(n=S.current)||void 0===n?void 0:n.getValues()),setTimeout((function(){var n;null===(n=S.current)||void 0===n||n.scrollToBottom()}),100)):pn.Am.success("\uc0c8 \uba54\uc2dc\uc9c0\uac00 \ub3c4\ucc29\ud588\uc2b5\ub2c8\ub2e4.",{onClick:function(){var n;null===(n=S.current)||void 0===n||n.scrollToBottom()},closeOnClick:!0}))}))}),[a,f,w]);(0,l.useEffect)((function(){return null===x||void 0===x||x.on("dm",D),function(){null===x||void 0===x||x.off("dm",D)}}),[x,D]),(0,l.useEffect)((function(){localStorage.setItem("".concat(i,"-").concat(a),(new Date).getTime().toString())}),[i,a]);var O=(0,l.useCallback)((function(n){n.preventDefault(),console.log(n);var e=new FormData;if(n.dataTransfer.items){for(var t=0;t<n.dataTransfer.items.length;t++)if("file"===n.dataTransfer.items[t].kind){var o=n.dataTransfer.items[t].getAsFile();console.log("... file["+t+"].name = "+o.name),e.append("image",o)}}else for(var r=0;r<n.dataTransfer.files.length;r++)console.log("... file["+r+"].name = "+n.dataTransfer.files[r].name),e.append("image",n.dataTransfer.files[r]);c().post("http://localhost:3095/api/workspaces/".concat(i,"/dms/").concat(a,"/images"),e).then((function(){A(!1),localStorage.setItem("".concat(i,"-").concat(a),(new Date).getTime().toString()),w()}))}),[i,a,w]),W=(0,l.useCallback)((function(n){n.preventDefault(),console.log(n),A(!0)}),[]);if(!g||!f)return null;var H=function(n){var e={};return n.forEach((function(n){var t=X()(n.createdAt).format("YYYY-MM-DD");Array.isArray(e[t])?e[t].push(n):e[t]=[n]})),e}(b?(t=[]).concat.apply(t,(0,R.Z)(b)).reverse():[]);return(0,v.jsxs)(ln,{onDrop:O,onDragOver:W,children:["asdasd",(0,v.jsxs)(sn,{children:[(0,v.jsx)("img",{src:h().url(g.email,{s:"24px",d:"retro"}),alt:g.nickname}),(0,v.jsx)("span",{children:g.nickname})]}),(0,v.jsx)(on,{scrollbarRef:S,isReachingEnd:N,isEmpty:E,chatSections:H,setSize:k}),(0,v.jsx)(J,{onSubmitForm:I,chat:y,onChangeChat:_,placeholder:"Message ".concat(g.nickname),data:[]}),z&&(0,v.jsx)(cn,{children:"\uc5c5\ub85c\ub4dc!"})]})},xn=function(n){var e=n.member,t=n.isOnline,o=(0,p.UO)().workspace,i=(0,p.TH)(),r=(0,s.ZP)("http://localhost:3095/api/users",d.Z,{dedupingInterval:2e3}).data,a=localStorage.getItem("".concat(o,"-").concat(e.id))||0,c=(0,s.ZP)(r?"http://localhost:3095/api/workspaces/".concat(o,"/dms/").concat(e.id,"/unreads?after=").concat(a):null,d.Z),u=c.data,x=c.mutate;return(0,l.useEffect)((function(){i.pathname==="/workspace/".concat(o,"/dm/").concat(e.id)&&x(0)}),[x,i.pathname,o,e]),(0,v.jsxs)($.OL,{activeClassName:"selected",to:"/workspace/".concat(o,"/dm/").concat(e.id),children:[(0,v.jsx)("img",{src:h().url(e.email,{s:"50px",d:"retro"})}),"\uc9c0\uae08 \uc0c1\ud0dc\ub294",t," \uc785\ub2c8\ub2e4.",(0,v.jsx)("span",{className:u&&u>0?"bold":void 0,children:e.nickname}),e.id===(null===r||void 0===r?void 0:r.id)&&(0,v.jsx)("span",{children:" (\ub098)"}),u&&u>0&&(0,v.jsx)("span",{className:"count",children:u})||null]},e.id)},fn=g.Z.button(dn||(dn=(0,f.Z)(["\n  background: transparent;\n  border: none;\n  width: 26px;\n  height: 26px;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  margin-left: 10px;\n  cursor: pointer;\n\n  ",";\n"])),(function(n){return n.collapse&&"\n    & i {\n      transform: none;\n    }\n  "})),gn=function(){var n=(0,p.UO)().workspace,e=(0,s.ZP)("http://localhost:3095/api/users",d.Z,{dedupingInterval:2e3}).data,t=(0,s.ZP)(e?"http://localhost:3095/api/workspaces/".concat(n,"/members"):null,d.Z).data,o=(0,an.Z)(n),i=(0,r.Z)(o,1)[0],a=(0,l.useState)(!1),c=(0,r.Z)(a,2),u=c[0],h=c[1],x=(0,l.useState)([]),f=(0,r.Z)(x,2),g=f[0],m=f[1],b=(0,l.useCallback)((function(){h((function(n){return!n}))}),[]);return(0,l.useEffect)((function(){console.log("DMList: workspace \ubc14\uaf08\ub2e4",n),m([])}),[n]),(0,l.useEffect)((function(){return null===i||void 0===i||i.on("onlineList",(function(n){m(n)})),console.log("socket on dm",null===i||void 0===i?void 0:i.hasListeners("dm"),i),function(){console.log("socket off dm",null===i||void 0===i?void 0:i.hasListeners("dm")),null===i||void 0===i||i.off("onlineList")}}),[i]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("h2",{children:[(0,v.jsx)(fn,{collapse:u,onClick:b,children:(0,v.jsx)("i",{className:"c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline","data-qa":"channel-section-collapse","aria-hidden":"true"})}),(0,v.jsx)("span",{children:"My firends"})]}),(0,v.jsx)("div",{children:!u&&(null===t||void 0===t?void 0:t.map((function(n){var e=g.includes(n.id);return(0,v.jsx)(xn,{member:n,isOnline:e},n.id)})))})]})},mn=function(n){var e=n.channel,t=(0,p.UO)().workspace,o=(0,p.TH)(),i=((0,s.ZP)("http://localhost:3095/api/users",d.Z,{dedupingInterval:2e3}).data,localStorage.getItem("".concat(t,"-").concat(e.name)),(0,s.ZP)(d.Z)),r=i.data,a=i.mutate;return(0,l.useEffect)((function(){o.pathname==="/workspace/".concat(t,"/channel/").concat(e.name)&&a(0)}),[a,o.pathname,t,e]),console.log("test","/workspace/".concat(t,"/channel/").concat(e.name)),(0,v.jsxs)($.OL,{activeClassName:"selected",to:"/workspace/".concat(t,"/channel/").concat(e.name),children:[(0,v.jsx)("span",{className:void 0!==r&&r>0?"bold":void 0,children:e.name}),void 0!==r&&r>0&&(0,v.jsx)("span",{className:"count",children:r})]},e.name)},bn=function(){(0,p.UO)().workspace;var n=(0,l.useState)(!1),e=(0,r.Z)(n,2),t=e[0],o=e[1],i=((0,s.ZP)("http://localhost:3095/api/users",d.Z,{dedupingInterval:2e3}).data,(0,l.useCallback)((function(){o((function(n){return!n}))}),[]));return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("h2",{children:[(0,v.jsx)(fn,{collapse:t,onClick:i,children:(0,v.jsx)("i",{className:"c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline","data-qa":"channel-section-collapse","aria-hidden":"true"})}),(0,v.jsx)("span",{children:"Channels"})]}),(0,v.jsx)("div",{children:!t&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(mn,{channel:{name:"Chat",WorkspaceId:-1,id:-1,private:!1}}),(0,v.jsx)(mn,{channel:{name:"Game",WorkspaceId:-1,id:-1,private:!1}}),(0,v.jsx)(mn,{channel:{name:"GameRoom",WorkspaceId:-1,id:-1,private:!1}})]})})]})},vn=t(43601),wn=(0,x.ZP)((function(){return t.e(639).then(t.bind(t,53639))})),kn=(0,x.ZP)((function(){return Promise.all([t.e(358),t.e(376)]).then(t.bind(t,66376))})),Zn=(0,x.ZP)((function(){return Promise.all([t.e(769),t.e(132),t.e(370)]).then(t.bind(t,99370))})),jn=(0,x.ZP)((function(){return Promise.all([t.e(769),t.e(304),t.e(527)]).then(t.bind(t,57527))})),yn=(0,x.ZP)((function(){return t.e(314).then(t.bind(t,24314))})),_n=function(n){n.children;var e=(0,p.UO)().workspace,t=(0,an.Z)(e),o=(0,r.Z)(t,2),i=(o[0],o[1],(0,s.ZP)("http://localhost:3095/api/users",d.Z)),a=i.data,u=(i.error,i.mutate),x=(0,l.useState)(!1),f=(0,r.Z)(x,2),g=f[0],m=f[1];(0,s.ZP)(a?"http://localhost:3095/api/workspaces/".concat(e,"/channels"):null,d.Z).data;console.log(a);var b=(0,l.useCallback)((function(){c().post("http://localhost:3095/api/users/logout",null,{withCredentials:!0}).then((function(){u(!1)}))}),[]),w=(0,l.useCallback)((function(){m(!g)}),[g]);return a?(0,v.jsxs)("div",{children:[(0,v.jsx)(vn.h4,{children:"JJIRANSENDANCE"}),(0,v.jsx)(vn.gQ,{children:(0,v.jsxs)("span",{onClick:w,children:[(0,v.jsx)(vn.rE,{src:h().url(a.email,{s:"50px",d:"retro"})}),g&&(0,v.jsxs)(O,{style:{right:0,top:38},show:g,onCloseModal:w,children:[(0,v.jsxs)(vn.JI,{children:[(0,v.jsx)("img",{src:h().url(a.email,{s:"50px",d:"retro"}),alt:""}),(0,v.jsxs)("div",{children:[(0,v.jsx)("span",{id:"profile-name",children:a.nickname}),(0,v.jsx)("span",{id:"profile-active",children:"Active"})]})]}),(0,v.jsx)(vn.Gt,{onClick:b,children:"\ub85c\uadf8\uc544\uc6c3"})]})]})}),(0,v.jsxs)(vn.h5,{children:[(0,v.jsxs)(vn.Ee,{children:[(0,v.jsx)(vn.mW,{children:"jjiransendence!"}),(0,v.jsxs)(vn.XH,{children:[(0,v.jsx)(bn,{}),(0,v.jsx)(gn,{})]})]}),(0,v.jsx)(vn.D$,{children:(0,v.jsxs)(p.rs,{children:[(0,v.jsx)(p.AW,{path:"/workspace/:workspace/intro",component:wn}),(0,v.jsx)(p.AW,{path:"/workspace/:workspace/dm/:id",component:hn}),(0,v.jsx)(p.AW,{path:"/workspace/:workspace/channel/Chat/:ChatRoom/",component:yn}),(0,v.jsx)(p.AW,{path:"/workspace/:workspace/channel/Chat/",component:kn}),(0,v.jsx)(p.AW,{path:"/workspace/:workspace/channel/Game/",component:Zn}),(0,v.jsx)(p.AW,{path:"/workspace/:workspace/channel/GameRoom/",component:jn})]})})]})]}):(0,v.jsx)(p.l_,{to:"/"})}},43601:function(n,e,t){t.d(e,{D$:function(){return T},Ee:function(){return C},Gt:function(){return y},JI:function(){return j},XH:function(){return P},gQ:function(){return w},h4:function(){return k},h5:function(){return _},mW:function(){return S},rE:function(){return Z}});var o,i,r,a,c,l,s,d,p,u,h,x,f,g,m,b=t(30168),v=t(14193),w=v.Z.div(o||(o=(0,b.Z)(["\n  float: right;\n"]))),k=v.Z.header(i||(i=(0,b.Z)(["\n  height: 38px;\n  max-width: 100%;\n  background: #350d36;\n  color: #ffffff;\n  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);\n  padding: 5px;\n  text-align: center;\n"]))),Z=(v.Z.header(r||(r=(0,b.Z)(["\n  height: 64px;\n  line-height: 64px;\n  border: none;\n\n  text-align: center;\n  border-top: 1px solid rgb(82, 38, 83);\n  border-bottom: 1px solid rgb(82, 38, 83);\n  font-weight: 700;\n  font-size: 20px;\n  background: transparent;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  padding: 0;\n  padding-left: 16px;\n  margin: 0;\n  color: rgb(188, 171, 188);\n  cursor: pointer;\n  width: 260px;\n  display: inline-flex;\n  flex-direction: column;\n  background: #3f0e40;\n  color: rgb(188, 171, 188);\n  vertical-align: top;\n"]))),v.Z.img(a||(a=(0,b.Z)(["\n  width: 28px;\n  height: 28px;\n  position: absolute;\n  top: 5px;\n  right: 16px;\n"])))),j=v.Z.div(c||(c=(0,b.Z)(["\n  display: flex;\n  padding: 20px;\n\n  & img {\n    display: flex;\n  }\n\n  & > div {\n    display: flex;\n    flex-direction: column;\n    margin-left: 10px;\n  }\n\n  & #profile-name {\n    font-weight: bold;\n    display: inline-flex;\n  }\n\n  & #profile-active {\n    font-size: 13px;\n    display: inline-flex;\n  }\n"]))),y=v.Z.button(l||(l=(0,b.Z)(["\n  border: none;\n  width: 100%;\n  border-top: 1px solid rgb(29, 28, 29);\n  background: transparent;\n  display: block;\n  height: 33px;\n  padding: 5px 20px 5px;\n  outline: none;\n  cursor: pointer;\n  color: black;\n"]))),_=v.Z.div(s||(s=(0,b.Z)(["\n  display: flex;\n  flex: 1;\n"]))),C=(v.Z.div(d||(d=(0,b.Z)(["\n  width: 65px;\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  background: #3f0e40;\n  border-top: 1px solid rgb(82, 38, 83);\n  border-right: 1px solid rgb(82, 38, 83);\n  vertical-align: top;\n  text-align: center;\n  padding: 15px 0 0;\n"]))),v.Z.nav(p||(p=(0,b.Z)(["\n  width: 260px;\n  display: inline-flex;\n  flex-direction: column;\n  background: #3f0e40;\n  color: rgb(188, 171, 188);\n  vertical-align: top;\n\n  & a {\n    padding-left: 36px;\n    color: inherit;\n    text-decoration: none;\n    height: 28px;\n    line-height: 28px;\n    display: flex;\n    align-items: center;\n\n    &.selected {\n      color: white;\n    }\n  }\n\n  & .bold {\n    color: white;\n    font-weight: bold;\n  }\n\n  & .count {\n    margin-left: auto;\n    background: #cd2553;\n    border-radius: 16px;\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 700;\n    height: 18px;\n    line-height: 18px;\n    padding: 0 9px;\n    color: white;\n    margin-right: 16px;\n  }\n\n  & h2 {\n    height: 36px;\n    line-height: 36px;\n    margin: 0;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    font-size: 15px;\n  }\n"])))),S=v.Z.button(u||(u=(0,b.Z)(["\n  height: 64px;\n  line-height: 64px;\n  border: none;\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid rgb(82, 38, 83);\n  border-bottom: 1px solid rgb(82, 38, 83);\n  font-weight: 900;\n  font-size: 24px;\n  background: transparent;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  padding: 0;\n  padding-left: 16px;\n  margin: 0;\n  color: white;\n  cursor: pointer;\n"]))),P=v.Z.div(h||(h=(0,b.Z)(["\n  height: calc(100vh - 102px);\n  overflow-y: auto;\n"]))),T=(v.Z.div(x||(x=(0,b.Z)(["\n  padding: 10px 0 0;\n\n  & h2 {\n    padding-left: 20px;\n  }\n\n  & > button {\n    width: 100%;\n    height: 28px;\n    padding: 4px;\n    border: none;\n    background: transparent;\n    border-top: 1px solid rgb(28, 29, 28);\n    cursor: pointer;\n\n    &:last-of-type {\n      border-bottom: 1px solid rgb(28, 29, 28);\n    }\n  }\n"]))),v.Z.div(f||(f=(0,b.Z)(["\n  flex: 1;\n"]))));v.Z.button(g||(g=(0,b.Z)(["\n  color: white;\n  font-size: 24px;\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n"]))),v.Z.button(m||(m=(0,b.Z)(["\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background: white;\n  border: 3px solid #3f0e40;\n  margin-bottom: 15px;\n  font-size: 18px;\n  font-weight: 700;\n  color: black;\n  cursor: pointer;\n"])))},88385:function(n,e,t){var o=t(74569),i=t.n(o);e.Z=function(n){return i().get(n,{withCredentials:!0}).then((function(n){return n.data}))}}}]);
//# sourceMappingURL=366.4aaf2d79.chunk.js.map