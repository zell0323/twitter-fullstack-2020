const editUserBtn = document.querySelector('.edit-user-btn')
const editModalContainer = document.querySelector('.edit-container')
const editModalClose = document.querySelector('.edit-modal-close')
// cropper
const avatarModalContainer = document.querySelector('.avatar-cropper-container')
const avatarModalClose = document.querySelector('.avatar-modal-close')
const upload_avatar_img = document.querySelector('#upload_avatar_img')
const avatarCropperSubmit = document.querySelector('.avatar-cropper-submit')
const upload_coverage_img = document.querySelector('#upload_coverage_img')
const avatarimageCropField = document.querySelector('#avatarTailoringImg')
editUserBtn.addEventListener('click', function getUserDataRenderPage() {
  // axios.get('/api/users/1')
  //   .then(function (response) {
  //     // 1.handle success
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     // 2.handle error
  //     console.log(error)
  //   })
  //   .then(function () {
  //     // 3.always executed
  //   })
  console.log('click')
  fadeIn(editModalContainer, 'flex')
  blockScroll()
})

editModalClose.addEventListener('click', function closeUserData() {
  fadeOut(editModalContainer)
  unblockScroll()
})

// Cropper.js
const crop = new Cropper(avatarimageCropField, {
  viewMode: 3,
  aspectRatio: 1,  // 預設比例
  preview: '#previewImg',  // 預覽檢視
  guides: false,   // 裁剪框的虛線(九宮格)
  autoCropArea: 0.5, // 0-1之間的數值，定義自動剪裁區域的大小，預設0.8
  dragMode: 'move', // 拖曳模式 crop(Default,新增裁剪框) / move(移動裁剪框&圖片) / none(無動作)
  cropBoxResizable: true, // 是否有裁剪框調整四邊八點
  movable: true, // 是否允許移動圖片
  zoomable: true, // 是否允許縮放圖片大小
  rotatable: false,   // 是否允許旋轉圖片
  zoomOnWheel: true, // 是否允許通過滑鼠滾輪來縮放圖片
  zoomOnTouch: true, // 是否允許通過觸控移動來縮放圖片
  ready: function (e) {
    console.log('ready!');
  }
})
upload_avatar_img.addEventListener('change', function avatarImageToCropper() {
  let file = this.files[0]
  if (file) {
    let reader = new FileReader()
    reader.onload = function (e) {
      let imgSrc = e.target.result
      console.log(imgSrc)
      avatarimageCropField.src = imgSrc
      crop.replace(imgSrc, false)
      fadeIn(avatarModalContainer, 'flex')
    }
    reader.onerror = function () {
      console.log('error')
    }
    reader.readAsDataURL(file)
  }
})

avatarModalClose.addEventListener('click', function closeAvatarCropper() {
  fadeOut(avatarModalContainer)
})

avatarCropperSubmit.addEventListener('click', function submitAvatarCropper() {
  const imgd = crop.getImageData()
  console.log(imgd)
  fadeOut(avatarModalContainer)
})


// fadeIn,...
function fadeIn(element, display, duration = 300) {
  element.style.opacity = element.style.opacity || 0
  element.style.display = display
  element.style.visibility = "visible"

  let opacity = parseFloat(element.style.opacity) || 0
  const timer = setInterval(function () {
    opacity += 20 / duration
    if (opacity >= 1) {
      clearInterval(timer)
      opacity = 1
    }
    element.style.opacity = opacity
  }, 20)
}

function fadeOut(element, duration = 400) {
  let opacity = 1
  const timer = setInterval(function () {
    opacity -= 20 / duration
    if (opacity <= 0) {
      clearInterval(timer)
      opacity = 0
      element.style.display = "none"
      element.style.visibility = "hidden"
    }
    element.style.opacity = opacity
  }, 20)
}

function blockScroll() {
  document.body.style.overflow = 'hidden';
}

function unblockScroll() {
  document.body.style.overflow = null;
}