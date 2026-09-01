import"./assets/modal-BePYD-Dd.js";var e=`31ab4be675fffa39376ecabddb9e341d`,t=`https://api.themoviedb.org/3`,n=`https://image.tmdb.org/t/p`,r=document.querySelector(`[data-weekly-list]`),i=document.querySelector(`[data-upcoming]`),a=`cinemania-library`,o=new Map,s=[];async function c(n,r={}){let i=new URL(`${t}${n}`);i.searchParams.set(`api_key`,e),i.searchParams.set(`language`,`en-US`),Object.entries(r).forEach(([e,t])=>{i.searchParams.set(e,t)});let a=await fetch(i);if(!a.ok)throw Error(`TMDB request failed: ${a.status}`);return a.json()}async function l(){let e=await c(`/genre/movie/list`);o=new Map(e.genres.map(e=>[e.id,e.name]))}function u(e=[]){return e.length?e.slice(0,2).map(e=>o.get(e)).filter(Boolean).join(`, `):`Unknown`}function d(e){return e?e.slice(0,4):`N/A`}function f(e=0){let t=Math.round(e/2);return Array.from({length:5},(e,n)=>n<t?`★`:`☆`).join(``)}function p(e,t=`w500`){return e?`${n}/${t}${e}`:``}function m(e){let t=document.createElement(`li`);t.className=`weekly-trends__item`,t.dataset.movieId=e.id,t.setAttribute(`role`,`button`),t.setAttribute(`tabindex`,`0`),t.setAttribute(`aria-label`,`View details for ${e.title}`);let n=u(e.genre_ids),r=d(e.release_date),i=f(e.vote_average);return t.innerHTML=`
    <article class="weekly-trends__card">
      <div class="weekly-trends__image-wrapper">
        <img
          class="weekly-trends__image"
          src="${p(e.poster_path,`w500`)}"
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
  `,t}function h(e){if(r.innerHTML=``,!e.length){s=[],r.innerHTML=`<li class="weekly-trends__empty">No trending movies found.</li>`;return}let t=e.slice(0,3);s=t,t.forEach(e=>{r.append(m(e))})}async function g(){h((await c(`/trending/movie/week`)).results||[])}function _(e){window.dispatchEvent(new CustomEvent(`open-movie-modal`,{detail:e}))}function v(e){let t=e.closest(`.weekly-trends__item`);if(!t)return null;let n=Number(t.dataset.movieId);return s.find(e=>e.id===n)||null}function y(e){let t=v(e.target);t&&_(t)}function b(e){if(e.key!==`Enter`&&e.key!==` `)return;let t=v(e.target);t&&(e.preventDefault(),_(t))}function x(e){let t=new Date,n=t.getFullYear(),r=t.getMonth();return e.filter(e=>{if(!e.release_date)return!1;let t=new Date(e.release_date);return t.getFullYear()===n&&t.getMonth()===r})}function S(e){return e.length?e[Math.floor(Math.random()*e.length)]:null}function C(e){return e?new Date(e).toLocaleDateString(`en-US`,{month:`2-digit`,day:`2-digit`,year:`numeric`}):`Unknown`}function w(){try{return JSON.parse(localStorage.getItem(a))||[]}catch{return[]}}function T(e){localStorage.setItem(a,JSON.stringify(e))}function E(e){return w().some(t=>t.id===e)}function D(e){let t=w(),n=t.findIndex(t=>t.id===e.id);n>=0?t.splice(n,1):t.push(e),T(t),window.dispatchEvent(new CustomEvent(`library-updated`,{detail:{movie:e,library:t}}))}function O(e){return E(e)?`Remove from My Library`:`Add to My Library`}function k(e){if(!e){i.innerHTML=`
      <p class="upcoming__empty">
        There are no upcoming movies for this month.
      </p>
    `;return}let t=u(e.genre_ids);i.innerHTML=`
    <div class="upcoming__media">
      <img
        class="upcoming__image"
        src="${p(e.backdrop_path||e.poster_path,`original`)}"
        alt="${e.title}"
      />
    </div>

    <div class="upcoming__info">
      <h3 class="upcoming__title">${e.title}</h3>

      <div class="upcoming__details">
        <div class="upcoming__row">
          <span class="upcoming__label">Release date</span>
          <span class="upcoming__value upcoming__release">
            ${C(e.release_date)}
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
        ${O(e.id)}
      </button>
    </div>
  `;let n=i.querySelector(`[data-library-button]`);n.addEventListener(`click`,()=>{D(e),n.textContent=O(e.id)})}async function A(){k(S(x((await c(`/movie/upcoming`,{page:1})).results||[])))}function j(e,t){e.innerHTML=`
    <p class="home-error">
      ${t}
    </p>
  `}async function M(){try{await l()}catch(e){console.error(e)}try{await g()}catch(e){console.error(e),j(r,`Weekly trends could not be loaded.`)}try{await A()}catch(e){console.error(e),j(i,`Upcoming movie could not be loaded.`)}}r?.addEventListener(`click`,y),r?.addEventListener(`keydown`,b),M();
//# sourceMappingURL=index.js.map