// Get slides
const slideContainer = document.querySelector('.slides');
const slideList = slideContainer.querySelectorAll('[role="img"]');

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

nextBtns.forEach((nextBtn) => {
  nextBtn.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
      nextSlide();
    }
  });
});

prevBtns.forEach((prevBtn) => {
  prevBtn.addEventListener('click', prevSlide);
});

prevBtns.forEach((prevBtn) => {
  prevBtn.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
      prevSlide();
    }
  });
});



// Slider tab navigation
tabList.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
  tab.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
      changeTabPanel(e);
    }
  });
});



// Swipe navigation
let touchstartX = 0
let touchendX = 0

tabpanelContainer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
});

tabpanelContainer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  handleGesture()
});

function handleGesture() {
  if (touchendX < touchstartX){
    nextSlide();
  }
  if (touchendX > touchstartX){
    prevSlide();
  }
}



// Functions 
function changeTabPanel(e) {
  const currentSlide = slideContainer.querySelector('.current');
  const currentTabpanel = tabpanelContainer.querySelector('.current');
  const targetTab = e.currentTarget;
  const targetImageId = targetTab.getAttribute("data-image");
  const targetTabpanelId = targetTab.getAttribute("aria-controls");

  // Tabs
  tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);

  // Slides
  hideItem(currentSlide);
  showItem(document.getElementById(`${targetImageId}`));

  // Tabpanels
  hideItem(currentTabpanel);
  document.getElementById(`${targetTabpanelId}`).style.MozAnimation = "slideNext .5s forwards";
  document.getElementById(`${targetTabpanelId}`).style.WebkitAnimation = "slideNext .5s forwards";
  document.getElementById(`${targetTabpanelId}`).style.animation = "slideNext .5s forwards";
  showItem(document.getElementById(`${targetTabpanelId}`));
}

function hideItem(item) {
  item.classList.remove('current');
  item.setAttribute("hidden", true);
}

function showItem(item) {
  item.classList.add('current');
  item.removeAttribute('hidden');
}

function setSlideBg(slide){
  const currentSlideStyles = window.getComputedStyle(slide, false);
  const bgImg = currentSlideStyles.backgroundImage.slice(4, -1);
  slideContainer.style.backgroundImage = "url(" + bgImg + ")";
}

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

  setSlideBg(currentSlide);
  hideItem(currentSlide);
  if(currentSlide.nextElementSibling){
    showItem(currentSlide.nextElementSibling);
  }else{
    showItem(slideList[0]);
  };

  // Tabpanels
  hideItem(currentTabpanel);
  if(currentTabpanel.nextElementSibling){
    currentTabpanel.nextElementSibling.style.MozAnimation = "slideNext .5s forwards";
    currentTabpanel.nextElementSibling.style.WebkitAnimation = "slideNext .5s forwards";
    currentTabpanel.nextElementSibling.style.animation = "slideNext .5s forwards";
    showItem(currentTabpanel.nextElementSibling);
  }else{
    tabpanels[0].style.MozAnimation = "slideNext .5s forwards";
    tabpanels[0].style.WebkitAnimation = "slideNext .5s forwards";
    tabpanels[0].style.animation = "slideNext .5s forwards";
    showItem(tabpanels[0]);
  };
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
  hideItem(currentSlide);
  if(currentSlide.previousElementSibling){
    showItem(currentSlide.previousElementSibling);
  }else{
    showItem(slideList[slideList.length - 1]);
  };

  // Tabpanels
  hideItem(currentTabpanel);
  if(currentTabpanel.previousElementSibling){
    currentTabpanel.previousElementSibling.style.MozAnimation = "slidePrevious .5s forwards";
    currentTabpanel.previousElementSibling.style.WebkitAnimation = "slidePrevious .5s forwards";
    currentTabpanel.previousElementSibling.style.animation = "slidePrevious .5s forwards";
    showItem(currentTabpanel.previousElementSibling);
  }else{
    tabpanels[tabpanels.length - 1].style.MozAnimation = "slidePrevious .5s forwards";
    tabpanels[tabpanels.length - 1].style.WebkitAnimation = "slidePrevious .5s forwards";
    tabpanels[tabpanels.length - 1].style.animation = "slidePrevious .5s forwards";
    showItem(tabpanels[tabpanels.length - 1]);
  };
}