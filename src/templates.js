
export const searchTemplate = data => `
    <div class='search-view'>
        <a href="./#list">Search for Avengers..</a>
    </div>
`;

export const listTemplate = data => `
    <div class='list-view'>
        <div>Images:</div>
        <div class="thumbs">
            ${data.map(item=> {
                return thumbnailTemplate(item, data.saveFn);
            }).join('')}
        </div>
    </div>
    <a id="moreBtn" href="#">More..</a>
`;

export const thumbnailTemplate = (item) => `
    <article>
        <a class="thumbnails" href="${item.images.downsized.url}">
            <figure>
                <img src="${item.images.fixed_height_small_still.url}" alt="${item.title}">
            </figure>
        </a>
        <footer>
            <button id="btn_${item.id}">+</button>
        </footer>
    </article>
`;

export const detailTemplate = item => `
    <div class="detail-view">
        <title>${item.title}</title>
        <figure>
            <img src="${item.images.downsized.url}" alt="${item.title}">
        </figure>
    </div>
`;

export const favouritesTemplate = data => `
    <div class='favourites-view'>
      <h1>Favourites (${data.length})</h1>
      ${listTemplate(data)}
    </div>
`