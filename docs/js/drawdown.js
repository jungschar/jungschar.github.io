/**
 * drawdown.js
 * (c) Adam Leggett
 */

function markdown(n){var r=/\\([\\\|`*_{}\[\]()#+\-~])/g,t=/\n *&gt; *([^]*?)(?=(\n|$){2})/g,e=/\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,u=/(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,c=/^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,f=/.*\n/g,l=/\||(.*?[^\\])\|/g;function o(r,t){n=n.replace(r,t)}function a(n,r){return"<"+n+">"+r+"</"+n+">"}function g(n){return n.replace(u,function(n,r,t,e,u,c,f,l,o,i){return r+a(e?o?"strong":"em":u?o?"s":"sub":c?"sup":f?"small":l?"big":"code",g(i))})}function i(n){return n.replace(r,"$1")}var p=[],s=0;return n="\n"+n+"\n",o(/</g,"&lt;"),o(/>/g,"&gt;"),o(/\t|\r|\uf8ff/g,"  "),n=function n(r){return r.replace(t,function(r,t){return a("blockquote",n(g(t.replace(/^ *&gt; */gm,""))))})}(n),o(/^([*\-=_] *){3,}$/gm,"<hr/>"),n=function n(r){return r.replace(e,function(r,t,e,u,c,f){var l=a("li",g(f.split(RegExp("\n ?"+t+"(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +","g")).map(n).join("</li><li>")));return"\n"+(e?'<ol start="'+(u?e+'">':parseInt(e,36)-9+'" style="list-style-type:'+(c?"low":"upp")+'er-alpha">')+l+"</ol>":a("ul",l))})}(n),o(/<\/(ol|ul)>\n\n<\1>/g,""),o(/\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g,function(n,r,t,e,u){return p[--s]=a("pre",a("code",e||u.replace(/^    /gm,""))),s+""}),o(/((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g,function(n,r,t,e,u,c,f){return p[--s]=u?t?'<img src="'+u+'" alt="'+e+'"/>':'<a href="'+u+'">'+i(g(e))+"</a>":f,s+""}),o(/\n(( *\|.*?\| *\n)+)/g,function(n,r){var t=r.match(c)[1];return"\n"+a("table",r.replace(f,function(n,r){return n==t?"":a("tr",n.replace(l,function(n,e,u){return u?a(t&&!r?"th":"td",i(g(e||""))):""}))}))}),o(/(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g,function(n,r,t,e){return r+a("h"+t.length,i(g(e)))}),o(/(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g,function(n,r){return a("p",i(g(r)))}),o(/-\d+\uf8ff/g,function(n){return p[parseInt(n)]}),n.trim()}