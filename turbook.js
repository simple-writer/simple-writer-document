var thistoc=[];

var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
}
renderer.heading = function (text, level) {
  thistoc.push({
    level:level,
    anchor:`${decodeURI(location.href).split('#')[1]}#${text.replaceAll('#', '!')}`,
    text:toPlain(text)
  })
  return `<h${level}><a name="${decodeURI(location.href).split('#')[1]}#${text.replaceAll('#', '!')}"></a>${text}</h${level}>`
}
function toPlain(p){
  var q=document.createElement('div');
  q.innerHTML=p;
  document.body.append(q);
  var pp=q.innerText;
  q.remove();
  return pp;
}

var ops={
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false 
}
if(hljs){
  ops.highlight=function (code) {
    return hljs.highlightAuto(code).value;
  }
}
marked.setOptions(ops);
var TurBook = {
  load: function (path, options = {}) {
    var turbookView = document.querySelector("turbook-view");
    if (!turbookView) throw Error('loading Book must has a <turbook-view>');
    turbookView.innerHTML = `<div class="toc"></div><div class="page"><div class="loading"></div></div>`;
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var obj = JSON.parse(xhr.responseText);
            TurBook.book(obj, resolve, reject);
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            })
          }
        }
      }
    })
  },
  book: function (obj, resolve, reject) {
    var turbookView = document.querySelector("turbook-view");
    if (!turbookView) return reject();
    var htmls = '<ul>' + sdxr(obj) + '</ul>';
    function sdxr(obj) {
      var rethtml = '';
      for (var i in obj) {
        if (typeof obj[i] == 'string') {
          rethtml += `<li><a href="#" data-md="${obj[i]}">${i}</a></li>`
        } else if (typeof obj[i] == 'object') {
          rethtml += `<li><p class="title">${i}</p><ul>${sdxr(obj[i])}</ul></li>`
        }
      }
      return rethtml;
    }
    turbookView.querySelector('.toc').innerHTML = htmls;
    turbookView.querySelector('.toc').querySelectorAll('a').forEach(function (a) {
      var apli = a.parentElement;
      var pathss = [];
      while (apli != null) {
        try {
          apli = apli.parentElement.parentElement;
          if (apli.tagName == 'LI') {
            pathss.unshift(apli.querySelector('p.title').innerText);
          }
        } catch (e) { }

      }
      pathss = '#/' + pathss.join('/') + '/' + a.innerText;
      a.href = pathss;
      a.onclick = function (e) {
        e.preventDefault();
        try { turbookView.querySelector('.toc a.active').classList.remove('active'); } catch (e) { }
        a.classList.add('active');
        try{document.querySelector(".activeToc").remove();}catch(e){}
        thistoc=[];
        cacheche._b = false;
        window.location.href = this.href;
        page.innerHTML = '<div class="loading"></div>';
        return fetch(this.getAttribute('data-md')).then(res => res.text()).then(res => {
          page.innerHTML = '<div class="markdown-body">'+marked.marked(res)+'</div>';
          
          var toc=document.createElement('ul');
          toc.classList.add('activeToc');
          console.log(thistoc
            .map(({ text, anchor }) => `<li><a href="#${anchor}">${text}</a></li>`));
          toc.innerHTML=thistoc
          .map(({ text, anchor }) => `<li><a href="#${anchor}">${text}</a></li>`)
          .join('');
          a.parentElement.append(toc);
          if (cacheche._ss) {
            cacheche._ss(url);
            cacheche._ss = undefined;
          }
        })
      }
    })
    var page = turbookView.querySelector('.page');
    var url = decodeURI(location.href);
    if (url.split('#')[1]) {
      var alla = turbookView.querySelector('.toc').querySelectorAll('a');
      for (var i = 0; i < alla.length; i++) {
        var a = alla[i];
        if (a.getAttribute('href') == '#' + url.split('#')[1]) {
          cacheche._ss = function (url) {
            if (url.split('#')[2]) {
              cacheche._b = false;
              location.href += '#' + url.split('#')[2];
            }
          }
          a.click()
          break;
        }
      }

    } else {
      turbookView.querySelector('.toc').querySelector('a').click();
    }
    window.onhashchange = function () {
      if (!cacheche._b) {
        cacheche._b = true;
        return;
      }
      url = decodeURI(location.href);
      if (url.split('#')[1]) {
        var alla = turbookView.querySelector('.toc').querySelectorAll('a');
        for (var i = 0; i < alla.length; i++) {
          var a = alla[i];
          if (a.getAttribute('href') == '#' + url.split('#')[1] && !a.classList.contains('active')) {
            cacheche._ss = function (url) {
              if (url.split('#')[2]) {
                cacheche._b = false;
                location.href += '#' + url.split('#')[2];

              }
            }
            a.click()
            break;
          }
        }

      } else {
        turbookView.querySelector('.toc').querySelector('a').click();
      }
    }
    resolve();
  }
}
var cacheche = {
  _b: true
};
