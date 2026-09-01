import"./assets/modal-BePYD-Dd.js";var e={form:document.querySelector(`#catalog-search-form`),queryInput:document.querySelector(`#movie-query`),yearSelect:document.querySelector(`#movie-year`),clearButton:document.querySelector(`.catalog-search-clear`),resultsSection:document.querySelector(`.catalog-results`),movieList:document.querySelector(`.movie-list`),emptyState:document.querySelector(`.catalog-results-empty`),pagination:document.querySelector(`.pagination`),paginationList:document.querySelector(`.pagination-list`),loader:document.querySelector(`.loader`),scrollUpButton:document.querySelector(`.scroll-up`),cardTemplate:document.querySelector(`#catalog-movie-card-template`)},t={movies:[],genres:[],page:1,totalPages:0,query:``,year:``,isLoading:!1},n=1900,r=new Date().getFullYear(),i=window.matchMedia(`(max-width: 767px)`),a=`31ab4be675fffa39376ecabddb9e341d`,o=`https://api.themoviedb.org/3`,s=`https://image.tmdb.org/t/p`;function c(e,t={}){let n=new URL(`${o}${e}`);return n.searchParams.set(`api_key`,a),Object.entries(t).forEach(([e,t])=>{t&&n.searchParams.set(e,t)}),n}async function l(e,t={}){let n=await fetch(c(e,t));if(!n.ok)throw Error(`TMDB request failed with status ${n.status}`);return n.json()}async function u({query:e,year:t,page:n=1}){return l(`/search/movie`,{query:e,primary_release_year:t,page:n,include_adult:!1,language:`en-US`})}async function d(e=1){return l(`/trending/movie/week`,{page:e,language:`en-US`})}async function f(){t.genres=(await l(`/genre/movie/list`,{language:`en-US`})).genres}function p(e){return e?e.slice(0,4):``}function m(e){return e?`${s}/w500${e}`:``}function h(e){let n=e.map(e=>t.genres.find(t=>t.id===e)?.name).filter(Boolean).slice(0,2);return n.length>0?n.join(`, `):`Genre unknown`}function g(e){return{...e,posterUrl:m(e.poster_path),title:e.title,genres:h(e.genre_ids||[]),year:p(e.release_date),rating:e.vote_average?e.vote_average.toFixed(1):`N/A`}}function _(e){let t=Number(e);if(Number.isNaN(t))return`N/A`;let n=Math.max(0,Math.min(5,Math.round(t/2))),r=5-n;return`${`★`.repeat(n)}${`☆`.repeat(r)}`}function v(n){t.isLoading=n,e.resultsSection.setAttribute(`aria-busy`,String(n)),e.loader.classList.toggle(`is-hidden`,!n)}function y(t){e.emptyState.hidden=!t}function b(){e.movieList.innerHTML=``}function x(){e.pagination.hidden=!0,e.paginationList.innerHTML=``}function S(){let t=[];for(let e=r;e>=n;--e)t.push(`<option value="${e}">${e}</option>`);e.yearSelect.insertAdjacentHTML(`beforeend`,t.join(``))}function C(t){let n=e.cardTemplate.content.firstElementChild.cloneNode(!0),r=n.querySelector(`.movie-card-image`),i=n.querySelector(`.movie-card-title`),a=n.querySelector(`.movie-card-genres`),o=n.querySelector(`.movie-card-year`),s=n.querySelector(`.movie-card-rating-value`);return n.dataset.movieId=t.id,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-label`,`View details for ${t.title}`),r.alt=t.title||`Movie poster`,t.posterUrl?r.src=t.posterUrl:(r.hidden=!0,n.classList.add(`is-missing-poster`)),i.textContent=t.title||`Untitled movie`,a.textContent=t.genres||`Genre unknown`,o.textContent=t.year||``,s.textContent=_(t.rating),n}function w(t){b();let n=t.map(C);e.movieList.append(...n),y(t.length===0)}function T(e){window.dispatchEvent(new CustomEvent(`open-movie-modal`,{detail:e}))}function E(e){let n=e.closest(`.movie-list-item`);return n?t.movies.find(e=>String(e.id)===n.dataset.movieId):null}function D(e){let t=E(e.target);t&&T(t)}function O(e){if(e.key!==`Enter`&&e.key!==` `)return;let t=E(e.target);t&&(e.preventDefault(),T(t))}function k(e,t){return Array.from({length:t-e+1},(t,n)=>e+n)}function A(e,t){return i.matches?t<=5?k(1,t):e<=3?[1,2,3,t]:e>=t-2?[1,...k(t-2,t)]:[1,e-1,e,e+1,t]:t<=10?k(1,t):e<=5?[...k(1,9),t]:e>=t-4?[1,...k(t-8,t)]:[1,...k(e-3,e+3),t]}function j(t,n){if(x(),n<=1)return;let r=A(t,n),i=[`
      <li>
        <button
          class="pagination-control"
          type="button"
          data-page="${t-1}"
          aria-label="Go to previous page"
          ${t===1?`disabled`:``}
        >
          <span aria-hidden="true">&#8249;</span>
        </button>
      </li>
    `],a=[...new Set(r)];for(let[e,n]of a.entries()){let r=a[e-1];r&&n-r>1&&i.push(`
        <li>
          <span class="pagination-dots">...</span>
        </li>
        `);let o=n===t;i.push(`
      <li>
        <button
          class="pagination-button${o?` is-active`:``}"
          type="button"
          data-page="${n}"
          aria-label="Go to page ${n}"
          ${o?`aria-current="page"`:``}
        >
          ${String(n).padStart(2,`0`)}
        </button>
      </li>
    `)}i.push(`
    <li>
      <button
        class="pagination-control"
        type="button"
        data-page="${t+1}"
        aria-label="Go to next page"
        ${t===n?`disabled`:``}
      >
        <span aria-hidden="true">&#8250;</span>
      </button>
    </li>
  `),e.paginationList.innerHTML=i.join(``),e.pagination.hidden=!1}function M(){let t=e.queryInput.value.trim()!==``;e.clearButton.classList.toggle(`is-hidden`,!t)}function N(){t.totalPages>1&&j(t.page,t.totalPages)}async function P(){e.queryInput.value=``,e.queryInput.focus(),M(),t.query=``,t.year=``,t.page=1,e.yearSelect.value=``;try{v(!0),b(),x(),F(await d(t.page))}catch{b(),x(),y(!0)}finally{v(!1)}}function F(e){let n=e.results.map(g);t.movies=n,t.totalPages=e.total_pages,w(n),j(t.page,t.totalPages),y(n.length===0)}async function I(n){n.preventDefault(),t.query=e.queryInput.value.trim(),t.year=e.yearSelect.value,t.page=1;try{v(!0),b(),x(),y(!1),F(t.query?await u({query:t.query,year:t.year,page:t.page}):await d(t.page))}catch{b(),x(),y(!0)}finally{v(!1)}}async function L(n){let r=n.target.closest(`.pagination-button, .pagination-control`);if(!r)return;let i=Number(r.dataset.page);if(!(i===t.page||t.isLoading))try{v(!0);let n=t.query?await u({query:t.query,year:t.year,page:i}):await d(i);t.page=i,F(n),e.resultsSection.scrollIntoView({behavior:`smooth`})}catch{y(!0)}finally{v(!1)}}async function R(){S();try{v(!0);try{await f()}catch{t.genres=[]}F(await d(t.page))}catch{b(),x(),y(!0)}finally{v(!1)}}R(),e.queryInput.addEventListener(`input`,M),e.clearButton.addEventListener(`click`,P),e.form.addEventListener(`submit`,I),e.paginationList.addEventListener(`click`,L),e.movieList.addEventListener(`click`,D),e.movieList.addEventListener(`keydown`,O),i.addEventListener(`change`,N);function z(){let t=window.scrollY>300;e.scrollUpButton.classList.toggle(`is-hidden`,!t)}function B(){window.scrollTo({top:0,behavior:`smooth`})}window.addEventListener(`scroll`,z),e.scrollUpButton.addEventListener(`click`,B);
//# sourceMappingURL=catalog.js.map