const loadAllPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await res.json();
  const newsContainer = document.getElementById('news-container');


  newsContainer.innerHTML = '';

  data.posts.forEach(item => {
      const div = document.createElement('div');
      div.classList = `card flex flex-row bg-gray-200 rounded-[24px]`;
      div.innerHTML = `
          <div class="indicator mt-8 ml-8">
              <span class="indicator-item bg-red-600 badge badge-secondary"></span> 
              <div class="grid w-20 h-20 bg-base-300 place-items-center">
                  <img class="rounded-[16px]" src="${item.image}" alt="">
              </div>
          </div>
          <div class="card-body space-y-4">
              <div class="flex flex-row justify-around gap-5 font-inter text-[14px] text-[#3a3a3f]">
                  <p class="inline-block font-mulish"># ${item.category}</p>
                  <p class="inline-block font-mulish">Author: ${item.author.name}</p>
              </div>
              <h2 class="card-title font-extrabold text-xl font-mulish">${item.title}</h2>
              <p class="font-inter text-[16px] font-inter text-gray-500">${item.description}</p>
              <hr class="border-dashed border-2 border-gray-400">
              <div class="flex justify-between">
                  <!-- left -->
                  <div class="flex gap-5">
                      <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                          <img src="../images/tabler-icon-message-2.png" alt="">
                          <p class="font-inter text-[16px] text-gray-500">${item.comment_count}</p>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                          <img src="../images/Group 16.png" alt="">
                          <p class="font-inter text-[16px] text-gray-500">${item.view_count}</p>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                          <img src="../images/tabler-icon-clock-hour-9.png" alt="">
                          <p class="font-inter text-[16px] text-gray-500">${item.posted_time}</p>
                      </div>
                  </div>
                  <!-- right -->
                  <div> 
                      <button onclick="showPostRead(this, '${item.title}', ${item.view_count})" class="hover:bg-green-200">
                          <img src="../images/email 1.png" alt="Button Image">
                      </button>
                  </div>
              </div>
          </div>
      `;
      newsContainer.appendChild(div);
  });
}

const loadCategoryPosts = async (categoryName) => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await res.json();
  const newsContainer = document.getElementById('news-container');

  
  newsContainer.innerHTML = '';

  data.posts.forEach(item => {
      if (item.category.toLowerCase() === categoryName.toLowerCase()) {
          const div = document.createElement('div');
          div.classList = `card flex flex-row bg-gray-200 rounded-[24px]`;
          div.innerHTML = `
              <div class="indicator mt-8 ml-8">
                  <span class="indicator-item bg-red-600 badge badge-secondary"></span> 
                  <div class="grid w-20 h-20 bg-base-300 place-items-center">
                      <img class="rounded-[16px]" src="${item.image}" alt="">
                  </div>
              </div>
              <div class="card-body space-y-4">
                  <div class="flex flex-row justify-around gap-5 font-inter text-[14px] text-[#3a3a3f]">
                      <p class="inline-block font-mulish"># ${item.category}</p>
                      <p class="inline-block font-mulish">Author: ${item.author.name}</p>
                  </div>
                  <h2 class="card-title font-mulish font-extrabold text-xl">${item.title}</h2>
                  <p class="font-inter text-[16px] text-gray-500">${item.description}</p>
                  <hr class="border-dashed border-2 border-gray-400">
                  <div class="flex justify-between">
                      <!-- left -->
                      <div class="flex gap-5">
                          <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                              <img src="../images/tabler-icon-message-2.png" alt="">
                              <p class="font-inter text-[16px] text-gray-500">${item.comment_count}</p>
                          </div>
                          <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                              <img src="../images/Group 16.png" alt="">
                              <p class="font-inter text-[16px] text-gray-500">${item.view_count}</p>
                          </div>
                          <div class="flex flex-row justify-center items-center gap-3 font-mulish text-[16px] text-[#3a3a3f]">
                              <img src="../images/tabler-icon-clock-hour-9.png" alt="">
                              <p class="font-inter text-[16px] text-gray-500">${item.posted_time}</p>
                          </div>
                      </div>
                      <!-- right -->
                      <div> 
                          <button onclick="showPostRead(this, '${item.title}', ${item.view_count})" class="hover:bg-green-200">
                              <img src="../images/email 1.png" alt="Button Image">
                          </button>
                      </div>
                  </div>
              </div>
          `;
          newsContainer.appendChild(div);
      }
  });
}

const handleSearch = async () => {
  const categoryName = document.getElementById('search-box').value;
  if (categoryName.trim()) {
      await loadCategoryPosts(categoryName.trim());
  } else {
      loadAllPosts(); 
  }
}

let countedClick = 0;
const showPostRead = (buttonElement, title, view_count) => {
  countedClick++;
  document.getElementById('read-count').innerText = countedClick;
  const postRead = document.getElementById('post-read');

  const div1 = document.createElement('div');
  div1.classList = `flex flex-row gap-5 bg-white rounded-2xl m-2`;
  div1.innerHTML = `
      <div>
          <p class="p-4 font-mulish text-[#12132D] text-[16px] font-semibold">${title}</p>
      </div>
      <div class="flex flex-row justify-center items-center  gap-3 font-mulish text-[16px] text-[#3a3a3f] p-4">
          <img src="images/Group 16.png" alt="">
          <p class="font-inter text-[16px] text-gray-500">${view_count}</p>
      </div>
  `;

  postRead.appendChild(div1);

  const indicatorShow = buttonElement.closest('.card').querySelector('.indicator-item');
  if (indicatorShow) {
      indicatorShow.classList.remove('bg-red-600');
      indicatorShow.classList.add('bg-green-600');
  }
}


loadAllPosts();





// Latest Posts Part




const loadPost2= async ()=> {
    const res= await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPost=data;
    // console.log(latestPost)
    displayLatestPost(latestPost);
}

// display latest posts
const displayLatestPost= latestPost =>{
    // console.log(latestPost);

// latPost-container

const latPostContainer=document.getElementById('latPost-container')

    latestPost.forEach(post =>{
        // console.log(post);

        // create a div
        
        const latestPostCard=document.createElement('div');
        latestPostCard.classList=`card bg-base-100 shadow-xl p-4 m-4`;
        // set inner html
        latestPostCard.innerHTML=`
        <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
            <div class="card-body">
              <div class="flex flex-row justify-around gap-5 font-mulish  text-[16px] text-[#3a3a3f]">
                  <img src="../images/Frame.png" alt="Profile Image">
                  <p>${post.author.posted_date ? post.author.posted_date: 'No publish date'} </p>
              </div>
            <h2 class="card-title font-extrabold">${post.title}</h2>
              <p class="font-mulish text-[#3a3a3f] text-[16px]">${post.description}</p>
              
              <div class="flex gap-3">
                  <img src="${post.profile_image}" alt="Profile Image" class="w-[44px] h-[44px] rounded-full">
                  <div><p class="font-mulish text-[16px]  text-[#3a3a3f]">${post.author.name ? post.author.name :'Unknown'}</p>
                  <p class="font-mulish text-[16px]  text-[#3a3a3f]">${post.author.designation ? post.author.designation :'Unknown'}</p></div>
              </div>
            </div>
        
        `;

        // append
        
         latPostContainer.appendChild(latestPostCard)



    })

}
loadPost2();
