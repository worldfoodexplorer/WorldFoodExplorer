
(function(){
  const data = window.WFE_DATA; // injected by data.json
  const countrySelect = document.getElementById('countrySelect');
  const languageSelect = document.getElementById('languageSelect');
  const searchBtn = document.getElementById('searchBtn');
  const categoryList = document.getElementById('categoryList');
  const categoriesSection = document.getElementById('categories');
  const resultsSection = document.getElementById('results');
  const dishList = document.getElementById('dishList');
  const details = document.getElementById('details');
  const dishDetails = document.getElementById('dishDetails');
  const intro = document.getElementById('intro');
  const festivals = document.getElementById('festivals');
  const festivalList = document.getElementById('festivalList');
  const backBtn = document.getElementById('backBtn');
  const resultsTitle = document.getElementById('resultsTitle');

  // Populate countries
  data.countries.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.name;
    countrySelect.appendChild(opt);
  });

  countrySelect.addEventListener('change', onCountryChange);
  searchBtn.addEventListener('click', onSearch);
  backBtn.addEventListener('click', ()=>{
    details.classList.add('hidden');
    resultsSection.classList.remove('hidden');
  });

  function onCountryChange(){
    const country = data.countries.find(x=>x.code===countrySelect.value);
    if(!country) return;
    // languages: if >1 show selector and require selection
    if(country.languages && country.languages.length>1){
      languageSelect.innerHTML='';
      const placeholder = document.createElement('option');
      placeholder.value='';
      placeholder.textContent='-- select language --';
      languageSelect.appendChild(placeholder);
      country.languages.forEach(l=>{
        const o = document.createElement('option');
        o.value = l.code;
        o.textContent = l.name;
        languageSelect.appendChild(o);
      });
      languageSelect.style.display='inline-block';
    } else {
      languageSelect.style.display='none';
    }
    // show festivals for chosen country
    renderFestivals(country);
  }

  function onSearch(){
    const c = data.countries.find(x=>x.code===countrySelect.value);
    if(!c){ alert('Please choose a country first.'); return; }
    if(c.languages && c.languages.length>1 && !languageSelect.value){
      alert('Please pick a language for this country.');
      return;
    }
    // show categories
    intro.classList.add('hidden');
    categoriesSection.classList.remove('hidden');
    resultsSection.classList.remove('hidden');
    renderCategories(c);
  }

  function renderCategories(country){
    categoryList.innerHTML='';
    const categories = data.categories;
    categories.forEach(cat=>{
      const btn = document.createElement('button');
      btn.textContent = cat.name + ' (' + (cat.count || 0) + ')';
      btn.addEventListener('click', ()=>renderDishesForCategory(country,cat));
      categoryList.appendChild(btn);
    });
  }

  function renderDishesForCategory(country,cat){
    resultsTitle.textContent = cat.name + ' — Dishes';
    dishList.innerHTML='';
    // choose few dishes from data for demo (filter by country if available else global)
    const list = (country.dishes && country.dishes[cat.key]) || data.sampleDishes[cat.key] || [];
    list.forEach(d=>{
      const div = document.createElement('div');
      div.className='cardDish';
      div.innerHTML = '<img src="'+imageUrlFor(d.name)+'" alt="'+d.name+'"/><h3>'+d.name+'</h3><p>'+d.short+'</p>';
      div.addEventListener('click', ()=>showDetails(d,country,cat));
      dishList.appendChild(div);
    });
    resultsSection.classList.remove('hidden');
    details.classList.add('hidden');
  }

  function renderFestivals(country){
    festivalList.innerHTML='';
    const fests = (country.festivals && country.festivals) || [];
    fests.forEach(f=>{
      const el = document.createElement('div');
      el.className='cardFest';
      el.innerHTML = '<h4>'+f.name+'</h4><p>Top 5 dishes</p>';
      el.addEventListener('click', ()=>{
        // show festival dishes (reusing dish area)
        resultsTitle.textContent = f.name + ' — Festival Dishes';
        dishList.innerHTML='';
        f.dishes.forEach(d=>{
          const div = document.createElement('div');
          div.className='cardDish';
          div.innerHTML = '<img src="'+imageUrlFor(d.name)+'" alt="'+d.name+'"/><h3>'+d.name+'</h3><p>'+d.short+'</p>';
          div.addEventListener('click', ()=>showDetails(d,country,{name:f.name}));
          dishList.appendChild(div);
        });
        resultsSection.classList.remove('hidden');
      });
      festivalList.appendChild(el);
    });
    festivals.classList.toggle('hidden', fests.length===0);
  }

  function imageUrlFor(query){
    // Uses Unsplash Source to fetch a relevant photo for the dish name.
    // This is simple and works for demos; for production use licensed assets or an API key.
    return 'https://source.unsplash.com/600x400/?' + encodeURIComponent(query + ',food');
  }

  function showDetails(d,country,cat){
    resultsSection.classList.add('hidden');
    details.classList.remove('hidden');
    dishDetails.innerHTML = '<h2>'+d.name+'</h2>';
    const img = document.createElement('img'); img.src = imageUrlFor(d.name); dishDetails.appendChild(img);
    const ing = document.createElement('div'); ing.innerHTML = '<h3>Ingredients</h3><ul>' + (d.ingredients||[]).map(i=>'<li>'+i+'</li>').join('') + '</ul>';
    dishDetails.appendChild(ing);
    const stats = document.createElement('p'); stats.innerHTML = '<strong>Video views:</strong> ' + (d.views || 'N/A');
    dishDetails.appendChild(stats);
    const yt = document.createElement('p'); yt.innerHTML = '<a href="'+(d.video || '#')+'" target="_blank">Watch video (if available)</a>'; dishDetails.appendChild(yt);
  }

  // initial render: pick first country
  if(countrySelect.options.length>0){ countrySelect.selectedIndex = 0; onCountryChange(); }
})();
