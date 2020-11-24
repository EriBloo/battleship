(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{19:function(t,e,n){},20:function(t,e,n){},21:function(t,e,n){},22:function(t,e,n){},23:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var i=n(0),r=n(1),a=n.n(r),s=n(11),o=n.n(s),c=n(2),u=n(9),l=n.n(u),h=n(12),g=n(5),d=n(3),p=n(4),f=function(){function t(e,n,i){Object(d.a)(this,t),this.parts=void 0,this.origin=void 0,this.rotated=void 0,this.parts=new Array(e).fill(!1),this.origin=n,this.rotated=i}return Object(p.a)(t,[{key:"hit",value:function(t){if(t>this.parts.length-1)throw new Error("Can't choose value heigher than ships length - 1 (".concat(this.getLength-1,")"));this.parts[t]=!0}},{key:"isSunk",value:function(){return this.parts.every((function(t){return t}))}},{key:"getParts",get:function(){return this.parts}},{key:"getLength",get:function(){return this.parts.length}},{key:"getOrigin",get:function(){return this.origin}},{key:"getRotated",get:function(){return this.rotated}}]),t}(),y=function(){function t(e){Object(d.a)(this,t),this.size=void 0,this.tiles=void 0,this.ships=void 0,this.size=e,this.tiles=Array.from({length:e},(function(){return new Array(e).fill(!1)})),this.ships=[]}return Object(p.a)(t,[{key:"placeShip",value:function(t,e,n){var i=this,r=this.getBoardStates.notShot,a=new f(t,[e[0],e[1]],n),s=Array.from({length:t},(function(t,e){return n?[e,0]:[0,e]})),o=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];s.map((function(t){if(!r.some((function(n){return n[0]===e[0]-t[0]&&n[1]===e[1]-t[1]})))throw new Error("Invalid location.");o.map((function(n){if(!(e[0]-t[0]+n[0]<0||e[0]-t[0]+n[0]>i.size-1||e[1]-t[1]+n[1]<0||e[1]-t[1]+n[1]>i.size-1)&&!1!==i.tiles[e[0]-t[0]+n[0]][e[1]-t[1]+n[1]])throw new Error("Invalid location.")}))})),s.map((function(t){i.tiles[e[0]-t[0]][e[1]-t[1]]=a})),this.ships.push(a)}},{key:"removeShip",value:function(t){var e=this;if("boolean"!==typeof this.tiles[t[0]][t[1]]){var n=this.tiles[t[0]][t[1]],i=n.getLength,r=n.getOrigin,a=n.getRotated;return Array.from({length:i},(function(t,e){return a?[e,0]:[0,e]})).map((function(t){e.tiles[r[0]-t[0]][r[1]-t[1]]=!1})),this.ships=this.ships.filter((function(t){return t.getLength!==i||t.getOrigin[0]!==r[0]||t.getOrigin[1]!==r[1]||t.getRotated!==a})),n}}},{key:"rotateShip",value:function(t){var e=this.removeShip(t);if(e)try{return this.placeShip(e.getLength,e.getOrigin,!e.getRotated),!0}catch(n){return this.placeShip(e.getLength,e.getOrigin,e.getRotated),!1}return!1}},{key:"moveShip",value:function(t,e){var n=this.removeShip(t);if(n)try{return this.placeShip(n.getLength,e,n.getRotated),!0}catch(i){return this.placeShip(n.getLength,n.getOrigin,n.getRotated),!1}return!1}},{key:"receiveAttack",value:function(t){var e=this.getBoardStates;if(![].concat(Object(g.a)(e.shipNotHit),Object(g.a)(e.notShot)).some((function(e){return e[0]===t[0]&&e[1]===t[1]})))return!1;if(e.notShot.find((function(e){return e[0]===t[0]&&e[1]===t[1]})))return this.tiles[t[0]][t[1]]=!0,!0;if(e.shipNotHit.find((function(e){return e[0]===t[0]&&e[1]===t[1]}))){var n=this.tiles[t[0]][t[1]];return n.hit(n.getOrigin[0]-t[0]+(n.getOrigin[1]-t[1])),this.markAroundSunk(n),!0}return!1}},{key:"allSunk",value:function(){return this.ships.every((function(t){return t.isSunk()}))}},{key:"distributeShips",value:function(t){var e=this,n=[];return t.sort((function(t,e){return e-t})).map((function(t){var i=!1,r=[],a=[Math.floor(Math.random()*e.size),Math.floor(Math.random()*e.size)],s=Math.random()<.5;do{try{do{a=[Math.floor(Math.random()*e.size),Math.floor(Math.random()*e.size)],s=Math.random()<.5}while(r.find((function(t){return t[0][0]===a[0]&&t[0][1]===a[1]&&t[1]===s})));e.placeShip(t,a,s),i=!0}catch(o){r.push([a,s]),i=!1}}while(!i&&r.length<e.size*e.size);n.push(i)})),n.every((function(t){return t}))}},{key:"markAroundSunk",value:function(t){var e=this;if(t.isSunk()){var n=t.getOrigin,i=Array.from({length:t.getLength},(function(e,n){return t.getRotated?[n,0]:[0,n]})),r=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];i.map((function(t){r.map((function(i){n[0]-t[0]+i[0]<0||n[0]-t[0]+i[0]>e.size-1||n[1]-t[1]+i[1]<0||n[1]-t[1]+i[1]>e.size-1||!1===e.tiles[n[0]-t[0]+i[0]][n[1]-t[1]+i[1]]&&(e.tiles[n[0]-t[0]+i[0]][n[1]-t[1]+i[1]]=!0)}))}))}}},{key:"getTiles",get:function(){return this.tiles}},{key:"getSize",get:function(){return this.size}},{key:"getShips",get:function(){return this.ships}},{key:"getBoardStates",get:function(){for(var t={shipHit:[],shipNotHit:[],missed:[],notShot:[]},e=0;e<this.size;e+=1)for(var n=0;n<this.size;n+=1){var i=this.tiles[e][n];if("boolean"===typeof i)!1===i?t.notShot.push([e,n]):t.missed.push([e,n]);else{var r=i.getParts,a=i.getOrigin;!1===r[a[0]-e+(a[1]-n)]?t.shipNotHit.push([e,n]):t.shipHit.push([e,n])}}return t}},{key:"getValidTiles",get:function(){for(var t=this,e=[],n=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],i=function(i){for(var r=function(r){n.every((function(e){return i+e[0]<0||i+e[0]>t.size-1||r+e[1]<0||r+e[1]>t.size-1||!1===t.tiles[i+e[0]][r+e[1]]}))&&e.push([i,r])},a=0;a<t.size;a+=1)r(a)},r=0;r<this.size;r+=1)i(r);return e}}]),t}();n(19);var m=function(t){var e=Object(r.useState)(""),n=Object(c.a)(e,2),a=n[0],s=n[1],o=Object(r.useState)(null),u=Object(c.a)(o,2),l=u[0],h=u[1];function g(){if(document.querySelectorAll('.board-tile[data-player="'.concat(t.player,'"]')).forEach((function(t){t.classList.remove("ship-not-hit"),t.classList.remove("ship-hit"),t.classList.remove("ship-sunk"),t.classList.remove("missed"),t.classList.remove("marked-origin"),t.classList.remove("marked")})),0===t.player&&t.state.shipNotHit.map((function(e){var n=document.querySelector('.board-tile[data-x="'.concat(e[0],'"][data-y="').concat(e[1],'"][data-player="').concat(t.player,'"]'));null===n||void 0===n||n.classList.add("ship-not-hit")})),t.state.shipHit.map((function(e){var n=document.querySelector('.board-tile[data-x="'.concat(e[0],'"][data-y="').concat(e[1],'"][data-player="').concat(t.player,'"]'));t.game.getPlayer(t.player).getBoard.getTiles[e[0]][e[1]].isSunk()?null===n||void 0===n||n.classList.add("ship-sunk"):null===n||void 0===n||n.classList.add("ship-hit")})),t.state.missed.map((function(e){var n=document.querySelector('.board-tile[data-x="'.concat(e[0],'"][data-y="').concat(e[1],'"][data-player="').concat(t.player,'"]'));null===n||void 0===n||n.classList.add("missed")})),l&&!t.game.getInit){var e=l.getOrigin,n=Array.from({length:l.getLength-1},(function(t,e){return l.getRotated?[e+1,0]:[0,e+1]})),i=document.querySelector('.board-tile[data-x="'.concat(e[0],'"][data-y="').concat(e[1],'"][data-player="').concat(t.player,'"]'));null===i||void 0===i||i.classList.add("marked-origin"),n.map((function(n){var i=document.querySelector('.board-tile[data-x="'.concat(e[0]-n[0],'"][data-y="').concat(e[1]-n[1],'"][data-player="').concat(t.player,'"]'));null===i||void 0===i||i.classList.add("marked")}))}}function d(e){var n=e.target,i=parseInt(n.getAttribute("data-x"),10),r=parseInt(n.getAttribute("data-y"),10);if(t.player===1-t.turn&&1===t.player&&t.game.getInit)t.loop([i,r]);else if(0===t.player&&!t.game.getInit)if(l){if(l){var a=l.getOrigin;a[0]===i&&a[1]===r?(t.rotate([i,r]),f(),h(null)):(t.move([a[0],a[1]],[i,r]),f(),h(null))}}else{var s=t.game.getPlayer(0).getBoard.getTiles[i][r];"boolean"!==typeof s&&h(s)}}function p(e){if(l){var n,i=e.target,r=parseInt(i.getAttribute("data-x"),10),a=parseInt(i.getAttribute("data-y"),10),s=l.getOrigin;n=r===s[0]&&a===s[1]?Array.from({length:l.getLength},(function(t,e){return l.getRotated?[0,e]:[e,0]})):Array.from({length:l.getLength},(function(t,e){return l.getRotated?[e,0]:[0,e]}));var o=new y(t.game.getPlayer(0).getBoard.getSize);t.game.getPlayer(0).getBoard.getShips.map((function(t){t.getOrigin[0]===s[0]&&t.getOrigin[1]===s[1]||o.placeShip(t.getLength,t.getOrigin,t.getRotated)}));var c=o.getValidTiles;if(n.every((function(t){return c.find((function(e){return r-t[0]===e[0]&&a-t[1]===e[1]}))}))){var u=document.querySelector('.board-tile[data-x="'.concat(r,'"][data-y="').concat(a,'"][data-player="',0,'"]'));null===u||void 0===u||u.classList.add("valid-origin"),n.map((function(t){if(0!==t[0]||0!==t[1]){var e=document.querySelector('.board-tile[data-x="'.concat(r-t[0],'"][data-y="').concat(a-t[1],'"][data-player="',0,'"]'));null===e||void 0===e||e.classList.add("valid")}}))}}}function f(){document.querySelectorAll('.board-tile[data-player="'.concat(0,'"]')).forEach((function(t){t.classList.remove("valid-origin"),t.classList.remove("valid")}))}return Object(r.useEffect)((function(){t.game.getInit?t.turn===1-t.player?s("active"):s(""):s("active"),g()}),[t.turn,t.init]),Object(r.useEffect)((function(){g()})),Object(i.jsxs)("div",{className:"board",children:[Object(i.jsx)("table",{className:"board-wrapper ".concat(a),children:Object(i.jsx)("tbody",{children:t.game.getPlayer(t.player).getBoard.getTiles.map((function(e,n){return Object(i.jsx)("tr",{className:"board-row",children:e.map((function(e,r){return Object(i.jsx)("td",{className:"board-element",children:Object(i.jsx)("div",{"data-x":"".concat(n),"data-y":"".concat(r),"data-player":t.player,className:"board-tile",onClick:d,onMouseMove:p,onMouseLeave:f},"(".concat(n,", ").concat(r,")"))},r)}))},n)}))})}),Object(i.jsx)("h4",{children:"".concat(t.game.getPlayer(t.player).getName," board")})]})};n(20);var v=function(t){return Object(i.jsx)("div",{className:"ships-container ".concat(t.player),children:t.ships.sort((function(t,e){return t.getLength-e.getLength})).map((function(t,e){return Object(i.jsx)("div",{className:"ship-wrapper",children:t.getParts.map((function(e,n){return t.isSunk()?Object(i.jsx)("div",{className:"part sunk"},n):Object(i.jsx)("div",{className:"part"},n)}))},e)}))})};n(21);var b=function(t){var e=Object(r.useState)(t.game.getPlayer(0).getBoard.getBoardStates),n=Object(c.a)(e,2),a=n[0],s=n[1],o=Object(r.useState)(t.game.getPlayer(1).getBoard.getBoardStates),u=Object(c.a)(o,2),g=u[0],d=u[1],p=Object(r.useState)(t.game.getPlayer(0).getBoard.getShips),f=Object(c.a)(p,2),y=f[0],b=f[1],j=Object(r.useState)(t.game.getPlayer(1).getBoard.getShips),O=Object(c.a)(j,2),S=O[0],k=O[1];function x(){s(t.game.getPlayer(0).getBoard.getBoardStates)}function P(){d(t.game.getPlayer(1).getBoard.getBoardStates)}function z(){b(t.game.getPlayer(0).getBoard.getShips)}function w(){k(t.game.getPlayer(1).getBoard.getShips)}function B(t){return L.apply(this,arguments)}function L(){return(L=Object(h.a)(l.a.mark((function e(n){var i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=function(t,e){return new Promise((function(n){return setTimeout(n,Math.floor(Math.random()*(e-t))+t)}))},-1!==t.game.getWinner){e.next=20;break}if(!t.game.playerTurn([n[0],n[1]])){e.next=20;break}if(t.game.setWinner=t.game.isWinner(),P(),w(),t.updateTurn(),t.game.next(),-1!==t.game.getWinner){e.next=20;break}return t.updateTurn(),e.next=13,i(500,2e3);case 13:t.game.computerTurn(),t.game.setWinner=t.game.isWinner(),t.updateTurn(),t.game.next(),t.updateTurn(),x(),z();case 20:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){t.game.getPlayer(0).getBoard.rotateShip(e),x()}function A(e,n){t.game.getPlayer(0).getBoard.moveShip(e,n),x()}return Object(i.jsxs)("div",{className:"boards-container",children:[Object(i.jsxs)("div",{className:"board-container",children:[Object(i.jsx)(v,{player:"player",ships:y}),Object(i.jsx)(m,{player:0,game:t.game,state:a,loop:B,rotate:N,move:A,turn:t.turn,init:t.init})]}),Object(i.jsxs)("div",{className:"board-container",children:[Object(i.jsx)(m,{player:1,game:t.game,state:g,loop:B,rotate:N,move:A,turn:t.turn,init:t.init}),Object(i.jsx)(v,{player:"computer",ships:S})]})]})},j=function(){function t(e,n){Object(d.a)(this,t),this.board=void 0,this.name=void 0,this.board=e,this.name=n}return Object(p.a)(t,[{key:"chooseAttack",value:function(t){var e=t.getBoardStates,n=[];if(e.shipHit.length>0){var i=e.shipHit.filter((function(e){return!t.getTiles[e[0]][e[1]].isSunk()}));if(i.length>0){var r=[[-1,0],[0,-1],[0,1],[1,0]];if(i.forEach((function(i){t.getTiles[i[0]][i[1]].getParts.filter((function(t){return t})).length>1&&(r=t.getTiles[i[0]][i[1]].getRotated?[[-1,0],[1,0]]:[[0,-1],[0,1]]),r.forEach((function(r){i[0]+r[0]<0||i[0]+r[0]>t.getSize-1||i[1]+r[1]<0||i[1]+r[1]>t.getSize-1||e.shipHit.find((function(t){return t[0]===i[0]+r[0]&&t[1]===i[1]+r[1]}))||e.missed.find((function(t){return t[0]===i[0]+r[0]&&t[1]===i[1]+r[1]}))||n.push([i[0]+r[0],i[1]+r[1]])}))})),n.length>0)return n[Math.floor(Math.random()*n.length)]}}return(n=[].concat(Object(g.a)(e.shipNotHit),Object(g.a)(e.notShot)))[Math.floor(Math.random()*n.length)]}},{key:"getBoard",get:function(){return this.board}},{key:"getName",get:function(){return this.name}}]),t}(),O=function(){function t(e,n){Object(d.a)(this,t),this.shipSizes=void 0,this.players=void 0,this.currentPlayer=void 0,this.initialized=void 0,this.winner=void 0,this.shipSizes=e,this.players=[new j(new y(n),"Player"),new j(new y(n),"Computer")],this.currentPlayer=0,this.initialized=!1,this.winner=-1,this.players[0].getBoard.distributeShips(this.shipSizes),this.players[1].getBoard.distributeShips(this.shipSizes)}return Object(p.a)(t,[{key:"init",value:function(){this.players[0].getBoard.getShips.length!==this.shipSizes.length||this.initialized||(this.initialized=!0)}},{key:"getPlayer",value:function(t){return this.players[t]}},{key:"next",value:function(){this.currentPlayer=1-this.currentPlayer}},{key:"playerTurn",value:function(t){return this.getOpponent.getBoard.receiveAttack(t)}},{key:"computerTurn",value:function(){var t,e=!1;do{t=this.getCurrentPlayer.chooseAttack(this.getOpponent.getBoard),e=this.getOpponent.getBoard.receiveAttack(t)}while(!e)}},{key:"isWinner",value:function(){return this.getOpponent.getBoard.allSunk()?this.currentPlayer:-1}},{key:"getCurrentPlayer",get:function(){return this.players[this.currentPlayer]}},{key:"getOpponent",get:function(){return this.players[1-this.currentPlayer]}},{key:"getTurn",get:function(){return this.currentPlayer}},{key:"getWinner",get:function(){return this.winner}},{key:"setWinner",set:function(t){this.winner=t}},{key:"getInit",get:function(){return this.initialized}},{key:"getShips",get:function(){return this.shipSizes}}]),t}();n(10),n(22);var S=function(){var t=Object(r.useState)(new O([5,4,3,3,2],10)),e=Object(c.a)(t,2),n=e[0],a=(e[1],Object(r.useState)("Move/Rotate ships")),s=Object(c.a)(a,2),o=s[0],u=s[1],l=Object(r.useState)(n.getTurn),h=Object(c.a)(l,2),g=h[0],d=h[1],p=Object(r.useState)(n.getInit),f=Object(c.a)(p,2),y=f[0],m=f[1];function v(){n.getInit?-1!==n.getWinner?u("".concat(n.getPlayer(n.getWinner).getName," won!")):n.getInit&&u("".concat(n.getCurrentPlayer.getName," turn")):u("Move/Rotate ships")}return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsx)("div",{className:"display-wrapper",children:Object(i.jsx)("div",{className:"display",children:Object(i.jsx)("h2",{children:o})})}),Object(i.jsx)("div",{className:"buttons",children:Object(i.jsx)("button",{type:"button",onClick:function(){n.init(),v(),m(n.getInit)},children:"Start Game"})}),Object(i.jsx)(b,{game:n,updateTurn:function(){d(n.getTurn),v()},turn:g,init:y})]})};n(23);o.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(S,{})}),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.eaedb5c1.chunk.js.map