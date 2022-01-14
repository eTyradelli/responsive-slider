// Get slides
const slideContainer = document.querySelector('.slides');
const slideList = slideContainer.querySelectorAll('[role="tabpanel"]');

// Get Tabpanels
const tabpanelContainer = document.querySelector('.details');
const tabpanels = tabpanelContainer.querySelectorAll('[role="tabpanel"]');

// Get nav arrows
const prevBtns = document.querySelectorAll('.previous');
const nextBtns = document.querySelectorAll('.next');

// Get slider buttons (tabs)
const tabContainer = document.querySelector('[role="tablist"]');
const tabList = tabContainer.querySelectorAll('[role="tab"]');


// Button navigation


nextBtns.forEach((nextBtn) => {
  nextBtn.addEventListener('click', nextSlide);
});

prevBtns.forEach((prevBtn) => {
  prevBtn.addEventListener('click', prevSlide);
});



function nextSlide(){
  const currentSlide = slideContainer.querySelector('.current');
  const currentTabpanel = tabpanelContainer.querySelector('.current');
  const currentTab = tabContainer.querySelector('[aria-selected="true"]');

  // Tabs

  currentTab.setAttribute("aria-selected", false);
  if(currentTab.nextElementSibling){
    currentTab.nextElementSibling.setAttribute("aria-selected", true);
  }else{
    tabList[0].setAttribute("aria-selected", true);
  };

  // Slides

  // Set background
  
  setSlideBg(currentSlide);

  slideList.forEach((slide) => {
    slide.style.animation = "appear .7s forwards";
    slide.setAttribute("hidden", true);
  });

  currentSlide.classList.remove('current');

  if(currentSlide.nextElementSibling){
    currentSlide.nextElementSibling.classList.add('current');
  }else{
    slideList[0].classList.add('current');
  };

  slideList.forEach((slide) => {
    if(slide.classList.contains('current')){
      slide.removeAttribute("hidden");
    }
  });

  // Tabpanels
  
  tabpanels.forEach((tabpanel) => {
    tabpanel.style.animation = "slideNext .5s forwards";
    tabpanel.setAttribute("hidden", true);
  });

  currentTabpanel.classList.remove('current');

  if(currentTabpanel.nextElementSibling){
    currentTabpanel.nextElementSibling.classList.add('current');
  }else{
    tabpanels[0].classList.add('current');
  };


  tabpanels.forEach((tabpanel) => {
    if(tabpanel.classList.contains('current')){
      tabpanel.removeAttribute("hidden");
    }
  });

}

function prevSlide(){
  const currentSlide = slideContainer.querySelector('.current');
  const currentTabpanel = tabpanelContainer.querySelector('.current');
  const currentTab = tabContainer.querySelector('[aria-selected="true"]');


  // Tabs

  currentTab.setAttribute("aria-selected", false);
  if(currentTab.previousElementSibling){
    currentTab.previousElementSibling.setAttribute("aria-selected", true);
  }else{
    tabList[tabList.length - 1].setAttribute("aria-selected", true);
  };
  

  // Slides

  setSlideBg(currentSlide);

  slideList.forEach((slide) => {
    slide.style.animation = "appear .7s forwards";
    slide.setAttribute("hidden", true);
  });

  currentSlide.classList.remove('current');

  if(currentSlide.previousElementSibling){
    currentSlide.previousElementSibling.classList.add('current');
  }else{
    slideList[slideList.length - 1].classList.add('current');
  };

  slideList.forEach((slide) => {
    if(slide.classList.contains('current')){
      slide.removeAttribute("hidden");
    }
  });

  // Tabpanels
  
  tabpanels.forEach((tabpanel) => {
    tabpanel.style.animation = "slidePrevious .5s forwards";
    tabpanel.setAttribute("hidden", true);
  });

  currentTabpanel.classList.remove('current');

  if(currentTabpanel.previousElementSibling){
    currentTabpanel.previousElementSibling.classList.add('current');
  }else{
    tabpanels[tabpanels.length - 1].classList.add('current');
  };

  tabpanels.forEach((tabpanel) => {
    if(tabpanel.classList.contains('current')){
      tabpanel.removeAttribute("hidden");
    }
  });

}


// Slider tab navigation

tabList.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});



// Navigation using slider numbers/tabs.


function changeTabPanel(e) {
  const targetTab = e.currentTarget;
  const targetImage = targetTab.getAttribute("data-image");
  const targetPanel = targetTab.getAttribute("aria-controls");
  
  tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);


  hideItem(slideContainer, '.slide');
  showItem(slideContainer, [`#${targetImage}`]);
  
  hideContent(tabpanelContainer, '[role="tabpanel"]');
  showContent(tabpanelContainer, [`#${targetPanel}`]);
}



function hideItem(parent, content) {
  parent.querySelectorAll(content).forEach((item) => item.classList.remove('current') );
}

function showItem(parent, content) {
   parent.querySelector(content).classList.add('current');
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => item.classList.remove('current') );
  parent.querySelectorAll(content).forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).classList.add('current');
  parent.querySelector(content).removeAttribute('hidden');
}


function setSlideBg(slide){
  const currentSlideStyles = window.getComputedStyle(slide, false);
  const bgImg = currentSlideStyles.backgroundImage.slice(4, -1);
  slideContainer.style.backgroundImage = "url(" + bgImg + ")";
}