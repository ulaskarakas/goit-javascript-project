import"./assets/modal-B-9GRM0o.js";var e=`31ab4be675fffa39376ecabddb9e341d`,t=`https://api.themoviedb.org/3`,n=`https://image.tmdb.org/t/p`,r=document.querySelector(`[data-weekly-list]`),i=document.querySelector(`[data-upcoming]`),a=`my-library`,o=new Map;async function s(n,r={}){let i=new URL(`${t}${n}`);i.searchParams.set(`api_key`,e),i.searchParams.set(`language`,`en-US`),Object.entries(r).forEach(([e,t])=>{i.searchParams.set(e,t)});let a=await fetch(i);if(!a.ok)throw Error(`TMDB request failed: ${a.status}`);return a.json()}async function c(){let e=await s(`/genre/movie/list`);o=new Map(e.genres.map(e=>[e.id,e.name]))}function l(e=[]){return e.length?e.slice(0,2).map(e=>o.get(e)).filter(Boolean).join(`, `):`Unknown`}function u(e){return e?e.slice(0,4):`N/A`}function d(e=0){let t=Math.round(e/2);return Array.from({length:5},(e,n)=>n<t?`★`:`☆`).join(``)}function f(e,t=`w500`){return e?`${n}/${t}${e}`:``}function p(e){let t=document.createElement(`li`);t.className=`weekly-trends__item`,t.dataset.movieId=e.id;let n=l(e.genre_ids),r=u(e.release_date),i=d(e.vote_average);return t.innerHTML=`
    <article class="weekly-trends__card">
      <div class="weekly-trends__image-wrapper">
        <img
          class="weekly-trends__image"
          src="${f(e.poster_path,`w500`)}"
          alt="${e.title}"
          loading="lazy"
        />

        <div class="weekly-trends__gradient"></div>

        <div class="weekly-trends__info">
          <div>
            <h3 class="weekly-trends__movie-title">
              ${e.title}
            </h3>

            <p class="weekly-trends__meta">
              ${n} | ${r}
            </p>
          </div>

          <div
            class="weekly-trends__rating"
            aria-label="Rating ${e.vote_average.toFixed(1)} out of 10"
          >
            ${i}
          </div>
        </div>
      </div>
    </article>
  `,t}function m(e){if(r.innerHTML=``,!e.length){r.innerHTML=`<li class="weekly-trends__empty">No trending movies found.</li>`;return}e.slice(0,3).forEach(e=>{r.append(p(e))})}async function h(){m((await s(`/trending/movie/week`)).results||[])}function g(e){let t=new Date,n=t.getFullYear(),r=t.getMonth();return e.filter(e=>{if(!e.release_date)return!1;let t=new Date(e.release_date);return t.getFullYear()===n&&t.getMonth()===r})}function _(e){return e.length?e[Math.floor(Math.random()*e.length)]:null}function v(e){return e?new Date(e).toLocaleDateString(`en-US`,{month:`2-digit`,day:`2-digit`,year:`numeric`}):`Unknown`}function y(){try{return JSON.parse(localStorage.getItem(a))||[]}catch{return[]}}function b(e){localStorage.setItem(a,JSON.stringify(e))}function x(e){return y().some(t=>t.id===e)}function S(e){let t=y(),n=t.findIndex(t=>t.id===e.id);n>=0?t.splice(n,1):t.push(e),b(t)}function C(e){return x(e)?`Remove from my library`:`Add to my library`}function w(e){if(!e){i.innerHTML=`
      <p class="upcoming__empty">
        There are no upcoming movies for this month.
      </p>
    `;return}let t=l(e.genre_ids);i.innerHTML=`
    <div class="upcoming__media">
      <img
        class="upcoming__image"
        src="${f(e.backdrop_path||e.poster_path,`original`)}"
        alt="${e.title}"
      />
    </div>

    <div class="upcoming__info">
      <h3 class="upcoming__title">${e.title}</h3>

      <div class="upcoming__details">
        <div class="upcoming__row">
          <span class="upcoming__label">Release date</span>
          <span class="upcoming__value upcoming__release">
            ${v(e.release_date)}
          </span>
        </div>

        <div class="upcoming__row">
          <span class="upcoming__label">Vote / Votes</span>
          <span class="upcoming__value">
            ${e.vote_average.toFixed(1)} / ${e.vote_count}
          </span>
        </div>

        <div class="upcoming__row">
          <span class="upcoming__label">Popularity</span>
          <span class="upcoming__value">
            ${e.popularity.toFixed(1)}
          </span>
        </div>

        <div class="upcoming__row">
          <span class="upcoming__label">Genre</span>
          <span class="upcoming__value">
            ${t}
          </span>
        </div>
      </div>

      <h4 class="upcoming__about-title">About</h4>

      <p class="upcoming__description">
        ${e.overview||`No description available.`}
      </p>

      <button
        class="upcoming__button"
        type="button"
        data-library-button
      >
        ${C(e.id)}
      </button>
    </div>
  `;let n=i.querySelector(`[data-library-button]`);n.addEventListener(`click`,()=>{S(e),n.textContent=C(e.id)})}async function T(){w(_(g((await s(`/movie/upcoming`,{page:1})).results||[])))}function E(e,t){e.innerHTML=`
    <p class="home-error">
      ${t}
    </p>
  `}async function D(){try{await c()}catch(e){console.error(e)}try{await h()}catch(e){console.error(e),E(r,`Weekly trends could not be loaded.`)}try{await T()}catch(e){console.error(e),E(i,`Upcoming movie could not be loaded.`)}}D();
//# sourceMappingURL=index.js.map