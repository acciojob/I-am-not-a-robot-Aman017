//your code here
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];
let imageElements = [];
const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const h3 = document.getElementById('h');

// Helper to shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)];
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load images and render to page
function loadImages() {
  container.innerHTML = '';
  message.textContent = '';
  h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  selectedImages = [];

  let selectedSet = [...images];
  const duplicate = selectedSet[Math.floor(Math.random() * selectedSet.length)];
  selectedSet.push(duplicate);

  const shuffled = shuffle(selectedSet);

  imageElements = shuffled.map((imgClass, index) => {
    const img = document.createElement('img');
    img.className = imgClass;
    img.setAttribute('data-type', imgClass);
    img.addEventListener('click', () => handleImageClick(img));
    container.appendChild(img);
    return img;
  });

  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
}

// Image click logic
function handleImageClick(img) {
  if (selectedImages.includes(img)) return;

  if (selectedImages.length === 2) return;

  img.classList.add('selected');
  selectedImages.push(img);

  if (selectedImages.length > 0) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset everything
resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  message.textContent = '';
  verifyBtn.style.display = 'none';
  resetBtn.style.display = 'none';
});

// Verify images
verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';
  const [img1, img2] = selectedImages;
  const type1 = img1.getAttribute('data-type');
  const type2 = img2.getAttribute('data-type');

  if (type1 === type2) {
    message.textContent = 'You are a human. Congratulations!';
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

loadImages();
